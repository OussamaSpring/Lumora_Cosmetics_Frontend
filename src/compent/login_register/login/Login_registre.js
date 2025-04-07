import React, { useState } from 'react';
import axios from "axios";
import "./login_register.css";
import mainProduct from '../assets/main_product.png';
import vector from '../assets/Vector.png';
import background from '../assets/backround.jpg';
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import wrong from '../assets/errors.png';
import { RiErrorWarningLine } from "react-icons/ri";
import logo from '../assets/logo_black.png'

const Login = ({token, setToken}) => {
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [data, setData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [vender, setvender] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [Errorvisible, setErrorvisible] = useState(false);
  const navigate = useNavigate(); // Add useNavigate hook

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const loginHandler = () => {
    setLoading(true);
    setErrorvisible(false);

    axios({
      url: "https://api.escuelajs.co/api/v1/auth/login",
      method: "POST",
      data: {
        email: data.email,
        password: data.password,
      },
    })
      .then((response) => {
        const accessToken = response.data.access_token;
        console.log("Login successful:", accessToken);
        
        // Store token in both local storage and state
        localStorage.setItem("userToken", accessToken);
        setToken(accessToken);
        
        // Redirect to home page after successful login
        navigate('/');
      })
      .catch((err) => {
        console.error("Login failed:", err.response?.data.message || err.message);
        
        if (err.response?.data.message == "Unauthorized") {
          setErrorvisible(true);
         
        } else {
          setErrors({ 
            email: '', 
            password: '', 
            general: "Network error, try again!" 
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
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
             <Link to="/" className='back'><FaArrowLeft className='left_icon' />Back</Link>
          </div>
          <div className="form_input">
            <div className="categori">
              <Link className='act'>Login</Link>
              <Link to="/sign" className='btn_state'>SIGN UP</Link>
            </div>

            {Errorvisible && <div className='wrong'>
            <RiErrorWarningLine className='wrong_icon'/>
            <p className='wrong_title'>Incorrect email or password.</p>
            </div>}

            
            <form onSubmit={(e) => {
              e.preventDefault();
              loginHandler();
            }}>
              <div className="input-container">
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  placeholder=" "
                  value={data.email}
                  onChange={handleChange}
                />
                <label htmlFor="email">Email</label>
               
              </div>
              <div className="input-container">
                <input 
                  type={showPassword ? "text" : "password"}
                  id="password" 
                  name="password"
                  placeholder=" "
                  value={data.password}
                  onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
                <div 
                  className="eye-icon" 
                  onClick={togglePasswordVisibility}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    zIndex: 10
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
                {errors.password && <span className="error-message">{errors.password}</span>}
                <p className="forget">Do you forget your <Link to="/forget" className='forget_pas'>password</Link><span className="ist">?</span></p>
              </div>
              
              <button type="submit" className="btn" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;