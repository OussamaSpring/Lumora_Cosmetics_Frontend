import React, { useState } from "react";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { RiErrorWarningLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import mainProduct from "../assest/main_product.png";
import background from "../assest/abckround.jpg";
import logo from "../assest/logo.png";
import "./auth.css";
import useAuth from './useAuth';
import axios from "axios";
const AuthForm = ({ active,token,setToken }) => {



  // const loginhandler=()=>{
  //   axios( {
  //     url:"http://lumora.runasp.net/api/Login",
  //     method:"POST",
  //     data: {
  //       usernameOrEmail:loginData.email,
  //       password:loginData.password,

  //     }
  //   }).then(res=>{
  //     console
  //   })
  // }


























  // const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(active === "login");
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();

  // const API_BASE_URL = 'https://api.lumora.com/api';
  // const USE_MOCK_AUTH = true;

  // Login state
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  
  // Signup state
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    dateOfBirth: "",
    email: "",
    gender: "male",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    accountType: "customer",
  });

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setCurrentStep(1);
    setErrors({});
    setAuthError(false);
    setErrorMessage("");
  };

  //  // Mock registration function
  //  const mockRegister = () => {
  //   console.log("Using mock registration:", signupData);
  //   return { 
  //     status: 200, 
  //     message: "Registration successful" 
  //   };
  // };

// // 3. Replace your handleLogin function with this simplified version:
// const handleLogin = async (email, password) => {
//   try {
//     console.log("Attempting login with:", { email, password });
//     const result = await login(email, password);
    
