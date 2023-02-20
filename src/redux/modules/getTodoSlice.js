import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// 초기값
// 이건 다른 초기값 줘야함!!!
const initialState = {
    todo: [],
    isLoading: false,
    isError: false,
    error: null,
};

export const __getTodo = createAsyncThunk('getTodo', async (payload, thunkAPI) => {
    try {
        // payload에 해당하는 todo 찾기
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/todoList/${payload}`);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

// 리듀서
export const getTodoSlice = createSlice({
    name: 'getTodo',
    initialState,
    reducers: {},
    // 미들웨어
    extraReducers: (builder) => {
        builder.addCase(__getTodo.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(__getTodo.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.todo = action.payload;
        });
        builder.addCase(__getTodo.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload;
        });
    },
});

// 액션함수 넣기
export const {} = getTodoSlice.actions;
// 리듀서
export default getTodoSlice.reducer;
