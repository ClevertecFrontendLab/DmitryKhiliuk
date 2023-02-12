import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {booksAPI} from '../api';
import {BookDetailType} from '../common/types';

import {setAppStatusAC} from './app-reducer';

export const fetchBook = createAsyncThunk('book/fetchBook', async (param:{bookId:number}, {dispatch}) => {

    dispatch(setAppStatusAC({status: 'loading'}))
    const res = await booksAPI.getBookDetail(param.bookId)

    try {
        console.log(res.data)
        dispatch(setAppStatusAC({status: 'succeeded'}))


        return res.data
    } catch (error) {
        dispatch(setAppStatusAC({status: 'failed'}))

        return error
    }
})

export const slice = createSlice({
    name: 'book',
    initialState: {} as BookDetailType,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(fetchBook.fulfilled, (state, action) => action.payload)
    }
})

export const bookReducer = slice.reducer
