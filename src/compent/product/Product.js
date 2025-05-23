import React, { useState, useContext } from "react";
import "./product.css";
import { Link } from "react-router-dom";
import { CartContext_reda } from "../context_reda/cart_contect";

const Product = ({ product, showbutton = true }) => {
  const { cartitems, addtocart } = useContext(CartContext_reda);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const Isincart = cartitems.some(i => i.id === product.id);
  
  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = () => {
    if (!Isincart) {
      addtocart(product);
    }
  };

  // Render star rating
  const renderStars = (rating) => {
    if (!rating) return null;
    
    return (
      <div className="stars">
        {[1, 2, 3, 4, 5].map(star => (
          <span key={star} className="star">
            {star <= Math.floor(rating) ? '★' : '☆'}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className={`prodcut ${Isincart ? 'in-cart' : ''}`}>
      <div className="icons">
        <i 
          className={`bx ${isWishlisted ? 'bxs-heart' : 'bx-heart'}`}
          onClick={handleWishlist}
          title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        ></i>
      </div>
      
      <div className="ima_product">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x280/f8f9fa/666?text=No+Image';
          }}
        />
        <Link to={`/product/${product.id}`} className="show-more">
          Show More
        </Link>
      </div>

      <h4 className="name_product" title={product.name}>
        {product.name}
      </h4>
      
      {product.rating && renderStars(product.rating)}

      <div className="product-info">
        {product.brand && (
          <p className="brand">{product.brand}</p>
        )}
        {product.about && (
          <p className="about" title={product.about}>
            {product.about}
          </p>
        )}
      </div>

      <div className="price">
        <span>${product.price || 'N/A'}</span>
      </div>

      {/* <div className="product-details">
        {product.ingredients && (
          <p className="ingredients" title={product.ingredients}>
            <strong>Ingredients:</strong> {product.ingredients}
          </p>
        )}
        {product.howToUse && (
          <p className="how-to-use" title={product.howToUse}>
            <strong>How to use:</strong> {product.howToUse}
          </p>
        )}
      </div> */}

      {showbutton && (
        <div className="btn_add_to_cart">
          <button 
            onClick={handleAddToCart}
            disabled={Isincart}
            title={Isincart ? 'Already in cart' : 'Add to cart'}
          >
            {Isincart ? 'Added to Cart' : 'Add to Cart'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Product;