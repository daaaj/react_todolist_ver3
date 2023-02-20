import React from 'react';
import styled from 'styled-components';
import { __createTodo } from '../redux/modules/createTodoSlice';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Button from '../common/Button';
import { __getTodoList } from '../redux/modules/todoListSlice';

const CreateTodoBackground = styled.div`
    ${(props) => props.theme.ModalBackgroundStyle}
    display: ${(props) => (props.display === 'none' ? 'none' : 'block')};
`;
const CreateTodoBox = styled.form`
    ${(props) => props.theme.FlexCol}
    ${(props) => props.theme.ModalBoxStyle};
`;
const TitleInput = styled.input`
    ${(props) => props.theme.ModalTitle};
    ${(props) => props.theme.ModalTitleContent};
`;
const ContentTextArea = styled.textarea`
    ${(props) => props.theme.ModalContent};
    ${(props) => props.theme.ModalTitleContent};
`;
const TodoTitleArea = styled.div`
    ${(props) => props.theme.FlexRow};

    > span {
        ${(props) => props.theme.TitleBorderLeft}
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
const ButtonArea = styled.div`
    ${(props) => props.theme.FlexRow};
    gap: 1.875rem;
`;

function CreateTodo({ display, setDisplay }) {
    const dispatch = useDispatch();

    // 취소버튼 클릭시
    const cancleButton = () => {
        setDisplay('none');
        reset();
    };

    // react hook useForm 사용
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    // 추가버튼 클릭시
    const onSubmit = (data) => {
        if (data.title === '') {
            alert('제목 작성해야지?🤷‍♀️');
        } else if (data.content === '') {
            alert('내용 작성해야지?🤷‍♀️');
        } else {
            // 값 리듀서에 전달
            dispatch(__createTodo({ title: data.title, content: data.content }));
            setDisplay('none');
            reset();
        }
    };

    // error
    if (errors.title) {
        alert('제목의 글자수는 20글자 미만으로...😉');
    } else if (errors.content) {
        alert('내용의 글자수는 30글자 미만으로...😉');
    }

    return (
        <CreateTodoBackground display={display}>
            <CreateTodoBox onSubmit={handleSubmit(onSubmit)}>
                <TodoTitleArea>
                    <span>제목</span>
                    <TitleInput type="text" {...register('title', { maxLength: 20, value: '' })} placeholder="제목 입력" />
                </TodoTitleArea>
                <TodoContentText>
                    <span>내용</span>
                    <ContentTextArea type="text" {...register('content', { maxLength: 30 })} placeholder="할일 입력"></ContentTextArea>
                </TodoContentText>
                <ButtonArea>
                    <Button smallPtoP type="button" onClick={cancleButton}>
                        취소
                    </Button>
                    <Button smallPtoP type="submit">
                        추가
                    </Button>
                </ButtonArea>
            </CreateTodoBox>
        </CreateTodoBackground>
    );
}

export default CreateTodo;
