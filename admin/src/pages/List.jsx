import React, { useState, useEffect } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({url}) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      console.log(response.data);
      if (response.data.success) {
        setList(response.data.data);
      } 
      else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("Server error while fetching list");
      console.error(error);
    }
  }

  const removeFood = async(foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, {id:foodId});
      await fetchList();
      if (response.data.success) {
        toast.success(response.data.message);
      }
      else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("Server error while deleting item");
      console.error(error);
    }
  }

  useEffect(() => {
    fetchList();
  }, [])
  
  return (
    <div className='list flex-col'>
      <p className='all-food-title'>All Foods List</p>
      <div className='list-table'>
        <div className='list-table-header'>
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span>Action</span>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className='list-table-row'>
              <img src={`${url}/images/` + item.image} alt="" />
              <span>{item.name}</span>
              <span>{item.category}</span>
              <span>฿{item.price}</span>
              <span onClick={() => removeFood(item._id)} className='delete-btn'>X</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List