import React from 'react';
import { ThemeProvider } from 'styled-components';
import Router from './shared/Router';
import { FlexRow, FlexRowBetween, FlexCol, MainWidth, ModalBoxStyle, ModalBackgroundStyle, ModalTitle, ModalContent, ModalTitleContent, TitleBorderLeft, IdInput, CL, FW, FS, BR } from './shared/style/Theme';

function App() {
    const theme = {
        FlexRow,
        FlexRowBetween,
        FlexCol,
        MainWidth,
        ModalBoxStyle,
        ModalBackgroundStyle,
        ModalTitle,
        ModalContent,
        ModalTitleContent,
        TitleBorderLeft,
        IdInput,
        CL,
        FW,
        FS,
        BR,
    };

    return (
        <ThemeProvider theme={theme}>
            <Router />
        </ThemeProvider>
    );
}

export default App;
