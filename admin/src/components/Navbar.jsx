import React, { useContext, useState } from 'react'
import { assets } from '../../src/assets/assets'
import './Navbar.css'
import AdminLogin from './AdminLogin'
import { Link, useNavigate } from 'react-router-dom'
import { AdminContext } from './AdminStoreContext'

const Navbar = ({ url }) => {
  const [showPopup, setShowPopup] = useState(false);
  const { adminToken, setAdminToken } = useContext(AdminContext);

  const navigate = useNavigate();

  const onAdminLogout = () => {
    localStorage.removeItem("token");
    setAdminToken("");
    navigate("/");
  }

  return (
    <div className='navbar'>
      <h1 className='text-4xl font-bold'>LeafMeat</h1>
        {/* <img src={assets.logo} alt="" className='navbar-logo' /> */}
        {!adminToken ? <button onClick={() => setShowPopup(true)} className='navbar-login-btn'>Login</button>
        : <div className='nav-admin-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className='nav-admin-profile-dropdown'>
              <li onClick={onAdminLogout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>}

        {showPopup && <AdminLogin onClose={() => setShowPopup(false)} setShowLogin={setShowPopup} url={url}/>}
    </div>
  )
}

export default Navbar