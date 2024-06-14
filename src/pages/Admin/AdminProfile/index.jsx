import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo, changeAvatar } from '../../../redux/apis/user-api';
import { toast } from 'react-toastify';
import { de } from '@faker-js/faker';
import "./styles.css";

export const AdminProfile = () => {

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user); // Assuming your user slice is named 'user'
  
  const [username, setUsername] = useState(user.username);
  const [email] = useState(user.email);
  const [phonenumber, setPhonenumber] = useState(user.phonenumber);
  const [gender, setGender] = useState(user.gender);
  const [profilePicture, setProfilePicture] = useState(user.avatar);
  const [isEditable, setIsEditable] = useState(false);

  const handleEditToggle = () => {
    setIsEditable(!isEditable);
  };

  const handlePictureChange = async (e) => {
    try {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const newAvatarUrl = await dispatch(changeAvatar(file)).unwrap();
        setProfilePicture(newAvatarUrl);
      }
    } catch (err) {
      //toast.error("Change avatar failed: " + err.message);
    }
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
        <div className="form-actions">
          <button className="edit-button" onClick={handleEditToggle}>
            {isEditable ? 'Cancel' : 'Edit Profile'}
          </button>
          {isEditable && (
            <button className="save-button" onClick={handleSave}>Save</button>
          )}
        </div>
        <div className="row">
          <div className="col-6">
            <div className='avatar'>
              <div className="avatar-container">
                <h5>Avatar</h5>
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="profile-picture-preview"
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
              <input
                type="file"
                id="avatarInput"
                style={{ display: 'none' }}
                onChange={handlePictureChange}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="general-infor">
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
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
