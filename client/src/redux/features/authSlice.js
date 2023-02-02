import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import * as api from '../api';

const initialState = {
    user: null,
    error: "",
    loading: false
}

export const login = createAsyncThunk("auth/login", async ({formValue, navigate, toast}, {rejectWithValue}) => {
    try {
        const response = await api.signIn(formValue);
        toast.success("Login Successfully!");
        navigate("/");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const register = createAsyncThunk("auth/register", async ({formValue, navigate, toast}, {rejectWithValue}) => {
    try {
        const response = await api.signUp(formValue);
        toast.success("Registered Successfully!");
        navigate("/");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            localStorage.setItem("profile", JSON.stringify({...action.payload}));
            state.user = action.payload;
        })
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        builder.addCase(register.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            localStorage.setItem("profile", JSON.stringify({...action.payload}));
            state.user = action.payload;
        })
        builder.addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
    }
});



export default authSlice.reducer;