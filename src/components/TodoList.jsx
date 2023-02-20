import React from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __getTodoList } from '../redux/modules/todoListSlice';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const TodoListArea = styled.div`
    ${(props) => props.theme.FlexCol};
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.875rem;
    place-items: center;
    margin-bottom: 1.25rem;
`;
const TodoBox = styled.div`
    ${(props) => props.theme.FlexRowBetween};
    width: 43.75rem;
    min-height: 10rem;
    padding: 1.25rem 0;
    border-radius: ${(props) => props.theme.BR.large};
    background-color: ${(props) => props.theme.CL.mainBeige};
`;
const TodoBoxTextArea = styled.div`
    ${(props) => props.theme.FlexCol};
    width: 70%;
    margin-left: 1.875rem;
    align-items: flex-start;

    > span {
        margin: 1.25rem 0;
        padding: 0.625rem;
        font-size: ${(props) => props.theme.FS.l};
        ${(props) => props.theme.TitleBorderLeft};
    }

    > p {
        margin-bottom: 1.25rem;
        padding: 0.625rem;
        font-size: ${(props) => props.theme.FS.m};
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
                            <Button middlePtoP>상세보기</Button>
                        </Link>
                    </TodoBox>
                );
            })}
        </TodoListArea>
    );
}

export default TodoList;
