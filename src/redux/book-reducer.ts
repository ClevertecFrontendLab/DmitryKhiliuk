import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

import {booksAPI} from '../api/books-api';
import {BookDetailType} from '../common/types';

import {setAppStatusAC} from './app-reducer';
import {fetchBooks} from './books-reducer';


export const fetchBook = createAsyncThunk('book/fetchBook', async (param:{bookId:number}, {dispatch, rejectWithValue}) => {

    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await booksAPI.getBookDetail(param.bookId)

        dispatch(setAppStatusAC({status: 'succeeded'}))

        return res.data
    } catch (err) {
        dispatch(setAppStatusAC({status: 'failed'}))
        const error = err as AxiosError

        if (!error.response) {
            throw err
        }

        return rejectWithValue(error.response.data)
    }

})

export const slice = createSlice({
    name: 'book',
    initialState: {
        content: {} as BookDetailType,
        error: '' as string
    } ,
    reducers: {
        resetBookAC(state, action) {
            const esState = state

            esState.content = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchBook.fulfilled, (state, action) => {
                const esState = state

                esState.content  = action.payload
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                const esState = state

                esState.error = action.error.message!
            })

    }

})

export const bookReducer = slice.reducer
export const {resetBookAC} = slice.actions