//     if (result.success) {
//       // Login was successful
//       navigate("/");
//       // Force page refresh to make sure all components recognize authentication
//       window.location.reload(); 
//     } else {
//       throw new Error(result.error || "Login failed");
//     }
//   } catch (error) {
//     console.error('Login error:', error);
//     setAuthError(true);
//     setErrorMessage(error.message || "Login failed. Please check your credentials and try again.");
//   }
//
const handleNextStep = (e) => {
  e.preventDefault();
  const validationErrors = validateSignup();
  if (Object.keys(validationErrors).length === 0) {
    setCurrentStep(currentStep + 1);
    setErrors({});
  } else {
    setErrors(validationErrors);
  }
};









  // Common handlers
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Login validation
  // const validateLogin = () => {
  //   const errors = {};
  //   if (!loginData.email) errors.email = "Email is required";
  //   if (!loginData.password) errors.password = "Password is required";
  //   return errors;
  // };

  // Signup validation
  const validateSignup = () => {
    const errors = {};
    // Step 1 validation
    if (currentStep === 1) {
      if (!signupData.firstName) errors.firstName = "First name is required";
      if (!signupData.lastName) errors.lastName = "Last name is required";
      if (!signupData.username) {
        errors.username = "Username is required";
      } else if (signupData.username.length < 4) {
        errors.username = "Username must be at least 4 characters";
      }
      if (!signupData.dateOfBirth) {
        errors.dateOfBirth = "Date of birth is required";
      }
    }

    // Step 2 validation
    if (currentStep === 2) {
      if (!signupData.email) {
        errors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupData.email)) {
        errors.email = "Invalid email format";
      }
      if (!signupData.phoneNumber) {
        errors.phoneNumber = "Phone number is required";
      } else if (!/^\d{10}$/.test(signupData.phoneNumber.replace(/[^0-9]/g, ''))) {
        errors.phoneNumber = "Please enter a valid phone number";
      }
    }

    // Step 3 validation
    if (currentStep === 3) {
      if (!signupData.password) {
        errors.password = "Password is required";
      } else if (signupData.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }
      if (signupData.password !== signupData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
      if (!agreeTerms) errors.terms = "You must agree to the terms";
    }

    return errors;
  };
  
  // Step indicator
  const renderStepIndicator = () => (
    <div className="step-indicator">
      {[1, 2, 3].map((step) => (
        <React.Fragment key={step}>
          <div className={`step ${currentStep >= step ? "active" : ""}`}>
            {step}
          </div>
          {step < 3 && <div className="step-line"></div>}
        </React.Fragment>
      ))}
    </div>
  );

  // Signup steps
  const renderSignupStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <div className="full_name">
              <div className="input-container">
                <input
                  type="text"
                  name="firstName"
                  placeholder=" "
                  value={signupData.firstName}
                  onChange={handleSignupChange}
                />
                <label>First Name</label>
                {errors.firstName && (
                  <span className="error-message">{errors.firstName}</span>
                )}
              </div>
              <div className="input-container">
                <input
                  type="text"
                  name="lastName"
                  placeholder=" "
                  value={signupData.lastName}
                  onChange={handleSignupChange}
                />
                <label>Last Name</label>
                {errors.lastName && (
                  <span className="error-message">{errors.lastName}</span>
                )}
              </div>
            </div>
            <div className="input-container">
              <input
                type="text"
                name="username"
                placeholder=" "
                value={signupData.username}
                onChange={handleSignupChange}
              />
              <label>Username</label>
              {errors.username && (
                <span className="error-message">{errors.username}</span>
              )}
            </div>
            <div className="input-container">
              <input
                type="date"
                name="dateOfBirth"
                placeholder=" "
                value={signupData.dateOfBirth}
                onChange={handleSignupChange}
                className="date-input"
              />
              <label className="date-label">Date of Birth</label>
              {errors.dateOfBirth && (
                <span className="error-message">{errors.dateOfBirth}</span>
              )}
            </div>
          </>
        );

      case 2:
        return (
          <>
            <div className="input-container">
              <input
                type="email"
                name="email"
                placeholder=" "
                value={signupData.email}
                onChange={handleSignupChange}
              />
              <label>Email</label>
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>
            <div className="input-container">
              <input
                type="tel"
                name="phoneNumber"
                placeholder=" "
                value={signupData.phoneNumber}
                onChange={handleSignupChange}
              />
              <label>Phone Number</label>
              {errors.phoneNumber && (
                <span className="error-message">{errors.phoneNumber}</span>
              )}
            </div>
            <div className="select-container">
              <select
                name="gender"
                value={signupData.gender}
                onChange={handleSignupChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
              <label>Gender</label>
            </div>
          </>
        );

      case 3:
        return (
          <>
            <div className="input-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder=" "
                value={signupData.password}
                onChange={handleSignupChange}
              />
              <label>Password</label>
              <div className="eye-icon" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>
            <div className="input-container">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder=" "
                value={signupData.confirmPassword}
                onChange={handleSignupChange}
              />
              <label>Confirm Password</label>
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>
            
            <div className="account-type-container">
              <p className="account-type-label">Account Type</p>
              <div className="account-type-options">
                <div 
                  className={`account-type-option ${signupData.accountType === 'customer' ? 'selected' : ''}`}
                  onClick={() => handleSignupChange({target: {name: 'accountType', value: 'customer'}})}
                >
                  <div className="option-radio">
                    <div className={`radio-inner ${signupData.accountType === 'customer' ? 'active' : ''}`}></div>
                  </div>
                  <div className="option-label">Customer</div>
                </div>
                <div 
                  className={`account-type-option ${signupData.accountType === 'vendor' ? 'selected' : ''}`}
                  onClick={() => handleSignupChange({target: {name: 'accountType', value: 'vendor'}})}
                >
                  <div className="option-radio">
                    <div className={`radio-inner ${signupData.accountType === 'vendor' ? 'active' : ''}`}></div>
                  </div>
                  <div className="option-label">Vendor</div>
                </div>
              </div>
            </div>
            
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              <span htmlFor="terms">
                I agree to the{" "}
                <span className="bold">terms and conditions</span>
              </span>
              {errors.terms && (
                <span className="error-message">{errors.terms}</span>
              )}
            </div>
          </>
        );

      default:
        return null;
    }
  };

 

  const loginhandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAuthError(false);
    setErrorMessage("");
  
    try {
      const response = await axios({
        url: "http://lumora.runasp.net/api/Login",
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          usernameOrEmail: loginData.email,
          password: loginData.password
        }
      });
  
      // Check if response is successful
      if (response.status === 200 && response.data) {
        console.log("Login successful:", response.data);
  
        // Store the token - assuming the API returns a token in the response
        const token = response.data.accessToken; // Adjust this based on actual response structure
        setToken(token);
  
        // Save the token to local storage
        localStorage.setItem("accessToken", token);
  
        // Navigate to home page
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      setAuthError(true);
      setErrorMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };


  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAuthError(false);
    setErrorMessage("");
  
    try {
      // Format the date of birth to match API requirements
      const formattedDob = new Date(signupData.dateOfBirth).toISOString();
      
      // Determine the API endpoint based on account type
      const endpoint = signupData.accountType === "vendor" 
        ? "http://lumora.runasp.net/api/vendor/Register"
        : "http://lumora.runasp.net/api/customer/register";
  
      const response = await axios({
        url: endpoint,
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          username: signupData.username,
          email: signupData.email,
          password: signupData.password,
          firstName: signupData.firstName,
          lastName: signupData.lastName,
          dateOfBirth: formattedDob,
          gender: signupData.gender, 
               
          phoneNumber: signupData.phoneNumber,
        }
      });
  
      // Check if response is successful
      if (response.status === 200 && response.data) {
        console.log("Registration successful:", response.data);
        // Switch to login mode
        setIsLogin(true);
        setErrorMessage("Registration successful! Please login.");
        // Reset form
        setSignupData({
          firstName: "",
          lastName: "",
          username: "",
          dateOfBirth: "",
          email: "",
          gender: "male",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
          accountType: "customer"
        });
      }
    } catch (error) {
      console.error("Registration error:", error.message);
      setAuthError(true);
      setErrorMessage(
        error.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main">
      <div
        className="background-container"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="content">
          <div className="left_auth">
            <div className="top_left_auth">
              <div className="top_left_auth_content">
                <div className="logo_auth">
                  <img src={logo} alt="Logo" />
                  <h6>Lumora</h6>
                  <p>COSMETICS</p>
                </div>
                <div className="title_auth">
                  <h2>Lumora</h2>
                  <h4>All in one</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="main_img">
            <img src={mainProduct} alt="Main Product" />
          </div>

          <div className="right_auth">
            <div className="top_right">
              <h2>Welcome,</h2>
              <Link to="/" className="back">
                <FaArrowLeft className="left_icon" />
                Back
              </Link>
            </div>

            <div className="form_input ">
              <div className={`${isLogin ? "categori_log_sign" : "sign_cate"}`}>
                <button
                  className={`btn_state ${isLogin ? "act" : ""}`}
                  onClick={toggleAuthMode}
                  type="button"
                >
                  LOGIN
                </button>
                <button
                  className={`btn_state ${!isLogin ? "act" : ""}`}
                  onClick={toggleAuthMode}
                  type="button"
                >
                  SIGN UP
                </button>
              </div>
              
              {authError && (
                <div className="wrong">
                  <RiErrorWarningLine className="wrong_icon" />
                  <p className="wrong_title">{errorMessage}</p>
                </div>
              )}

             {/* Replace the existing form tag with this */}
<form onSubmit={isLogin ? loginhandler : currentStep === 3 ? handleRegister : handleNextStep}>
                {!isLogin && renderStepIndicator()}

                {isLogin ? (
                  <>
                    <div className="input-container">
                      <input
                        type="text"
                        name="email"
                        placeholder=" "
                        value={loginData.email}
                        onChange={handleLoginChange}
                      />
                      <label>Email</label>
                      {errors.email && (
                        <span className="error-message">{errors.email}</span>
                      )}
                    </div>
                    <div className="input-container">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder=" "
                        value={loginData.password}
                        onChange={handleLoginChange}
                      />
                      <label>Password</label>
                      <div
                        className="eye-icon"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </div>
                      {errors.password && (
                        <span className="error-message">{errors.password}</span>
                      )}
                    </div>
                  </>
                ) : (
                  renderSignupStep()
                )}

                <div className="form-actions">
                  <button type="submit" className="btn" disabled={loading}>
                    {loading
                      ? "Processing..."
                      : isLogin
                      ? "LOGIN"
                      : currentStep === 3
                      ? "SIGN UP"
                      : "CONTINUE"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;