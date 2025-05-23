"use client"
import { useState, useEffect } from "react"
import { IoNotificationsOutline } from "react-icons/io5"
import { CiSearch, CiStar } from "react-icons/ci"
import { FaArrowLeft } from "react-icons/fa"
import Side_bare from "./Side_bare"
import axios from "axios";
import person from './assest/person.png'
import { IoIosSettings } from "react-icons/io";
import ShopDetails from "./shop_details"

const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: "All-Around Safe Block Essence Sun SPF45+",
    description: "All Around Safe Block Sun Milk SPF50+/PA+++",
    price: 25,
    rating: 5,
    reviews: 11,
    image:
      "https://img.freepik.com/photos-gratuite/arrangement-gua-sha-produits-soins_23-2149322589.jpg?semt=ais_hybrid&w=740",
  },
  {
    id: 2,
    name: "Super Aqua Snail Cream",
    description: "Skin Moisturizing Care Type Cream with extra hydration for dry skin types. Long-lasting moisture.",
    price: 25,
    rating: 3,
    reviews: 7,
    image: "https://s.alicdn.com/@sc04/kf/H3be7f2b3f1964e428323d04ef0733ef8y.jpg_720x720q50.jpg",
  },
  {
    id: 3,
    name: "Clarifying Emulsion",
    description: "With Bija Seed Oil",
    price: 25,
    rating: 5,
    reviews: 21,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkwnt6bO_7SPAFNW15_1Xl4TGF9Uv-BEu4tg&s",
  },
  {
    id: 4,
    name: "Hydrating Face Serum",
    description: "Intensive moisture for all skin types",
    price: 32,
    rating: 4,
    reviews: 15,
    image: "https://img.freepik.com/free-photo/skincare-serum-dropper-bottle-beauty-product_53876-129002.jpg",
  },
  {
    id: 5,
    name: "Vitamin C Brightening Mask with Niacinamide",
    description: "Revitalizing sheet mask for radiant skin. Contains 5% Vitamin C and 2% Niacinamide for brightening effects and improved skin texture.",
    price: 6,
    rating: 4,
    reviews: 28,
    image: "https://img.freepik.com/free-photo/flat-lay-natural-self-care-products-composition_23-2148990041.jpg",
  },
  {
    id: 6,
    name: "Ceramide Repair Cream",
    description: "Overnight repair for damaged skin barrier",
    price: 45,
    rating: 5,
    reviews: 42,
    image: "https://img.freepik.com/free-photo/arrangement-natural-skincare-products_23-2149172138.jpg",
  },
  {
    id: 7,
    name: "BHA Liquid Exfoliant",
    description: "Gentle chemical exfoliation for clear pores",
    price: 28,
    rating: 4,
    reviews: 19,
    image: "https://img.freepik.com/free-photo/close-up-beauty-products-recipients_23-2149096347.jpg",
  }
]




export default function Dashboard({ onAddProduct, onManageProduct }) {
  const [products, setProducts] = useState(SAMPLE_PRODUCTS)
  const [searchTerm, setSearchTerm] = useState("")

 
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShopDetails, setShowShopDetails] = useState(false) // New state for controlling visibility

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (!token) {
      console.log("No token found, user is not logged in.");
      setLoading(false);
      return;
    }

    axios.get("https://api.escuelajs.co/api/v1/auth/profile", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      console.log("User data:", response.data);
      setUser(response.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching user data:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to fetch user data");
      setLoading(false);
      
      // Optional: Clear token if it's invalid
      if (err.response?.status === 401) {
        localStorage.removeItem("userToken");
      }
    });
  }, []);


  const toggleShopDetails = () => {
    setShowShopDetails(!showShopDetails);
  }

  return (
    <div className="dashboard">
      {showShopDetails && <ShopDetails onClose={toggleShopDetails} />}
      {/* Sidebar */}
      <Side_bare/>

      {/* Main Content */}
      <div className="main">
     
        <div className="header">
          <div className="left-header">
            <button className="back-btn">
              <span className="icon">
                <FaArrowLeft />
              </span>
              <span className="be">Back</span>
            </button>
          </div>

          <div className="right-header">
            <div className="notification">
              <span className="icon_no">
                <IoNotificationsOutline className="inside" />
              </span>
              <span className="badge">1</span>
            </div>
            <div className="avatar">
              <img src={person} alt="Profile" />
            </div>
          </div>
        </div>

        <div className="below_the_top">
          <button className="shop-btn">Shop</button>
          <div className="search-area">
            <div className="search-box">
              <span className="icon">
                <CiSearch />
              </span>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <IoIosSettings className="seting"  onClick={toggleShopDetails} />
        </div>

        {/* Scrollable Products Container */}
        <div className="products-container">
          <div className="products">
            {filteredProducts.map((product) => (
              <div className="product" key={product.id}>
                <div className="product-img">
                  <img src={product.image || "/placeholder.svg"} alt={product.name} />
                </div>
                
                <div className="product-info">
                  <h3 className="product-title">{product.name}</h3>
                  
                  <div className="rating">
                    {Array(5).fill().map((_, i) => (
                      <CiStar 
                        key={i} 
                        style={{ 
                          color: i < product.rating ? '#ff4081' : '#ddd',
                          fontSize: '16px'
                        }} 
                      />
                    ))}
                    <span>({product.reviews})</span>
                  </div>
                  
                  <p className="description">{product.description}</p>
                  <p className="price">${product.price}</p>
                </div>
                
                <div className="button-container">
                  <button 
                    className="manage-btn" 
                    onClick={() => onManageProduct(product)}
                  >
                    Manage Product
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="add-btn" onClick={onAddProduct}>
          <span className="icon">+</span>
          <span>Add new product</span>
        </button>
      </div>
    </div>
  )
}