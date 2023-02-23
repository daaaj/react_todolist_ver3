import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useCallback } from 'react';
import Button from '../common/Button';

const JoinArea = styled.div`
    ${(props) => props.theme.FlexCol};
    ${(props) => props.theme.MainWidth};
    height: calc(100vh - 13.5625rem);
    border-top: 0.3125rem solid ${(props) => props.theme.CL.mainDeepPink};
`;

const JoinBox = styled.div`
    background-color: ${(props) => props.theme.CL.mainBeige};
    ${(props) => props.theme.FlexCol};
    width: 31.25rem;
    height: 25rem;
    padding: 2.5rem;
    margin-bottom: 100px;
    border-radius: ${(props) => props.theme.BR.large};
`;

const JoinHeader = styled.span`
    width: 100%;
    padding-bottom: 1.875rem;
    font-size: ${(props) => props.theme.FS.m};
`;
const InputArea = styled.div`
    ${(props) => props.theme.FlexRow};
    margin-bottom: 0.9375rem;

    > label {
        width: 15%;
    }
`;

const IdPwInput = styled.input`
    ${(props) => props.theme.IdInput}
    width: 80%;
`;

const ErrorMessage = styled.div`
    width: 100%;
    height: 1.25rem;
    font-size: ${(props) => props.theme.FS.xs};
    padding-left: 11.25rem;
    color: ${(props) => (props.choiceColor ? '#026010' : '#c21111')};
`;

const JoinButtonArea = styled.div`
    margin-top: 1.875rem;
`;

function JoinPage() {
    const [idValue, setIdValue] = useState('');
    const [pwValue, setPwValue] = useState('');
    // 오류 메세지
    const [idMessage, setIdMessage] = useState('');
    const [pwMessage, setPwMessage] = useState('');

    // 유효성 검사 둘다 true 일시 버튼 클릭 가넝
    const [isId, setIsId] = useState(false);
    const [isPw, setIsPw] = useState(false);

    const navigate = useNavigate();

    // id input change
    const onChangeId = (e) => {
        setIdValue(e.target.value);

        const idRegex = /^(?=.*?[0-9])(?=.*?[a-z]).{5,}$/;

        if (!idRegex.test(e.target.value)) {
            setIdMessage('영어 소문자, 숫자 각각 1개 이상, 5자리 이상이여야 합니다.');
            setIsId(false);
        } else {
            setIdMessage('올바른 id 형식입니다');
            setIsId(true);
        }
    };
    // pw input change
    const onChangePw = (e) => {
        setPwValue(e.target.value);
        const idRegex = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

        if (!idRegex.test(e.target.value)) {
            setPwMessage('최소 8자리 이상 영어 소문자, 숫자, 특수문자가 각각 1개 이상이여야 합니다.');
            setIsPw(false);
        } else {
            setPwMessage('올바른 password 형식입니다.');
            setIsPw(true);
        }
    };

    // 회원가입
    const joinHandler = async () => {
        if (isId === true && isPw === true) {
            try {
                await axios.post('http://3.38.191.164/register', { id: idValue, password: pwValue });
                alert('회원가입 성공 !!');
                goLoginPage();
            } catch (error) {
                alert(error.response.data.message);
            }
        }
    };

    // 취소
    const goLoginPage = useCallback(() => {
        navigate('/');
    }, []);

    return (
        <JoinArea>
            <JoinBox>
                <JoinHeader>회원가입</JoinHeader>
                <InputArea>
                    <label>아이디</label>
                    <IdPwInput type="text" value={idValue} onChange={onChangeId} />
                </InputArea>
                <ErrorMessage choiceColor={isId}>{idMessage}</ErrorMessage>
                <InputArea>
                    <label>비밀번호</label>
                    <IdPwInput type="password" value={pwValue} onChange={onChangePw} />
                </InputArea>
                <ErrorMessage choiceColor={isPw}>{pwMessage}</ErrorMessage>
                <JoinButtonArea>
                    <Button joinPageButton type="button" onClick={goLoginPage}>
                        취소
                    </Button>
                    <Button joinPageButton type="button" onClick={joinHandler}>
                        회원가입
                    </Button>
                </JoinButtonArea>
            </JoinBox>
        </JoinArea>
    );
}

export default JoinPage;
