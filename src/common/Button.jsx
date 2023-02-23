import React from 'react';
import styled, { css } from 'styled-components';

function Button(props) {
    return <BtnCustom {...props}>{props.children}</BtnCustom>;
}
export default Button;

// 버튼 기본 스타일
Button.defaultProps = {
    onClick: () => {},
};
const BtnCustom = styled.button`
    width: 5.5rem;
    height: 2.5rem;
    margin-right: 1.875rem;
    border: none;
    border-radius: 1rem;
    font-size: 0.9rem;
    cursor: pointer;

    ${(props) =>
        props.middleBtoP &&
        css`
            background-color: #fff5e4;
            &:hover {
                background-color: #ff9494;
            }
        `}

    ${(props) =>
        props.middlePtoP &&
        css`
            background-color: #ffd1d1;
            &:hover {
                background-color: #ff9494;
            }
        `}

    ${(props) =>
        props.smallPtoP &&
        css`
            width: 5rem;
            height: 2rem;
            margin: 0;
            background-color: #ffd1d1;
            &:hover {
                background-color: #ff9494;
            }
        `}

    ${(props) =>
        props.LogoutButton &&
        css`
            margin: 0;
            margin-right: 1.875rem;
            background-color: lightgray;
            &:hover {
                background-color: #ff9494;
            }
        `}

    ${(props) =>
        props.loginButton &&
        css`
            width: 95%;
            height: 2.8rem;
            margin: 0.625rem 0;
            background-color: #ffd1d1;
            &:hover {
                background-color: #ff9494;
            }
        `}


    ${(props) =>
        props.joinGrey &&
        css`
            margin: 0;
            height: 2.3rem;
            background-color: lightgray;
            &:hover {
                background-color: #ff9494;
            }
        `}

    ${(props) =>
        props.joinPageButton &&
        css`
            width: 5rem;
            height: 2rem;
            margin: 10px;
            background-color: #ffd1d1;
            &:hover {
                background-color: #ff9494;
            }
        `}
`;
