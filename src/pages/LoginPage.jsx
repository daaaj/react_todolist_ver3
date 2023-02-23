import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import isLogin from '../util/login';
import Button from '../common/Button';

const LoginArea = styled.div`
    ${(props) => props.theme.FlexCol};
    ${(props) => props.theme.MainWidth};
    height: calc(100vh - 13.5625rem);
    border-top: 0.3125rem solid ${(props) => props.theme.CL.mainDeepPink};
`;

const LoginBox = styled.div`
    background-color: ${(props) => props.theme.CL.mainBeige};
    ${(props) => props.theme.FlexCol};
    width: 21.875rem;
    height: 20rem;
    padding: 2.5rem;
    margin-bottom: 6.25rem;
    border-radius: ${(props) => props.theme.BR.large};
`;
const LoginHeader = styled.span`
    width: 100%;
    padding-bottom: 1.875rem;
    font-size: ${(props) => props.theme.FS.m};
`;
const LoginIdPw = styled.input`
    ${(props) => props.theme.IdInput}
    margin-bottom: 0.625rem;
`;
const ErrorMessage = styled.div`
    width: 100%;
    height: 1.5rem;
    padding-left: 1.875rem;
    color: ${(props) => (props.choiceColor ? '#026010' : '#c21111')};
`;
const IsUserArea = styled.div`
    ${(props) => props.theme.FlexRowBetween};
    width: 95%;
    margin-top: 10px;
`;

function LoginPage() {
    const [idValue, setIdValue] = useState('');
    const [pwValue, setPwValue] = useState('');
    // 에러
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const idChange = (e) => {
        setIdValue(e.target.value);
    };
    const pwChange = (e) => {
        setPwValue(e.target.value);
    };

    // 토큰
    const [cookies, setCookie] = useCookies();
    const [now] = useState(new Date());
    const [after10m] = useState(new Date());
    const [isCheck, setIsCheck] = useState(false);

    // 로그인 버튼 클릭시
    const loginHandler = async () => {
        if (idValue !== '' && pwValue !== '') {
            try {
                const response = await axios.post('http://3.38.191.164/login', { id: idValue, password: pwValue });
                const userToken = response.data.token;
                //console.log('response:', response);

                // 토큰 시간 설정
                after10m.setMinutes(now.getMinutes() + 10);
                // hearder에 저장
                axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
                setCookie('accessJWTToken', userToken, { path: '/', expires: after10m });

                setIsCheck(true);
                goMainPage();
            } catch (error) {
                console.log('로그인 버튼 클릭시 error : ', error);
                setMessage(error.response.data.message);
            }
        }
    };

    // 회원인증 및 쿠키 확인 GET
    const checkUser = () => {
        const token = cookies.accessJWTToken;
        axios.get('http://3.38.191.164/user', {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
                'X-Custom-Header': 'value',
            },
        });
    };

    useEffect(() => {
        if (isLogin()) {
            checkUser();
        }
    }, [isLogin()]);

    // 회원가입 페이지로~
    const goJoinPage = () => {
        navigate('/join');
    };

    // 메인 페이지로~
    const goMainPage = useCallback(() => {
        navigate('/home');
    });

    return (
        <LoginArea>
            <LoginBox>
                <LoginHeader>ID 로그인</LoginHeader>
                <LoginIdPw type="text" value={idValue} onChange={idChange} placeholder="id" />
                <LoginIdPw type="password" value={pwValue} onChange={pwChange} placeholder="password" />
                <ErrorMessage choiceColor={isCheck}>{message}</ErrorMessage>
                <Button loginButton type="button" onClick={loginHandler}>
                    로그인
                </Button>
                <IsUserArea>
                    <span>아직 회원이 아니신가요?</span>
                    <Button joinGrey type="button" onClick={goJoinPage}>
                        회원가입
                    </Button>
                </IsUserArea>
            </LoginBox>
        </LoginArea>
    );
}

export default LoginPage;
