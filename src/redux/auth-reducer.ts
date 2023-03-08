import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

import {authAPI} from '../api/auth-api';
import {AuthDataType, RecoveryDataType, RegistrationDataType, ResetDataType} from '../common/types';

import {setAppStatusAC} from './app-reducer';

export const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        error: null,
        ok: false,
        confirmed: false,
        registrationDate: {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
        } as RegistrationDataType
    },
    reducers: {
        isLoggedInAC(state,action) {
            const esState = state

            esState.isLoggedIn = action.payload
        },
        setErrorAC(state, action) {
            const esState = state

            esState.error = action.payload
        },
        addFromStepOne(state, action) {
            const esState = state

            esState.registrationDate.username = action.payload.username
            esState.registrationDate.password = action.payload.password
        },
        addFromStepTwo(state, action) {
            const esState = state

            esState.registrationDate.firstName = action.payload.firstName
            esState.registrationDate.lastName = action.payload.lastName
        },
        addFromStepThree(state, action) {
            const esState = state

            esState.registrationDate.phone = action.payload.phone
            esState.registrationDate.email = action.payload.email
        },
        setMail(state, action) {
            const esState = state

            esState.ok = action.payload
        },
        getConfirmed(state, action) {
            const esState = state

            esState.confirmed = action.payload
        }
    }
})

export const authReducer = slice.reducer
export const {isLoggedInAC, setErrorAC} = slice.actions
export const {addFromStepOne, addFromStepTwo, addFromStepThree, setMail, getConfirmed} = slice.actions

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
        dispatch(setErrorAC(error.response.status))

        return rejectWithValue(error.response.data)
    }

})

export const RegistrationTC = createAsyncThunk('auth/registration', async (dataReg: RegistrationDataType, {dispatch, rejectWithValue}) => {
    try {
        const res = await authAPI.register(dataReg)

        return res.data
    } catch (err) {
        const error = err as AxiosError

        if(!error.response){
            throw err
        }
        dispatch(setErrorAC(error.response.status))

        return rejectWithValue(error.response.data)
    }
})


export const ForgotPasswordTC = createAsyncThunk('auth/forgot', async (mail: ResetDataType, {dispatch, rejectWithValue}) => {
    try {
        const res = await authAPI.forgot(mail)

        dispatch(setMail(res.data.ok))

        return res.data
    } catch (err) {
        const error = err as AxiosError

        if(!error.response){
            throw err
        }
        dispatch(setErrorAC(error.response.status))

        return rejectWithValue(error.response.data)
    }
})

export const ResetPasswordTC = createAsyncThunk('auth/reset', async (dataPass: RecoveryDataType, {dispatch, rejectWithValue}) => {
    try {
        const res = await authAPI.reset(dataPass)

        dispatch(getConfirmed(res.data.user.confirmed))

        return res.data
    } catch (err) {
        const error = err as AxiosError

        if(!error.response){
            throw err
        }
        dispatch(setErrorAC(error.response.status))

        return rejectWithValue(error.response.data)
    }
})





