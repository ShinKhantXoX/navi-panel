import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token');
const initialState = token ? JSON.parse(token) : null;

const tokenSlice = createSlice({
    name: "TOKEN",
    initialState,
    reducers: {
        setTokenRed: (state, action) => {
            localStorage.setItem('token', JSON.stringify(action.payload))
            state = action.payload;
            return state;
        }
    }
});

export const { setTokenRed } = tokenSlice.actions;
export const tokenState = (state) => state.TOKEN;
export default tokenSlice.reducer;