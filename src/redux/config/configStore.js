import { configureStore } from '@reduxjs/toolkit';
import todoList from '../modules/todoListSlice';
import deleteTodo from '../modules/deleteTodoSlice';
import todo from '../modules/getTodoSlice';
import modifyTodo from '../modules/modifyTodoSlice';
import createTodo from '../modules/createTodoSlice';
import users from '../modules/loginSlice';
import id from '../modules/getIdSlice';
import join from '../modules/joinSlice';

const store = configureStore({
    reducer: {
        todoList,
        deleteTodo,
        todo,
        modifyTodo,
        createTodo,
        users,
        id,
        join,
    },
});
export default store;
