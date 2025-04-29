import React, { useContext, useEffect, useState } from 'react'
import './AdminHome.css'
import { AdminContext } from '../components/AdminStoreContext'
import axios from 'axios';

const AdminHome = ({ url }) => {
    const { adminToken } = useContext(AdminContext);
    const [adminName, setAdminName] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchAdminName = async () => {
            const token = adminToken || localStorage.getItem("adminToken");
            
            if (!token) {
                setIsLoggedIn(false);
                setAdminName("");
                return;
            }

            try {
                const response = await axios.get("http://localhost:4000/api/admin/profile", {
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                    },
                });
                
                if (response.data.success) {
                    setAdminName(response.data.name);
                    setIsLoggedIn(true);
                }
                else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.log("Failed to fetch admin profile", error);
                setIsLoggedIn(false);
            }
        };

        fetchAdminName();
    }, [adminToken, url]);

  return (
    <div className='admin-home'>
        {isLoggedIn && (
            <h1 className='admin-home-title'>Hello, {adminName || "Admin"} 👋</h1>
        )}
        <div className='admin-home-container'>
            <h1 className='admin-title'>Welcome to Admin Management Orders</h1>
            <p className='admin-description'>
                You can manage the system from here. Please select an option from the sidebar.
            </p>

            <div className='admin-cards'>
                <div className='admin-card'>
                    <h2>Manage Users</h2>
                    <p>View, add, edit, or remove users in the system.</p>
                </div>
                <div className='admin-card'>
                    <h2>Manage Orders</h2>
                    <p>Check, Update, and Manage customer orders</p>
                </div>
                <div className='admin-card'>
                    <h2>Manage Products</h2>
                    <p>Add new products or edit existing ones.</p>
                </div>
            </div>
        </div>

        <div className='admin-tip'>
            <p>📌 Tip: You can use the sidebar to add new food items, view orders, or manage your users. It’s all just one click away!</p>
        </div>
    </div>
  )
}

export default AdminHome