import React, { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import ProductDetails from './ProductDetails/ProductDetails';

function ProductDetails_global() {
    // Configuration constants
    const API_CONFIG = {
        baseUrl: "http://lumora.runasp.net/api/products",
        timeout: 8000,
        maxRetries: 3,
        productCount: 10
    };

    // State management
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [retryAttempt, setRetryAttempt] = useState(0);
    const [partialError, setPartialError] = useState(null);

    // Memoized axios instance with interceptors
    const axiosInstance = useMemo(() => {
        const instance = axios.create({
            timeout: API_CONFIG.timeout,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        // Request interceptor for logging
        instance.interceptors.request.use(
            (config) => {
                console.log(`Fetching: ${config.url}`);
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response interceptor for error handling
        instance.interceptors.response.use(
            (response) => response,
            (error) => {
                console.error(`API Error: ${error.config?.url}`, error.message);
                return Promise.reject(error);
            }
        );

        return instance;
    }, []);

    // Enhanced fetch function with retry logic
    const fetchProductWithRetry = useCallback(async (productId, attempt = 1) => {
        try {
            const response = await axiosInstance.get(`${API_CONFIG.baseUrl}/${productId}`);
            
            // Validate product data
            if (!response.data || !response.data.id) {
                throw new Error('Invalid product data received');
            }

            return { 
                success: true, 
                data: {
                    ...response.data,
                    // Ensure required fields have defaults
                    name: response.data.name || `Product ${productId}`,
                    price: response.data.price || 0,
                    images: response.data.images || [],
                    description: response.data.description || 'No description available',
                    rating: response.data.rating || 0,
                    reviewCount: response.data.reviewCount || 0
                },
                id: productId 
            };
        } catch (error) {
            const shouldRetry = attempt < API_CONFIG.maxRetries && 
                (error.code === 'ECONNABORTED' || 
                 error.response?.status >= 500 || 
                 error.response?.status === 429);

            if (shouldRetry) {
                console.warn(`Retrying product ${productId}, attempt ${attempt + 1}/${API_CONFIG.maxRetries}`);
                // Exponential backoff with jitter
                const delay = Math.min(1000 * Math.pow(2, attempt - 1) + Math.random() * 1000, 5000);
                await new Promise(resolve => setTimeout(resolve, delay));
                return fetchProductWithRetry(productId, attempt + 1);
            }

            return { 
                success: false, 
                error: error.response?.data?.message || error.message || 'Failed to fetch product',
                id: productId,
                status: error.response?.status || 'NETWORK_ERROR'
            };
        }
    }, [axiosInstance]);

    // Main fetch function with progress tracking
    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            setPartialError(null);
            setLoadingProgress(0);

            const productIds = Array.from({ length: API_CONFIG.productCount }, (_, i) => i + 1);
            const results = [];
            let completedCount = 0;

            // Fetch products with concurrency control (max 3 simultaneous requests)
            const concurrencyLimit = 3;
            for (let i = 0; i < productIds.length; i += concurrencyLimit) {
                const batch = productIds.slice(i, i + concurrencyLimit);
                const batchPromises = batch.map(id => fetchProductWithRetry(id));
                
                const batchResults = await Promise.all(batchPromises);
                results.push(...batchResults);
                
                completedCount += batch.length;
                setLoadingProgress((completedCount / API_CONFIG.productCount) * 100);
            }

            // Process results
            const successfulProducts = results
                .filter(result => result.success)
                .map(result => result.data)
                .sort((a, b) => a.id - b.id); // Sort by ID

            const failedRequests = results.filter(result => !result.success);

            if (successfulProducts.length === 0) {
                throw new Error('No products could be loaded. Please check your connection and try again.');
            }

            setProducts(successfulProducts);

            // Handle partial failures
            if (failedRequests.length > 0) {
                const errorMessage = `Loaded ${successfulProducts.length}/${API_CONFIG.productCount} products. ${failedRequests.length} items unavailable.`;
                setPartialError(errorMessage);
                console.warn('Failed requests:', failedRequests);
            }

        } catch (err) {
            console.error('Critical error fetching products:', err);
            setError(err.message || 'Failed to load products. Please try again.');
            setProducts([]);
        } finally {
            setLoading(false);
            setLoadingProgress(100);
        }
    }, [fetchProductWithRetry]);

    // Retry handler
    const handleRetry = useCallback(() => {
        setRetryAttempt(prev => prev + 1);
        fetchProducts();
    }, [fetchProducts]);

    // Effect to fetch products on mount
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Enhanced Loading Component
    const LoadingComponent = () => (
        <div className="loading-container">
            <div className="loading-spinner-container">
                <div className="loading-spinner"></div>
                <div className="loading-pulse"></div>
            </div>
            <h3 className="loading-title">Loading Products</h3>
            <p className="loading-text">Fetching the best products for you...</p>
            
            <div className="loading-progress-container">
                <div className="loading-progress-track">
                    <div 
                        className="loading-progress-fill" 
                        style={{ width: `${loadingProgress}%` }}
                        aria-label={`Loading progress: ${Math.round(loadingProgress)}%`}
                    ></div>
                </div>
                <span className="loading-percentage">{Math.round(loadingProgress)}%</span>
            </div>

            {loadingProgress > 0 && loadingProgress < 100 && (
                <p className="loading-status">
                    Loading product {Math.ceil((loadingProgress / 100) * API_CONFIG.productCount)} of {API_CONFIG.productCount}
                </p>
            )}
        </div>
    );

    // Enhanced Error Component
    const ErrorComponent = () => (
        <div className="error-container">
            <div className="error-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
            </div>
            <h3 className="error-title">Oops! Something went wrong</h3>
            <p className="error-message">{error}</p>
            
            {retryAttempt < API_CONFIG.maxRetries && (
                <div className="error-actions">
                    <button onClick={handleRetry} className="retry-button primary">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="23 4 23 10 17 10"></polyline>
                            <polyline points="1 20 1 14 7 14"></polyline>
                            <path d="m3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                        </svg>
                        Try Again
                        {retryAttempt > 0 && ` (${retryAttempt}/${API_CONFIG.maxRetries})`}
                    </button>
                </div>
            )}

            <div className="error-tips">
                <h4>Troubleshooting tips:</h4>
                <ul>
                    <li>Check your internet connection</li>
                    <li>Refresh the page</li>
                    <li>Clear your browser cache</li>
                </ul>
            </div>
        </div>
    );

    // Empty State Component
    const EmptyStateComponent = () => (
        <div className="empty-state-container">
            <div className="empty-state-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
            </div>
            <h3 className="empty-state-title">No Products Available</h3>
            <p className="empty-state-message">We couldn't find any products to display right now.</p>
            <button onClick={handleRetry} className="retry-button secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="23 4 23 10 17 10"></polyline>
                    <path d="m3.51 9a9 9 0 0 1 14.85-3.36L23 10"></path>
                </svg>
                Refresh Products
            </button>
        </div>
    );

    // Main render logic
    if (loading) return <LoadingComponent />;
    if (error && products.length === 0) return <ErrorComponent />;
    if (!products.length) return <EmptyStateComponent />;
    
    return (
        <div className="products-main-container">
            {/* Header Section */}
            <div className="products-header">
                <div className="products-header-content">
                    <h1 className="products-title">Our Products</h1>
                    <p className="products-subtitle">
                        Discover our premium collection of {products.length} carefully selected items
                    </p>
                </div>
                <div className="products-actions">
                    <button 
                        onClick={fetchProducts} 
                        className="refresh-button"
                        disabled={loading}
                        aria-label="Refresh products"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="23 4 23 10 17 10"></polyline>
                            <path d="m3.51 9a9 9 0 0 1 14.85-3.36L23 10"></path>
                        </svg>
                        Refresh
                    </button>
                </div>
            </div>

            {/* Partial Error Warning */}
            {partialError && (
                <div className="warning-banner" role="alert">
                    <div className="warning-content">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                            <line x1="12" y1="9" x2="12" y2="13"></line>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                        <span>{partialError}</span>
                    </div>
                    <button 
                        onClick={() => setPartialError(null)}
                        className="warning-close"
                        aria-label="Dismiss warning"
                    >
                        ×
                    </button>
                </div>
            )}

            {/* Products Grid */}
            <div className="products-grid">
                {products.map((product, index) => (
                    <div key={product.id} className="product-card-wrapper">
                        <ProductDetails 
                            product={product}
                            onError={(productId, error) => {
                                console.warn(`Product ${productId} error:`, error);
                            }}
                            priority={index < 4} // Prioritize first 4 products for performance
                        />
                    </div>
                ))}
            </div>

            {/* Footer Info */}
            <div className="products-footer">
                <p className="products-count">
                    Showing {products.length} of {API_CONFIG.productCount} products
                </p>
                {products.length < API_CONFIG.productCount && (
                    <button onClick={handleRetry} className="load-more-button">
                        Try Loading More Products
                    </button>
                )}
            </div>
        </div>
    );
}

export default ProductDetails_global;