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

        <Route path="/login" element={<Login />} /> 
        <Route path="/extra" element={<ExtraInfo />} />
        <Route path="/main" element={<Main />} /> 
        <Route path="/target" element={<TargetPage />} />
      </Routes>
    </Router>
  );
}

export default App;
