import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from './StoreContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlaceOrder = () => {

  const { getTotalCartAmount, token, food_list, cartItem, url } = useContext(StoreContext); 
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandle = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData(data => ({...data, [name]:value}));
  }

  useEffect(() => {
    console.log(data);
  }, [data]);

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];

    food_list.map((item) => {
      if (cartItem[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItem[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    }

    let response = await axios.post(url + "/api/order/place", orderData, {headers:{token}});

    if (response.data.success) {
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else {
      console.log(Error);
      alert("Error");
    }
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/cart');
    }
    else if (getTotalCartAmount () === 0) {
      navigate('/cart');
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className='flex flex-col items-start justify-between mt-[100px] gap-[50px] sm:flex-row sm:gap-[50px]' action="">
      <div className='place-order-left'>
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input name='firstname' onChange={onChangeHandle} value={data.firstname} type="text" placeholder='First name'required/>
          <input name='lastname' onChange={onChangeHandle} value={data.lastname} type="text" placeholder='Last name' required/>
        </div>
        <input name='email' onChange={onChangeHandle} value={data.email} type="text" placeholder='Email address' required/>
        <input name='street' onChange={onChangeHandle} value={data.street} type="text" placeholder='Street' required/>
        <div className="multi-fields">
          <input name='city' onChange={onChangeHandle} value={data.city} type="text" placeholder='City' required/>
          <input name='state' onChange={onChangeHandle} value={data.state} type="text" placeholder='State' required/>
        </div>
        <div className="multi-fields">
          <input name='zipcode' onChange={onChangeHandle} value={data.zipcode} type="text" placeholder='Zip code' required/>
          <input name='country' onChange={onChangeHandle} value={data.country} type="text" placeholder='Country' required/>
        </div>
        <input name='phone' onChange={onChangeHandle} value={data.phone} type="text" placeholder='Phone' required/>
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>฿{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>฿{2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>฿{getTotalCartAmount()+2}</b>
            </div>
          </div>
          <button type='submit' >PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder