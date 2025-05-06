import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from './StoreContext';
import axios from 'axios';
import { assets } from '../assets/frontend_assets/assets';
import { motion } from 'framer-motion'

const MyOrders = () => {
    const {url, token} = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(url + "/api/order/userorders", {}, {
                headers: {
                    token: token
                }
            });
            setData(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error("Failed to fetch orders: ", error);
        }
    }

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    const variants = {
        hidden: {opacity: 0, y: 50},
        visible: {opacity: 1, y: 0}
    }

    const containerVarients = {
        hidden: {opacity: 0, x: -50},
        visible: {opacity: 1, x: 0},
    }

  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className='order-list-container'>
            {data.map((order, index) => {
                return (
                    <motion.div 
                        key={index} 
                        className='order-item'
                        variants={containerVarients}
                        initial="hidden"
                        whileInView="visible"
                        transition={{duration: 0.5}}
                    >
                        <img src={assets.parcel_icon} alt="" className='order-icon' />
                        <div className='order-details'>
                            <p className='order-items'>
                                {order.items.map((item, index) => (
                                    <span key={index}>
                                        {item.name} X {item.quantity}{index < order.items.length - 1 ? ', ' : ''}
                                    </span>
                                ))}
                            </p>
                            <p>฿{order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p className='order-status'>
                                <span className='status-dot'>&#x25cf;</span>
                                <strong>{order.status}</strong>
                            </p>
                        </div>
                        <button onClick={fetchOrders} className='track-order-btn'>Track Order</button>
                    </motion.div>
                )
            })}
        </div>
    </div>


    // <div className='my-orders'>
    //     <h2>My Orders</h2>
    //     <div className="order-list-container">
    //         {data.map((order, index) => {
    //             return (
    //                 <div key={index} className='my-orders-order'>
    //                     <img src={assets.parcel_icon} alt="" className='order-icon' />
    //                     <p className='order-items'>{order.items.map((item, index) => {
    //                         if (index === order.items.length - 1) {
    //                             return item.name + " X " + item.quantity
    //                         }
    //                         else {
    //                             return item.name + " X " + item.quantity + ", "
    //                         }
    //                     })}</p>
    //                     <p>฿{order.amount}.00</p>
    //                     <p>Items: {order.items.length}</p>
    //                     <p><span>&#x25cf;</span> <b>{order.status}</b></p>
    //                     <button onClick={fetchOrders}>Track Order</button>
    //                 </div>
    //             )
    //         })}
    //     </div>
    // </div>
  )
}

export default MyOrders