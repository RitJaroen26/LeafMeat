import React from 'react'
import './Sidebar.css'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-[100vh] border border-gray-600 border-t-0 bg-gray-300'>
        <div className='flex flex-col gap-[20px]' style={{ paddingTop: '50px', paddingLeft: '20%' }}>
            <NavLink to='/' className='sidebar-option flex items-center gap-[12px] cursor-pointer px-[10px] py-[8px]'>
                <img src={assets.Home_icon} alt="" style={{ width:'25px', height:'25px' }} />
                <p>Home</p>
            </NavLink>
            <NavLink to='/dashboard' className='sidebar-option flex items-center gap-[12px] cursor-pointer px-[10px] py-[8px]'>
                <img src={assets.Dashboard_icon} alt="" style={{ width:'25px', height:'25px' }} />
                <p>Dashboard</p>
            </NavLink>
            <NavLink to='/add' className='sidebar-option flex items-center gap-[12px] cursor-pointer px-[10px] py-[8px]'>
                <img src={assets.add_icon} alt="" />
                <p>Add items</p>
            </NavLink>
            <NavLink to='/list' className='sidebar-option flex items-center gap-[12px] cursor-pointer px-[10px] py-[8px]'>
                <img src={assets.order_icon} alt="" />
                <p>List Items</p>
            </NavLink>
            <NavLink to='/orders' className='sidebar-option flex items-center gap-[12px] cursor-pointer px-[10px] py-[8px]'>
                <img src={assets.order_icon} alt="" />
                <p>Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar