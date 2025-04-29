import React, { useState } from 'react'
import { food_list } from '../assets/frontend_assets/assets'
import './FoodSearch.css'
import Search from '../assets/frontend_assets/search_24dp_000000_FILL0_wght400_GRAD0_opsz24.png'

const FoodSearch = ({id, name, price, description, image}) => {

    const [search, setSearch] = useState('');
    const [filteredFoods, setFilteredFood] = useState(food_list);


  return (
    <div className='food-search'>
        <button onClick={() => document.getElementById('search-bar').classList.toggle('active')}>
            {/* <i className='search-icon'></i> */}
            <img className='search-icon' src={Search} alt="" />
        </button>
        <div className="search-bar" id='search-bar'>
            <input type="text" placeholder='Search menu' value={search} onChange={handleSearch}/>
        </div>
        <div className="search-results">
            {filteredFoods.length > 0 ? (
                filteredFoods.map((food) => (
                    <div key={food._id} className='food-item'>
                        <p>{food.name}</p>
                        <p>Price: ฿{food.price}</p>
                        <p>{food.description}</p>
                    </div>
                ))
            ) : (
                <p>No results found</p>
            )}
        </div>
    </div>
  )
}

export default FoodSearch