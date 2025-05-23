"use client"

import React from "react"
import "./shop_datails.css"
// import sagaLogo from "./assets/saga-logo.png" // You'll need to add your own logo
import { IoCloseSharp } from "react-icons/io5";
import logo from './assest/Logo-Saga 1.png';
const ShopDetails = ({ onClose }) => {
  return (
    <div className="shop-details-container">
      <div className="shop-details-header">
        <div className="header-pill">Shop Details</div>

        <IoCloseSharp className="close" onClick={onClose} />


      </div>

      <div className="shop-details-section">
        <div className="section-header">
          <div className="section-pill">Information</div>
          <div className="logo-pill">Logo</div>
        </div>

        <div className="information-content">
          <div className="information-fields">
            <div className="field">
              <div className="field-label">Shop Name</div>
              <div className="field-value">Saga cosmetic</div>
            </div>

            <div className="field">
              <div className="field-label">Vendor Name</div>
              <div className="field-value">Jane Cooper</div>
            </div>

            <div className="field">
              <div className="field-label">description</div>
              <div className="field-value description-text">
                Saga cosmetic is a modern shop for skincare, makeup, and wellness. 
                It offers quality products in a stylish, welcoming space.
              </div>
            </div>
          </div>

          <div className="logo-container">
            <img src={logo} alt="Saga Cosmetics Logo" className="shop-logo" />
          </div>
        </div>
      </div>

      <div className="shop-details-section">
        <div className="section-header">
          <div className="section-pill">Map Address</div>
          <div className="section-pill real-address">Real Address</div>
        </div>

        <div className="address-content">
          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d-73.9857!3d40.7484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM40zMCcwNS4yIk4gNzPCsDU5JzA4LjUiVw!5e0!3m2!1sen!2sus!4v1619457529752!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
              title="Shop Location"
            ></iframe>
          </div>

          <div className="address-details">
            <div className="field">
              <div className="field-label">description</div>
              <div className="field-value">
                New town AUM near the old Ritape Mall opposite the El Faro Supermarket
              </div>
            </div>

            <div className="field">
              <div className="field-label">Plus Code (Google Map)</div>
              <div className="field-value">7H9H+QX3, El Kincaid</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopDetails
