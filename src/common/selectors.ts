import {AppRootStateType} from '../redux/store';

export const selectBooks = (state: AppRootStateType) => state.books
export const selectCategories = (state: AppRootStateType) => state.navigation
