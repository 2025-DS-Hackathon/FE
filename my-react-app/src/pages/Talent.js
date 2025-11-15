import React from "react";
import "../styles/Talent.css";
import Button from '../components/Button/Button'; 
import '../styles/fonts.css';
import '../styles/colors.css';
import Back from '../components/Back';

export default function TalentRegister() {
  const handleMatchingRequest = () => {};
  const handleBack = () => {
    console.log("뒤로 가기 버튼 클릭됨");
  };
  return (
    <div className="page-wrapper">
      <Back 
        title="재능 등록하기" 
        onBack={handleBack} 
      />

      <div className="section">
        <p className="section-label">현재 영역</p>
        <div className="gray-box">내가 배울 줄 수 있는 것</div>
      </div>

      {/* 재능 분야 */}
      <div className="section">
        <p className="section-label">재능 분야</p>
        <div className="category-grid">
          {['디지털/IT','요리/생활','취미/예술','직무/경험','건강/운동'].map((item, idx) => (
            <button key={idx} className={`category-btn ${idx===0 ? 'active' : ''}`}>{item}</button>
          ))}
        </div>
      </div>

      {/* 재능명 */}
      <div className="section">
        <label className="section-label">재능명</label>
        <input
          type="text"
          placeholder="예시 : 아이폰 사진 편집"
          className="input-box"
        />
      </div>

      {/* 상세 태그 */}
      <div className="section">
        <label className="section-label">상세 태그</label>
        <input
          type="text"
          placeholder="예시 : 스마트폰, 인물 보정, 무료 앱"
          className="input-box"
        />
      </div>

      {/* 소개 */}
      <div className="section">
        <label className="section-label">간단 소개/설명 문구</label>
        <textarea
          placeholder="가르치고 싶은 재능의 간단 소개/설명 문구를 입력해주세요"
          className="textarea-box"
        ></textarea>
        <p className="counter">0/300</p>
      </div>

      <Button onClick={handleMatchingRequest}> 등록하기 </Button>
    </div>
  );
}