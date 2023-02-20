import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// 초기값
const initialState = {
    todoList: [],
    isLoading: false,
    isError: false,
    error: null,
};

export const __deleteTodo = createAsyncThunk('deleteTodo', async (payload, thunkAPI) => {
    try {
        // 삭제 후
        axios.delete(`${process.env.REACT_APP_SERVER_URL}/todoList/${payload}`);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

// 리듀서
export const deleteTodoSlice = createSlice({
    name: 'deleteTodo',
    initialState,
    reducers: {},
    // 미들웨어
    extraReducers: (builder) => {
        builder.addCase(__deleteTodo.pending, (state, atcion) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(__deleteTodo.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.todoList = action.payload;
        });
        builder.addCase(__deleteTodo.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload;
        });
    },
});

// 액션함수 넣기
export const {} = deleteTodoSlice.actions;
// 리듀서
export default deleteTodoSlice.reducer;
