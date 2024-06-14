import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER } from "../config";
import { toast } from "react-toastify";
import authAxios from "../authAxios";

export const login = createAsyncThunk(
    'login',
    async (loginInfo, { rejectWithValue }) => {
        const response = await axios.post(`${SERVER}/user/login`, loginInfo);
        if (response.status < 200 || response.status >= 300) {
            rejectWithValue(response);
        }
        localStorage.setItem('currentUser', JSON.stringify(response.data.user));
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        return response.data.user;
    }
)

export const signup = createAsyncThunk(
    'signup',
    async (signupInfo, { rejectWithValue }) => {
        const response = await axios.post(`${SERVER}/user/signup`, signupInfo)
        if (response.status < 200 || response.status >= 300) {
            rejectWithValue(response);
        }
        toast.success(response.data.notification);
    }
)

export const logout = createAsyncThunk(
    'logout',
    async (_, { rejectWithValue }) => {
        const response = await authAxios.post(`user/logout`, {});
        if (response.status < 200 || response.status >= 300) {
            rejectWithValue(response);
        }
        localStorage.clear();
    }
)

export const updateUserInfo = createAsyncThunk(
    'update-user-info',
    async (data, { rejectWithValue }) => {
        const response = await authAxios.put(`user/updateInfo`, data);
        if (response.status < 200 || response.status >= 300) {
            rejectWithValue(response);
        }
        return response.data
    }
)

export const changePassword = createAsyncThunk(
    'change-password',
    async (data, { rejectWithValue }) => {
        const response = await authAxios.put('user/changePassword', data);
        if (response.status < 200 || response.status >= 300) {
            rejectWithValue(response);
        }
        toast.success(response.data.notification);
    }
)

export const changeAvatar = createAsyncThunk(
    'change-avatar',
    
    async (data, { rejectWithValue }) => {
        const formData = new FormData();
        formData.append('avatar', data);
        const response = await authAxios.put('user/changeAvatar', formData);
        if (response.status < 200 || response.status >= 300) {
            rejectWithValue(response)
        }
        return response.data.url;
    }
)

export const forgotPassword = createAsyncThunk(
    'forgot-password',
    
    async (data, { rejectWithValue }) => {
        const response = await authAxios.put('user/forgotPassword', data);
        if (response.status < 200 || response.status >= 300) {
            rejectWithValue(response)
        }
        return response.data.url;
    }
)

export const getNumberOfUsers = createAsyncThunk(
    'get-number-of-users',
    async (_, {rejectWithValue}) => {
        const response = await axios.get(`${SERVER}/user/number-of-customers`);
        if(response.status < 200 || response.status >= 300){
            rejectWithValue(response)
        }
        return response.data
    }
)