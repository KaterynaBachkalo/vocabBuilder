import { createSelector } from "@reduxjs/toolkit";

const selectAuth = (state) => state.auth;

export const selectAuthToken = createSelector(selectAuth, (auth) => auth.token);

export const selectAuthUser = createSelector(selectAuth, (auth) => auth.user);

export const selectIsAuth = createSelector(
  selectAuth,
  (auth) => auth.authenticated
);

export const selectAuthIsLoading = createSelector(
  selectAuth,
  (auth) => auth.isLoading
);

export const selectAuthError = createSelector(
  selectAuth,
  (auth) => auth.console.error
);
