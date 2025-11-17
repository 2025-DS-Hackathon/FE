import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // BrowserRouter를 사용합니다.
import TargetPage from './pages/Talent.js'; 
import Login from "./pages/Login.jsx";
import Main from "./pages/Main.js";
import ExtraInfo from "./pages/ExtraInfo.jsx";
import MypageGuest from "./pages/MypageGuest";
import MypageUser from "./pages/MypageUser";
import MessageList from "./pages/MessageList.js";
import ChatPage from "./pages/ChatPage.jsx";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/login" element={<Login />} /> 
        <Route path="/extra" element={<ExtraInfo />} />
        <Route path="/main" element={<Main />} />
        <Route path="/mypage" element={<MypageGuest />} />
        <Route path="/mypage-user" element={<MypageUser />} />
        <Route path="/target" element={<TargetPage />} />
        <Route path="/Message" element={<MessageList />} />
        <Route path="/Message/:chatId" element={<ChatPage />} />
      </Routes>

    </Router>
  );
}

export default App;
