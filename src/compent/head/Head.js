
import React, { useState, useEffect, useContext } from "react";
import "./head.css";
import logo from '../profile_setting/photo/logo.png'
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

import { useNavigate } from 'react-router-dom';
// import useAuth from '../login_register/Auto_form/useAuth';
import axios from "axios";
import { CartContext_reda } from "../context_reda/cart_contect";


const Header = ({ search, setsearch }) => {
  const [user, setUser] = useState(null); // State to store user info
  const navigate = useNavigate();
  const{cartitems}=useContext(CartContext_reda);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      // Fetch user profile or set a placeholder user
      setUser({ name: "User", email: "user@example.com" }); // Replace with actual API call if needed
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Remove token from local storage
    setUser(null); // Clear user state
    navigate("/login"); // Redirect to login page
  };

  

  return (
    <header>
      <div className="top">
        <div className="top_header">
          <div className="logo_header">
            <Link to="/">
              <img src={logo} alt="Lamora" className="logo_img" />
            </Link>
            <h1 className="logo_title">Lumora</h1>
          </div>

          <div className="search">
            <button className="search__button">
              <CiSearch className="se" />
            </button>
            <input
              type="text"
              className="search__input"
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setsearch(e.target.value);
              }}
            />
          </div>

          <div className="cart_headers">
            <div className="icon-wrapper">
              <Link to="/cart" className="icon-wrapper" style={{ color: "black" }}>
                <MdOutlineShoppingBag className="i" />
                <span className="count">{cartitems.length}</span>
              </Link>
            </div>

            <div className="icon-wrapper">
              <FaRegHeart className="i" />
              <span className="count">0</span>
            </div>

            <div className="user-dropdown">
              <div className="icon-wrapper">
                {user ? (
                  <img
                    src="https://via.placeholder.com/40" // Replace with user avatar if available
                    alt="User Avatar"
                    className="user-avatar"
                  />
                ) : (
                  <FaRegUser className="i user" />
                )}
              </div>
              <ul className="dropdown">
                {user ? (
                  // Logged-in state
                  <>
                    <li className="dr welcome-msg">
                      <span className="hello">Hello, {user.name || user.email}</span>
                    </li>
                    <li className="dr_accept">
                      <Link to="/Personel" className="link_drop">
                        <FiUser /> Profile
                      </Link>
                    </li>
                    <li className="dr_accept">
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
                      <Link to="/sign" className="link_drop">
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
            <li>
              <a href="#">Makeup</a>
            </li>
            <li>
              <a href="#">Hair</a>
            </li>
            <li>
              <a href="#">Face</a>
            </li>
            <li>
              <a href="#">Body & Bath</a>
            </li>
            <li>
              <a href="#">Men</a>
            </li>
            <li>
              <a href="#">Body & Maternity</a>
            </li>
            <li>
              <a href="#">Our Brands</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
