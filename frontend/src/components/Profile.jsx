import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Profile.css'
import { useNavigate } from 'react-router-dom';

const Profile = ({currentUser, setCurrentUser}) => {
    const [profile, setProfile] = useState(null);
    // const [newProfilePic, setNewProfilePic] = useState(null);
    const [updateName, setUpdateName] = useState("");
    const [updateEmail, setUpdateEmail] = useState("");
    const [updatePhone, setUpdatePhone] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            axios.get(`http://localhost:5000/profile?userId=${currentUser.id}`)
                .then((res) => {
                    setProfile(res.data.user);
                    setUpdateName(res.data.user.name);
                    setUpdateEmail(res.data.user.email);
                    setUpdatePhone(res.data.user.phone);
                })
                .catch((err) => {
                    console.error("Error fetching profile: ", err);
                })
        }
    }, [currentUser]);


  return profile ? (
    <div className='profile-page'>
        <div className='profile-container'>
            <h2>Information Profile</h2>
            <h2 className='name-h2'>{profile.name}</h2>

            <div className="profile-pic-container">
                <img
                    src={currentUser.profile_pic || "/default-prrofile.png"}
                    // src={decodeURIComponent(currentUser.profile_pic)}
                    alt="Profile"
                    className="profile-pic"
                />
                <div className='file-upload-container'>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => setNewProfilePic(e.target.files[0])}
                        id='fileInput'
                        hidden 
                    />
                    {/* <label htmlFor="fileInput" className='custom-file-upload'>
                        {newProfilePic ? newProfilePic.name : "Change Image"}
                    </label> */}
                </div>
            </div>
            <div className='input-group'>
                <label htmlFor="">Name</label>
                <input type="text" value={updateName} onChange={(e) => setUpdateName(e.target.value)} readOnly/>
            </div>
            <div className='input-group'>
                <label htmlFor="">Email</label>
                <input type="text" value={updateEmail} onChange={(e) => setUpdateEmail(e.target.value)} readOnly/>
            </div>
            <div className='input-group'>
                <label htmlFor="">Phone</label>
                <input type="text" value={updatePhone} onChange={(e) => setUpdatePhone(e.target.value)} readOnly/>
            </div>
            <button onClick={() => navigate('/edit-profile')}>Edit Profile</button>
        </div>

        <div className='order-history-container'>
            <h2>Order History</h2>
            <ul className='order-list'>
                <li className='order-item'>
                    <span>🍔 Burger</span>
                    <span>$5.99</span>
                </li>
                <li className='order-item'>
                    <span>🍕 Pizza</span>
                    <span>$8.99</span>
                </li>
                <li className="order-item">
                    <span>🍣 Sushi</span>
                    <span>$12.99</span>
                </li>
            </ul>
        </div>
    </div>
  ) : (
    <p>Loading profile...</p>
  )
}

export default Profile