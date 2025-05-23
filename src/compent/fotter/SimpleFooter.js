// SimpleFooter.js
import React from 'react';
import './footer.css';
import { IoLocationOutline } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";

import { CiTwitter } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";

const SimpleFooter = () => {
  return (
    <footer>
        <div className="top_footer">
            <div className="contant_footer">
                <div className="col1 col">
                    <h3 className='title_foter'>Lamura</h3>
                    <p>Discover nature's beauty with our natural care products.</p>
                    <div className="icon_footer">
                        <a href="tel:+213788747555">
                            <i className='bx bx-phone'></i>
                            <span className='icon_tit'>+213 788 747 555</span>
                        </a>
                        <a href="mailto:Lumora@kmail.com">
                            <i className='bx bx-envelope'></i>
                            <span className='icon_tit'> Lumora@kmail.com</span>
                           
                        </a>
                        <a href="#">
                            <IoLocationOutline className='bx'/>
                            <span className='icon_tit'>Algeria, Constantine</span>
                            
                        </a>
                    </div>
                </div>

                <div className="col2 col">
                    <h3>About</h3>
                    <p>About us</p>
                    <p>Privacy Policy</p>
                    <p>Terms & Conditions</p>
                </div>

                <div className="col3 col">
                    <h3>My Account</h3>
                    <p>Order Status</p>
                    <p>Rewards</p>
                </div>

                <div className="col4 col">
                    <h3>Customer Care</h3>
                    <p>FAQ</p>
                    <p>Contact us</p>
                    <p>Returns & Exchanges</p>
                </div>

                <div className="col5 col">
                    <h3>Newsletter</h3>
                    <p>Stay informed, subscribe now!</p>
                    <input type="email" placeholder="Your email" />
                    <a href="#">
                        <span>Subscribe</span>
                        <i className='bx bx-right-arrow-alt'></i>
                    </a>
                </div>
            </div>
        </div>


        <div className='bottom_footer'>

            <div className='contant_footer'>
            <span className='right_botom_foter'>&copy;2025 Lumora</span>

                <div className='left_botom_foter'>
                   <FaFacebookF className='icon_botom_foter'/>
                   <CiTwitter className='icon_botom_foter'/>
                   <FaInstagram className='icon_botom_foter'/>

                </div>


            </div>
            

        </div>


       
    </footer>
  );
};

export default SimpleFooter;