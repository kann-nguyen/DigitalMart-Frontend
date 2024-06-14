import React from 'react';
import BreadCrumb from "../../../components/common/BreadCrumb";
import Meta from "../../../components/common/Meta";
import { Link } from 'react-router-dom';
import CustomInput from "../CustomInput";
import "./styles.css";
import * as yup from "yup";
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { login } from './../../../redux/apis/user-api';

const loginSchema = yup.object({
    email: yup.string().email("Email should be valid"),
    password: yup.string().required("Password is required")
});

const Login = () => {

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            dispatch(login(values));
        }
    });

    return (
        <>
            <Meta title={"Login"} />

            <div className="container-xxl">
                <div className="row mt-5">
                        <div className="col-12">
                            <div className="auth-card">
                                <h3 className='text-center mb-3'>Login</h3>
                                <form action="" 
                                    onSubmit={formik.handleSubmit}
                                    className='d-flex flex-column gap-30'>
                                    <CustomInput 
                                        type="email"
                                        name="email"
                                        placeholder="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange("email")}
                                        onBlur={formik.handleBlur("email")}
                                    />
                                    <div className='error'>
                                        {formik.touched.email && formik.errors.email}
                                    </div>
                                    <CustomInput 
                                        type="password"
                                        name="password"
                                        placeholder="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange("password")}
                                        onBlur={formik.handleBlur("password")}
                                    />
                                    <div className='error'>
                                        {formik.touched.password && formik.errors.password}
                                    </div>
                                    <div>
                                        <Link to='/auth/forgot-password'>Forgot Password?</Link>

                                        <div className='mt-3 d-flex justify-content-center gap-15 align-items-center'>
                                            <button className='button border-0' type="submit">Login</button>
                                            <Link className='button signup' to='/auth/signup'>SignUp</Link>
                                        </div>
                                    </div>
                                </form>

                               
                            </div>
                        </div>
                    </div>
            </div>
            
        </>
    )
}

export default Login;

