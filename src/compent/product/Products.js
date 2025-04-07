import React, { useContext, useEffect, useState } from 'react';
import Product from './Product';
import './products.css';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// Import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { CartContaxt } from '../../contaxt/Contaxt';

function Products() {
    const api_url = "https://fakestoreapi.com/products";
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');

    const getProducts = () => {
        fetch(api_url)
            .then((res) => res.json())
            .then((data) => setProducts(data));
    };

    const getCategories = () => {
        fetch(`${api_url}/categories`)
            .then((res) => res.json())
            .then((data) => setCategories(data));
    };

    const filterProductsByCategory = (category) => {
        setSelectedCategory(category);
        if (category === 'all') {
            getProducts();
        } else {
            fetch(`${api_url}/category/${category}`)
                .then((res) => res.json())
                .then((data) => setProducts(data));
        }
    };

    useEffect(() => {
        getProducts();
        getCategories();
    }, []);

    const Globalstate = useContext(CartContaxt);
    console.log(Globalstate);
    
    return (
        <div className="products-container">
            <div className="categories-section">
                <button 
                    className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                    onClick={() => filterProductsByCategory('all')}
                >
                    All Products
                </button>
                {categories.map((cat, index) => (
                    <button 
                        key={index} 
                        className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                        onClick={() => filterProductsByCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="products-slider-container">
                {/* Add navigation elements before and after Swiper */}
                <div className="swiper-button-prev product-nav-prev"></div>
                <Swiper
                    slidesPerView={5}
                    spaceBetween={15}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={{
                        nextEl: '.product-nav-next',
                        prevEl: '.product-nav-prev',
                    }}
                    modules={[Pagination, Navigation]}
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
                    className="product-swiper"
                >
                    {products.map((product) => (
                        <SwiperSlide key={product.id}>
                            <Product product={product} showbutton={true} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="swiper-button-next product-nav-next"></div>
            </div>
        </div>
    );
}

export default Products;