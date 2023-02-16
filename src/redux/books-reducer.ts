import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {booksAPI} from '../api';
import {BooksType} from '../common/types';

import {setAppStatusAC} from './app-reducer';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async (param, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await booksAPI.getBooks()

        dispatch(setAppStatusAC({status: 'succeeded'}))

        return res.data
    } catch (err:any) {
        dispatch(setAppStatusAC({status: 'failed'}))
        const error = err

        if(!error.response){
            throw err
        }

        return rejectWithValue(error.response.data.payload)
    }
})

export const slice = createSlice({
    name: 'books',
    initialState: {
        content: [] as BooksType,
        error: ''
    },
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(fetchBooks.fulfilled, (state, action) => {
                const esState = state

                esState.content  = action.payload
            })
            .addCase(fetchBooks.rejected, (state, action:any) => {
                const esState = state

                esState.error = action.error.message
            })

    }
})

export const booksReducer = slice.reducer
