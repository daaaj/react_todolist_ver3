import React from 'react';
import styled from 'styled-components';
import * as S from '../shared/ShareStyle';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __getTodoList } from '../redux/modules/todoListSlice';
import { Link } from 'react-router-dom';

const TodoListArea = styled(S.DivFlexColumn)`
    background-color: cadetblue;
    height: 80%;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.875rem;
`;

const TodoBox = styled(S.DivFlexColumn)`
    background-color: lightslategrey;
    min-height: 12.5rem;
`;

function TodoList({ display }) {
    const dispatch = useDispatch();

    const { isLoading, error, todoList } = useSelector((state) => {
        return state.todoList;
    });

    // 첫 로딩될 때 리스트 가져오기 & display 바뀔때
    useEffect(() => {
        dispatch(__getTodoList());
    }, [dispatch, display]);

    // 상세 버튼 클릭시
    if (isLoading) {
        return <div>로딩 중...</div>;
    }
    if (error) {
        return <div>{error.message}</div>;
    }
    console.log(todoList);
    return (
        <TodoListArea>
            {todoList?.map((list) => {
                return (
                    <TodoBox key={list.id}>
                        <span>{list.title}</span>
                        <p>{list.content}</p>
                        <Link to={`/${list.id}`}>
                            <button>상세보기</button>
                        </Link>
                    </TodoBox>
                );
            })}
        </TodoListArea>
    );
}

export default TodoList;
