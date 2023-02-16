import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {AppStatusType, ErrorType} from '../common/types';

export const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle',
        error: ''
    } as AppStatusType,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<AppStatusType>) {
            // eslint-disable-next-line no-param-reassign
            state.status  = action.payload.status
        },
    }
})

export const appReducer = slice.reducer
export const {setAppStatusAC} = slice.actions
