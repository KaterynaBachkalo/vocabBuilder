export const selectWords = (state) => state.words.items;

export const selectWordsCategories = (state) => state.words.categories;

export const selectIsLoading = (state) => state.words.isLoading;

export const selectError = (state) => state.words.error;

export const selectStatisticNumber = (state) => state.words.quantity;

export const selectCurrentPage = (state) => state.words.currentPage;
