"use client"
import { useState, useRef } from "react"
import { FaArrowLeft } from "react-icons/fa"
import { IoNotificationsOutline } from "react-icons/io5"
import { FiPlus } from "react-icons/fi"
import Side_bare from "./Side_bare"
import "./add.css"
import ProductItemForm from "./pop_product"
import { FaChevronRight } from "react-icons/fa";
export default function AddProductForm({ onBack }) {
  const [productData, setProductData] = useState({
    brand: "",
    name: "",
    description: "",
    category: "",
    ingredients: "",
    howToUse: "",
    productItem1: "",
    productItem2: "",
    productItem3: "",
    image: ""
  })

  // State to control which product item popup is shown
  const [showPopup, setShowPopup] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)

  const fileInputRef = useRef(null)
  const [imagePreview, setImagePreview] = useState("")

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
    const file = e.target.files[0]
    if (!file) return

    const imageUrl = URL.createObjectURL(file)
    setImagePreview(imageUrl)
    setProductData(prev => ({
      ...prev,
      image: file
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Saving product:", productData)
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
                <h3>Product Item {currentItem}</h3>
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

        <form onSubmit={handleSubmit} className="form">
          <h2 className="form-title">Add New Product</h2>
          
          <div className="form-layout">
            {/* Left Section */}
            <div className="left-section">
              <div className="form-group">
                <span className='span_input_add_product'>Brand</span>
                <input
                  type="text"
                  name="brand"
                  value={productData.brand}
                  onChange={handleChange}
                  className="input"
                  placeholder="Brand"
                />
              </div>
              
              <div className="form-group">
                <span className='span_input_add_product'>Name</span>
                <input
                  type="text"
                  name="name"
                  value={productData.name}
                  onChange={handleChange}
                  className="input"
                  placeholder="Super Aqua Snail Cream"
                />
              </div>
              
              <div className="form-group">
                <span className='span_input_add_product'>Description</span>
                <textarea
                  name="description"
                  value={productData.description}
                  onChange={handleChange}
                  className="textarea"
                  placeholder="Skin Reinforcement Gel Type Cream"
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
                <textarea
                  name="ingredients"
                  value={productData.ingredients}
                  onChange={handleChange}
                  className="textarea"
                  placeholder="Ingredients"
                  style={{ minHeight: "80px" }}
                />
              </div>
              
              <div className="form-group">
                <span className='span_input_add_product'>How to use</span>
                <textarea
                  name="howToUse"
                  value={productData.howToUse}
                  onChange={handleChange}
                  className="textarea"
                  placeholder="How to use"
                  style={{ minHeight: "80px" }}
                />
              </div>
            </div>
            
            {/* Right Section */}
            <div className="right-section">
              <div className="image-section">
                <h3>Product Image</h3>
                <p className="note">Note: Format photos SVG, PNG, or JPG (Max size 4MB)</p>
                
                <div className="upload-container">
                  <div 
                    className="upload-box" 
                    onClick={handleImageClick}
                    style={{ height: "200px", margin: "20px 0" }}
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Product preview"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{ textAlign: "center" }}>
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
                  <FaChevronRight className="right_pop"/>
                </div>

                <div className="section_from_input">
                  <button 
                    type="button"
                    className="span_input_add_product product-item-button" 
                    onClick={() => handleProductItemClick(2)}
                  >
                    Product item 2
                  </button>
                  <FaChevronRight className="right_pop"/>
                </div>

                <div className="section_from_input">
                  <button 
                    type="button"
                    className="span_input_add_product product-item-button" 
                    onClick={() => handleProductItemClick(3)}
                  >
                    Product item 3
                  </button>
                  <FaChevronRight className="right_pop"/>
                </div>

                <div className="button-group">
                  <button type="button" className="discard-btn" onClick={onBack}>
                    Discard Changes
                  </button>
                  <button type="submit" className="save-btn-man">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}