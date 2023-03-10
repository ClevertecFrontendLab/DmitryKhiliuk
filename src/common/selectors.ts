import {AppRootStateType} from '../redux/store';

export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn
export const selectErrorStatus = (state: AppRootStateType) => state.auth.error
export const selectBooks = (state: AppRootStateType) => state.books.content
export const selectCategories = (state: AppRootStateType) => state.navigation
export const selectStatus = (state: AppRootStateType) => state.app.status
export const selectBook = (state: AppRootStateType) => state.book.content
export const selectDataReg = (state: AppRootStateType) => state.auth.registrationDate
export const selectSuccessStatus = (state: AppRootStateType) => state.auth.status
export const selectConfirmedStatus = (state: AppRootStateType) => state.auth.confirmed
export const selectBooksId = (state: AppRootStateType, id: number) => state.books.content.find((el) => el.id === id)
