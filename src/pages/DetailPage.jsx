import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import * as S from '../shared/ShareStyle';
import { __getTodoList } from '../redux/modules/todoListSlice';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ModifyTodo from '../components/ModifyTodo';

const DetailArea = styled(S.DivFlexColumn)`
    background-color: #a4cfa4;
    height: calc(100vh - 12.5rem);
    max-width: 75rem;
    margin: 0px auto;
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
        let isTrue = window.confirm('진짜 삭제한다 ??');

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
            <div>
                <input value={todo.title} readOnly></input>
                <textarea value={todo.content} readOnly></textarea>
                <button onClick={() => navigate('/')}>뒤로가기</button>
                <button onClick={modifyTodoButton}>수정하기</button>
                <button onClick={deleteTodoButton}>삭제하기</button>
            </div>
            <ModifyTodo todo={todo} display={display} setDisplay={setDisplay}></ModifyTodo>
        </DetailArea>
    );
}

export default DetailPage;
