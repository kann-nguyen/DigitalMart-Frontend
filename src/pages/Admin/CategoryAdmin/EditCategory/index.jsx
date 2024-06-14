import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import CustomInput from '../../../Auth/CustomInput';


import './style.scss';

const ViewCategory = () => {
    const { categoryId } = useParams();

    const category = JSON.parse(localStorage.getItem("categories")).find(
        category => category._id == categoryId
    );
    return (
        <div className="create-category-page">
            <div className="header">
                <h2>
                    <Link to='/admin/category'>Category</Link> &gt; ${categoryId}
                </h2>
                <button className="edit-btn">Edit</button>
            </div>
            <div className="content">
                <form id="category-form" className="category-form">
                    <div className="row">
                        <div className="col-6">
                            <div className="images-section">
                                <h3>Images</h3>
                                <div className="image-upload-box">
                                    {category.image && (
                                        <img src={category.image} alt="Category Image" />
                                    )}
                                </div>
                            </div>

                        </div>
                        <div className="col-6">
                            <div className="general-info-section">
                                <h3>General information</h3>
                                <label htmlFor="name">Category Name</label>
                                <CustomInput
                                    type="text"
                                    name="name"
                                    value={category.name}
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ViewCategory;
