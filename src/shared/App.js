import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FooterLayout from '../layout/FooterLayout';
import HeaderLayout from '../layout/HeaderLayout';
import MainPage from '../pages/MainPage';
import * as S from './ShareStyle';

const GlobalStyle = S.GlobalStyle;

function App() {
    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <HeaderLayout />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    {/* <Route path="/:id" element={<Detail />} /> */}
                </Routes>
                <FooterLayout />
            </BrowserRouter>
        </>
    );
}

export default App;
