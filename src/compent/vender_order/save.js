"use client"
import { useState, useEffect, useRef } from "react"
import { FaArrowLeft } from "react-icons/fa"
import { IoNotificationsOutline } from "react-icons/io5"
import Side_bare from "./Side_bare"
import "./manage.css"
import axios from "axios"

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
  })

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

  return (
    <div className="dashboard">
      <Side_bare />

      <div className="main">
        <div className="header">
          <button className="back-btn" onClick={onBack}>
            <FaArrowLeft style={{ marginRight: "8px" }} /> 
            <span className="span_input_add_product">Back</span>
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
          <h2 className="form-title">Manage Product</h2>
          
          <div className="form-layout">
            {/* Image Section */}
            <div className="image-section">
              <div 
                className="upload-box"
                onClick={handleImageClick}
              >
                {productData.image ? (
                  <img
                    src={productData.image}
                    alt={productData.name}
                    className="product-image"
                  />
                ) : (
                  <div className="upload-text">
                    <div className="upload-icon">
                      <img src="/api/placeholder/24/24" alt="Upload" />
                    </div>
                    <div>Upload Product Image</div>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                  accept="image/*"
                  multiple
                />
              </div>

              <div className="thumbnail-container">
                {thumbnails.map((thumb, index) => (
                  <button 
                    key={index} 
                    type="button" 
                    className={`thumbnail-btn ${selectedImage === index ? 'selected-thumbnail' : ''}`}
                    onClick={() => selectThumbnail(index)}
                  >
                    <img 
                      src={thumb} 
                      alt={`Thumbnail ${index+1}`} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Details Section */}
            <div className="details-section">
              <div className="form-group">
                <span className="span_input_add_product">Brand</span>
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
                <span className="span_input_add_product">Product Name</span>
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
                <span className="span_input_add_product">Description</span>
                <textarea
                  name="description"
                  value={productData.description}
                  onChange={handleChange}
                  className="textarea"
                  placeholder="Enter product description"
                />
              </div>

              <div className="form-row">
                <div className="form-group" style={{ flex: 1 }}>
                  <span className="span_input_add_product">Category</span>
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

                <div className="form-group" style={{ flex: 1 }}>
                  <span className="span_input_add_product">Price</span>
                  <input
                    type="number"
                    name="price"
                    value={productData.price}
                    onChange={handleChange}
                    className="input"
                    placeholder="Enter price"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group" style={{ flex: 1 }}>
                  <span className="span_input_add_product">Quantity</span>
                  <input
                    type="number"
                    name="quantity"
                    value={productData.quantity}
                    onChange={handleChange}
                    className="input"
                    placeholder="Enter quantity"
                  />
                </div>

                <div className="form-group" style={{ flex: 1 }}>
                  <span className="span_input_add_product">Status</span>
                  <select
                    name="status"
                    value={productData.status}
                    onChange={handleChange}
                    className="select"
                  >
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="button-group">
                <button
                  type="button"
                  className="discard-btn"
                  onClick={onBack}
                >
                  Discard Changes
                </button>
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}