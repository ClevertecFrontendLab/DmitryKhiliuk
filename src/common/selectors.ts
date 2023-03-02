import {AppRootStateType} from '../redux/store';

export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn
export const selectBooks = (state: AppRootStateType) => state.books.content
export const selectCategories = (state: AppRootStateType) => state.navigation
export const selectStatus = (state: AppRootStateType) => state.app.status
export const selectBook = (state: AppRootStateType) => state.book.content
export const selectBooksId = (state: AppRootStateType, id: number) => state.books.content.find((el) => el.id === id)
