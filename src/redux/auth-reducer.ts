import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

import {authAPI} from '../api/auth-api';
import {AuthDataType} from '../common/types';
import {setAppStatusAC} from "./app-reducer";

export const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        isLoggedInAC(state,action) {
            const esState = state

            esState.isLoggedIn = action.payload
        }
    }
})

export const authReducer = slice.reducer
export const {isLoggedInAC} = slice.actions

export const LogIn = createAsyncThunk('auth/logIn', async (data:AuthDataType, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.auth(data)

        dispatch(setAppStatusAC({status: 'succeeded'}))

        dispatch(isLoggedInAC(true))

        return res.data
    } catch (err) {
        dispatch(setAppStatusAC({status: 'failed'}))
        const error = err as AxiosError

        if(!error.response){
            throw err
        }

        return rejectWithValue(error.response.data)
    }


})





