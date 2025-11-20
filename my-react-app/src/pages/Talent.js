import React, { useState } from "react";
import "../styles/Talent.css";
import Button from '../components/Button/Button'; 
import '../styles/fonts.css';
import '../styles/colors.css';
import Back from '../components/Back';
import { useNavigate , useLocation } from "react-router-dom";

export default function TalentRegister() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('디지털/IT');
  const categories = ['디지털/IT', '요리/생활', '취미/예술', '직무/경험', '건강/운동'];

  const [talentNameInput, setTalentNameInput] = useState(''); 
  const [talentNameFinal, setTalentNameFinal] = useState('');
  const [talentTagsInput, setTalentTagsInput] = useState(''); 
  const [talentTagsFinal, setTalentTagsFinal] = useState('');
  const [talentDescriptionInput, setTalentDescriptionInput] = useState(''); 
  const [talentDescriptionFinal, setTalentDescriptionFinal] = useState('');

  // 뒤로가기
  const handleBack = () => {
    console.log("뒤로 가기 버튼 클릭됨");
  };
  
  // 카테고리
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // 입력 시 경고 상태 초기화
  const handleInputChange = (e, setState, fieldName) => {
    setState(e.target.value);
    
    setWarning(prev => ({ 
      ...prev, 
      [fieldName]: false,
      tagCount: false, 
    }));
  };
  
  // 경고 수정
  const [warning, setWarning] = useState({
    name: false,
    tags: false,
    description: false,
    tagCount: false,
  });

  // 재능명 핸들러
  const handleTalentNameChange = (e) => {
    setTalentNameInput(e.target.value);
    setWarning(prev => ({ ...prev, name: false }));
  };

  const handleTalentNameSubmit = () => {
    const trimmedValue = talentNameInput.trim();
    if (trimmedValue === '') {
      setWarning(prev => ({ ...prev, name: true }));
      setTalentNameFinal('');
    } else {
      setTalentNameFinal(trimmedValue);
      setWarning(prev => ({ ...prev, name: false }));
    }
  };

  // 상세 태그 핸들러
  const handleTalentTagsChange = (e) => {
      setTalentTagsInput(e.target.value);
      setWarning(prev => ({ ...prev, tags: false, tagCount: false }));
    };

    const handleTalentTagsSubmit = () => {
    const trimmedValue = talentTagsInput.trim();
    const tagsArray = trimmedValue.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

    if (trimmedValue === '') {
      setWarning(prev => ({ ...prev, tags: true })); 
      setTalentTagsFinal('');
    } else if (tagsArray.length > 3) {
      setWarning(prev => ({ ...prev, tagCount: true })); 
      setTalentTagsFinal('');
    } else {
      setTalentTagsFinal(trimmedValue);
      setWarning(prev => ({ ...prev, tags: false, tagCount: false }));
    }
  };

  // 간단 소개/설명 문구 핸들러
  const handleTalentDescriptionChange = (e) => {
    setTalentDescriptionInput(e.target.value);
    setWarning(prev => ({ ...prev, description: false }));
  };

  const handleTalentDescriptionSubmit = () => {
    const trimmedValue = talentDescriptionInput.trim();
    if (trimmedValue === '') {
      setWarning(prev => ({ ...prev, description: true }));
      setTalentDescriptionFinal('');
    } else {
      setTalentDescriptionFinal(trimmedValue);
      setWarning(prev => ({ ...prev, description: false }));
    }
  };
  
  
  

  // 입력 버튼 클릭 시 유효성 검사
  const validateForm = () => {
    let isValid = true;
    let newWarning = { name: false, tags: false, description: false, tagCount: false };

    if (talentNameInput.trim() === '') {
      newWarning.name = true;
      isValid = false;
    }

    const tagsArray = talentTagsInput.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    if (talentTagsInput.trim() === '') {
      newWarning.tags = true;
      isValid = false;
    } else if (tagsArray.length > 3) { 
      newWarning.tagCount = true;
      isValid = false;
    }
    
    if (talentDescriptionInput.trim() === '') {
      newWarning.description = true;
      isValid = false;
    }

    setWarning(newWarning);
    return isValid;
  };

  // 등록 버튼
  const isFormValid = () => {
    return talentNameFinal.trim() !== '' && 
           talentTagsInput.trim() !== '' && 
           talentDescriptionInput.trim() !== '';
  };

  const isFormFilled = () => {
    return talentNameFinal.trim() !== '' && 
           talentTagsFinal.trim() !== '' && 
           talentDescriptionFinal.trim() !== '';
  };

  // 등록 버튼
  const handleMatchingRequest = () => {
    if (isFormFilled()) {
        console.log("모든 필드 확정됨. 등록 요청 시작.");
        navigate("/");
    } else {
        console.log("모든 필수 필드가 확정되지 않았습니다.");
    }
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
    : "??";
  
  
  return (
    <div className="page-wrapper">
      <Back title={title} onBack={handleBack} />


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
        <div class="input-with-button">
            <input
                type="text"
                placeholder="예시 : 아이폰 사진 편집"
                className={`input-box ${warning.name ? 'input-box-warning' : ''}`}
                value={talentNameInput}
                onChange={handleTalentNameChange}
            />
            <button type="button" class="action-button" onClick={handleTalentNameSubmit}>입력</button>
        </div>
        {warning.name && (
          <p className="warning-message">재능명을 입력해주세요</p>
        )}
      </div>

      <div className="section">
        <label className="section-label">상세 태그</label>
        <div class="input-with-button">
            <input
              type="text"
              placeholder="예시 : 스마트폰, 인물 보정, 무료 앱"
              className={`input-box ${warning.tags || warning.tagCount ? 'input-box-warning' : ''}`}
              value={talentTagsInput} 
              onChange={handleTalentTagsChange}
            />
            <button type="button" class="action-button" onClick={handleTalentTagsSubmit}>입력</button>
        </div>
        {warning.tags && (
          <p className="warning-message">상세 태그를 입력해주세요</p>
        )}
        {warning.tagCount && (
          <p className="warning-message">상세 태그는 최대 3개까지 입력 가능합니다</p>
        )}
      </div>

      <div class="section">
        <label class="section-label">간단 소개/설명 문구</label>
        
        <div class="textarea-wrapper">
            <textarea
                id="talent-description" 
                placeholder="가르치고 싶은 재능의&#10;간단 소개/설명 문구를 입력해주세요"
                className={`textarea-box ${warning.description ? 'input-box-warning' : ''}`}
                maxlength="300"
                value={talentDescriptionInput}
                onChange={handleTalentDescriptionChange}
            ></textarea>
            
            <span id="char-counter" class="counter">{talentDescriptionInput.length}/300</span>
        </div>
        {warning.description && (
          <p className="warning-message">간단 소개/설명 문구를 입력해주세요</p>
        )}
    </div>

      <Button onClick={handleMatchingRequest} disabled={!isFormValid()}> 등록하기 </Button>
    </div>
  );
}