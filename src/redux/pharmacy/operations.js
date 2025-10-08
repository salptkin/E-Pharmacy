import { createAsyncThunk } from "@reduxjs/toolkit";
import instance, { setToken } from "../instance";
import { toast } from "react-toastify";

export const getCustomerReviews = createAsyncThunk(
  "reviews",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { limit = 3 } = body;
      const response = await instance.get(`/customer-reviews?limit=${limit}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        toast.error("Failed to load customer reviews.");
      } else {
        toast.error("Network error. Please check your connection.");
      }
      return rejectWithValue(error.message);
    }
  }
);

export const getNearestStores = createAsyncThunk(
  "nearest-stores",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { limit = 6 } = body;
      const response = await instance.get(`/stores/nearest?limit=${limit}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        toast.error("Failed to load nearest stores.");
      } else {
        toast.error("Network error. Please check your connection.");
      }
      return rejectWithValue(error.message);
    }
  }
);

export const getAllStores = createAsyncThunk(
  "all-stores",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { limit = "" } = body;
      const response = await instance.get(`/stores?limit=${limit}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        toast.error("Failed to load stores");
      } else {
        toast.error("Network error. Please check your connection.");
      }
      return rejectWithValue(error.message);
    }
  }
);

export const getSearchProducts = createAsyncThunk(
  "products",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { category = "", name = "", page = "", limit = "" } = body;
      const response = await instance.get(
        `/products?category=${category}&name=${name}&page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        toast.error("Failed to load products.");
      } else {
        toast.error("Network error. Please check your connection.");
      }
      return rejectWithValue(error.message);
    }
  }
);

export const getProductById = createAsyncThunk(
  "products/:id",
  async (id, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        toast.error("Failed to load product details");
      } else {
        toast.error("Network error. Please check your connection.");
      }
      return rejectWithValue(error.message);
    }
  }
);

export const getCartItems = createAsyncThunk(
  "cart-items",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      if (!token) {
        toast.error("Please login to view your cart.");
        return rejectWithValue("No token available.");
      }
      setToken(token);
      const response = await instance.get("/cart");
      return response.data;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          toast.error("Session expired. Please login again.");
        } else {
          toast.error("Failed to load cart items");
        }
      } else {
        toast.error("Network error. Please check your connection.");
      }
      return rejectWithValue(error.message);
    }
  }
);

export const updateCart = createAsyncThunk(
  "cart-update",
  async (body, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      if (!token) {
        toast.error("Please login to update your cart.");
        return rejectWithValue("No token available.");
      }
      setToken(token);
      const response = await instance.put("/cart/update", body);
      toast.success("Cart updated successfully");
      return response.data;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          toast.error("Session expired. Please login again.");
        } else {
          toast.error("Failed to update cart.");
        }
      } else {
        toast.error("Network error. Please check your connection.");
      }
      return rejectWithValue(error.message);
    }
  }
);

export const cartCheckout = createAsyncThunk(
  "cart-checkout",
  async (body, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      if (!token) {
        toast.error("Please login to checkout.");
        return rejectWithValue("No token available.");
      }
      setToken(token);
      const response = await instance.post("/cart/checkout", body);
      toast.success("The order is successful. Wait for a call to confirm.");
      return response.data;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          toast.error("Session expired. Please login again.");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      } else {
        toast.error("Network error. Please check your connection.");
      }
      return rejectWithValue(error.message);
    }
  }
);

export const deleteFromCart = createAsyncThunk(
  "cart-remove",
  async (id, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      if (!token) {
        toast.error("Please login to remove items from cart.");
        return rejectWithValue("No token available.");
      }
      setToken(token);
      const response = await instance.delete(`/cart/remove/${id}`);
      toast.success("Product removed from cart.");
      return response.data;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          toast.error("Session expired. Please login again.");
        } else {
          toast.error("Failed to remove product from cart.");
        }
      } else {
        toast.error("Network error. Please check your connection.");
      }
      return rejectWithValue(error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart-add",
  async (body, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      if (!token) {
        toast.error("Please login to add items to cart.");
        return rejectWithValue("No token available.");
      }
      setToken(token);
      const response = await instance.patch("/cart/add", body);
      toast.success("Product added to cart.");
      return response.data;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          toast.error("Session expired. Please login again.");
        } else {
          toast.error("Failed to add product to cart.");
        }
      } else {
        toast.error("Network error. Please check your connection.");
      }
      return rejectWithValue(error.message);
    }
  }
);

export const decreaseQuantity = createAsyncThunk(
  "cart-decrease",
  async (body, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      if (!token) {
        toast.error("Please login to update cart.");
        return rejectWithValue("No token available.");
      }
      setToken(token);
      const response = await instance.patch("/cart/decrease", body);
      toast.success("Product quantity decreased.");
      return response.data;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          toast.error("Session expired. Please login again.");
        } else {
          toast.error("Failed to decrease product quantity.");
        }
      } else {
        toast.error("Network error. Please check your connection.");
      }
      return rejectWithValue(error.message);
    }
  }
);