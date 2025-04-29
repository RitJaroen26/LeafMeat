import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../assets/frontend_assets/assets'
import { motion } from 'framer-motion'

const ExploreMenu = ({category, setCategory}) => {

    const variants = {
        hidden: {opacity: 0, y: 50},
        visible: {opacity: 1, y: 0}
    }

    const containerVarients = {
      hidden: {opacity: 0, x: -50},
      visible: {opacity: 1, x: 0},
    }

  return (
    <div className='explore-menu' id='explore-menu'>
        <div 
            className='explore-menu-header'
        >
            <motion.h1
                variants={variants}
                initial="hidden"
                whileInView="visible"
                transition={{duration: 0.7}}
            >
                Explore Our Menu
            </motion.h1>
            <motion.p
                variants={variants}
                initial="hidden"
                whileInView="visible"
                transition={{duration: 0.9}}
            >
                Choose from a diverse menu featuring a delectable array of dishes crafted 
                with the finest ingredients to satisfy your cravings and elevate your dining 
                experience, one delicious meal at a time.
            </motion.p>
        </div>

        <motion.div 
            className='explore-menu-list'
            variants={variants}
            initial="hidden"
            whileInView="visible"
            transition={{duration: 1.1}}
        >
            {menu_list.map((item, index) => {
                return (
                    <div 
                        key={index}
                        onClick={() => setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} 
                        // className='explore-menu-list-item'
                        className={`explore-menu-list-item ${category === item.menu_name ? 'active' : ''}`}
                    >
                        <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </motion.div>

        <hr className='divider' />
    </div>  

    // <div className='explore-menu' id='explore-menu'>
    //     <h1>Explore our menu</h1>
    //     <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
    //     <div className="explore-menu-list">
    //         {menu_list.map((item, index) => {
    //             return (
    //                 <div 
    //                     key={index}
    //                     onClick={() => setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} 
    //                     className='explore-menu-list-item'
    //                 >
    //                     <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
    //                     <p>{item.menu_name}</p>
    //                 </div>
    //             )
    //         })}
    //     </div>
    //     <hr/>
    // </div>
  )
}

export default ExploreMenu