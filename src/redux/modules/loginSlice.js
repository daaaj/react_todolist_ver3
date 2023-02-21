import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// 초기값
const initialState = {
    users: [],
    isLoading: false,
    isError: false,
    error: null,
};

// 미들웨어
export const __getUser = createAsyncThunk('getUser', async (payload, thunkAPI) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/${payload.id}`);
        if (response.data.pw !== payload.pw) {
            const error = 'pw가 틀렸습니다.';
            return thunkAPI.rejectWithValue(error);
        } else {
            return thunkAPI.fulfillWithValue(response.data);
        }
    } catch (error) {
        error = 'id가 틀렸습니다.';
        return thunkAPI.rejectWithValue(error);
    }
});

// 리듀서
export const loginSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    // 미들웨어
    extraReducers: (builder) => {
        builder.addCase(__getUser.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(__getUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.users = action.payload;
        });
        builder.addCase(__getUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload;
        });
    },
});

// 액션함수 넣기
export const {} = loginSlice.actions;
// 리듀서
export default loginSlice.reducer;
