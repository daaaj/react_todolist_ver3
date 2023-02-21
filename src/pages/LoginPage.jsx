import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __getUser } from '../redux/modules/loginSlice';

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
    const { register, handleSubmit, reset } = useForm();
    const dispatch = useDispatch();

    const { isLoading, error, users } = useSelector((state) => {
        return state.users;
    });

    const onSuccess = (data) => {
        dispatch(__getUser({ id: data.id, pw: data.pw }));
        reset();
    };
    const onError = (inputError) => {
        console.log('login error : ', inputError);
        if (inputError.id) {
            setMessage(inputError.id.message);
        } else if (inputError.pw) {
            setMessage(inputError.pw.message);
        }
    };

    if (isLoading) <div>로딩 중...</div>;

    if (error) alert(error);

    return (
        <LoginArea>
            <LoginBox onSubmit={handleSubmit(onSuccess, onError)}>
                <LoginHeader>ID 로그인</LoginHeader>
                <div>
                    <span>아직 회원이 아니신가요?</span>
                </div>
                <input type="text" {...register('id', { pattern: { value: /^[0-9a-z]*$/, message: 'id에는 숫자와 영어 소문자만 올 수 있습니다.' } })} placeholder="아이디" />
                <input type="password" {...register('pw', { pattern: { value: /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, message: '패스워드는 최소 8자리 이상 영어 소문자, 숫자, 특수문자가 각각 1개 이상이여야 합니다.' } })} placeholder="패스워드" />
                <span>오류 : {message}</span>
                <div>
                    <button type="submit">로그인</button>
                    <button type="button">회원가입</button>
                </div>
            </LoginBox>
        </LoginArea>
    );
}

export default LoginPage;
