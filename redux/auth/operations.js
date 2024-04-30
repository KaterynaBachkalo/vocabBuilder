import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const vocabBuilderInstance = axios.create({
  baseURL: "https://vocab-builder-backend.p.goit.global/api",
});

// Utility to add JWT
const setToken = (token) => {
  vocabBuilderInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  // vocabBuilderInstance.defaults.headers.common.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmFkNmMyOWFhNTFhZWJhOTFlMzg0NiIsImlhdCI6MTcxNDQ2NTYxOSwiZXhwIjoxNzE0NTQ4NDE5fQ.kIaWnAnwmQR77VODdIVl60FAkhIKavyN9XBUOlz02xA`;
};

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (formData, thunkAPI) => {
    try {
      const response = await vocabBuilderInstance.post(
        "/users/signup",
        formData
      );
      setToken(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.status);
    }
  }
);

export const logInThunk = createAsyncThunk(
  "auth/signin",
  async (formData, thunkAPI) => {
    try {
      const response = await vocabBuilderInstance.post(
        "/users/signin",
        formData
      );
      setToken(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.status);
    }
  }
);

export const logOutThunk = createAsyncThunk(
  "auth/signout",
  async (_, thunkAPI) => {
    try {
      await vocabBuilderInstance.post("/users/signout");
      // clearToken();
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const currentUserThunk = createAsyncThunk(
  "auth/current",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();

    const token = state.auth.token;
    try {
      setToken(token);
      const response = await vocabBuilderInstance.get("/users/current");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      if (!token) return false;
      return true;
    },
  }
);
