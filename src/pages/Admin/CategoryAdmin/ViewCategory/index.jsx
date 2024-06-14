import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CustomInput from '../../../Auth/CustomInput';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { editCategory } from '../../../../redux/apis/category-api';
import './style.scss';

const ViewCategory = () => {
    const { categoryId } = useParams();
    const [isEditMode, setIsEditMode] = useState(false);

    const category = JSON.parse(localStorage.getItem('categories')).find(
        category => category._id === categoryId
    );

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: category.name || ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
        }),
        onSubmit: (values) => {
            dispatch(editCategory({ categoryId, data: values }));
            setIsEditMode(false);
            // Optionally update localStorage
            const categories = JSON.parse(localStorage.getItem('categories'));
            const updatedCategories = categories.map(cat =>
                cat._id === categoryId ? { ...cat, ...values } : cat
            );
            localStorage.setItem('categories', JSON.stringify(updatedCategories));
        },
    });

    const handleEditClick = () => {
        setIsEditMode(true);
        formik.setValues({ name: category.name }); // Set form values to current category values
    };

    const handleCancelClick = () => {
        setIsEditMode(false);
        formik.resetForm(); // Reset form to initial values
    };

    return (
        <div className="create-category-page">
            <div className="header">
                <h2>
                    <Link to="/admin/category">Category</Link> &gt; {categoryId} {isEditMode && <span>&gt; Edit</span>}
                </h2>
                {!isEditMode && (
                    <button className="edit-btn" onClick={handleEditClick}>Edit</button>
                )}
            </div>
            <div className="content">
                <form id="category-form" className="category-form" onSubmit={formik.handleSubmit}>
                    {
                        isEditMode && (
                            <div className="button-group">
                                <button type="button" className="cancel-btn" onClick={handleCancelClick}>Cancel</button>
                                <button type="submit" className="save-btn">Save</button>
                            </div>
                        )
                    }

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
                                <h3>General Information</h3>
                                <label htmlFor="name">Category Name</label>
                                {isEditMode ? (
                                    <>
                                        <CustomInput
                                            type="text"
                                            name="name"
                                            placeholder="name"
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                    </>
                                ) : (
                                    <CustomInput
                                        type="text"
                                        name="name"
                                        value={category.name}
                                        disabled
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ViewCategory;
