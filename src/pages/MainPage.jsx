import styled from 'styled-components';
import TodoList from '../components/TodoList';
import CreateTodo from '../components/CreateTodo';
import { useState } from 'react';

const MainArea = styled.div`
    ${(props) => props.theme.MainWidth}
    min-height: calc(100vh - 13.25rem);
`;
const MainContentArea = styled.div`
    ${(props) => props.theme.FlexCol}
`;

const MainHeader = styled.div`
    ${(props) => props.theme.FlexRowBetween}

    background-color: ${(props) => props.theme.CL.mainPink};
    height: 6.25rem;
    margin: 1.25rem 0;
    font-size: ${(props) => props.theme.FS.l};

    > span {
        margin-left: 1.875rem;
    }

    > button {
        margin-right: 1.25rem;
        height: 2.5rem;
        width: 6.5rem;
        border: none;
        border-radius: ${(props) => props.theme.BR.normal};
        font-size: ${(props) => props.theme.FS.s};
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
            <MainContentArea>
                <MainHeader>
                    <span>아휴...하기시러...😞</span>
                    <button onClick={createTodoButton}>Todo 작성</button>
                </MainHeader>
                <TodoList display={display} />
                <CreateTodo display={display} setDisplay={setDisplay} />
            </MainContentArea>
        </MainArea>
    );
}

export default MainPage;
