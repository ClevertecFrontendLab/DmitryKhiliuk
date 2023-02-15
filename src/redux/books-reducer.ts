import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {booksAPI} from '../api';
import {BooksType, ErrorType} from '../common/types';

import {setAppStatusAC} from './app-reducer';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async (param, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading', error: null}))
    try {
        const res = await booksAPI.getBooks()
        dispatch(setAppStatusAC({status: 'succeeded', error: 'error'}))
        return res.data
    } catch (err:any) {
        dispatch(setAppStatusAC({status: 'failed', error: 'error'}))
        const error = err
        console.log(err)
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
                // eslint-disable-next-line no-param-reassign
                state.content  = action.payload
            })
            .addCase(fetchBooks.rejected, (state, action:any) => {
                console.log(action.error)
                // eslint-disable-next-line no-param-reassign
                state.error = action.error.message
            })

    }
})

export const booksReducer = slice.reducer
