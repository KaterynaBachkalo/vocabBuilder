import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  fetchWordsCategories,
  createWord,
  addWord,
  editWord,
  fetchAllWords,
  fetchOwnWords,
  deleteWord,
  fetchStatistics,
  fetchTasks,
  postAnswers,
} from "./operations";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const INITIAL_STATE = {
  items: [],
  isLoading: false,
  error: null,
};

const wordsSlice = createSlice({
  name: "words",
  initialState: INITIAL_STATE,

  extraReducers: (builder) => {
    builder
      .addCase(fetchWordsCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.error = null;
      })

      .addCase(createWord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
        state.error = null;
      })

      .addCase(addWord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
        state.error = null;
      })

      .addCase(editWord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(
          (word) => word.id !== action.payload.id
        );
        state.error = null;
      })

      .addCase(fetchAllWords.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.error = null;
      })

      .addCase(fetchOwnWords.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.error = null;
      })

      .addCase(deleteWord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(
          (word) => word.id !== action.payload.id
        );
        state.error = null;
      })

      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.error = null;
      })

      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.error = null;
      })

      .addCase(postAnswers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
        state.error = null;
      })

      .addMatcher(
        isAnyOf(
          fetchWordsCategories.pending,
          createWord.pending,
          addWord.pending,
          editWord.pending,
          fetchAllWords.pending,
          fetchOwnWords.pending,
          deleteWord.pending,
          fetchStatistics.pending,
          fetchTasks.pending,
          postAnswers.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          fetchWordsCategories.rejected,
          createWord.rejected,
          addWord.rejected,
          editWord.rejected,
          fetchAllWords.rejected,
          fetchOwnWords.rejected,
          deleteWord.rejected,
          fetchStatistics.rejected,
          fetchTasks.rejected,
          postAnswers.rejected
        ),
        handleRejected
      );
  },
});
// Редюсер слайсу
export const wordReducer = wordsSlice.reducer;
