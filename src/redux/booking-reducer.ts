import {createSlice} from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'booking',
    initialState: {
        showModal: false
    },
    reducers: {
        showModalAC(state, action) {
            const esState = state

            esState.showModal = action.payload
        }
    },
    extraReducers: {}
})

export const bookingReducer = slice.reducer
export const {showModalAC} = slice.actions
