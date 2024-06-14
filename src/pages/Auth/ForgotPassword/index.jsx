import React from 'react';
import BreadCrumb from "../../../components/common/BreadCrumb";
import Meta from "../../../components/common/Meta";
import { Link } from 'react-router-dom';
import CustomInput from "../CustomInput";
import "./styles.css";
import * as yup from "yup";
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { forgotPassword } from "./../../../redux/apis/user-api";

const forgotPasswordSchema = yup.object({
    email: yup.string().email("Email should be valid").required("Email is required")
});

const ForgotPassword = () => {

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: forgotPasswordSchema,
        onSubmit: (values) => {
            dispatch(forgotPassword(values));
        }
    });
    return (
        <>
            <Meta title={"Forgot Password"} />

            <div className="container-xxl">
            <div className="row">
                        <div className="col-12">
                            <div className="auth-card">
                                <h3 className='text-center mb-3'>Forgot Password</h3>
                                <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-30'>
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
                                    <div>
                                        <div className='mt-3 d-flex justify-content-center gap-15 align-items-center'>
                                            <button className='button login' type="submit">Submit</button>
                                            <Link className='button login' to='/auth'>Back to Login Page</Link>
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

export default ForgotPassword;