import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";




import Login from "./pages/Login.jsx";
import Main from "./pages/Main.js";
import ExtraInfo from "./pages/ExtraInfo.jsx";
import MypageGuest from "./pages/MypageGuest";
import MypageUser from "./pages/MypageUser";

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
        <Route path="/mypage" element={<MypageGuest />} />
        <Route path="/mypage-user" element={<MypageUser />} />

      </Routes>

    </Router>
  );
}

export default App;
