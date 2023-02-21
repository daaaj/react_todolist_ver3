import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FooterLayout from '../layout/FooterLayout';
import HeaderLayout from '../layout/HeaderLayout';
import MainPage from '../pages/MainPage';
import DetailPage from '../pages/DetailPage';

function Router() {
    return (
        <BrowserRouter>
            <HeaderLayout />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/:id" element={<DetailPage />} />
            </Routes>
            <FooterLayout />
        </BrowserRouter>
    );
}

export default Router;