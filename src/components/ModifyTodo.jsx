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
    background-color: lavender;
    width: 50rem;
    height: 50rem;

    // 맨 위로
    z-index: 999;
    // 중앙배치
    // absolute : 상위요소 비례해서..
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
function ModifyTodo({ todo, display, setDisplay }) {
    const [newTitle, setNewTitle, onChangeNewTitle] = useInput(todo.title);
    const [newContent, setNewContent, onChangeNewContent] = useInput(todo.content);

    // 수정하기 클릭시
    const modifyTodoButton = () => {
        axios.patch(`${process.env.REACT_APP_SERVER_URL}/todoList/${todo.id}`, {
            title: newTitle,
            content: newContent,
        });
        setDisplay('none');
    };

    return (
        <ModifyTodoBackground display={display}>
            <ModifyTodoBox>
                <input value={newTitle} onChange={onChangeNewTitle} />
                <textarea value={newContent} onChange={onChangeNewContent}></textarea>
                <button
                    onClick={() => {
                        setDisplay('none');
                    }}
                >
                    취소
                </button>
                <button onClick={modifyTodoButton}>수정</button>
            </ModifyTodoBox>
        </ModifyTodoBackground>
    );
}

export default ModifyTodo;
