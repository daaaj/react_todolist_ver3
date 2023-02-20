import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// 초기값
const initialState = {
    todoList: [],
    isLoading: false,
    isError: false,
    error: null,
};

export const __modifyTodo = createAsyncThunk('modifyTodo', async (payload, thunkAPI) => {
    try {
        // payload.id에 해당하는 todo에 수정하기
        await axios.patch(`${process.env.REACT_APP_SERVER_URL}/todoList/${payload.id}`, {
            title: payload.title,
            content: payload.content,
        });
        // 수정하고 해당 todo 가져오기
        //const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/todoList/${payload.id}`);
        //return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

// 리듀서
export const modifyTodoSlice = createSlice({
    name: 'modifyTodo',
    initialState,
    reducers: {},
    // 미들웨어
    extraReducers: (builder) => {
        builder.addCase(__modifyTodo.pending, (state, atcion) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(__modifyTodo.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.todoList = action.payload;
        });
        builder.addCase(__modifyTodo.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload;
        });
    },
});

// 액션함수 넣기
export const {} = modifyTodoSlice.actions;
// 리듀서
export default modifyTodoSlice.reducer;
