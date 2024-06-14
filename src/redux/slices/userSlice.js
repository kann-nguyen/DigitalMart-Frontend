import { createSlice } from "@reduxjs/toolkit";
import { changeAvatar, login, updateUserInfo, signup, logout, changePassword, forgotPassword, getNumberOfUsers } from "../apis/user-api";
import { toast } from "react-toastify";
const currentUser = localStorage.getItem('currentUser');

const initialValue = {
    user: currentUser ? JSON.parse(currentUser) : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    numberOfUsers: null
}

export const userSlice = createSlice({
    name: "user",
    initialState: initialValue,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdUser = action.payload;

                if (state.isSuccess == true) {
                    toast.info("Please Verify Your Email To Complete Your Registration!");
                }
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;

                if (state.isError == true) {
                    toast.info(action.error);
                }
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.user = action.payload;
                if (state.isSuccess === true) {
                    toast.info("User Logged In Successfully!");

                    if (state.user.role === 'CUSTOMER') {
                        window.location.href = '/';
                    } else if (state.user.role === 'ADMIN') {
                        window.location.href = '/admin';
                    }
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;

                if (state.isError == true) {
                    toast.info("Email or Password is not corrrect!");
                }
            })
            .addCase(changePassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.user = action.payload;

                // if (state.isSuccess == true) {
                //     toast.info("Your Password Is Changed Successfully!");
                // }
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;

                if (state.isError == true) {
                    toast.info(action.error);
                }
            })
            .addCase(logout.fulfilled, (state) => {
                state.isSuccess = true;
                if (state.isSuccess == true) {
                    toast.info("You Logged Out Successfully!");
                    window.location.href = '/';
                }
            })
            .addCase(updateUserInfo.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(updateUserInfo.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.isError = false;
                const updatedUser = { ...state.user, ...action.payload };
                state.user = updatedUser;
                localStorage.setItem('currentUser', JSON.stringify(updatedUser));
                if (state.isSuccess == true) {
                    toast.info("Updated User Infor Successfully!");
                }
            })
            .addCase(updateUserInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;

            if(state.isError == true) {
                toast.info(action.error);
            }
        })
        .addCase(changeAvatar.pending, (state) => {
            state.isLoading = true;
            state.isSuccess=false;
            state.isError=false;
        })
        .addCase(changeAvatar.fulfilled, (state, action) => {
            state.isSuccess=true;
            state.isLoading=false;
            state.isError=false;

            // Update the user data in the state
            state.user.avatar = action.payload;

            // Update localStorage
            const updatedUser = { ...state.user, avatar: action.payload };
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            if(state.isSuccess == true) {
                toast.info("Changed Avatar Successfully!");
            }
        })
        .addCase(changeAvatar.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess=false;
            state.isError=true;
            state.message = action.payload;

                if (state.isError == true) {
                    toast.info(action.error);
                }
            })
            .addCase(forgotPassword.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.isError = false;
                if (state.isSuccess == true) {
                    toast.info("New password have send to your email!");
                }
            })
            .addCase(forgotPassword.rejected, (state) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;


                if (state.isError == true) {
                    toast.info("Email is not corrrect!");
                }
            })
            .addCase(getNumberOfUsers.fulfilled, (state, action) => {
                state.numberOfUsers = action.payload
            })
    }
});
export const { } = userSlice.actions;
export const userReducers = userSlice.reducer;
