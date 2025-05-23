"use client"
import { useState } from "react"
import { IoNotificationsOutline } from "react-icons/io5"
import { CiSearch, CiStar } from "react-icons/ci"
import { FaArrowLeft, FaChevronRight } from "react-icons/fa"
import { MdOutlineDashboard } from "react-icons/md"
import { BsShop } from "react-icons/bs"
import { FaUserGroup } from "react-icons/fa6"
import { RiFilePaper2Line } from "react-icons/ri"
import logo from './assest/logo.png'
import { VscAccount } from "react-icons/vsc";
import { BiMoneyWithdraw } from "react-icons/bi";
export default function Side_bare() {
  return (
    <div className="sidebar">
           <div className="logo-area">
            <img src={logo} className="logo"/>
             <h1 className="italain">Lumora</h1>
           </div>
   
           <nav className="nav">
             <a href="#" className="nav-link">
               <span className="icon"><VscAccount/></span>
               <span>Account</span>
             </a>
   
             <a href="#" className="nav-link">
               <span className="icon">
                 <MdOutlineDashboard />
               </span>
               <span>Dashboard</span>
             </a>
   
             <a href="#" className="nav-link act">
               <span className="icon">
                 <BsShop />
               </span>
               <span>Shop</span>
               <span className="arrow">
                 <FaChevronRight />
               </span>
             </a>
   
             <a href="#" className="nav-link">
               <span className="icon">
                 <FaUserGroup />
               </span>
               <span>Orders</span>
             </a>
   
             <a href="#" className="nav-link">
               <span className="icon">
                 <BiMoneyWithdraw />
               </span>
               <span>White Draw</span>
             </a>
           </nav>
         </div>
  )
}
