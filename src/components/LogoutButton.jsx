import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

const LogoutArea = styled.div`
    ${(props) => props.theme.FlexCol};
    align-items: flex-end;
    justify-content: flex-start;
    position: absolute;
    top: ${(props) => (props.topValue ? '-6.875rem' : '-6.5625rem')};
`;

function LogoutButton(props) {
    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();

    const logoutHandler = () => {
        removeCookie('accessJWTToken');
        navigate('/');
    };

    return (
        <LogoutArea topValue={props.topValue}>
            <Button LogoutButton onClick={logoutHandler}>
                로그아웃
            </Button>
        </LogoutArea>
    );
}

export default LogoutButton;
