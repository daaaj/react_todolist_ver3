import React from 'react';
import styled from 'styled-components';
import * as S from '../shared/ShareStyle';

const Header = styled(S.DivFlexColumn.withComponent('header'))`
    background-color: aqua;
    height: 6.25rem;
    max-width: 75rem;
    margin: 0px auto;
`;

function HeaderLayout() {
    return <Header>HeaderLayout</Header>;
}

export default HeaderLayout;
