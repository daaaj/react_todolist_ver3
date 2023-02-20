import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// 초기값
const initialState = {
    todoList: [],
    isLoading: false,
    isError: false,
    error: null,
};

export const __createTodo = createAsyncThunk('createTodo', async (payload, thunkAPI) => {
    try {
        // todo 추가하기
        axios.post(`${process.env.REACT_APP_SERVER_URL}/todoList`, { title: payload.title, content: payload.content });
        // 추가하고 전체 list 가져오기
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/todoList`);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

// 리듀서
export const createTodoSlice = createSlice({
    name: 'createTodo',
    initialState,
    reducers: {},
    // 미들웨어
    extraReducers: (builder) => {
        builder.addCase(__createTodo.pending, (state, atcion) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(__createTodo.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.todoList = action.payload;
        });
        builder.addCase(__createTodo.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload;
        });
    },
});

// 액션함수 넣기
export const {} = createTodoSlice.actions;
// 리듀서
export default createTodoSlice.reducer;
