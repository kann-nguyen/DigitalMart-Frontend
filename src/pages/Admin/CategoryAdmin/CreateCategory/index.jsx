import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import CustomInput from '../../../Auth/CustomInput';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createCategory } from "../../../../redux/apis/category-api";
import './style.scss';

const CreateCategory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: "",
            image: null
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            image: Yup.mixed().required("Image is required")
        }),
        onSubmit: (values) => {
            dispatch(createCategory(values));
        }
    });


    const handleFileChange = (event) => {
        formik.setFieldValue("image", event.currentTarget.files[0]);
    };

    return (
        <div className="create-category-page">
            <div className="header">
                <h2>
                    <Link to='/admin/category'>Category</Link> &gt; New Category
                </h2>
            </div>
            <div className="content">
                <form id="category-form" onSubmit={formik.handleSubmit} className="category-form">
                    <div className="button-group">
                        <Link to='/admin/category' className="cancel-btn-link">
                            <button className="cancel-btn">X Cancel</button>
                        </Link>
                        <button className="add-btn" type="submit">+ Add</button>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="images-section">
                                <h3>Images</h3>
                                <div className="image-upload-box">
                                    {formik.values.image ? (
                                        <img src={URL.createObjectURL(formik.values.image)} alt="Preview" />
                                    ) : (
                                        <img src="https://via.placeholder.com/150" alt="Upload" />
                                    )}
                                    <input 
                                        type="file" 
                                        id="image" 
                                        name="image" 
                                        onChange={handleFileChange} 
                                        accept="image/*"
                                        style={{ display: 'none' }} // Hide the input
                                    />
                                    <button type="button" onClick={() => document.getElementById('image').click()}>Add Image</button>
                                    {formik.touched.image && formik.errors.image ? (
                                        <div className='error'>{formik.errors.image}</div>
                                    ) : null}
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
                                    placeholder="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange("name")}
                                    onBlur={formik.handleBlur("name")}
                                />
                                <div className='error'>
                                    {formik.touched.email && formik.errors.email}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateCategory;
