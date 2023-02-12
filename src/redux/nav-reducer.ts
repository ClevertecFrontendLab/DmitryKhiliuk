import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {booksAPI} from '../api';
import {CategoriesType} from '../common/types';
import {setAppStatusAC} from "./app-reducer";


export const fetchCategories = createAsyncThunk<CategoriesType>('nav/fetchCategories', async(param, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading',  error: null}))
    const res = await booksAPI.getCategories()

    res.data.unshift({id: 99, name: 'Все  книги', path: 'all'})
    try {
        return res.data
    } catch(error) {
        return rejectWithValue(error)
    }

})

export const slice = createSlice({
    name: 'books',
    initialState: [] as CategoriesType,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchCategories.fulfilled, (state, action) => action.payload

    )
    }
})

export const navReducer = slice.reducer
