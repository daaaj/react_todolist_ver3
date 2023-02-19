import React from 'react';
import styled from 'styled-components';
import * as S from '../shared/ShareStyle';
import axios from 'axios';
import useInput from '../hooks/useInput';

const ModifyTodoBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);

    display: ${(props) => (props.display === 'none' ? 'none' : 'block')};
`;

const ModifyTodoBox = styled(S.DivFlexColumn)`
    background-color: #fff5e4;
    width: 40rem;
    height: 40rem;
    border-radius: 3.125rem;
    // 맨 위로
    z-index: 999;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
const ModifyInput = styled.input`
    width: 25rem;
    height: 1.875rem;
    margin: 1.25rem 0;
    padding: 10px;
    font-size: 1.2rem;
    border: none;
    border-radius: 0.625rem;

    &:focus {
        outline: 3px solid #ff9494;
    }
`;
const ModifyContent = styled.textarea`
    width: 25rem;
    height: 12.5rem;
    resize: none;
    margin-bottom: 1.875rem;
    padding: 10px;
    font-size: 1.2rem;
    border: none;
    border-radius: 0.625rem;
    &:focus {
        outline: 3px solid #ff9494;
    }
`;
const ModifyButtonArea = styled(S.DivFlexColumn)`
    flex-direction: row;
    gap: 1.875rem;

    > button {
        width: 5rem;
        height: 1.875rem;
        border: none;
        border-radius: 0.625rem;
        cursor: pointer;
        background-color: #ffd1d1;
        &:hover {
            background-color: #ff9494;
        }
    }
`;

function ModifyTodo({ todo, display, setDisplay }) {
    const [newTitle, setNewTitle, onChangeNewTitle] = useInput(todo.title);
    const [newContent, setNewContent, onChangeNewContent] = useInput(todo.content);

    // 취소버튼 클릭시
    const modifyCancleButton = () => {
        setDisplay('none');
    };

    // 수정하기 클릭시
    const modifyTodoButton = () => {
        if (newTitle !== '' && newContent !== '') {
            axios.patch(`${process.env.REACT_APP_SERVER_URL}/todoList/${todo.id}`, {
                title: newTitle,
                content: newContent,
            });
            setDisplay('none');
        }
    };

    return (
        <ModifyTodoBackground display={display}>
            <ModifyTodoBox>
                <ModifyInput value={newTitle} onChange={onChangeNewTitle} />
                <ModifyContent value={newContent} onChange={onChangeNewContent}></ModifyContent>
                <ModifyButtonArea>
                    <button onClick={modifyCancleButton}>취소</button>
                    <button onClick={modifyTodoButton}>수정</button>
                </ModifyButtonArea>
            </ModifyTodoBox>
        </ModifyTodoBackground>
    );
}

export default ModifyTodo;
