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
`;
