import axios from 'axios';
import React, { useContext, useState } from 'react'
import { AdminContext } from './AdminStoreContext';
import './AdminLogin.css'
import { assets } from '../../../frontend/src/assets/frontend_assets/assets';
import { toast } from 'react-toastify';

const AdminLogin = ({setShowLogin, url, onClose}) => {
  const { setAdminToken } = useContext(AdminContext);
  
  const [adminCurrState, setAdminCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChangeHandle = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data, [name]:value}));
  }

  const onAdminLogin = async (event) => {
    event.preventDefault();

    let newUrl = url;

    if (adminCurrState === "Login") {
      newUrl += "/api/admin/login";
    }
    else {
      newUrl += "/api/admin/register";
    }

    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      setAdminToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      toast.success(response.data.message);
      onClose();
    }
    else {
      toast.error(response.data.message);
      console.log("AdminLogin URL:", url);
    }
  }
  
  return (
    <div className='admin-login-popup'>
        <form className='admin-login-container' onSubmit={onAdminLogin}>
          <div className='admin-login-title'>
            <h2 className='text-[20px] font-bold'>{adminCurrState}</h2>
            <img onClick={onClose} src={assets.cross_icon} alt="" />
          </div>
          <div className="admin-login-popup-inputs">
            {adminCurrState==="Login"?<></>:<input className='name-input-for-register' type="text" name='name' placeholder='Your name' value={data.name} onChange={onChangeHandle} required />}
            <input name='email' type="email" placeholder='Your email' value={data.email} onChange={onChangeHandle} required />
            <input name='password' type="password" placeholder='Password' value={data.password} onChange={onChangeHandle} required />
          </div>
          <button type='submit'>{adminCurrState==="Sign Up"?"Create account":"Login"}</button>
          <div className="admin-login-popup-condition">
            <input type="checkbox" required name='check' />
            <p>By continuing, i agree to the terms of use & privacy policy.</p>
          </div>
          {adminCurrState==="Login"
            ?<p className='create-a-new-account'>Create a new account? <span onClick={() => setAdminCurrState("Sign Up")} className='change-login'>Click here</span></p>:
            <p className='already-have-an-account'>Already have an account? <span onClick={() => setAdminCurrState("Login")} className='change-login'>Login here</span></p>
          }
        </form>
    </div>
  )
}

export default AdminLogin