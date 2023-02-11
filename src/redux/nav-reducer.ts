import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {booksAPI} from '../api';
import {CategoriesType} from '../common/types';


export const fetchCategories = createAsyncThunk<CategoriesType>('nav/fetchCategories', async(param, {dispatch}) => {
    const res = await booksAPI.getCategories()
    console.log(res.data)
    try {
        return res.data
    } catch {
        return console.log('error')
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
