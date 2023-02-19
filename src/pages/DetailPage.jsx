import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import * as S from '../shared/ShareStyle';
import { __getTodoList } from '../redux/modules/todoListSlice';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ModifyTodo from '../components/ModifyTodo';
//12.9375
const DetailArea = styled(S.DivFlexColumn)`
    height: calc(100vh - 13.5625rem);
    max-width: 62.5rem;
    margin: 0px auto;
    border-top: 0.3125rem solid #ff9494;
`;
const DetailBox = styled.div`
    background-color: #fff5e4;
    padding: 1.25rem;
    padding-top: 2.5rem;
    border-radius: 1.875rem;
`;
const DetailSpan = styled.span`
    width: 25rem;
    height: 1.875rem;
    margin: 1.875rem 0;
    padding: 0.625rem;
    font-size: 1.8rem;
    border-left: 0.3125rem solid #ff9494;
`;
const DetailP = styled.p`
    width: 25rem;
    min-height: 12.5rem;
    padding: 0.625rem;
    margin-top: 1.25rem;
    margin-bottom: 1.875rem;
    font-size: 1.1rem;
`;
const DetailButtonArea = styled(S.DivFlexColumn)`
    flex-direction: row;
    margin: 1.25rem 0;
    gap: 1.25rem;
    > button {
        height: 2rem;
        width: 5.5rem;
        border: none;
        border-radius: 0.625rem;
        font-size: 0.8rem;
        cursor: pointer;
        background-color: #ffd1d1;
        &:hover {
            background-color: #ff9494;
        }
    }
`;
function DetailPage() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    // modify 모달
    const [display, setDisplay] = useState('none');

    // 모든 list 가져오기
    const { isLoading, error, todoList } = useSelector((state) => {
        return state.todoList;
    });

    useEffect(() => {
        dispatch(__getTodoList());
    }, [dispatch, display]);

    // id = param todo 찾기
    const todo = todoList.find((list) => list.id === parseInt(id));

    // todo 삭제
    const deleteTodoButton = () => {
        let isTrue = window.confirm('진짜 삭제한다요 ??');

        if (isTrue === true) {
            axios.delete(`${process.env.REACT_APP_SERVER_URL}/todoList/${parseInt(id)}`);
            navigate('/');
        }
    };
    // todo 수정
    const modifyTodoButton = () => {
        setDisplay('block');
    };

    if (isLoading) {
        return <div>로딩 중...</div>;
    }
    if (error) {
        return <div>{error.message}</div>;
    }

    return (
        <DetailArea>
            <DetailBox>
                <DetailSpan>{todo.title}</DetailSpan>
                <DetailP>{todo.content}</DetailP>
                <DetailButtonArea>
                    <button onClick={() => navigate('/')}>뒤로가기</button>
                    <button onClick={modifyTodoButton}>수정하기</button>
                    <button onClick={deleteTodoButton}>삭제하기</button>
                </DetailButtonArea>
            </DetailBox>
            <ModifyTodo todo={todo} display={display} setDisplay={setDisplay}></ModifyTodo>
        </DetailArea>
    );
}

export default DetailPage;
