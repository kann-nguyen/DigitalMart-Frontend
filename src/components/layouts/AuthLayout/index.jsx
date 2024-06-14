import { Outlet } from "react-router-dom";
import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import "./styles.css"
import { useAuth } from "./../../hooks/AuthContext";
const AuthLayout = () => {
    return (
        <div>
            
            <header className="header-upper py-3 mb-5">
                <div className="container-xxl">
                    <div className="row align-items-center">
                        <div className="col-2">
                            <h2>
                                <Link className="text-white" to={'/'} >DigitalMart.</Link>
                            </h2>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <img src="../images/authpic.png" alt="Picture" className="image d-flex justify-content-center align-items-center" />
                    </div>
                    <div className="col-6">
                        <Outlet />
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default AuthLayout;