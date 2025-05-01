import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { assets } from '../assets/frontend_assets/assets';
import shopping from '../assets/frontend_assets/shopping_cart_24dp_000000_FILL0_wght400_GRAD0_opsz24.png'
import Search from '../assets/frontend_assets/search_24dp_000000_FILL0_wght400_GRAD0_opsz24.png'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from './StoreContext';
import axios from "axios";

const Navbar = ({setShowLogin, currentUser, setCurrentUser }) => {

    const [menu, setMenu] = useState("home");
    const { getTotalCartAmount, cartItem, addToCart, removeFromCart, token, setToken, food_list, url } = useContext(StoreContext);
    const [searchPopup, setSearchPopup] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [filteredFoods, setFilteredFoods] = useState(food_list);

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    }

    // useEffect(() => {
    //     axios.get("http://localhost/App1/food_web_app/server_php/src/Profile.php").then((response) => {
    //         if (response.data.status === 'success') {
    //             setUser(response.data.currentUser);
    //         }
    //     });
    // }, [currentUser]);

    // useEffect(() => {
    //     if (currentUser) {
    //         axios.get(`http://localhost:5000/profile?userId=${currentUser.id}`).then((response) => {
    //             if (response.data.status === 'success') {
    //                 setUser(response.data.user);
    //             }
    //         });
    //     }
    // }, [currentUser]);

    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        setFilteredFoods(
            food_list.filter((food) => food.name.toLowerCase().includes(term))
        )
    }

  return (
    <div>
        <div className='navbar'>
            <Link to='/'><h1 className='text-4xl font-bold'>LeafMeat</h1></Link>
            <ul className='navbar-menu'>
                <Link to='/' onClick={() => setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
                <a href='#food-item' onClick={() => setMenu("menu")} className={menu==="menu"?"active":""}>Menu</a>
                <a href='#footer' onClick={() => setMenu("contract-us")} className={menu==="contract-us"?"active":""}>Contract Us</a>
            </ul>
            <div className='navbar-right'>
                <img className='shopping-img' src={Search} alt="" onClick={() => setSearchPopup(true)}/>
                <div className='navbar-search-icon'>
                    <Link to='/cart'><img className='shopping-img' src={shopping} alt="" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                {/* <button onClick={Logout}>Logout</button> */}
                {!token ? <button className='btn-signin' onClick={() => setShowLogin(true)}>sign in</button>
                : <div className='navbar-profile'>
                    <img src={assets.profile_icon} alt="" />
                    <ul className='nav-profile-dropdown'>
                        <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                        <hr />
                        <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                    </ul>    
                </div>}
            </div>
        </div>
        {searchPopup && (
            <div className='search-popup'>
                <div className="search-popup-header">
                    <input type="text" placeholder='Search menu' value={searchTerm} onChange={handleSearch}/>
                    <button className='close-btn' onClick={() => setSearchPopup(false)}>X</button>
                </div>

                <div className="search-popup-results">
                    {filteredFoods.length > 0 ? (
                        filteredFoods.map((food) => {
                            console.log('Food ID: ', food._id);
                            console.log('Cart Item: ', cartItem[food._id]);
                            
                            return (
                                <div key={food._id} className='search-popup-item'>
                                    <img src={url + "/images/" + food.image} alt="" className='food-image' />
                                    <div className='search-details'>
                                        <p className='food-name-search'>{food.name}</p>
                                        <p className='food-price-search'>{food.price}</p>
                                        <p className='food-desc-search hidden md:block'>{food.description}</p>
                                    </div>
                                    {!cartItem[food._id] ? (
                                        <button className='btn-search-first-add' onClick={() => addToCart(food._id)}>+</button>
                                    ) : (
                                        <div className='button-counter'>
                                            <button className='btn-decrease' onClick={() => removeFromCart(food._id)}>-</button>
                                            <p>{cartItem[food._id]?cartItem[food._id]:0}</p>
                                            <button className='btn-increase' onClick={() => addToCart(food._id)}>+</button>
                                        </div>
                                    )}
                                    {/* <div className='button-counter'>
                                        <button className='btn-search-add' onClick={() => addToCart(food._id)}>+</button>
                                        <p>{cartItem[food._id]?cartItem[food._id]:0}</p>
                                        <button className='btn-search-remove' onClick={() => removeFromCart(food._id)}>-</button>
                                    </div> */}
                                </div>
                            )
                        })
                    ) : (
                        <p className='no-results'>No results found.</p>
                    )}
                </div>
            </div>
        )}
    </div>
  )
}

export default Navbar