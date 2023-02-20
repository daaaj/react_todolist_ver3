import React from 'react';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { useDispatch } from 'react-redux';
import { __modifyTodo } from '../redux/modules/modifyTodoSlice';
import { useNavigate } from 'react-router';
import Button from '../common/Button';

const ModifyTodoBackground = styled.div`
    ${(props) => props.theme.ModalBackgroundStyle};
    display: ${(props) => (props.display === 'none' ? 'none' : 'block')};
`;
const ModifyTodoBox = styled.div`
    ${(props) => props.theme.FlexCol};
    ${(props) => props.theme.ModalBoxStyle};
`;
const ModifyInput = styled.input`
    ${(props) => props.theme.ModalTitle};
    ${(props) => props.theme.ModalTitleContent};
`;
const ModifyContent = styled.textarea`
    ${(props) => props.theme.ModalContent};
    ${(props) => props.theme.ModalTitleContent};
`;

const ModifyTitleArea = styled.div`
    ${(props) => props.theme.FlexRow};

    > span {
        ${(props) => props.theme.TitleBorderLeft}
        margin-right: 1.875rem;
        padding-left: 0.3125rem;
    }
`;
const ModifyContentArea = styled(ModifyTitleArea)`
    align-items: flex-start;

    > span {
        margin-top: 0.625rem;
    }
`;
const ModifyButtonArea = styled.div`
    ${(props) => props.theme.FlexRow};
    gap: 1.875rem;
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
                <ModifyTitleArea>
                    <span>제목</span>
                    <ModifyInput value={newTitle} onChange={onChangeNewTitle} />
                </ModifyTitleArea>
                <ModifyContentArea>
                    <span>내용</span>
                    <ModifyContent value={newContent} onChange={onChangeNewContent}></ModifyContent>
                </ModifyContentArea>
                <ModifyButtonArea>
                    <Button smallPtoP onClick={modifyCancleButton}>
                        취소
                    </Button>
                    <Button smallPtoP onClick={modifyTodoButton}>
                        수정
                    </Button>
                </ModifyButtonArea>
            </ModifyTodoBox>
        </ModifyTodoBackground>
    );
}

export default ModifyTodo;
