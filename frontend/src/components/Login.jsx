import React, { useContext, useEffect, useState } from 'react'
import './Login.css'
import { assets } from '../assets/frontend_assets/assets'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { StoreContext } from './StoreContext';

const Login = ({setShowLogin, setUser}) => {

    const {url, setToken} = useContext(StoreContext);

    const [currState, setCurrState] = useState("Login")
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

    const onLogin = async (event) => {
        event.preventDefault();

        let newUrl = url;

        if (currState === "Login") {
            newUrl += "/api/user/login";
        }
        else {
            newUrl += "/api/user/register";
        }

        const response = await axios.post(newUrl, data);

        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false);
        }
        else {
            alert(response.data.message);
        }
    }

  return (
    <div className='login-popup'>
        <form className='login-popup-container' onSubmit={onLogin}>
            <div className="login-popup-title">
                <h2 className='text-[20px] font-bold'>{currState}</h2>
                <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {/* {currState==="Login"?<></>:<input type="file" accept="image/*" onChange={(e) => setProfilePic(e.target.files[0])} />} */}
                {currState==="Login"?<></>:<input type="text" name='name' placeholder='Your name' value={data.name} onChange={onChangeHandle} required />}
                {/* {currState==="Login"?<></>:<input type="text" placeholder='Your phone' value={phone} onChange={(e) => setPhone(e.target.value)} required />} */}
                <input name='email' type="email" placeholder='Your email' value={data.email} onChange={onChangeHandle} required />
                <input name='password' type="password" placeholder='Password' value={data.password} onChange={onChangeHandle} required />
            </div>
            <button type='submit'>{currState==="Sign Up"?"Create account":"Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required name='check' />
                <p>By continuing, i agree to the terms of use & privacy policy.</p>
            </div>
            {currState==="Login"
                ?<p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>:
                <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
            }
        </form>
    </div>
  )
}

export default Login