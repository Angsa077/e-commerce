import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../actions/api";
import jwtDecode from "jwt-decode";

const initialState = {
    token: localStorage.getItem("token"),
    name: "",
    email: "",
    _id: "",
    registerStatus: "",
    registerError: "",
    loginStatus: "",
    loginError: "",
    userLoaded: false,
};

export const register = createAsyncThunk(
    "auth/register",
    async (values, { rejectWithValue }) => {
        try {
            const token = await axios.post(`${url}/register`, {
                name: values.name,
                email: values.email,
                password: values.password,
                confirmPassword: values.confirmPassword,
            });

            localStorage.setItem("token", JSON.stringify(token.data));
            return token.data;
        } catch (error) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);  

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loadUser(state, action) {
            if (action.payload) {
                const token = localStorage.getItem("token");
                const user = jwtDecode(token);

                return {
                    ...state,
                    token,
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    userLoaded: true,
                };
            }
        },
        logoutUser(state, action) {
            localStorage.removeItem("token");

            return {
                ...state,
                token: "",
                name: "",
                email: "",
                _id: "",
                registerStatus: "",
                registerError: "",
                loginStatus: "",
                loginError: "",
                userLoaded: false,
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state, action) => {
            return { ...state, registerStatus: "pending" }
        });
        builder.addCase(register.fulfilled, (state, action) => {
            if (action.payload) {
                const token = localStorage.getItem("token");
                const user = jwtDecode(token);

                return {
                    ...state,
                    token: token,
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    registerStatus: "success",
                };
            } else return state;
        });
        builder.addCase(register.rejected, (state, action) => {
            return { ...state, registerStatus: "rejected", registerError: action.payload }
        })
    },
});

export const { loadUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
