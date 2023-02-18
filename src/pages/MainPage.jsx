import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __getTodoList } from '../redux/modules/todoListSlice';
import styled from 'styled-components';
import * as S from '../shared/ShareStyle';

const MainArea = styled(S.DivFlexColumn)`
    background-color: lightpink;
    height: calc(100vh - 12.5rem);
    max-width: 75rem;
    margin: 0px auto;
`;

function MainPage() {
    // 조회
    // const fetchTodoList = async () => {
    //     const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/todoList`);
    //     console.log(data);
    // };

    const dispatch = useDispatch();

    const { isLoading, error, todoList } = useSelector((state) => {
        return state.todoList;
    });

    // 첫 로딩될 때 리스트 가져오기
    useEffect(() => {
        dispatch(__getTodoList());
    }, []);

    if (isLoading) {
        return <div>로딩 중...</div>;
    }
    if (error) {
        return <div>{error.message}</div>;
    }

    return (
        <MainArea>
            <div>
                <span>todolist</span>
                <button>todo 작성</button>
                {/* {todoList?.map((list) => {
                return <div key={list.id}>{list.title}</div>;
            })} */}
            </div>
            <div></div>
        </MainArea>
    );
}

export default MainPage;
