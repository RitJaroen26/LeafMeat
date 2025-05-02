import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './components/Cart'
import PlaceOrder from './components/PlaceOrder'
import Footer from './components/Footer'
import Login from './components/Login'
import axios from "axios"
import Profile from './components/Profile'
import EditProfile from './components/EditProfile'
import Verify from './components/Verify'
import MyOrders from './components/MyOrders'

const Home = React.lazy(() => import("./components/Home"));

const App = () => {

  const [showLogin, setShowLogin] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, [])

  return (
    <div className='main-page'>
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        {/* {showLogin?<Login setShowLogin={setShowLogin} setUser={(user)}/>:<></>} */}
        {showLogin && <Login setShowLogin={setShowLogin} setUser={(user) => {
          setCurrentUser(user);
          localStorage.setItem("user", JSON.stringify(user));
        }} />}
        <Routes>
          <Route path='/' element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <Home />
            </React.Suspense>
          } />
          <Route path='/cart' element={<Cart />} />
          {/* <Route path='/profile' element={<Profile />}/> */}
          <Route path='/myorders' element={<PlaceOrder />} />
          {/* <Route path='/profile' element={<Profile currentUser={currentUser} setCurrentUser={setCurrentUser} />}/> */}
          <Route 
            path='/profile' 
            element={currentUser ?
              <Profile currentUser={currentUser} setCurrentUser={setCurrentUser}/> :
              <Login setShowLogin={setShowLogin} setUser={(user) => {
                setCurrentUser(user);
                localStorage.setItem("user", JSON.stringify(user));
              }} />
            }
          />
          <Route path='/edit-profile' element={<EditProfile currentUser={currentUser} setCurrentUser={setCurrentUser}/>}/>
          {/* <Route 
            path='/profile' 
            element={currentUser ? 
              <Profile currentUser={currentUser} setCurrentUser={setCurrentUser} /> : 
              <Login setShowLogin={setShowLogin} setUser={(user) => {
                setCurrentUser(user);
                localStorage.setItem("user", JSON.stringify(user));
              }} />
            }
          /> */}
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </div>
    
  )
}

export default App