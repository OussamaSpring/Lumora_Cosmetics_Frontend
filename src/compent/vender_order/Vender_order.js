import React from 'react';
import "./vender.css";
import acount from './assest/acount.png'
import { MdOutlineDashboard } from "react-icons/md";
import { BsShop } from "react-icons/bs";
import { FaUserGroup } from "react-icons/fa6";
import { RiFilePaper2Line } from "react-icons/ri";
import { FaChevronRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import person from './assest/person.png'
import { IoNotificationsOutline } from "react-icons/io5";
function LumoraDashboard() {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-area">
          <img src="/logo.png" alt="Lumora Logo" className="logo" />
          <h1 className='italain'>Lumora</h1>
        </div>

        <nav className="nav">
          <a href="#" className="nav-link">
            <span className="icon"><img src={acount}/></span>
            <span>Account</span>
          </a>

          <a href="#" className="nav-link ">
            <span className="icon"><MdOutlineDashboard/></span>
            <span>Dashboard</span>
          </a>

          <a href="#" className="nav-link active">
            <span className="icon"><BsShop/></span>
            <span>Shop</span>
            <span className="arrow"><FaChevronRight/></span>
          </a>

          <a href="#" className="nav-link">
            <span className="icon"><FaUserGroup/></span>
            <span>Orders</span>
          </a>

          <a href="#" className="nav-link">
            <span className="icon"><RiFilePaper2Line/></span>
            <span>White Draw</span>
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main">
        <div className="header">
          <div className="left-header">
            <button className="back-btn">
              <span className="icon"><FaArrowLeft/></span>
              <span className='be'>Back</span>
            </button>

            {/* <button className="shop-btn">Shop</button> */}
          </div>

          {/* <div className="search-area">
            <div className="search-box">
              <span className="icon">🔍</span>
              <input type="text" placeholder="Search" />
            </div>
            <button className="filter-btn">
              <span className="icon">⚙️</span>
            </button>
          </div> */}

          <div className="right-header">
            <div className="notification">
              <span className="icon_no"><IoNotificationsOutline
              className='inside'/></span>
              <span className="badge">1</span>
            </div>
            <div className="avatar">
              <img src={person} alt="Profile" />
            </div>
          </div>
        </div>

        <div className='below_the_top'>
             <button className="shop-btn">Shop</button> 
            <div className="search-area">
            <div className="search-box">
              <span className="icon">🔍</span>
              <input type="text" placeholder="Search" />
            </div>
            <button className="filter-btn">
              <span className="icon">⚙️</span>
            </button>
          </div> 

        </div>


        <div className="products">
          <div className="product">
            <div className="product-img">
              <img src="/product1.jpg" alt="All-Around Safe Block Essence Sun" />
            </div>
            <h3>All-Around Safe Block Essence Sun SPF45+</h3>
            <div className="rating">
              <span className="dot filled"></span>
              <span className="dot filled"></span>
              <span className="dot filled"></span>
              <span className="dot filled"></span>
              <span className="dot"></span>
              <span>(11)</span>
            </div>
            <p className="description">All Around Safe Block Sun Milk SPF50+/PA+++</p>
            <p className="price">$25</p>
            <button className="manage-btn">Manage Product</button>
          </div>

          <div className="product">
            <div className="product-img">
              <img src="/product2.jpg" alt="Super Aqua Snail Cream" />
            </div>
            <h3>Super Aqua Snail Cream</h3>
            <div className="rating">
              <span className="dot filled"></span>
              <span className="dot filled"></span>
              <span className="dot filled"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span>(7)</span>
            </div>
            <p className="description">Skin Moisturizing Care Type Cream</p>
            <p className="price">$25</p>
            <button className="manage-btn">Manage Product</button>
          </div>

          <div className="product">
            <div className="product-img">
              <img src="/product3.jpg" alt="Clarifying Emulsion" />
            </div>
            <h3>Clarifying Emulsion</h3>
            <div className="rating">
              <span className="dot filled"></span>
              <span className="dot filled"></span>
              <span className="dot filled"></span>
              <span className="dot filled"></span>
              <span className="dot filled"></span>
              <span>(21)</span>
            </div>
            <p className="description">With Bija Seed Oil</p>
            <p className="price">$25</p>
            <button className="manage-btn">Manage Product</button>
          </div>

          <div className="product">
            <div className="product-img">
              <img src="/product4.jpg" alt="Dewy Glow Jelly Cream" />
            </div>
            <h3>Dewy Glow Jelly Cream</h3>
            <div className="rating">
              <span className="dot filled"></span>
              <span className="dot filled"></span>
              <span className="dot filled"></span>
              <span className="dot filled"></span>
              <span className="dot"></span>
              <span>(9)</span>
            </div>
            <p className="description">With Jelly Cherry Blossom</p>
            <p className="price">$25</p>
            <button className="manage-btn">Manage Product</button>
          </div>
        </div>

        <button className="add-btn">
          <span className="icon">+</span>
          <span>Add new product</span>
        </button>
      </div>
    </div>
  );
}

export default LumoraDashboard;
