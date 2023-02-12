import {AppRootStateType} from '../redux/store';

export const selectBooks = (state: AppRootStateType) => state.books.content
export const selectBooksError = (state: AppRootStateType) => state.books.error
export const selectCategories = (state: AppRootStateType) => state.navigation
export const selectStatus = (state: AppRootStateType) => state.app.status
export const selectBook = (state: AppRootStateType) => state.book.content
export const selectBookError = (state: AppRootStateType) => state.book.error
