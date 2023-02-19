import React from 'react';
import styled from 'styled-components';
import * as S from '../shared/ShareStyle';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __getTodoList } from '../redux/modules/todoListSlice';
import { Link } from 'react-router-dom';

const TodoListArea = styled(S.DivFlexColumn)`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.875rem;
    place-items: center;
    margin-bottom: 1.25rem;
`;

const TodoBox = styled(S.DivFlexColumn)`
    background-color: #fff5e4;
    min-height: 10rem;
    width: 43.75rem;
    border-radius: 1.875rem;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
`;
const TodoBoxTextArea = styled(S.DivFlexColumn)`
    width: 70%;
    align-items: flex-start;
    margin-left: 1.875rem;
    > span {
        margin: 1.25rem 0;
        font-size: 1.4rem;
        padding: 0.625rem;
        border-left: 0.3125rem solid #ff9494;
    }
    > p {
        margin-bottom: 1.25rem;
        font-size: 1.1rem;
        padding: 0.625rem;
    }
`;
const DetailButton = styled.button`
    margin-right: 1.875rem;
    height: 2.5rem;
    width: 4.5rem;
    border: none;
    border-radius: 0.625rem;
    font-size: 0.9rem;
    cursor: pointer;
    background-color: #ffd1d1;
    &:hover {
        background-color: #ff9494;
    }
`;

function TodoList({ display }) {
    const dispatch = useDispatch();

    // 첫 로딩될 때 리스트 가져오기 & display 바뀔때
    const { isLoading, error, todoList } = useSelector((state) => {
        return state.todoList;
    });
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
    return (
        <TodoListArea>
            {todoList.map((list) => {
                return (
                    <TodoBox key={list.id}>
                        <TodoBoxTextArea>
                            <span>{list.title}</span>
                            <p>{list.content}</p>
                        </TodoBoxTextArea>
                        <Link to={`/${list.id}`}>
                            <DetailButton>상세보기</DetailButton>
                        </Link>
                    </TodoBox>
                );
            })}
        </TodoListArea>
    );
}

export default TodoList;
