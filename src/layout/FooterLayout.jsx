import React from 'react';
import styled from 'styled-components';
import * as S from '../shared/ShareStyle';

const Footer = styled(S.DivFlexColumn.withComponent('footer'))`
    background-color: lightcoral;
    height: 6.25rem;
    max-width: 75rem;
    margin: 0px auto;
`;

function FooterLayout() {
    return <Footer>FooterLayout</Footer>;
}

export default FooterLayout;
