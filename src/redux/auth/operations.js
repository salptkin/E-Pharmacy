import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instance, { clearToken, setToken } from "../instance";

export const registerThunk = createAsyncThunk(
  "register",
  async (body, { rejectWithValue }) => {
    try {
      const response = await instance.post("/user/register", body);
      setToken(response.data.token);
      localStorage.setItem("refreshToken", response.data.token);
      localStorage.setItem("accessToken", response.data.token);
      toast.success(`Registration successful! Welcome ${response.data.user.name}!`);
      return response.data;
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            toast.error("Validation error: please check your data.");
            break;
          case 409:
            toast.error("Error: User with this email already exists.");
            break;
          default:
            break;
        }
      }
      return rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  "login",
  async (body, { rejectWithValue }) => {
    try {
      const response = await instance.post("/user/login", body);
      setToken(response.data.token);
      localStorage.setItem("refreshToken", response.data.token);
      localStorage.setItem("accessToken", response.data.token);
      toast.success(`Welcome to E-Pharmacy ${response.data.user.name}!`);
      return response.data;
    } catch (error) {
      toast.error("Email or password is invalid.");
      return rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "logout",
  async (_, { rejectWithValue }) => {
    try {
      await instance.post("/user/logout");
      clearToken();
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            toast.error("You are not authorized to log out.");
            break;
          default:
            toast.error("Something went wrong. Please try again later.");
        }
      } else {
        toast.error("Network error. Please check your connection.");
      }
      return rejectWithValue(error.message);
    }
  }
);

export const getUserInfoThunk = createAsyncThunk(
  "user-info",
  async (_, { rejectWithValue, getState }) => {
    try {
      setToken(getState().auth.token);
      const response = await instance.get("/user/user-info");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const refreshUserThunk = createAsyncThunk(
  "refresh-user",
  async (_, { rejectWithValue, getState }) => {
    const token = getState().auth.token;
    if (!token) {
      return rejectWithValue("No token available.");
    }
    
    try {
      setToken(token);
      const response = await instance.get("/user/user-info");
      return response.data;
    } catch (error) {
      clearToken();
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      return rejectWithValue(error.message);
    }
  }
);