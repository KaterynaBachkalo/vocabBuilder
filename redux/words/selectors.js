export const selectOwnWords = (state) => state.words.itemsOwn;

export const selectAllWords = (state) => state.words.itemsAll;

export const selectWordsCategories = (state) => state.words.categories;

export const selectIsLoading = (state) => state.words.isLoading;

export const selectError = (state) => state.words.error;

export const selectStatisticNumber = (state) => state.words.quantity;

export const selectCurrentPage = (state) => state.words.currentPage;

export const selectTasks = (state) => state.words.tasks;

export const selectAnswers = (state) => state.words.answers;
