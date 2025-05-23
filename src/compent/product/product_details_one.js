"use client"
import { useState } from "react"
import { FiChevronDown, FiChevronUp, FiArrowLeft } from "react-icons/fi"
import { AiOutlineStar, AiFillStar } from "react-icons/ai"
import "./productdetaisl.css"

const ProductDetails = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [expandedSections, setExpandedSections] = useState({
    whatMakesItGood: true,
    ingredients: false,
    howToUse: false,
  })

  // If no product is provided, don't render anything
  if (!product) {
    return <div className="product-not-found">Product not found</div>
  }

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<AiFillStar key={i} className="star filled" />)
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<AiFillStar key={i} className="star half-filled" />)
      } else {
        stars.push(<AiOutlineStar key={i} className="star" />)
      }
    }

    return stars
  }

  return (
    <div className="product-details-container">
      {/* Back button */}
      <div className="back-button-container">
        <button className="back-button">
          <FiArrowLeft /> Back
        </button>
      </div>

      <div className="product-details-content">
        {/* Product Images */}
        <div className="product-images">
          <div className="main-image">
            <img
              src={product.images && product.images.length > 0 ? product.images[selectedImage] : "/placeholder.svg"}
              alt={product.name}
            />
          </div>
          <div className="thumbnail-images">
            {product.images &&
              product.images.slice(0, 5).map((image, index) => (
                <div
                  key={index}
                  className={`thumbnail ${selectedImage === index ? "active" : ""}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image || "/placeholder.svg"} alt={`${product.name} thumbnail ${index + 1}`} />
                </div>
              ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h1 className="product-name">{product.name}</h1>

          {product.rating && (
            <div className="product-rating">
              <div className="stars">{renderStars(product.rating)}</div>
              <span className="review-count">{product.reviewCount} reviews</span>
            </div>
          )}

          {product.price !== undefined && <div className="product-price">${product.price.toFixed(2)}</div>}

          {product.description && <p className="product-description">{product.description}</p>}

          {product.size && <div className="product-size">{product.size}</div>}

          <button className="add-to-cart-button">Add to cart</button>

          {/* Expandable Sections */}
          <div className="expandable-sections">
            {product.whatMakesItGood && (
              <div className="expandable-section">
                <div className="section-header" onClick={() => toggleSection("whatMakesItGood")}>
                  <h3>WHAT MAKES IT GOOD</h3>
                  {expandedSections.whatMakesItGood ? <FiChevronUp /> : <FiChevronDown />}
                </div>

                {expandedSections.whatMakesItGood && (
                  <div className="section-content">
                    <p>{product.whatMakesItGood}</p>
                    {product.keyIngredients && product.keyIngredients.length > 0 && (
                      <>
                        <h4>Key Ingredients</h4>
                        <ul className="key-ingredients">
                          {product.keyIngredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}

            {product.ingredients && (
              <div className="expandable-section">
                <div className="section-header" onClick={() => toggleSection("ingredients")}>
                  <h3>INGREDIENTS</h3>
                  {expandedSections.ingredients ? <FiChevronUp /> : <FiChevronDown />}
                </div>

                {expandedSections.ingredients && (
                  <div className="section-content">
                    <p>{product.ingredients}</p>
                  </div>
                )}
              </div>
            )}

            {product.howToUse && (
              <div className="expandable-section">
                <div className="section-header" onClick={() => toggleSection("howToUse")}>
                  <h3>HOW TO USE</h3>
                  {expandedSections.howToUse ? <FiChevronUp /> : <FiChevronDown />}
                </div>

                {expandedSections.howToUse && (
                  <div className="section-content">
                    <p>{product.howToUse}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h2 className="reviews-title">Read the reviews</h2>
        <button className="write-review-button">Write your review</button>
      </div>
    </div>
  )
}

export default ProductDetails
