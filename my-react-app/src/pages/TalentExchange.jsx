import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import ExchangeItem from '../components/ExchangeItem';
import styles from '../styles/TalentExchange.css'; 
import Back from '../components/Back';
import exchage from '../assets/icon/exchage.png';
import '../styles/TalentExchange.css';

import { submitMatchAgreement, getMatchDetail } from "../services/matches";

const TalentExchange = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const matchId = location.state?.matchId; 
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!matchId) {
        alert("유효하지 않은 접근입니다. (매칭 ID 없음)");
        navigate("/");
        return;
      }

      try {
        const data = await getMatchDetail(matchId);
        console.log("📥 매칭 상세 데이터:", data);
        setMatchData(data);
      } catch (err) {
        console.error("조회 실패:", err);
        alert("매칭 정보를 불러오는 데 실패했습니다."); 
        navigate("/");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [matchId, navigate]);


  const handleBack = () => navigate(-1);

  const handleReject = async () => {
    if (!window.confirm("정말로 거절하시겠습니까?")) return;
    try {
      await submitMatchAgreement(matchId, false);
      alert("매칭을 거절했습니다.");
      navigate("/");
    } catch (error) {
      alert("오류가 발생했습니다.");
    }
  };

  const handleAccept = async () => {
    try {
      await submitMatchAgreement(matchId, true);
      alert("매칭을 수락했습니다! 채팅방 목록으로 이동합니다.");
      navigate("/Message");
    } catch (error) {
      alert("수락 처리에 실패했습니다.");
    }
  };
  
  if (loading) return <div style={{padding:'20px', textAlign:'center'}}>매칭 정보를 불러오는 중...</div>;
  if (!matchData) return null;

  const { my_talent, partner_talent, partner_nickname } = matchData;

  return (
    <div className="pageContainer">
      <Back title="최종 연결 확인" onBack={handleBack} />
      <div className="title">
        <p>재능 교환을 수락하시겠습니까?</p>
      </div>

      <div className={styles.partnerExchangeWrapper}>
        {partner_talent ? (
          <ExchangeItem 
            itemTitle={`상대방(${partner_nickname})이 가르쳐 줄 수 있는 것`}
            category={partner_talent.category}
            exchangeContent={partner_talent.title}
            detailContent={partner_talent.description}
            isPartner={true} 
            tags={partner_talent.tags ? partner_talent.tags.split(',') : []}
          />
        ) : (
           <div className="empty-box">상대방 정보를 찾을 수 없습니다.</div>
        )}
      </div>

      <div className="exchangeWrapper">
        <img src={exchage} alt="교환 아이콘" className="exchageIcon"/>
      </div>

      <div className={styles.myExchangeWrapper}>
        {my_talent ? (
          <ExchangeItem 
            itemTitle="내가 가르쳐 줄 수 있는 것"
            category={my_talent.category}
            exchangeContent={my_talent.title}
            detailContent={my_talent.description}
            isPartner={false} 
            tags={my_talent.tags ? my_talent.tags.split(',') : []}
          />
        ) : (
            <div className="empty-box">내 재능 정보를 찾을 수 없습니다.</div>
        )}
      </div>
      
      <p className="matchingInfo">
        매칭이 성립된 이유: 서로 원하는 재능을 가지고 있습니다.
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