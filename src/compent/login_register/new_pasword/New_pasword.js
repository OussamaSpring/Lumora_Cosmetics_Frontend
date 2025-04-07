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
import './new_paword.css';

const New_pasword_home = () => {
  const [data_password, setdata_password] = useState({
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [vender, setVender] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [Errorvisible, setErrorvisible] = useState(false);

  // Update Errorvisible whenever errors change
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setErrorvisible(true);
    } else {
      setErrorvisible(false);
    }
  }, [errors]);

  const handleChange = (e) => {
    setdata_password({ ...data_password, [e.target.name]: e.target.value });
    // Clear error message when user starts typing again
    if (errors[e.target.name]) {
      const updatedErrors = { ...errors };
      delete updatedErrors[e.target.name];
      setErrors(updatedErrors);
      
      // Only hide the error banner if all errors are cleared
      if (Object.keys(updatedErrors).length === 0) {
        setErrorvisible(false);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = New_pasword_validation(data_password);
    setErrors(validationErrors);

    // This will trigger the useEffect to show the error message
    // if there are validation errors
    
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form Submitted Successfully!", data_password);
      setErrorvisible(false);
    } else {
      console.log("Form has errors:", validationErrors);
      setErrorvisible(true);
    }
  };
  
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
        <div className="right_sign right_new">
          <div className="top_right">
            <h2>Welcome,</h2>
            <Link to="/" className='back'><FaArrowLeft className='left_icon' />Back</Link>
          </div>
          <div className="form_input">
            <h2>RECOVER PASSWORD</h2>
            
            {/* Error message box - will show when Errorvisible is true */}
            {Errorvisible && (
              <div className='wrong' style={{ 
                display: 'flex', 
                alignItems: 'center', 
                backgroundColor: '#ffebee', 
                color: '#d32f2f', 
                padding: '10px', 
                borderRadius: '4px', 
                marginBottom: '2.0px'
              }}>
                <RiErrorWarningLine className='wrong_icon' style={{ marginRight: '10px' }}/>
                <p className='wrong_title' style={{ margin: 0 }}>
                  {Object.values(errors).length > 0 
                    ? Object.values(errors)[0] // Display the first error message
                    : "Please correct the errors below."}
                </p>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <input 
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder=" "
                  value={data_password.password}
                  onChange={handleChange}
                  style={{ borderColor: errors.password ? '#d32f2f' : '' }}
                />
                <label>Password</label>
                <div 
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    zIndex: 10
                  }}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
               
              </div>
              <div className="input-container">
                <input 
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder=" "
                  value={data_password.confirmPassword}
                  onChange={handleChange}
                  style={{ borderColor: errors.confirmPassword ? '#d32f2f' : '' }}
                />
                <label>Confirm your password</label>
                <div 
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    zIndex: 10
                  }}
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
               
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
                RECOVER
              </button>
            </form>
            <p className='confrirme'>Remember your password? <span>Back to Log in</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New_pasword_home;