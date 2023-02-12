import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {AppStatusType} from '../common/types';

export const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle'
    } as AppStatusType,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<AppStatusType>) {
            return action.payload
        },
    }
})

export const appReducer = slice.reducer
export const {setAppStatusAC} = slice.actions
