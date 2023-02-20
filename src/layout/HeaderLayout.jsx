import React from 'react';
import styled from 'styled-components';

const Header = styled.header`
    ${(props) => props.theme.FlexCol};
    ${(props) => props.theme.MainWidth};
    height: 6.25rem;
    margin-top: 2rem;
    font-size: ${(props) => props.theme.FS.xl};
`;

function HeaderLayout() {
    return <Header>JEONGDA TODOLIST</Header>;
}
export default HeaderLayout;
