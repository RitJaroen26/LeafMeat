import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../src/components/StoreContext'
import FoodItem from './FoodItem';
import '../assets/frontend_assets/assets'
import { motion } from 'framer-motion'

const FoodDisplay = ({category}) => {

  const { food_list } = useContext(StoreContext);

  const variants = {
    hidden: {opacity: 0, y: 50},
    visible: {opacity: 1, y: 0}
  }

  const containerVarients = {
    hidden: {opacity: 0, x: -50},
    visible: {opacity: 1, x: 0},
  }

  return (
    <div className='food-display' id='food-display'>
        <h2>Top dishes near you</h2>
        <motion.div 
          className="food-display-list"
          variants={variants}
          initial="hidden"
          whileInView="visible"
          transition={{duration: 1.1}}
        >
          {food_list.map((item, index) => {
            {console.log(category, item.category)}
            if (category==="All" || category===item.category) {
              return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
            }
          })}
        </motion.div>
    </div>
  )
}

export default FoodDisplay