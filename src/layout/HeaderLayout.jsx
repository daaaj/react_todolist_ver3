import React from 'react';
import styled from 'styled-components';

const Header = styled.header`
    ${(props) => props.theme.FlexCol};
    ${(props) => props.theme.MainWidth};
    margin-bottom: 2rem;
    height: 6.25rem;
    font-size: ${(props) => props.theme.FS.xl};
`;

function HeaderLayout() {
    return (
        <Header>
            <span>JEONGDA TODOLIST</span>
        </Header>
    );
}
export default HeaderLayout;
