import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './productdetails.css';

function ProductDetails() {
  const API_URL = "https://fakestoreapi.com/products";
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [expandedSections, setExpandedSections] = useState({
    description: true,
    details: false,
    shipping: false
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/${params.productId}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Product not found');
        }
        return res.json();
      })
      .then(product => {
        setProduct(product);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        setLoading(false);
      });
  }, [params.productId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Create placeholder images for thumbnails
  const thumbnailImages = [
    product.image,
    // Add placeholder images if you want more thumbnails
  ];

  if (loading) {
    return (
      <div className="product-details-container">
        <div className="loading">Loading product details...</div>
      </div>
    );
  }

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="star">★</span>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} className="star">½</span>);
      } else {
        stars.push(<span key={i} className="star">☆</span>);
      }
    }

    return stars;
  };

  return (
    <div className="product-details-container">
      <div className="back-button-container">
        <button className="back-button" onClick={handleGoBack}>
          ← Back to Products
        </button>
      </div>

      <div className="product-details-content">
        <div className="product-images">
          <div className="main-image">
            <img src={product.image} alt={product.title} />
          </div>
          
          {thumbnailImages.length > 1 && (
            <div className="thumbnail-images">
              {thumbnailImages.map((image, index) => (
                <div 
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="product-info">
          <h1 className="product-name">{product.title}</h1>
          
          {product.rating && (
            <div className="product-rating">
              <div className="stars">
                {renderStars(product.rating.rate)}
              </div>
              <span className="review-count">{product.rating.count} reviews</span>
            </div>
          )}

          <div className="product-price">${product.price}</div>
          
          <div className="product-description">
            {product.description}
          </div>
          
          {product.category && (
            <div className="product-size">
              <strong>Category:</strong> {product.category}
            </div>
          )}

          <button className="add-to-cart-button">Add to Cart</button>

          <div className="expandable-sections">
            <div className="expandable-section">
              <div className="section-header" onClick={() => toggleSection('description')}>
                <h3>Description</h3>
                <span>{expandedSections.description ? '−' : '+'}</span>
              </div>
              {expandedSections.description && (
                <div className="section-content">
                  {product.description}
                </div>
              )}
            </div>

            <div className="expandable-section">
              <div className="section-header" onClick={() => toggleSection('details')}>
                <h3>Product Details</h3>
                <span>{expandedSections.details ? '−' : '+'}</span>
              </div>
              {expandedSections.details && (
                <div className="section-content">
                  <ul className="key-ingredients">
                    <li>Category: {product.category}</li>
                    <li>ID: {product.id}</li>
                    {product.rating && <li>Rating: {product.rating.rate} out of 5</li>}
                  </ul>
                </div>
              )}
            </div>

            <div className="expandable-section">
              <div className="section-header" onClick={() => toggleSection('shipping')}>
                <h3>Shipping & Returns</h3>
                <span>{expandedSections.shipping ? '−' : '+'}</span>
              </div>
              {expandedSections.shipping && (
                <div className="section-content">
                  <p>Standard shipping: 3-5 business days</p>
                  <p>Express shipping: 1-2 business days</p>
                  <p>30-day return policy for unused items</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="reviews-section">
        <h2 className="reviews-title">Customer Reviews</h2>
        <button className="write-review-button">Write a Review</button>
      </div>
    </div>
  );
}

export default ProductDetails;