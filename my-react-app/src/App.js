import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import TargetPage from './pages/Talent.js'; 

function App() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/target');
  };

  return (
    <>
      <Routes>

        {/* 메인 페이지 */}
        <Route path="/main" element={<Main />} />
        <Route path="/mypage" element={<MypageGuest />} />
        <Route path="/mypage-user" element={<MypageUser />} />
        
        <Route path="/login" element={<Login />} /> 
        <Route path="/extra" element={<ExtraInfo />} />

        


        <Route path="/target" element={<TargetPage />} />
        <Route path="/notifications" element={<Notification />} />


        <Route path="/Message" element={<MessageList />} />
        <Route path="/Message/:chatId" element={<ChatPage />} />
        <Route path="/exchange" element={<TalentExchange />} />
      </Routes>
      
      <button onClick={handleClick}>
        Target Page로 이동
      </button>
    </>
  );
}

export default App;