"use client"

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
// import Image from "next/image"
import { Bell, ArrowLeft, ChevronRight, ShoppingBag, User, Eye, EyeOff, ChevronDown, Italic } from "lucide-react"
import './profile.css'
import logo from './photo/logo.png'
import person from './photo/person.png'
import { CartContaxt } from '../../contaxt/Contaxt';

import { Link, useNavigate } from 'react-router-dom';



export default function ProfilePage() {
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
   const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("profile")
   const Globalstate=useContext(CartContaxt);
      const state =Globalstate.state;
      const dispatch=Globalstate.dispatch;
      const total=state.reduce((total,item)=>{
          return(total+item.price*item.quantity)
      },0)






   useEffect(() => {
      const token = localStorage.getItem("userToken");
  
      if (!token) {
        console.log("No token found, user is not logged in.");
       
        return;
      }
  
      axios.get("https://api.escuelajs.co/api/v1/auth/profile", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        console.log("User data:", response.data);
        setUser(response.data);
        
      })
      .catch((err) => {
        console.error("Error fetching user data:", err.response?.data || err.message);
       
        
        
      });
    }, []);

  return (

    

  
    <div className="page-container">
      <div className="profile-card">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="logo-container">
            
              
            <img src={logo} className="logo_img"/>
            
            <h1 className="logo-text">Lumora</h1>
          </div>

          <nav className="sidebar-nav">
            <button
              className={`nav-item ${activeTab === "profile" ? "nav-item-active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              <User size={20} />
              <span>Account</span>
              <ChevronRight size={16} className="nav-icon-right" />
            </button>

            <button
              className={`nav-item ${activeTab === "orders" ? "nav-item-active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              <ShoppingBag size={20} />
              <span>Orders</span>
              <ChevronRight size={16} className={`nav-icon-right ${activeTab === "orders" ? "rotate-icon" : ""}`} />
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="header">
            <Link to="/">
            <button className="back-button">
              <ArrowLeft size={18} />
              <span>Back</span>
            </button>
            </Link>
            

            <div className="header-right">
              <div className="notification-container">
                <Bell size={20} />
                <span className="notification-badge">1</span>
              </div>
              <div className="profile-avatar">
              {user && (
    <img
      src={user.avatar || person} // Fallback to default person image
      alt="Profile"
      width={40}
      height={40}
    />
  )}
              </div>
            </div>
          </div>

          {activeTab === "profile" && (
            <div className="tab-content">
              <div className="section-label"><span>Personal Details</span></div>

              <div className="profile-grid">
                {/* Profile Photo Section */}
                <div className="profile-photo-section">
                  <div className="profile-photo">
                  {user && (
    <img
      src={user.avatar || person} // Fallback to default person image
      alt="Profile"
      width={40}
      height={40}
    />
  )}
                  </div>
                  <button className="change-photo-button">Change Photo</button>
                </div>

                {/* Personal Details */}

                
                <div className="details-section">
                  <div className="detail-item">
                    <p className="detail-label">Name</p>
                    {user && (
                  <p className="detail-value">{user.name || "morad"} </p>
                 )}
                    {/* <p className="detail-value">morad</p> */}
                  </div>

                  <div className="detail-item">
                    <p className="detail-label">Gender</p>
                    <p className="detail-value">Male</p>
                  </div>

                  <div className="detail-item">
                    <p className="detail-label">Date of Birth</p>
                    <p className="detail-value">June 28th, 2005</p>
                  </div>

                  <div className="detail-item">
                    <p className="detail-label">Nationality</p>
                    <p className="detail-value">Algerian</p>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="contact-section">
                  <h3 className="section-title">Contact Details</h3>

                  <div className="detail-item">
                    <p className="detail-label">Phone Number</p>
                    <p className="detail-value">0734867656</p>
                  </div>

                  <div className="detail-item">
                    <p className="detail-label">Email</p>
                    
                    {user && (
                  <p className="detail-value">{user.email || "hello@world.com"}</p>
                 )}
                  </div>
                </div>
              </div>

              {/* Address Section */}
              <div className="address-section">
                <div className="section-header">
                  <h3 className="section-title">Address</h3>
                  <button className="add-button">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 5V19M5 12H19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                <div className="address-grid">
                  <div className="address-item">
                    <div className="address-header">
                      <p className="detail-label">Address 1</p>
                      <ChevronDown size={16} />
                    </div>
                  </div>

                  <div className="address-item">
                    <div className="address-header">
                      <p className="detail-label">Address 2</p>
                      <ChevronDown size={16} />
                    </div>
                  </div>

                  <div className="address-details">
                    <div className="detail-item">
                      <p className="detail-label">Address Line</p>
                      <p className="detail-value">No 35 Abdalkader street</p>
                    </div>

                    <div className="city-state-grid">
                      <div className="detail-item">
                        <p className="detail-label">City</p>
                        <p className="detail-value">Constantine</p>
                      </div>

                      <div className="detail-item">
                        <p className="detail-label">State</p>
                        <p className="detail-value">Constantine</p>
                      </div>
                    </div>

                    <div className="detail-item">
                      <p className="detail-label">Country</p>
                      <p className="detail-value">Algeria</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="account-section">
                <div className="section-label">Account Information</div>

                {/* Email Section */}
                <div className="email-section">
                  <h3 className="section-title">Email</h3>
                  <div className="email-grid">
                    <div className="email-item">
                      <p className="detail-label">Current Email</p>
                      <input type="text" value={user?.email} readOnly className="input-readonly" />
                    </div>

                    <div className="email-item">
                      <p className="detail-label">Change email</p>
                      <input type="text" placeholder="Enter new email" className="input" />
                    </div>

                    <button className="apply-button">Apply changes</button>
                  </div>
                </div>

                {/* Password Section */}
                <div className="password-section">
                  <h3 className="section-title">Password</h3>
                  <div className="password-grid">
                    <div className="password-item">
                      <p className="detail-label">Old Password</p>
                      <div className="password-input-container">
                      <input type={showOldPassword ? "text" : "password"} value={user?.password} className="input" />
                        <button className="password-toggle" onClick={() => setShowOldPassword(!showOldPassword)}>
                          {showOldPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <div className="password-item">
                      <p className="detail-label">New Password</p>
                      <div className="password-input-container">
                        <input type={showNewPassword ? "text" : "password"}  className="input" />
                        <button className="password-toggle" onClick={() => setShowNewPassword(!showNewPassword)}>
                          {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <div className="password-item">
                      <p className="detail-label">Confirm Password</p>
                      <div className="password-input-container">
                        <input type={showConfirmPassword ? "text" : "password"}  className="input" />
                        <button
                          className="password-toggle"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="button-container-right">
                    <button className="apply-button">Apply changes</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="tab-content">
              <div className="orders-container">
              <div className="filters-section">
                     <h2 className="filters-title">FILTERS</h2>
                    <div className="filters-options">
                      <button className="filter-option">
                        This month
                      </button>
                      <button className="filter-option">
                        This year
                      </button>
                    </div>
                    <button className="filter-apply-button">Apply</button>
              </div>

                <div className="orders-list">
                  <div className="orders-header">
                    <h3 className="orders-title">You Orders</h3>
                    <span className="orders-subtitle">(All)</span>
                  </div>

                  <div className="order-item">
                    <div className="order-header">
                      <p className="order-number">Order No. 167749-0500, February 27, 2023 12:42 Pm</p>
                      <p className="order-status pending">Pending</p>
                    </div>

                    {/* Order Products */}
                    <div className="order-products">
  {state.map((item, index) => (
    <div className="product-item" key={index}>
      <div className="product-image">
        <img src={item.image} alt={item.title} />
      </div>
      <div className="product-details">
        <p className="product-name">{item.title}</p>
        <p className="product-description">{item.description}</p>
        <p className="product-code">product code: {item.id}</p>
      </div>
      <div className="product-price">
        <p className="product-quantity">{item.quantity} Pcs</p>
        <p className="product-unit-price">${item.price}</p>
        <p className="product-total">Total: ${item.price * item.quantity}</p>
      </div>
    </div>
  ))}
</div>

                    {/* Order Summary */}
                    <div className="order-summary">
                      <p className="delivery-date">Delivery Date: March 22, 2023 12:42 Pm</p>
                      <div className="summary-row">
                        <p>Total</p>
                        <p>${total}</p>
                      </div>
                      <div className="summary-row">
                        <p>Delivery</p>
                        <p>0</p>
                      </div>
                      <div className="summary-row total-row">
                        <p>Total</p>
                        <p>${total}</p>
                      </div>
                    </div>

                    
                  </div>

                  <div className="order-item">
                    <div className="order-header">
                      <p className="order-number">Order No. 167749-0500, February 27, 2023 12:42 Pm</p>
                      <p className="order-status delivered">Delivered</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
