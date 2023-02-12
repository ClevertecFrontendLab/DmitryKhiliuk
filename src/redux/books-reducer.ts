import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {booksAPI} from '../api';
import {BooksType} from '../common/types';

import {setAppStatusAC} from './app-reducer';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async (param, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading', error: null}))
    const res = await booksAPI.getBooks()

    try {


        return res.data
    } catch (err:any) {

        const error = err

        if(!error.response){
            throw err
        }
        return rejectWithValue(error.response.data)
    } finally {
        dispatch(setAppStatusAC({status: 'succeeded', error: 'error'}))
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
            .addCase(fetchBooks.rejected, (state, action) => {
                if (action.payload) {
                    // eslint-disable-next-line no-param-reassign
                   state.error! = action.error.message!;
                } else {
                    // eslint-disable-next-line no-param-reassign
                    state.error = action.error.message!;
                }
            })

    }
})

export const booksReducer = slice.reducer
