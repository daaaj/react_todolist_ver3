import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import * as S from '../shared/ShareStyle';
import { __getTodoList } from '../redux/modules/todoListSlice';
import { useSelector } from 'react-redux';

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

    // 모든 list 가져오기
    const { isLoading, error, todoList } = useSelector((state) => {
        return state.todoList;
    });

    useEffect(() => {
        dispatch(__getTodoList());
    }, [dispatch]);

    // id = param todo 찾기
    const todo = todoList.find((list) => list.id === parseInt(id));

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
                <button>수정하기</button>
                <button>삭제하기</button>
            </div>
        </DetailArea>
    );
}

export default DetailPage;
