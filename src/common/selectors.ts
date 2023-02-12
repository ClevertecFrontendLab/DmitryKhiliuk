import {AppRootStateType} from '../redux/store';

export const selectBooks = (state: AppRootStateType) => state.books
export const selectCategories = (state: AppRootStateType) => state.navigation
export const selectStatus = (state: AppRootStateType) => state.app.status
export const selectBook = (state: AppRootStateType) => state.book
