import React from 'react'
import './Header.css'
import FoodDisplay from './FoodDisplay'
import { Link } from 'react-router-dom';
import Pasta from '../assets/frontend_assets/pasta.png'

const Header = () => {
  return (
    <div className='header'>
      <div className='header-contents'>
        <h1>Order Your Favorite Food</h1>
        <p>
          Choose from a diverse menu featuring a delectable array of dishes crafted 
          with the finest ingredients to satisfy your cravings and elevate your dining 
          experience, one delicious meal at a time.
        </p>
        <a href="#food-item" className='view-menu-button'>View Menu</a>
      </div>

      <div className='header-image'>
        <img src={Pasta} alt="pasta" />
      </div>
    </div>

    // <div className='header'>
    //     <div className="header-contents">
    //         <h2>Order your favourite food here</h2>
    //         <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
    //         <a className='button' href="#food-item">View Menu</a>
    //     </div>
    //     <div className='header-image'>
    //       <img src={Pasta} alt="pasta" className='max-w-full sm:max-w-[100%]' />
    //     </div>
    // </div>
  )
}

export default Header