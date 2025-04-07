import React, { useState, useEffect } from 'react';

import mainProduct from '../assets/main_product.png';
import vector from '../assets/Vector.png';
import background from '../assets/backround.jpg';
// Fix the import path to match your file structure
import New_pasword_validation from '../assets/New_pasword_validation';
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import validationSign from '../assets/validation_sign';
import { Link } from 'react-router-dom';
import logo from '../assets/logo_black.png';
import { RiErrorWarningLine } from "react-icons/ri";
import './final_confirme.css';
import { GiConfirmed } from "react-icons/gi";

const  Final_conferme= () => {
  



 




  
  return (
    <div className="background-container" style={{ backgroundImage: `url(${background})` }}>
      <div className="content">
        <div className="left">
          <div className="top_left">
            <div className="logo">
              <img src={logo} alt="Logo" />
              <h6>Lumora</h6>
              <p>COSMETICS</p>
            </div>
            <div className="title">
              <h2>Lumora</h2>
              <h4>All in one</h4>
            </div>
          </div>
        </div>
        <div className="main_img">
          <img src={mainProduct} alt="Main Product" />
        </div>
        <div className="right_sign final_right">
          <div className="top_right">
            <h2>Welcome,</h2>
            <Link to="/" className='back'><FaArrowLeft className='left_icon' />Back</Link>
          </div>
          <div className="form_input">
            <h2>RECOVER PASSWORD</h2>
            
            {/* Error message box - will show when Errorvisible is true */}
            
                <div className='.'>
                <GiConfirmed/>
                <span>The password was successfully changed</span>
                </div>
            
            
                
              

              <button 
                type="submit" 
                className="btn"
                style={{ 
                  marginTop: '20px',
                  padding: '10px',
                  width: '100%',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Home
              </button>
           
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Final_conferme;