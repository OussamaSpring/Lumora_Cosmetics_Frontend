import React, { useContext, useEffect, useState } from 'react';
import Product from './Product';
import './products.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import line from '../man_women_child/photo/Line 1.png';
import { Navigation } from 'swiper/modules';
import axios from 'axios';

function Products() {
    const api_url = "http://lumora.runasp.net/api/products";
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productPromises = [];
                
                // Create array of promises for products 1-10
                for(let id = 1; id <= 10; id++) {
                    const promise = axios.get(`${api_url}/${id}`, {
                        timeout: 5000,
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    });
                    productPromises.push(promise);
                }

                // Wait for all promises to resolve
                const responses = await Promise.all(productPromises);
                const productData = responses.map(response => response.data);
                setProducts(productData);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Failed to fetch products');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!products.length) return <div>No products found</div>;

    return (
        <div className="a-products-container">
            <div className="a-title">
                <img className="a-ligne" src={line} alt="decorative line" />
                <h3>New Arrivals</h3>
                <img className="a-ligne" src={line} alt="decorative line" />
            </div>

            <div className="a-products-slider-container">
                <Swiper
                    slidesPerView={5}
                    spaceBetween={15}
                    navigation={true}
                    modules={[Navigation]}
                    breakpoints={{
                        300: {
                            slidesPerView: 2,
                            spaceBetween: 8
                        },
                        640: {
                            slidesPerView: 3,
                            spaceBetween: 8
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 8
                        }
                    }}
                    className="a-product-swiper"
                >
                    {products.map((product) => (
                        <SwiperSlide key={product.id}>
                            <Product 
                                product={{
                                    id: product.id,
                                    name: product.name,
                                    brand: product.brand,
                                    about: product.about,
                                    imageUrl: product.imageUrl,
                                    ingredients: product.ingredients,
                                    howToUse: product.howToUse,
                                    price: product.price || '200$'
                                }} 
                                showbutton={true} 
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default Products;