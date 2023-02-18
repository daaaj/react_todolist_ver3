import styled from 'styled-components';
import * as S from '../shared/ShareStyle';
import TodoList from '../components/TodoList';
import CreateTodo from '../components/CreateTodo';
import { useState } from 'react';

const MainArea = styled(S.DivFlexColumn)`
    background-color: lightpink;
    min-height: 60rem;
    max-width: 75rem;
    margin: 0px auto;
`;

const MainHeader = styled(S.DivFlexColumn)`
    background-color: beige;
    height: 20%;
    flex-direction: row;
    justify-content: space-between;
`;

function MainPage() {
    // 모달 보여주기
    const [display, setDisplay] = useState('none');

    const createTodoButton = () => {
        setDisplay('block');
    };
    return (
        <MainArea>
            <MainHeader>
                <span>todolist</span>
                <button onClick={createTodoButton}>todo 작성</button>
            </MainHeader>
            <TodoList display={display} />
            <CreateTodo display={display} setDisplay={setDisplay} />
        </MainArea>
    );
}

export default MainPage;
