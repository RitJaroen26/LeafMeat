import { useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLogin from './components/AdminLogin';
import AdminHome from './pages/AdminHome';
import Dashboard from './pages/Dashboard';

function App() {
  const url = "http://localhost:4000";
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
      <ToastContainer />
      <Navbar setShowLogin={setShowLogin} url={url} />
      {showLogin && <AdminLogin setShowLogin={setShowLogin} url={url} onClose={() => setShowLogin(false)} />}
      <hr />
      <div className='flex'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<AdminHome url={url} />} />
          <Route path='/dashboard' element={<Dashboard url={url} />} />
          <Route path='/add' element={<Add url={url} />} />
          <Route path='/list' element={<List url={url} />} />
          <Route path='/orders' element={<Orders url={url} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
