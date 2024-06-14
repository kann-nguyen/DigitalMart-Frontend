import React from 'react';
import BreadCrumb from "../../../components/common/BreadCrumb";
import Meta from "../../../components/common/Meta";
import { Link } from 'react-router-dom';
import CustomInput from "../CustomInput";
import "./styles.css";
import * as yup from "yup";
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { signup } from './../../../redux/apis/user-api';

const signUpSchema = yup.object({
    username: yup.string().required("Username is required"),
    email: yup.string().email("Email should be valid").required("Email is required"),
    phonenumber: yup.string().required("Phonenumber is required"),
    password: yup.string().required("Password is required")
});

const SignUp = () => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            phonenumber: "",
            password: ""
        },
        validationSchema: signUpSchema,
        onSubmit: (values) => {
            console.log('Form Values:', values);  // Debug log
           dispatch(signup(values)); 
        }
    });

    return (
        <>
            <Meta title={"Sign Up"} />

            <div className="container-xxl">
            <div className="row">
                        <div className="col-12">
                            <div className="auth-card">
                                <h3 className='text-center mb-3'>Sign Up</h3>
                                <form 
                                    onSubmit={formik.handleSubmit}
                                    className='d-flex flex-column gap-30'>
                                    
                                    <CustomInput 
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        value={formik.values.username}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <div className='error'>
                                        {formik.touched.username && formik.errors.username}
                                    </div>

                                    <CustomInput 
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <div className='error'>
                                        {formik.touched.email && formik.errors.email}
                                    </div>

                                    <CustomInput 
                                        type="text"
                                        name="phonenumber"
                                        placeholder="Phone Number"
                                        value={formik.values.phonenumber}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <div className='error'>
                                        {formik.touched.phonenumber && formik.errors.phonenumber}
                                    </div>

                                    <CustomInput 
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <div className='error'>
                                        {formik.touched.password && formik.errors.password}
                                    </div>

                                    <div className='mt-3 d-flex justify-content-center gap-15 align-items-center'>
                                        <Link className='button signup' to='/auth'>Back to Login Page</Link>
                                        <button className='button border-0' type="submit">Sign Up</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
            </div>
        </>
    );
};

export default SignUp;
