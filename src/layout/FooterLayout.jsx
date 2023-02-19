import React from 'react';
import styled from 'styled-components';
import * as S from '../shared/ShareStyle';

const Footer = styled(S.DivFlexColumn.withComponent('footer'))`
    background-color: #ffe3e1;
    height: 5rem;
    max-width: 62.5rem;
    margin: 0px auto;
`;

function FooterLayout() {
    return <Footer>© 2023 Project JeongDa Corp. 이용약관 | 개인정보처리방침</Footer>;
}

export default FooterLayout;
