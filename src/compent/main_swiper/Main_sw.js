import React from 'react';
import './main_sw.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import product1 from './image_swiper/product1.jpg';
import product2 from './image_swiper/product2.jpg';
import product3 from './image_swiper/product3.jpg';

export default function Main_sw() {
  return (
    <div className='hero-swiper-container'>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        centeredSlides={false}
        autoplay={{ 
          delay: 5000, 
          disableOnInteraction: false 
        }}
        pagination={{ 
          clickable: true,
          dynamicBullets: true
        }}
        modules={[Pagination, Autoplay]}
        className="hero-swiper"
      >
        <SwiperSlide>
          <div className="hero-slide-content">
            <img 
              src={product1}
              alt="Product 1" 
              className='hero-img'
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="hero-slide-content">
            <img 
              src={product2} 
              alt="Product 2" 
              className='hero-img'
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="hero-slide-content">
            <img 
              src={product3}
              alt="Product 3" 
              className='hero-img'
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}