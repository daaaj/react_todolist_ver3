import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FooterLayout from '../layout/FooterLayout';
import HeaderLayout from '../layout/HeaderLayout';
import MainPage from '../pages/MainPage';
import DetailPage from '../pages/DetailPage';
import LoginPage from '../pages/LoginPage';
import JoinPage from '../pages/JoinPage';

function Router() {
    /*
        Public Route
        - none : 로그인 여부 관계없이 모두 열람 가능한 페이지
        - Resticted : 로그인 후 접근할 수 없는 페이지
                     => 로그인, 회원가입 페이지
        
        Private Route : 로그인 사용자만 접근 가능한 페이지
    */
    return (
        <BrowserRouter>
            <HeaderLayout />
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/join" element={<JoinPage />} />
                <Route path="/home" element={<MainPage />} />
                <Route path="/home/:id" element={<DetailPage />} />
            </Routes>
            <FooterLayout />
        </BrowserRouter>
    );
}

export default Router;
