
import React, { useState, useEffect } from "react";
import "./head.css";
import logo from '../login_register/assets/logo.png'
import 'boxicons'
import { MdOutlineShoppingBag } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa6";
import { IoEnterOutline } from "react-icons/io5";
import { IoPersonAddOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

import axios from "axios";


const Header = ({search,setsearch}) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setUser(null);
    // Optional: Redirect to home page
    // window.location.href = '/';
  };
  return (
    <header>
      <div className="top_header">
        <div className="container">
          <div className="logo">
            <Link to="/"><img src={logo} alt="Lamora" className="logo_img" /></Link>
            <h1 className="logo_title">Lamora</h1>
          </div>

          <div className="search">
            <button className="search__button">
            <CiSearch className="se"/>
            </button>
            <input type="text" className="search__input" placeholder="Search" value={search} onChange={(e)=>{setsearch(e.target.value)}}/>
          </div>
          

          <div className="cart_headers">
            <div className="icon-wrapper">
            <Link to='/cart' className="icon-wrapper" style={{color:"black"}}>
             <MdOutlineShoppingBag className="i" />
              <span className="count">0</span>
            </Link>
            </div>
           
            <div className="icon-wrapper">
             <FaRegHeart className="i" />
              <span className="count">0</span>
            </div>
            <div className="user-dropdown">
              <div className="icon-wrapper">
              <FaRegUser   className="i user" />
              </div>
              <ul className="dropdown">
              {user ? (
    // Logged-in state
    <>
        <li className="dr welcome-msg">
            <span>Hello, {user.name || user.email}</span>
        </li>
        <li className="dr">
            <Link to="/Personel" className="link_drop">
                <FiUser /> Personal Info
            </Link>
        </li>
        <li className="dr">
            <button onClick={handleLogout} className="logout-btn">
                <IoEnterOutline /> Logout
            </button>
        </li>
    </>
) : (
    // Not logged-in state
    <>
        <li className="dr">
            <Link to="/login" className="link_drop">
                <IoEnterOutline /> Login
            </Link>
        </li>
        <li className="dr">
            <Link to="/signup" className="link_drop">
                <IoPersonAddOutline /> Sign Up
            </Link>
        </li>
    </>
)}
        </ul>
            </div>
          </div>
        </div>
      </div>

      <nav>
        <div className="container">
          <ul className="links">
            <li><a href="#">Makeup</a></li>
            <li><a href="#">Hair</a></li>
            <li><a href="#">Face</a></li>
            <li><a href="#">Body & Bath</a></li>
            <li><a href="#">Men</a></li>
            <li><a href="#">Body & Maternity</a></li>
            <li><a href="#">Our Brands</a></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
