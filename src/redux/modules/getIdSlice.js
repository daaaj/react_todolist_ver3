import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// 초기값
const initialState = {
    id: [],
    isLoading: false,
    isError: false,
    error: null,
};

// 미들웨어
export const __getId = createAsyncThunk('getId', async (payload, thunkAPI) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/${payload}`);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        error = '사용가능한 id 입니다.';
        return thunkAPI.rejectWithValue(error);
    }
});

// 리듀서
export const getIdSlice = createSlice({
    name: 'id',
    initialState,
    reducers: {},
    // 미들웨어
    extraReducers: (builder) => {
        builder.addCase(__getId.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(__getId.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.id = action.payload;
        });
        builder.addCase(__getId.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload;
        });
    },
});

// 액션함수 넣기
export const {} = getIdSlice.actions;
// 리듀서
export default getIdSlice.reducer;
