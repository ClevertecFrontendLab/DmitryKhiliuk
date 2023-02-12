import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {booksAPI} from '../api';
import {BookDetailType} from '../common/types';

import {setAppStatusAC} from './app-reducer';
import {fetchBooks} from "./books-reducer";

export const fetchBook = createAsyncThunk('book/fetchBook', async (param:{bookId:number}, {dispatch, rejectWithValue}) => {

    dispatch(setAppStatusAC({status: 'loading', error: null}))
    const res = await booksAPI.getBookDetail(param.bookId)

    try {
        dispatch(setAppStatusAC({status: 'succeeded', error: null}))
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
    name: 'book',
    initialState: {
        content: {} as BookDetailType,
        error: ''
    } ,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(fetchBook.fulfilled, (state, action) => {
                // eslint-disable-next-line no-param-reassign
                state.content  = action.payload
            })
            .addCase(fetchBook.rejected, (state, action) => {
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

export const bookReducer = slice.reducer
