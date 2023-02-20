import styled from 'styled-components';
import TodoList from '../components/TodoList';
import CreateTodo from '../components/CreateTodo';
import { useState } from 'react';
import Button from '../common/Button';

const MainArea = styled.div`
    ${(props) => props.theme.MainWidth}
    min-height: calc(100vh - 13.25rem);
`;
const MainContentArea = styled.div`
    ${(props) => props.theme.FlexCol}
`;
const MainHeader = styled.div`
    ${(props) => props.theme.FlexRowBetween}
    height: 6.25rem;
    margin: 1.25rem 0;
    background-color: ${(props) => props.theme.CL.mainPink};
    font-size: ${(props) => props.theme.FS.l};

    > span {
        margin-left: 1.875rem;
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
                    <Button middleBtoP onClick={createTodoButton}>
                        Todo 작성
                    </Button>
                </MainHeader>
                <TodoList display={display} />
                <CreateTodo display={display} setDisplay={setDisplay} />
            </MainContentArea>
        </MainArea>
    );
}

export default MainPage;
