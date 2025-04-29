import React, { useEffect, useState } from 'react'
import './EditProfile.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProfile = ({currentUser, setCurrentUser}) => {
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editPhone, setEditPhone] = useState("");
    const [newProfilePic, setNewProfilePic] = useState(null);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    
    useEffect(() => {
        if (currentUser) {
            setEditName(currentUser.name);
            setEditEmail(currentUser.email);
            setEditPhone(currentUser.phone);
        }
    }, [currentUser]);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token"); // ดึง token จาก localStorage
        if (!token) {
            alert("Authentication token not found. Please log in again.");
            navigate("/login");
            return;
        }

        if (!currentUser?.id) {
            alert("User ID is missing. Please refresh and try again.");
            return;
        }


        const formData = new FormData();
        formData.append('userId', currentUser.id);
        formData.append('name', editName);
        formData.append('email', editEmail);
        formData.append('phone', editPhone);

        if (newProfilePic) {
            formData.append('profilePic', newProfilePic);
        }

        console.log("FormData:", [...formData.entries()]);

        try {
            const token = localStorage.getItem("token");  // ✅ ประกาศตัวแปรก่อนใช้
            console.log("Token:", token); 
            
            const res = await axios.post("http://localhost:5000/update-profile", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            });

            if (res.data.success) {

                if (res.data.token) {
                    localStorage.setItem("token", res.data.token);
                }


                setCurrentUser(res.data.updatedUser);
                navigate("/profile");
            }
            else {
                setMessage("Failed to update profile");
            }
            console.log("Profile updated:", response.data);
            console.log("Token from localStorage:", token);
        } catch (error) {
            console.log(error);
            setMessage("Failed to update profile", error);
        }
    }
    
    
    // const [editName, setEditName] = useState("");
    // const [editEmail, setEditEmail] = useState("");
    // const [editPhone, setEditPhone] = useState("");
    // const [newProfilePic, setNewProfilePic] = useState(null);
    // // const [previewPic, setPreviewPic] = useState(currentUser.profile_pic || "");
    // const [message, setMessage] = useState("");
    // const navigate = useNavigate();

    // useEffect(() => {
    //     if (currentUser) {
    //         setEditName(currentUser.name);
    //         setEditEmail(currentUser.email);
    //         setEditPhone(currentUser.phone);
    //     }
    // }, [currentUser]);


    // const handleProfileUpdate = async (e) => {
    //     e.preventDefault();

    //     if (!currentUser?.id) {
    //         alert("Invalid user ID");
    //         return;
    //     }
    

    //     const formData = new FormData();
    //     formData.append("userId", currentUser.id);
    //     formData.append("name", editName);
    //     formData.append("email", editEmail);
    //     formData.append("phone", editPhone);

    //     if (newProfilePic) {
    //         formData.append("profilePic", newProfilePic);
    //     }

    //     try {
    //         const res = await axios.post("http://localhost:5000/update-profile", formData, {
    //             headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem("token")}` },
    //         });

    //         if (res.data.success) {
    //             alert(res.data.message);

    //             if (res.data.token) {
    //                 localStorage.setItem("token", res.data.token);
    //             }

    //             const updatedUser = {
    //                 ...currentUser,
    //                 name: res.data.user.name,
    //                 email: res.data.user.email,
    //                 phone: res.data.user.phone,
    //                 profile_pic: res.data.user.profile_pic,
    //                 // profile_pic: res.data.newProfilePic || currentUser.profile_pic,
    //             };

    //             localStorage.setItem("user", JSON.stringify(updatedUser));
                
    //             setCurrentUser(updatedUser);

    //             window.location.reload();
    //             setMessage("Updated profile successfully");
    //         }
    //         else {
    //             setMessage("Failed to update profile");
    //         }
    //     } catch (error) {
    //         console.error("Error updating profile: ", error);
    //         // alert();
    //         setMessage("Failed to update profile");
    //     }

    //     console.log("Current User:", currentUser);
    //     console.log("Sending formData:", [...formData.entries()]);
    // }
    

    return (
        <div className='edit-profile-page'>
            <h2>Edit Profile</h2>
            {message && <p className='text-message'>{message}</p>}
            <form onSubmit={handleProfileUpdate}>
                <div className="edit-profile-container">
                    <div className='edit-profile-pic-container'>
                        {/* <img src={currentUser.profile_pic} alt="Profile" className='edit-profile-pic' /> */}
                        <img src={currentUser.profile_pic || "/default-profile.png"} alt="" className='edit-profile-pic' />
                        <div className='file-upload-container'>
                            <input 
                                type="file" 
                                accept="image/*" 
                                // onChange={(e) => setNewProfilePic(e.target.files[0])}
                                onChange={(e) => {
                                    const file = e.target.files[0];

                                    if (file) {
                                        setNewProfilePic(file);
                                        console.log("Selected file:", file);
                                    }
                                }}
                                id='fileInput'
                                hidden 
                            />
                            <label htmlFor="fileInput" className='custom-file-upload'>
                                {newProfilePic ? newProfilePic.name : "Change Image"}
                            </label>
                        </div>
                    </div>
                    <div className='edit-profile-input-container'>
                        <div className='edit-input-group'>
                            <label>Name</label>
                            <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} />
                        </div>
                        <div className='edit-input-group'>
                            <label>Email</label>
                            <input type="text" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
                        </div>
                        <div className='edit-input-group'>
                            <label>Phone</label>
                            <input type="text" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className='edit-button-container'>
                    <button type="submit" className='save-button'>Save</button>
                    <button type="button" className='cancle-button' onClick={() => navigate('/profile')}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default EditProfile