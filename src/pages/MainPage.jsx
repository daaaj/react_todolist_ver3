import styled from 'styled-components';
import * as S from '../shared/ShareStyle';
import TodoList from '../components/TodoList';
import CreateTodo from '../components/CreateTodo';
import { useState } from 'react';

const MainArea = styled.div`
    min-height: calc(100vh - 13.25rem);
    max-width: 62.5rem;
    margin: 0px auto;
`;
const MainContain = styled(S.DivFlexColumn)``;

const MainHeader = styled(S.DivFlexColumn)`
    background-color: #ffe3e1;
    height: 6.25rem;
    flex-direction: row;
    justify-content: space-between;
    margin: 1.25rem 0;
    font-size: 1.5rem;
    > span {
        margin-left: 1.875rem;
    }
    > button {
        margin-right: 1.875rem;
        height: 2.5rem;
        width: 6.5rem;
        border: none;
        border-radius: 0.625rem;
        font-size: 0.9rem;
        cursor: pointer;
        background-color: #fff5e4;
        &:hover {
            background-color: #ff9494;
        }
    }
`;

function MainPage() {
    // 모달 보여주기
    const [display, setDisplay] = useState('none');

    const createTodoButton = () => {
        setDisplay('block');
    };

    return (
        <MainArea>
            <MainContain>
                <MainHeader>
                    <span>아휴...하기시러...😞</span>
                    <button onClick={createTodoButton}>Todo 작성</button>
                </MainHeader>
                <TodoList display={display} />
                <CreateTodo display={display} setDisplay={setDisplay} />
            </MainContain>
        </MainArea>
    );
}

export default MainPage;
