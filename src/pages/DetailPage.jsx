import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import UseInput from '../hooks/UseInput';
import * as S from '../shared/ShareStyle';
import { __getTodoDetail } from '../redux/modules/todoListSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const DetailArea = styled(S.DivFlexColumn)`
    background-color: #a4cfa4;
    height: calc(100vh - 12.5rem);
    max-width: 75rem;
    margin: 0px auto;
`;

function DetailPage() {
    //const [titleDetail, setTitleDetail, onChangeTitleDetail] = UseInput();
    const dispatch = useDispatch();
    const parms = useParams();

    // id에 해당하는 todo 가져오기
    const { isLoading, error, todoList } = useSelector((state) => {
        return state.todoList;
    });
    // 첫 로딩될 때 리스트 가져오기
    useEffect(() => {
        dispatch(__getTodoDetail(parms.id));
    }, [dispatch]);

    if (isLoading) {
        return <div>로딩 중...</div>;
    }
    if (error) {
        return <div>{error.message}</div>;
    }
    //console.log('todoList : ', todoList);

    return (
        <DetailArea>
            <div>
                <input value={todoList.title} readOnly></input>
                <textarea value={todoList.content} readOnly></textarea>

                <button onClick={backPage}>뒤로가기</button>

                <Link to="/">
                    <button>수정하기</button>
                </Link>

                <button>삭제하기</button>
            </div>
        </DetailArea>
    );
}

export default DetailPage;
