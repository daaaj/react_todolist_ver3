import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// 초기값
const initialState = {
    todoList: [],
    isLoading: false,
    isError: false,
    error: null,
};

// 미들웨어
export const __getTodoList = createAsyncThunk('getTodoList', async (payload, thunkAPI) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/todoList`);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const __getTodoDetail = createAsyncThunk('getTodoDetail', async (payload, thunkAPI) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/todoList/${payload}`);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

// 리듀서
export const todoListSlice = createSlice({
    name: 'todoList',
    initialState,
    reducers: {},
    // 미들웨어
    extraReducers: (builder) => {
        builder.addCase(__getTodoList.pending, (state, atcion) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(__getTodoList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.todoList = action.payload;
        });
        builder.addCase(__getTodoList.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload;
        });
        builder.addCase(__getTodoDetail.pending, (state, atcion) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(__getTodoDetail.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.todoList = action.payload;
        });
        builder.addCase(__getTodoDetail.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload;
        });
        // 강의버전
        // [__getTodoList.pending]: (state, action) => {
        //     state.isLoading = true;
        //     state.isError = false;
        // },
        // [__getTodoList.fulfilled]: (state, action) => {
        //     state.isLoading = false;
        //     state.isError = false;
        //     state.todos = action.payload;
        // },
        // [__getTodoList.rejected]: (state, action) => {
        //     state.isLoading = false;
        //     state.isError = true;
        //     state.error = action.payload;
        // },
    },
});

// 액션함수 넣기
export const {} = todoListSlice.actions;
// 리듀서
export default todoListSlice.reducer;
