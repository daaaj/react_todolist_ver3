import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FooterLayout from '../layout/FooterLayout';
import HeaderLayout from '../layout/HeaderLayout';
import MainPage from '../pages/MainPage';
import DetailPage from '../pages/DetailPage';
import LoginPage from '../pages/LoginPage';
import JoinPage from '../pages/JoinPage';

function Router() {
    return (
        <BrowserRouter>
            <HeaderLayout />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/:id" element={<DetailPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/join" element={<JoinPage />} />
            </Routes>
            <FooterLayout />
        </BrowserRouter>
    );
}

export default Router;
