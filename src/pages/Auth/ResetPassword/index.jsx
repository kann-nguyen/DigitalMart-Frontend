import React from 'react';
import BreadCrumb from "../../../components/common/BreadCrumb";
import Meta from "../../../components/common/Meta";
import CustomInput from "../CustomInput";
import "./styles.css";
import * as yup from "yup";
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { changePassword } from './../../../redux/apis/user-api';

const resetPasswordSchema = yup.object({
    oldPassword: yup.string().required("Old Password is required"),
    newPassword: yup.string().required("New Password is required"),
    retypePassword: yup.string().required("Retype Password is required")
});

const ResetPassword = () => {

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            oldPassword: "",
            newPassword: "",
            retypePassword: ""
        },
        validationSchema: resetPasswordSchema,
        onSubmit: (values) => {
           dispatch(changePassword(values)); 
        }
    });
    return (
        <>
            <Meta title={"Change Password"} />
            <BreadCrumb title="Change Password" />

            <div className="container-xxl">
            <div className='login-wrapper py-5 home-wrapper-2'>
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className='text-center mb-3'>Change Password</h3>
                            <form action=""  onSubmit={formik.handleSubmit} className='d-flex flex-column gap-30'>
                                <CustomInput 
                                    type="password"
                                    name="oldPassword"
                                    placeholder="oldPassword"
                                    value={formik.values.oldPassword}
                                    onChange={formik.handleChange("oldPassword")}
                                    onBlur={formik.handleBlur("oldPassword")}
                                />
                                <div className='error'>
                                    {formik.touched.oldPassword && formik.errors.oldPassword}
                                </div>
                                <CustomInput 
                                    type="password"
                                    name="newPassword"
                                    placeholder="newPassword"
                                    value={formik.values.newPassword}
                                    onChange={formik.handleChange("newPassword")}
                                    onBlur={formik.handleBlur("newPassword")}
                                />
                                <div className='error'>
                                    {formik.touched.newPassword && formik.errors.newPassword}
                                </div>
                                <CustomInput 
                                    type="password"
                                    name="retypePassword"
                                    placeholder="retypePassword"
                                    value={formik.values.retypePassword}
                                    onChange={formik.handleChange("retypePassword")}
                                    onBlur={formik.handleBlur("retypePassword")}
                                />
                                <div className='error'>
                                    {formik.touched.retypePassword && formik.errors.retypePassword}
                                </div>

                                <div className='mt-3 d-flex justify-content-center gap-15 align-items-center'>
                                    <button className='button border-0' type="submit">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            
        </>
    )
}

export default ResetPassword;