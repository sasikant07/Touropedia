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

export const googleSignIn = createAsyncThunk("auth/googleSignIn", async ({result, navigate, toast}, {rejectWithValue}) => {
    try {
        const response = await api.signUp(result);
        toast.success("Google Sign-in Successfully!");
        navigate("/");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLogout: (state) => {
            localStorage.clear();
            state.user = null;
        },
    },
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
        builder.addCase(googleSignIn.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(googleSignIn.fulfilled, (state, action) => {
            state.loading = false;
            localStorage.setItem("profile", JSON.stringify({...action.payload}));
            state.user = action.payload;
        })
        builder.addCase(googleSignIn.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
    }
});

export const {setUser, setLogout} = authSlice.actions;

export default authSlice.reducer;