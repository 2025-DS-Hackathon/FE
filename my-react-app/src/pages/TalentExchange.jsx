import React from 'react';
import ExchangeItem from '../components/ExchangeItem';
import styles from '../styles/TalentExchange.css'; 
import Back from '../components/Back';
import exchage from '../assets/icon/exchage.png';
import '../styles/TalentExchange.css';

const exchangeItems = [
  {
    id: 1,
    itemTitle: "상대방이 가르쳐 줄 수 있는 것",
    category: "요리/생활 (부동산)",
    exchangeContent: "전월세 계약서 체크하는 법",
    detailContent:
      "혼자 계약서에 도장 찍기 무서우시죠? 이것만큼은 꼭 확인해야 할 다섯 가지를 짚어 드려요.",
    isPartner: true,
    tags: ["계약서확인", "전월세", "부동산"], 
  },
  {
    id: 2,
    itemTitle: "내가 가르쳐 줄 수 있는 것",
    category: "IT/기술 (프론트엔드)",
    exchangeContent: "React Hooks 실전 활용 가이드",
    detailContent:
      "useEffect, useContext 등 주요 훅의 실무 적용 사례와 성능 최적화 팁을 공유합니다.", 
    isPartner: false,
    tags: ["프론트엔드", "리액트", "개발"], 
  },
  {
    id: 3,
    itemTitle: "상대방이 가르쳐 줄 수 있는 것",
    category: "운동/건강 (홈트)",
    exchangeContent: "초보자용 30분 전신 홈트 루틴",
    detailContent:
      "집에서도 쉽게 따라 할 수 있는 부위별 운동 자세와 주의사항을 알려드립니다. 별도의 기구는 필요 없어요!", 
    isPartner: true,
    tags: ["홈트레이닝", "운동루틴", "건강"], 
  },
  {
    id: 4,
    itemTitle: "내가 가르쳐 줄 수 있는 것",
    category: "예술/디자인 (디지털 드로잉)",
    exchangeContent: "아이패드 드로잉 기초 테크닉",
    detailContent:
      "프로크리에이트 앱을 활용한 레이어, 브러쉬, 색상 팔레트 사용법 등 그림 그리기 시작을 도와드립니다.", 
    isPartner: false,
    tags: ["디지털드로잉", "아이패드", "취미"], 
  },
  {
    id: 5,
    itemTitle: "상대방이 가르쳐 줄 수 있는 것",
    category: "언어/외국어 (스페인어)",
    exchangeContent: "여행에서 유용한 스페인어 회화",
    detailContent:
      "공항, 식당, 숙소에서 써먹을 수 있는 필수 스페인어 표현 20가지를 원어민 발음으로 가르쳐 드립니다.",
    isPartner: true,
    tags: ["스페인어", "외국어", "여행"], 
  },
  {
    id: 6,
    itemTitle: "내가 가르쳐 줄 수 있는 것",
    category: "재테크/금융 (세금/정산)",
    exchangeContent: "직장인을 위한 연말정산 A to Z",
    detailContent:
      "놓치기 쉬운 세액 공제 항목과 환급액을 늘리는 팁을 쉽게 설명해 드립니다. 13월의 월급 만들기!",
    isPartner: false,
    tags: ["연말정산", "세금", "재테크"], 
  },
  {
    id: 7,
    itemTitle: "상대방이 가르쳐 줄 수 있는 것",
    category: "사진/영상 (스마트폰 사진)",
    exchangeContent: "스마트폰으로 인물 사진 잘 찍는 법",
    detailContent:
      "구도, 조명, 보정 앱 활용법을 통해 인스타 감성의 인생샷을 찍는 노하우를 알려드립니다.", 
    isPartner: true,
    tags: ["인물사진", "스마트폰촬영", "사진"], 
  },
];


const TalentExchange = () => {
  const myItems = exchangeItems.filter(item => !item.isPartner);
  const partnerItems = exchangeItems.filter(item => item.isPartner);
  

  const handleBack = () => {
    console.log("뒤로 가기 버튼 클릭됨");
  };

  const handleReject = () => {
    alert('재능 교환 거절');
  };

  const handleAccept = () => {
    alert('재능 교환 수락');
  };
  
  return (
    <div className="pageContainer">
      <Back 
        title="최종 연결 확인" 
        onBack={handleBack} 
      />
      <div className="title">
        <p>재능 교환을 수락하시겠습니까?</p>
      </div>

      <div className={styles.partnerExchangeWrapper}>
        {partnerItems.map((item) => (
          <ExchangeItem 
            key={item.id}
            itemTitle={item.itemTitle}
            category={item.category}
            exchangeContent={item.exchangeContent}
            detailContent={item.detailContent}
            isPartner={item.isPartner} 
            tags={item.tags}
          />
        ))}
      </div>

      <div className="exchangeWrapper">
        <img 
          src={exchage} 
          alt="교환 아이콘" 
          className="exchageIcon"
        />
      </div>

      <div className={styles.myExchangeWrapper}>
        {myItems.map((item) => (
          <ExchangeItem 
            key={item.id}
            itemTitle={item.itemTitle}
            category={item.category}
            exchangeContent={item.exchangeContent}
            detailContent={item.detailContent}
            isPartner={item.isPartner} 
            tags={item.tags}
          />
        ))}
      </div>
      
      <p className="matchingInfo">
        매칭이 성립된 이유: [카테고리가]가 일치합니다.
        <br />
        자세한 교환 내용은 쪽지에서 조율하세요
      </p>

      <div className="actionsContainer">
        <button className="rejectButton" onClick={handleReject}>거절하기</button>
        <button className="acceptButton" onClick={handleAccept}>수락하기</button>
      </div>
      
    </div>
  );
};

export default TalentExchange;