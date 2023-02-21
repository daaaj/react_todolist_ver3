import { configureStore } from '@reduxjs/toolkit';
import todoList from '../modules/todoListSlice';
import deleteTodo from '../modules/deleteTodoSlice';
import todo from '../modules/getTodoSlice';
import modifyTodo from '../modules/modifyTodoSlice';
import createTodo from '../modules/createTodoSlice';
import users from '../modules/loginSlice';

const store = configureStore({
    reducer: {
        todoList,
        deleteTodo,
        todo,
        modifyTodo,
        createTodo,
        users,
    },
});
export default store;
