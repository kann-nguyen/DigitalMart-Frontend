import React from 'react';
import './styles.css';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/apis/user-api';
import { useNavigate } from 'react-router-dom'; // Import useHistory

export const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    }

    const handleCancel = () => {
        window.history.back();
    }

    return (
        <div className="logout-container">
            <div className="logout-box">
                <div className="logout-title">
                    <p>Are you sure you want to log out?</p>
                </div>
                <div className="button-group">
                    <div className="row">
                        <div className="col-5">
                            <button className="button btn-yes" onClick={handleLogout}>Yes</button>
                        </div>
                        <div className="col-2"></div>
                        <div className="col-5">
                            <button className="button btn-no" onClick={handleCancel}>No</button>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default Logout;
