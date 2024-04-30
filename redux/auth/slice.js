import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  registerThunk,
  logInThunk,
  logOutThunk,
  currentUserThunk,
} from "./operations";
// import { toast } from "react-toastify";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;

  //   if (state.error === 400) {
  //     toast.error("The email or password are incorrect", {
  //       position: "top-center",
  //       autoClose: 2000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored",
  //     });
  //   }
};

const handleFulfilled = (state, action) => {
  state.token = action.payload.token;
  state.user = action.payload.user;
  state.isLoading = false;
  state.authenticated = true;
  state.error = null;
};

const INITIAL_STATE = {
  token: null,
  user: {
    email: null,
    name: null,
  },
  authenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,

  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.fulfilled, handleFulfilled)

      .addCase(logInThunk.fulfilled, handleFulfilled)

      .addCase(currentUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authenticated = true;
        state.user = action.payload;
        state.error = null;
        if (state.token === null) return;
      })

      .addCase(logOutThunk.fulfilled, (state, action) => {
        state.token = null;
        state.user = { email: null, name: null };
        state.isLoading = false;
        state.authenticated = false;
        state.error = null;
      })
      .addMatcher(
        isAnyOf(
          logOutThunk.pending,
          logInThunk.pending,
          currentUserThunk.pending,
          registerThunk.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          logOutThunk.rejected,
          logInThunk.rejected,
          currentUserThunk.rejected,
          registerThunk.rejected
        ),
        handleRejected
      );
  },
});

export const authReducer = authSlice.reducer;
