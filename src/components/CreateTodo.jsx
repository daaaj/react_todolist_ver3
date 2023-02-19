import React from 'react';
import styled from 'styled-components';
import * as S from '../shared/ShareStyle';
import UseInput from '../hooks/UseInput';
import { __createTodo } from '../redux/modules/todoListSlice';
import axios from 'axios';

const CreateTodoBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);

    display: ${(props) => (props.display === 'none' ? 'none' : 'block')};
`;

const CreateTodoBox = styled(S.DivFlexColumn)`
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

function CreateTodo({ display, setDisplay }) {
    const [title, setTitle, onChangeTitle] = UseInput();
    const [content, setContent, onChangeContent] = UseInput();

    // 취소버튼 클릭시
    const cancleButton = () => {
        setDisplay('none');
    };

    // 추가버튼 클릭시
    const createTodoButton = async () => {
        // input값 빈칸 아닐때만
        if (title !== '' && content !== '') {
            axios.post(`${process.env.REACT_APP_SERVER_URL}/todoList`, { title, content });
            // 모달 여부
            setDisplay('none');
            setTitle('');
            setContent('');
        }
    };

    return (
        <CreateTodoBackground display={display}>
            <CreateTodoBox>
                <input value={title} onChange={onChangeTitle} />
                <textarea value={content} onChange={onChangeContent}></textarea>
                <button onClick={cancleButton}>취소</button>
                <button onClick={createTodoButton}>추가</button>
            </CreateTodoBox>
        </CreateTodoBackground>
    );
}

export default CreateTodo;
