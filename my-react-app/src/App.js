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
        <Route path="/target" element={<TargetPage />} />
      </Routes>
      
      <button onClick={handleClick}>
        Target Page로 이동
      </button>
    </>
  );
}

export default App;