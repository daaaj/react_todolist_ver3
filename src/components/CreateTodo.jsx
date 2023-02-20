import React from 'react';
import styled from 'styled-components';
import * as S from '../shared/ShareStyle';
import useInput from '../hooks/useInput';
import { __createTodo } from '../redux/modules/todoListSlice';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const CreateTodoBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.8);

    display: ${(props) => (props.display === 'none' ? 'none' : 'block')};
`;

const CreateTodoBox = styled(S.DivFlexColumn.withComponent('form'))`
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
        outline: 0.1875rem solid #ff9494;
    }
`;
const TodoTitleArea = styled(S.DivFlexColumn)`
    flex-direction: row;
    > span {
        border-left: 0.3125rem solid #ff9494;
        margin-right: 1.875rem;
        padding-left: 0.3125rem;
    }
`;
const TodoContentText = styled(TodoTitleArea)`
    align-items: flex-start;
    > span {
        margin-top: 0.625rem;
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
    // 취소버튼 클릭시
    const cancleButton = () => {
        setDisplay('none');
    };

    // react hook useForm 사용
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // 추가버튼 클릭시
    const onSubmit = (data) => {
        if (data.title === '') {
            alert('제목 작성해야지?🤷‍♀️');
        } else if (data.content === '') {
            alert('내용 작성해야지?🤷‍♀️');
        } else {
            axios.post(`${process.env.REACT_APP_SERVER_URL}/todoList`, { title: data.title, content: data.content });
            setDisplay('none');
        }
    };

    // error
    if (errors.title) {
        alert('제목의 글자수는 15글자 미만으로...😉');
    } else if (errors.content) {
        alert('내용의 글자수는 30글자 미만으로...😉');
    }

    return (
        <CreateTodoBackground display={display}>
            <CreateTodoBox onSubmit={handleSubmit(onSubmit)}>
                <TodoTitleArea>
                    <span>제목</span>
                    <TitleInput type="text" {...register('title', { maxLength: 10 })} />
                </TodoTitleArea>
                <TodoContentText>
                    <span>내용</span>
                    <ContentTextArea type="text" {...register('content', { maxLength: 30 })}></ContentTextArea>
                </TodoContentText>
                <ButtonArea>
                    <button type="button" onClick={cancleButton}>
                        취소
                    </button>
                    <button type="submit">추가</button>
                </ButtonArea>
            </CreateTodoBox>
        </CreateTodoBackground>
    );
}

export default CreateTodo;
