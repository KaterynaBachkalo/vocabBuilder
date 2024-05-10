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
import ModalError from "../../components/ModalError";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const INITIAL_STATE = {
  itemsOwn: [],
  itemsAll: [],
  tasks: [],
  answers: [],
  isLoading: false,
  error: null,
  quantity: null,
  currentPage: 1,
  categories: [],
};

const wordsSlice = createSlice({
  name: "words",
  initialState: INITIAL_STATE,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchWordsCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
        state.error = null;
      })

      .addCase(createWord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.itemsOwn.push(action.payload);
        state.error = null;
      })

      .addCase(addWord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.itemsOwn.push(action.payload);
        state.error = null;
      })

      .addCase(editWord.fulfilled, (state, action) => {
        return {
          ...state,
          items: state.itemsOwn.map((word) => {
            console.log("word", word);
            if (word.id === action.payload.id) {
              return action.payload;
            }
            return word;
          }),
          isLoading: false,
          error: null,
        };
      })

      .addCase(fetchAllWords.fulfilled, (state, action) => {
        state.isLoading = false;
        state.itemsAll = action.payload;
        state.error = null;
      })

      .addCase(fetchOwnWords.fulfilled, (state, action) => {
        state.isLoading = false;
        state.itemsOwn = action.payload;
        state.error = null;
      })

      .addCase(deleteWord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.itemsOwn = state.items.filter(
          (word) => word.id !== action.payload.id
        );
        state.error = null;
      })

      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quantity = action.payload;
        state.error = null;
      })

      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
        state.error = null;
      })

      .addCase(postAnswers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.answers.push(action.payload);
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
export const { setLoading, setCurrentPage } = wordsSlice.actions;
// Редюсер слайсу
export const wordReducer = wordsSlice.reducer;
