import React, { useEffect, useState } from 'react'
import './Orders.css'
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../assets/assets';

const Orders = ({url}) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    }
    else {
      toast.error("Error");
    }
  }

  const statusHandle = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value
    });

    if (response.data.success) {
      await fetchAllOrders();
    }
    
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add'>
      <h3>Order Pages</h3>
      <div className='order-list'>
        {orders.map((order, index) => {
          return (
            <div key={index} className='order-item'>
              <img src={assets.parcel_icon} alt="" className='order-icon' />
              <div className='food-order'>
                <div>
                  <p className='order-item-food'>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " X " + item.quantity
                    }
                    else {
                      return item.name + " X " + item.quantity + ", "
                    }
                  })}
                </p>
                <p className='order-item-name'>{order.address.firstname + " " + order.address.lastname}</p>
                <div className='order-item-address'>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                </div>
                <p className='order-item-phone'>{order.address.phone}</p>
                <p className='order-total'>Items : {order.items.length}</p>
                <p className='order-amount'>฿{order.amount}</p>
                </div>
                <select onChange={(event) => statusHandle(event, order._id)} value={order.status} className='order-status'>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Derivered</option>
                </select>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Orders