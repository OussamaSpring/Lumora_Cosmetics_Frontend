import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import './forget.css';
import mainProduct from '../assets/main_product.png';
import background from '../assets/backround.jpg';
import logo from '../assets/logo_black.png';

export default function Forget() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }else{
      navigate('/mesage_send');
    }

  //   try {
  //     const response = await axios.post("https://{host}/api/Authentication/v2/SecureForgotPassword?", {
  //       EmailAddress: email,
  //     });

  //     console.log(response.data.Message);
  //     navigate('/'); // Change to your actual reset page
  //   } catch (err) {
  //     console.error(err.response?.data?.Message || "Error sending reset email");
  //     setError(err.response?.data?.Message || "Error sending reset email. Please try again.");
  //   }
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
        <div className="right">
          <div className="top_right">
            <h2>Welcome,</h2>
            <Link to="/" className='back'><FaArrowLeft className='left_icon' /> Back</Link>
          </div>
          <div className="form_input input_forget">
            <h1>RECOVER PASSWORD</h1>
            <span>Please enter your email</span>
            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="email">Email</label>
              </div>
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="btn2">RECOVER</button>
            </form>
            <h6>Remember your password? <Link to='/login'><span>Back to Log in</span></Link></h6>
          </div>
        </div>
      </div>
    </div>
  );
}