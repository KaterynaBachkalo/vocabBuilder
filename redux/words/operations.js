import { createAsyncThunk } from "@reduxjs/toolkit";
import { vocabBuilderInstance } from "../auth/operations";

export const fetchWordsCategories = createAsyncThunk(
  "words/fetchWordsCategories",
  async (_, thunkAPI) => {
    try {
      const response = await vocabBuilderInstance.get("/words/categories");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createWord = createAsyncThunk(
  "words/createWord",
  async ({ en, ua, category, isIrregular }, thunkAPI) => {
    try {
      const response = await vocabBuilderInstance.post("/words/create", {
        en,
        ua,
        category,
        isIrregular,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addWord = createAsyncThunk(
  "words/addWord",
  async (id, thunkAPI) => {
    try {
      const response = await vocabBuilderInstance.post(`/words/add/${id}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editWord = createAsyncThunk(
  "words/editWord",
  async ({ id, en, ua, category, isIrregular }, thunkAPI) => {
    try {
      const response = await vocabBuilderInstance.patch(`/words/edit/${id}`, {
        en,
        ua,
        category,
        isIrregular,
      });
      console.log("editWord", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAllWords = createAsyncThunk(
  "words/fetchAllWords",
  async (page, thunkAPI) => {
    try {
      const response = await vocabBuilderInstance.get(
        `/words/all?page=${page}`
      );
      //   console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchOwnWords = createAsyncThunk(
  "words/fetchOwnWords",
  async (page, thunkAPI) => {
    try {
      const response = await vocabBuilderInstance.get(
        `/words/own?page=${page}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteWord = createAsyncThunk(
  "words/deleteWord",
  async (id, thunkAPI) => {
    try {
      const response = await vocabBuilderInstance.delete(`/words/delete/${id}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchStatistics = createAsyncThunk(
  "words/fetchStatistics",
  async (_, thunkAPI) => {
    try {
      const response = await vocabBuilderInstance.get("/words/statistics");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchTasks = createAsyncThunk(
  "words/fetchTasks",
  async (_, thunkAPI) => {
    try {
      const response = await vocabBuilderInstance.get("/words/tasks");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const postAnswers = createAsyncThunk(
  "words/postAnswers",
  async (arr, thunkAPI) => {
    try {
      const response = await vocabBuilderInstance.post("/words/answers", arr);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
