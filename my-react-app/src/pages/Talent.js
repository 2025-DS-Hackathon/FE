import React, { useState } from "react";
import "../styles/Talent.css";
import Button from '../components/Button/Button'; 
import '../styles/fonts.css';
import '../styles/colors.css';
import Back from '../components/Back';
import { useNavigate , useLocation } from "react-router-dom";
import { createTalent } from "../services/talents";   

export default function TalentRegister() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('디지털/IT');
  const categories = ['디지털/IT', '요리/생활', '취미/예술', '직무/경험', '건강/운동'];

  const [talentName, setTalentName] = useState(''); 
  const [talentTags, setTalentTags] = useState(''); 
  const [talentDescription, setTalentDescription] = useState('');

  const [warning, setWarning] = useState({
    name: false,
    tags: false,
    tagCount: false,
    description: false,
  });

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const location = useLocation();
  const { type } = location.state || {};
  const title =
    type === "teach"
      ? "가르쳐줄 수 있는 것"
      : type === "learn"
      ? "배움을 받고 싶은것"
      : "재능 등록하기";
  const currentAreaText =
    type === "teach"
      ? "내가 가르쳐줄 수 있는 것"
      : type === "learn"
      ? "내가 배울을 줄 수 있는 것"
      : "재능 등록하기";

  const validate = () => {
    let valid = true;
    let w = { name: false, tags: false, description: false, tagCount: false };

    if (talentName.trim() === "") {
      w.name = true;
      valid = false;
    }

    const tagList = talentTags.split(',').map(t => t.trim()).filter(t => t !== "");
    if (talentTags.trim() === "") {
      w.tags = true;
      valid = false;
    } else if (tagList.length > 3) {
      w.tagCount = true;
      valid = false;
    }

    if (talentDescription.trim() === "") {
      w.description = true;
      valid = false;
    }

    setWarning(w);
    return valid;
  };

 const handleSubmit = async () => {
  if (!validate()) return;

  const payload = {
    type: type === "teach" ? "Teach" : "Learn",
    category: selectedCategory,
    title: talentName,
    tags: talentTags,
    description: talentDescription,
  };

  console.log("📤 등록 요청:", payload);

  try {
    const res = await createTalent(payload);
    console.log("🎉 등록 성공:", res);

    alert("재능 등록 완료!");
    navigate("/");
  } catch (err) {
    console.error("❌ 등록 실패:", err);
    alert("등록 실패! (콘솔 로그 확인)");
  }
};


  const isValidButton =
    talentName.trim() !== '' &&
    talentTags.trim() !== '' &&
    talentDescription.trim() !== '';

  return (
    <div className="page-wrapper">
      <Back title={title} />

      <div className="section">
        <p className="section-label">현재 영역</p>
        <div className="gray-box">{currentAreaText}</div>
      </div>

      <div className="section">
        <p className="section-label">재능 분야</p>
        <div className="category-grid">
          {categories.map((item) => (
            <button 
              key={item} 
              className={`category-btn ${item === selectedCategory ? 'active' : ''}`}
              onClick={() => handleCategoryClick(item)} 
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="section">
        <label className="section-label">재능명</label>
        <input
          type="text"
          placeholder="예시 : 아이폰 사진 편집"
          className={`input-box ${warning.name ? 'input-box-warning' : ''}`}
          value={talentName}
          onChange={(e) => setTalentName(e.target.value)}
        />
        {warning.name && <p className="warning-message">재능명을 입력해주세요</p>}
      </div>

      <div className="section">
        <label className="section-label">상세 태그 (최대 3개, 콤마로 구분)</label>
        <input
          type="text"
          placeholder="예시 : 스마트폰, 인물 보정, 무료 앱"
          className={`input-box ${(warning.tags || warning.tagCount) ? 'input-box-warning' : ''}`}
          value={talentTags}
          onChange={(e) => setTalentTags(e.target.value)}
        />
        {warning.tags && <p className="warning-message">상세 태그를 입력해주세요</p>}
        {warning.tagCount && <p className="warning-message">태그는 최대 3개까지 가능합니다</p>}
      </div>

      <div className="section">
        <label className="section-label">간단 소개/설명 문구</label>
        <textarea
          placeholder="가르치고 싶은 재능의 상세 설명을 입력해주세요"
          className={`textarea-box ${warning.description ? 'input-box-warning' : ''}`}
          maxLength={300}
          value={talentDescription}
          onChange={(e) => setTalentDescription(e.target.value)}
        />
        {warning.description && <p className="warning-message">설명을 입력해주세요</p>}
      </div>

      <Button onClick={handleSubmit} disabled={!isValidButton}>
        등록하기
      </Button>
    </div>
  );
}
