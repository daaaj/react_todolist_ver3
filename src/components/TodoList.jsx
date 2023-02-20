import React from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __getTodoList } from '../redux/modules/todoListSlice';
import { Link } from 'react-router-dom';

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
    background-color: ${(props) => props.theme.CL.mainBeige};

    min-height: 10rem;
    width: 43.75rem;

    border-radius: ${(props) => props.theme.BR.large};
    padding: 1.25rem 0;
`;
const TodoBoxTextArea = styled.div`
    ${(props) => props.theme.FlexCol};
    width: 70%;
    align-items: flex-start;
    margin-left: 1.875rem;
    > span {
        font-size: ${(props) => props.theme.FS.l};
        margin: 1.25rem 0;
        padding: 0.625rem;
        ${(props) => props.theme.TitleBorderLeft};
    }
    > p {
        margin-bottom: 1.25rem;
        font-size: ${(props) => props.theme.FS.m};
        padding: 0.625rem;
    }
`;
const DetailButton = styled.button`
    margin-right: 1.875rem;
    height: 2.5rem;
    width: 4.5rem;
    border: none;
    border-radius: ${(props) => props.theme.BR.normal};
    font-size: ${(props) => props.theme.FS.s};
    cursor: pointer;
    background-color: ${(props) => props.theme.CL.mainPink};
    &:hover {
        background-color: ${(props) => props.theme.CL.mainDeepPink};
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
