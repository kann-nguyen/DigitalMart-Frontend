import React, { useState } from 'react';
import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout, updateUserInfo, changeAvatar } from '../../../redux/apis/user-api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { current } from '@reduxjs/toolkit';

export const MyProfile = () => {

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user); // Assuming your user slice is named 'user'


  const [username, setUsername] = useState(user.username);
  const [email] = useState(user.email);
  const [phonenumber, setPhonenumber] = useState(user.phonenumber);
  const [gender, setGender] = useState(user.gender);
  const [profilePicture, setProfilePicture] = useState(user.avatar);
  const [isEditable, setIsEditable] = useState(false);


  const handleLogout = () => {
    dispatch(logout())
  }
  const handlePictureChange = async (e) => {
    try {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const newAvatarUrl = await dispatch(changeAvatar(file)).unwrap();
        setProfilePicture(newAvatarUrl);
        user.avatar = newAvatarUrl;
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
    } catch (err) {
      //toast.error("Change avatar failed: " + err.message);
    }
  };

  const handleEditToggle = () => {
    setIsEditable(!isEditable);
  };

  const handleSave = async () => {
    const updatedUser = {
      username,
      phonenumber,
      gender,
    };

    try {
      await dispatch(updateUserInfo(updatedUser)).unwrap();
      setIsEditable(false);
    } catch (err) {
      toast.info('Failed to save the profile: ', err);
    }
  };



  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-form">
        <div className="row mt-3">
          <div className="col-6">
            <div className="avatar">
            <div className="form-group">
              <label>Avatar</label>
              <img
                src={profilePicture}
                alt="Profile"
                className="profile-picture-preview"
              />
              <input
                type="file"
                id="avatarInput"
                style={{ display: 'none' }}
                onChange={handlePictureChange}
              />
              {isEditable && (
                <button
                  className="change-avatar-button"
                  onClick={() => document.getElementById('avatarInput').click()}
                >
                  Change Avatar
                </button>
              )}

            </div>
            </div>
            
          </div>
          <div className="col-6">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                readOnly={!isEditable}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                readOnly
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>Phonenumber</label>
              <input
                type="text"
                value={phonenumber}
                onChange={(e) => setPhonenumber(e.target.value)}
                readOnly={!isEditable}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <div className="gender-options">
                <input
                  type="radio"
                  id="MALE"
                  name="gender"
                  value="MALE"
                  checked={gender === 'MALE'}
                  onChange={(e) => setGender(e.target.value)}
                  disabled={!isEditable}
                />
                <label htmlFor="MALE">Male</label>
                <input
                  type="radio"
                  id="FEMALE"
                  name="gender"
                  value="FEMALE"
                  checked={gender === 'FEMALE'}
                  onChange={(e) => setGender(e.target.value)}
                  disabled={!isEditable}
                />
                <label htmlFor="FEMALE">Female</label>
                <input
                  type="radio"
                  id="CUSTOM"
                  name="gender"
                  value="CUSTOM"
                  checked={gender === 'CUSTOM'}
                  onChange={(e) => setGender(e.target.value)}
                  disabled={!isEditable}
                />
                <label htmlFor="CUSTOM">Custom</label>
              </div>
            </div>
          </div>
        </div>


        <div className="form-actions">
          <button className="edit-button" onClick={handleEditToggle}>
            {isEditable ? 'Cancel' : 'Edit Profile'}
          </button>

          {isEditable 
          ? (<>
              <Link to='/change-password'>
                <button className="edit-button">Change Password</button>
              </Link>
              
              <button className="save-button" onClick={handleSave}>Save</button>
            </>
            ) 
          : (<button className="edit-button" onClick={handleLogout}>Logout</button>)}
        </div>

      </div>
    </div>
  );
};