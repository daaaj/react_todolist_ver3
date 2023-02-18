import { configureStore } from '@reduxjs/toolkit';
import todoList from '../modules/todoListSlice';

const store = configureStore({
    reducer: {
        todoList,
    },
});

export default store;
