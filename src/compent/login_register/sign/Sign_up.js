import React, { useState } from 'react';
import './sign.css';
import mainProduct from '../assets/main_product.png';
import vector from '../assets/Vector.png';
import background from '../assets/backround.jpg';

import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import validationSign from '../assets/validation_sign';
import { Link } from 'react-router-dom';
import logo from '../assets/logo_black.png'
const Sign_up = () => {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [vender, setVender] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = () => {
    setAgreeTerms(!agreeTerms);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validationSign(data);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form Submitted Successfully!", data);
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
        <div className="right_sign">
          <div className="top_right">
            <h2>Welcome,</h2>
            <Link to="/" className='back'><a><FaArrowLeft className='left_icon' />Back</a></Link>
          </div>
          <div className="form_input">
            <div className="categori">
              <button className={!vender ? 'act' : "btn_state"} onClick={() => setVender(false)}>Customer</button> 
              <button className={vender ? 'act' : "btn_state"} onClick={() => setVender(true)}>Vendor</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className='full_name'>
                <div className="input-container name">
                  <input 
                    type="text" 
                    name="firstName"
                    placeholder=" "
                    value={data.firstName}
                    onChange={handleChange}
                  />
                  <label>First name</label>
                  {errors.firstName && <span className="error-message" >{errors.firstName}</span>}
                </div>
                <div className="input-container name">
                  <input 
                    type="text" 
                    name="lastName"
                    placeholder=" "
                    value={data.lastName}
                    onChange={handleChange}
                  />
                  <label>Last name</label>
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
              </div>
              
              <div className="input-container">
                <input 
                  type="email" 
                  name="email"
                  placeholder=" "
                  value={data.email}
                  onChange={handleChange}
                />
                <label>Email</label>
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              <div className="input-container">
                <input 
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder=" "
                  value={data.password}
                  onChange={handleChange}
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
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>
              <div className="input-container">
                <input 
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder=" "
                  value={data.confirmPassword}
                  onChange={handleChange}
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
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>

              {errors.general && <p className="error-message" style={{ textAlign: 'center' }}>{errors.general}</p>}

              <div className="checkbox-container">
                <input 
                  type="checkbox" 
                  id="terms" 
                  checked={agreeTerms} 
                  onChange={handleCheckboxChange} 
                  className="checkbox" 
                />
                <label htmlFor="terms" className="label">
                  I agree to the <span className="bold">terms and conditions</span>
                </label>
              </div>

              <button type="submit" className="btn" disabled={!agreeTerms}>
                SIGN UP
              </button>

              <div className="divider">
                <span>OR</span>
              </div>
              <Link to="/login"><button type="button" className="btn2">LOGIN</button></Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sign_up;