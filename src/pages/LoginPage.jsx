import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const LoginArea = styled.div`
    ${(props) => props.theme.FlexCol};
    ${(props) => props.theme.MainWidth};
    height: calc(100vh - 13.5625rem);
    border-top: 0.3125rem solid ${(props) => props.theme.CL.mainDeepPink};
    background-color: beige;
`;

const LoginBox = styled.div`
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
    const [idValue, setIdValue] = useState('');
    const [pwValue, setPwValue] = useState('');
    // 에러
    const [message, setMessage] = useState('');

    const [token, setToken] = useState('');

    const navigate = useNavigate();

    const idChange = (e) => {
        setIdValue(e.target.value);
    };
    const pwChange = (e) => {
        setPwValue(e.target.value);
    };

    // 토큰
    const [cookies, setCookie, removeCookie] = useCookies();
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
                after10m.setMinutes(now.getMinutes() + 1);
                // hearder에 저장
                axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
                setCookie('accessJWTToken', userToken, { path: '/', expires: after10m });
                setIsCheck(true);
                goMainPage();
            } catch (error) {
                setMessage(error.response.data.message);
            }
        }
    };

    // 회원인증 및 쿠키 확인 GET
    const checkUser = () => {
        if (isCheck) {
            const token = cookies.accessJWTToken;
            axios
                .get('http://3.38.191.164/user', {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${token}`,
                        'X-Custom-Header': 'value',
                    },
                })
                .catch(() => {
                    alert('토큰이 만료되어 로그아웃 되었습니다');
                });
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

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
                <div>
                    <span>아직 회원이 아니신가요?</span>
                </div>
                <input type="text" value={idValue} onChange={idChange} placeholder="아이디" />
                <input type="password" value={pwValue} onChange={pwChange} placeholder="패스워드" />
                <span>{message}</span>
                <div>
                    <button type="button" onClick={loginHandler}>
                        로그인
                    </button>
                    <button type="button" onClick={goJoinPage}>
                        회원가입
                    </button>
                </div>
            </LoginBox>
        </LoginArea>
    );
}

export default LoginPage;
