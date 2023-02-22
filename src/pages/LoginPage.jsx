import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __getUser } from '../redux/modules/loginSlice';
import { useNavigate } from 'react-router';

const LoginArea = styled.div`
    ${(props) => props.theme.FlexCol};
    ${(props) => props.theme.MainWidth};
    height: calc(100vh - 13.5625rem);
    border-top: 0.3125rem solid ${(props) => props.theme.CL.mainDeepPink};
    background-color: beige;
`;

const LoginBox = styled.form`
    background-color: pink;
    ${(props) => props.theme.FlexCol};
    width: 350px;
    height: 300px;
    padding: 2.5rem;
    margin-bottom: 100px;
    border-radius: ${(props) => props.theme.BR.large};
`;

const LoginHeader = styled.div`
    background-color: blueviolet;
    width: 100%;
    padding: 30px 0px;
`;

function LoginPage() {
    const [message, setMessage] = useState('');
    // react hook useForm 사용

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, error, users } = useSelector((state) => {
        return state.users;
    });

    const goJoinPage = () => {
        console.log('dd');
        navigate('/join');
    };

    if (isLoading) <div>로딩 중...</div>;

    if (error) alert(error);

    return (
        <LoginArea>
            <LoginBox>
                <LoginHeader>ID 로그인</LoginHeader>
                <div>
                    <span>아직 회원이 아니신가요?</span>
                </div>
                <input type="text" placeholder="아이디" />
                <input type="password" placeholder="패스워드" />
                <span>오류 : {message}</span>
                <div>
                    <button type="submit">로그인</button>
                    <button type="button" onClick={goJoinPage}>
                        회원가입
                    </button>
                </div>
            </LoginBox>
        </LoginArea>
    );
}

export default LoginPage;
