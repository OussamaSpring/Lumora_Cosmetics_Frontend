"use client"
import { useState, useEffect, useRef } from "react"
import { FaArrowLeft } from "react-icons/fa"
import { IoNotificationsOutline } from "react-icons/io5"
import Side_bare from "./Side_bare"
import "./manage.css"
import axios from "axios"
import { FiPlus } from "react-icons/fi"
import ProductItemForm from "./pop_product"
import { FaChevronRight } from "react-icons/fa";
export default function ManageProductForm({ product, onBack }) {
  const [productData, setProductData] = useState({
    brand: "",
    name: "",
    description: "",
    category: "",
    price: "",
    quantity: "",
    status: "active",
    image: "",
    ingredients: "",
    howToUse: ""
  })

  // State to control which product item popup is shown
  const [showPopup, setShowPopup] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)

  const fileInputRef = useRef(null)
  const [thumbnails, setThumbnails] = useState([])
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    if (product) {
      setProductData({
        brand: product.brand || "",
        name: product.name || "",
        description: product.description || "",
        category: product.category || "",
        price: product.price?.toString() || "",
        quantity: product.quantity?.toString() || "",
        status: product.status || "active",
        image: product.image || "",
        ingredients: product.ingredients || "",
        howToUse: product.howToUse || ""
      })

      if (product.images) {
        setThumbnails(product.images)
      }
    }
  }, [product])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageClick = () => {
    fileInputRef.current.click()
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    const newThumbnails = [...thumbnails]
    files.forEach(file => {
      const imageUrl = URL.createObjectURL(file)
      newThumbnails.push(imageUrl)
    })

    setThumbnails(newThumbnails)
    if (!productData.image) {
      setProductData(prev => ({
        ...prev,
        image: newThumbnails[0]
      }))
    }
  }

  const selectThumbnail = (index) => {
    setSelectedImage(index)
    setProductData(prev => ({
      ...prev,
      image: thumbnails[index]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Updating product:", productData)
    onBack()
  }

  const handleDiscard = () => {
    console.log("Changes discarded")
    onBack()
  }

  // Handler for product item click
  const handleProductItemClick = (itemNumber) => {
    setCurrentItem(itemNumber)
    setShowPopup(true)
  }
  
  // Handler to close popup
  const closePopup = () => {
    setShowPopup(false)
  }

  // Handler to save product item data from popup
  const saveProductItemData = (data) => {
    // This function would receive and process data from the product item form
    console.log(`Saving data for Product Item ${currentItem}:`, data)
    setShowPopup(false)
  }

  return (
    <div className="dashboard">
      <Side_bare />

      <div className="main">
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-container">
              <div className="popup-header">
                <h3>Product Item 1</h3>
                <button className="close-btn" onClick={closePopup}>×</button>
              </div>
              <ProductItemForm 
                onSave={saveProductItemData} 
                onCancel={closePopup}
                itemNumber={currentItem}
              />
            </div>
          </div>
        )}

        <div className="header">
          <button className="back-btn" onClick={onBack}>
              <span className="icon">
                <FaArrowLeft />
              </span>
            <span className="be">Back</span>
          </button>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="notification">
              <div className="notification-icon">
                <IoNotificationsOutline />
              </div>
              <span className="badge">1</span>
            </div>
            <div className="avatar">
              <img src="/api/placeholder/35/35" alt="Profile" />
            </div>
          </div>
        </div>

        <div className="form-container">
          <h2 className="form-title">Manage Product</h2>
          
          <div className="form-layout">
            {/* Left Section - Product Details */}
            <div className="left-section">
              <div className="form-group">
                <span className='span_input_add_product'>Brand</span>
                <input
                  type="text"
                  name="brand"
                  value={productData.brand}
                  onChange={handleChange}
                  className="input"
                  placeholder="Enter brand name"
                />
              </div>

              <div className="form-group">
                <span className='span_input_add_product'>Product Name</span>
                <input
                  type="text"
                  name="name"
                  value={productData.name}
                  onChange={handleChange}
                  className="input"
                  placeholder="Enter product name"
                />
              </div>

              <div className="form-group">
                <span className='span_input_add_product'>Description</span>
                <textarea
                  name="description"
                  value={productData.description}
                  onChange={handleChange}
                  className="textarea"
                  placeholder="Enter product description"
                />
              </div>

              <div className="form-group">
                <span className='span_input_add_product'>Category</span>
                <select
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                  className="select"
                >
                  <option value="all">All</option>
                  <option value="skincare">Skincare</option>
                  <option value="makeup">Makeup</option>
                  <option value="haircare">Haircare</option>
                </select>
              </div>
              
              <div className="form-group">
                <span className='span_input_add_product'>Ingredients</span>
                <input
                  type="text"
                  name="ingredients"
                  value={productData.ingredients}
                  onChange={handleChange}
                  className="input"
                  placeholder="Enter ingredients"
                />
              </div>
              
              <div className="form-group">
                <span className='span_input_add_product'>How to use?</span>
                <input
                  type="text"
                  name="howToUse"
                  value={productData.howToUse}
                  onChange={handleChange}
                  className="input"
                  placeholder="Enter usage instructions"
                />
              </div>
            </div>

            {/* Right Section - Image Upload & Product Items */}
            <div className="right-section">
              <div className="image-section">
                <h3>Image Product</h3>
                <p className="note">Note: Format photos SVG, PNG, or JPG (Max size 4MB)</p>
                
                <div className="upload-container">
                  <div 
                    className="product-image-container" 
                    onClick={handleImageClick}
                  >
                    {productData.image ? (
                      <img
                        src={productData.image}
                        alt={productData.name}
                        className="product-image"
                      />
                    ) : (
                      <div className="upload-placeholder">
                        <div className="upload-icon">
                          <FiPlus size={24} />
                        </div>
                        <div className="upload-text">Upload Image</div>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    accept="image/*"
                    multiple
                  />
                </div>
              </div>

              <div className="input_right_information">
                <div className="section_from_input">
                  <button 
                    type="button"
                    className="span_input_add_product product-item-button" 
                    onClick={() => handleProductItemClick(1)}
                  >
                    Product item 1
                  </button>
                  <FaChevronRight className='right_pop'/>


                </div>

                <div className="section_from_input">
                  <button 
                    type="button"
                    className="span_input_add_product product-item-button" 
                    onClick={() => handleProductItemClick(2)}
                  >
                    Product item 2
                  </button>
                  <FaChevronRight className='right_pop'/>
                </div>

                <div className="section_from_input">
                  <button 
                    type="button"
                    className="span_input_add_product product-item-button" 
                    onClick={() => handleProductItemClick(3)}
                  >
                    Product item 3
                  </button>
                  <FaChevronRight className='right_pop'/>
                </div>

                <div className="button-group">
                  <button type="button" className="discard-btn" onClick={handleDiscard}>
                    Discard Changes
                  </button>
                  <button type="submit" className="save-btn-man" onClick={handleSubmit}>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}