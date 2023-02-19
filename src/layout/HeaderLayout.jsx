import React from 'react';
import styled from 'styled-components';
import * as S from '../shared/ShareStyle';

const Header = styled(S.DivFlexColumn.withComponent('header'))`
    height: 6.25rem;
    max-width: 62.5rem;
    margin: 0px auto;
    margin-top: 2rem;
    font-size: 1.8rem;
`;

function HeaderLayout() {
    return <Header>JEONGDA TODOLIST</Header>;
}
export default HeaderLayout;
