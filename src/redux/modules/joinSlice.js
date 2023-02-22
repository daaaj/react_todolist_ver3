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
export const __join = createAsyncThunk('join', async (payload, thunkAPI) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users`, { id: payload.id, pw: payload.pw });
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

// 리듀서
export const joinSlice = createSlice({
    name: 'join',
    initialState,
    reducers: {},
    // 미들웨어
    extraReducers: (builder) => {
        builder.addCase(__join.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(__join.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.users = action.payload;
        });
        builder.addCase(__join.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload;
        });
    },
});

// 액션함수 넣기
export const {} = joinSlice.actions;
// 리듀서
export default joinSlice.reducer;
