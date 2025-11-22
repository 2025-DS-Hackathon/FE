import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import TargetPage from './pages/talent.js'; 
import Login from "./pages/Login.jsx";
import Main from "./pages/Main.jsx";
import ExtraInfo from "./pages/ExtraInfo.jsx";
import MypageGuest from "./pages/MypageGuest";
import MypageUser from "./pages/MypageUser";
import Notification from "./pages/Notification";

import MessageList from "./pages/MessageList.js";
import ChatPage from "./pages/ChatPage.jsx";
import TalentExchange from "./pages/TalentExchange.jsx";
import KakaoCallback from "./pages/KakaoCallback.jsx";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/login" element={<Login />} /> 
        <Route path="/extra" element={<ExtraInfo />} />
        <Route path="/auth/kakao/callback" element={<KakaoCallback />} />

        {/* 메인 페이지 */}
        <Route path="/" element={<Main />} />
        <Route
          path="/mypage"
          element={
            localStorage.getItem("access_token")
              ? <MypageUser />
              : <MypageGuest />
          }
        />
        <Route path="/mypage-user" element={<MypageUser />} />

        <Route path="/main" element={<Main />} /> 
        <Route path="/target" element={<TargetPage />} />
        <Route path="/notifications" element={<Notification />} />

        <Route path="/main" element={<Main />} />
        <Route path="/mypage" element={<MypageGuest />} />
        <Route path="/mypage-user" element={<MypageUser />} />
        <Route path="/target" element={<TargetPage />} />
        <Route path="/Message" element={<MessageList />} />
        <Route path="/Message/:matchId" element={<ChatPage />} />
        <Route path="/exchange" element={<TalentExchange />} />
        <Route path="/auth/kakao/callback" element={<KakaoCallback />} />
      </Routes>

    </Router>
  );
}

export default App;