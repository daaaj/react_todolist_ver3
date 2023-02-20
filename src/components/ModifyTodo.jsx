import React from 'react';
import styled from 'styled-components';
import * as S from '../shared/ShareStyle';
import axios from 'axios';
import useInput from '../hooks/useInput';
import { useDispatch } from 'react-redux';
import { __modifyTodo } from '../redux/modules/modifyTodoSlice';
import { useNavigate } from 'react-router';

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
    // custom hook 사용
    const [newTitle, onChangeNewTitle] = useInput(todo.title);
    const [newContent, onChangeNewContent] = useInput(todo.content);
    const dispatch = useDispatch();

    // 취소버튼 클릭시
    const modifyCancleButton = () => {
        setDisplay('none');
    };

    const navi = useNavigate();

    // 수정하기 클릭시
    const modifyTodoButton = () => {
        if (newTitle === '') {
            alert('제목 작성해야지?🤷‍♀️');
        } else if (newContent === '') {
            alert('내용 작성해야지?🤷‍♀️');
        } else if (newTitle.length > 10) {
            alert('제목의 글자수는 15글자 미만으로...😉');
        } else if (newContent.length > 30) {
            alert('내용의 글자수는 30글자 미만으로...😉');
        } else {
            // 새 정보 넘기기
            dispatch(__modifyTodo({ id: todo.id, title: newTitle, content: newContent }));
            setDisplay('none');
            navi(`/${todo.id}`);
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
