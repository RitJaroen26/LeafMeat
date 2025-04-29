import React from 'react'
import './Footer.css'
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                {/* <img src={assets.logo} alt="" /> */}
                <h1 className='logo-name'>LeafMeat</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id vel fugit explicabo! Iusto saepe modi, amet facere nostrum ea excepturi repellendus accusantium ipsam laboriosam eum magni laborum velit atque fugit?</p>
                <div className="footer-social-icons flex">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1-212-456-7890</li>
                    <li>pawarit-j@email.com</li>
                    <li>Asset and Image credit from @GreatStackDev. </li>
                </ul>
            </div>
        </div>
        <hr />
        <p className='footer-copyright'>Copyright 2024 @ Pawarit-J.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer