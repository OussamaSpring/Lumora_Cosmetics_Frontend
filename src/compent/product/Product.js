// Product.js - Updated
import React, { useContext } from "react";
import "./product.css";
import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import { CartContaxt } from "../../contaxt/Contaxt";
// import React, { useContext, useEffect, useState } from 'react';
 

const Product = ({ product, showbutton }) => {
  const Globalstate = useContext(CartContaxt);
  const dispatch = Globalstate.dispatch;
  product.quantity = 1;

  return (
    <div className="prodcut">
      <div className="icons">
        <i className='bx bxs-heart'></i>
      </div>
      
      <div className="ima_product">
        <img src={product.image} alt={product.name} />
        {showbutton && (
          <Link to={`/product/${product.id}`} className="show-more">
            Show More
          </Link>
        )}
      </div>

      <h4 className="name_product">{product.title}</h4>
      
      <div className="stars">
        <i className='bx bx-star'></i>
        <i className='bx bx-star'></i>
        <i className='bx bx-star'></i>
        <i className='bx bx-star'></i>
        <i className='bx bx-star'></i>
        <span className="rating">(0)</span>
      </div>

      <p className="categori">{product.category}</p>
      
      <div className="price">
        <p><span>{product.price}$</span></p>
      </div>

      <div className="btn_add_to_cart">
        
        <button onClick={() => dispatch({ type: 'ADD', payload: product })}>
        Add to cart

        </button>
      </div>
    </div>
  );
};

export default Product;