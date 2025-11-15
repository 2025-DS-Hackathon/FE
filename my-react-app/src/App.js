import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // BrowserRouter를 사용합니다.
import TargetPage from './pages/Talent.js'; 
import Login from "./pages/Login.jsx";
import Main from "./pages/Main.js";
import ExtraInfo from "./pages/ExtraInfo.jsx";

function App() {
  return (
    <Router>
      <Routes>
        
        {/* 기본 경로: 로그인 */}
        <Route path="/" element={<Login />} /> 
        
        {/* 로그인 URL 직접 접근 */}
        <Route path="/login" element={<Login />} /> 
        
        <Route path="/extra" element={<ExtraInfo />} />
        
        {/* 메인 페이지 */}
        <Route path="/main" element={<Main />} /> 
        
        {/* 재능 등록 페이지 */}
        <Route path="/target" element={<TargetPage />} />
      </Routes>
    </Router>
  );
}

export default App;