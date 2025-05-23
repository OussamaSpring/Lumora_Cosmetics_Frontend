import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdOutlineShoppingBag } from "react-icons/md";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { IoEnterOutline } from "react-icons/io5";
import "./Header.css";

const Header = ({ onSearch, selectCategory, activeCategory }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: 2, name: "Makeup" },
    { id: 3, name: "Perfume" },
    { id: 4, name: "Skincare" },
    { id: 16, name: "Hair & body" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      onSearch(searchTerm);
    }
  };

  const handleCategoryClick = (id) => {
    selectCategory(id);
    setSearchTerm("");
  };

  return (
    <header>
      {/* Top header */}
      <div className="top_header">
        <div className="container">
          {/* Logo */}
          <div className="logo">
            <img src="/Lumora.svg" alt="Lumora" className="logo_img" />
            <h1 className="logo_title">Lumora</h1>
          </div>

          {/* Search bar */}
          <form className="search" onSubmit={handleSearch}>
            <button type="submit" className="search__button">
              <CiSearch className="se" />
            </button>
            <input
              type="text"
              className="search__input"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>

          {/* Cart and user */}
          <div className="cart_headers">
            <div className="icon-wrapper">
              <MdOutlineShoppingBag className="i" />
              <span className="count">0</span>
            </div>
            <div className="icon-wrapper">
              <FaRegHeart className="i" />
              <span className="count">0</span>
            </div>
            <div className="user-dropdown">
              <div className="icon-wrapper">
                <FaRegUser className="i user" />
              </div>
              <ul className="dropdown">
                <li className="dr welcome-msg"><span>Hello, Guest</span></li>
                <li className="dr"><span><FiUser /> Personal Info</span></li>
                <li className="dr"><span><IoEnterOutline /> Logout</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Category navigation */}
      <nav>
        <div className="container">
          <ul className="links">
            {categories.map((cat) => (
              <li key={cat.id}>
                <span
                  onClick={() => handleCategoryClick(cat.id)}
                  className={activeCategory === cat.id ? "active" : ""}
                >
                  {cat.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
