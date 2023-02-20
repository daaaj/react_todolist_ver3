import React from 'react';
import styled from 'styled-components';

const Footer = styled.footer`
    ${(props) => props.theme.FlexCol};
    ${(props) => props.theme.MainWidth};
    height: 5rem;
    background-color: ${(props) => props.theme.CL.mainPink};
`;

function FooterLayout() {
    return <Footer>© 2023 Project JeongDa Corp. 이용약관 | 개인정보처리방침</Footer>;
}

export default FooterLayout;
