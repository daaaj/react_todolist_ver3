import React from 'react';
import styled from 'styled-components';
import * as S from '../shared/ShareStyle';
import useInput from '../hooks/useInput';
import { __createTodo } from '../redux/modules/todoListSlice';
import axios from 'axios';

const CreateTodoBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.8);

    display: ${(props) => (props.display === 'none' ? 'none' : 'block')};
`;

const CreateTodoBox = styled(S.DivFlexColumn)`
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

const TitleInput = styled.input`
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
const ContentTextArea = styled.textarea`
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
const ButtonArea = styled(S.DivFlexColumn)`
    flex-direction: row;
    gap: 1.875rem;

    > button {
        width: 5rem;
        height: 2rem;
        border: none;
        border-radius: 0.625rem;
        cursor: pointer;
        background-color: #ffd1d1;
        &:hover {
            background-color: #ff9494;
        }
    }
`;

function CreateTodo({ display, setDisplay }) {
    const [title, setTitle, onChangeTitle] = useInput();
    const [content, setContent, onChangeContent] = useInput();

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
                <TitleInput value={title} onChange={onChangeTitle} />
                <ContentTextArea value={content} onChange={onChangeContent}></ContentTextArea>
                <ButtonArea>
                    <button onClick={cancleButton}>취소</button>
                    <button onClick={createTodoButton}>추가</button>
                </ButtonArea>
            </CreateTodoBox>
        </CreateTodoBackground>
    );
}

export default CreateTodo;
