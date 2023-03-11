import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import {combineReducers, configureStore} from '@reduxjs/toolkit';

import {appReducer} from './app-reducer';
import {authReducer} from './auth-reducer';
import {bookReducer} from './book-reducer';
import {booksReducer} from './books-reducer';
import {navReducer} from './nav-reducer';

export const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    books: booksReducer,
    book: bookReducer,
    navigation: navReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
