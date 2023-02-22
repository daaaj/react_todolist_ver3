import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useCallback } from 'react';

const JoinArea = styled.div`
    ${(props) => props.theme.FlexCol};
    ${(props) => props.theme.MainWidth};
    height: calc(100vh - 13.5625rem);
    border-top: 0.3125rem solid ${(props) => props.theme.CL.mainDeepPink};
    background-color: beige;
`;

const JoinBox = styled.div`
    background-color: pink;
    ${(props) => props.theme.FlexCol};
    width: 350px;
    height: 400px;
    padding: 2.5rem;
    margin-bottom: 100px;
    border-radius: ${(props) => props.theme.BR.large};
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
            setPwMessage('패스워드는 최소 8자리 이상 영어 소문자, 숫자, 특수문자가 각각 1개 이상이여야 합니다.');
            setIsPw(false);
        } else {
            setPwMessage('올바른 패스워드 형식입니다.');
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
                <span>회원가입</span>
                <div>
                    <label>아이디</label>
                    <input type="text" value={idValue} onChange={onChangeId} />
                </div>
                <span>{idMessage}</span>
                <div>
                    <label>비밀번호</label>
                    <input type="password" value={pwValue} onChange={onChangePw} />
                </div>
                <span>{pwMessage}</span>
                <div>
                    <button type="button" onClick={goLoginPage}>
                        취소
                    </button>
                    <button type="button" onClick={joinHandler}>
                        회원가입
                    </button>
                </div>
            </JoinBox>
        </JoinArea>
    );
}

export default JoinPage;

//cosole.log('control : ', control._fields.id._f.ref.value); // input값
//  <input type="text" ref={idRef} {...register('id', { pattern: { value: /^(?=.*?[0-9])(?=.*?[a-z]).{5,}$/, message: '영어 소문자, 숫자 각각 1개 이상, 5자리 이상이여야 합니다.' } })} placeholder="아이디" autoFocus />
//  <input type="password" {...register('pw', { pattern: { value: /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, message: '패스워드는 최소 8자리 이상 영어 소문자, 숫자, 특수문자가 각각 1개 이상이여야 합니다.' } })} />
