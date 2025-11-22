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
  const matchId = location.state?.matchId || 12; 

  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!matchId) return;

      try {
        const data = await getMatchDetail(matchId);
        setMatchData(data);
      } catch (err) {
        console.error("조회 실패:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [matchId]);


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
  
  if (loading) return <div style={{padding:'20px', textAlign:'center'}}>로딩 중...</div>;
  if (!matchData) return null;

  const { my_talents, partner_talents, partner_nickname } = matchData;

  return (
    <div className="pageContainer">
      <Back title="최종 연결 확인" onBack={handleBack} />
      <div className="title">
        <p>재능 교환을 수락하시겠습니까?</p>
      </div>

      <div className={styles.partnerExchangeWrapper}>
        {partner_talents && partner_talents.length > 0 ? (
          partner_talents.map((t, idx) => (
            <div key={t.talent_id} style={{ marginBottom: '10px' }}>
              <ExchangeItem 
                itemTitle={idx === 0 ? `상대방이 가르쳐 줄 수 있는 것` : `+ 상대방의 추가 재능`}
                category={t.category}
                exchangeContent={t.title}
                detailContent={t.description}
                isPartner={true} 
                tags={t.tags ? t.tags.split(',') : []}
              />
            </div>
          ))
        ) : (
           <div className="empty-box">상대방 정보를 찾을 수 없습니다.</div>
        )}
      </div>

      <div className="exchangeWrapper">
        <img src={exchage} alt="교환 아이콘" className="exchageIcon"/>
      </div>

      <div className={styles.myExchangeWrapper}>
        {my_talents && my_talents.length > 0 ? (
          my_talents.map((t, idx) => (
            <div key={t.talent_id} style={{ marginBottom: '10px' }}>
              <ExchangeItem 
                itemTitle={idx === 0 ? "내가 가르쳐 줄 수 있는 것" : "+ 나의 추가 재능"}
                category={t.category}
                exchangeContent={t.title}
                detailContent={t.description}
                isPartner={false} 
                tags={t.tags ? t.tags.split(',') : []}
              />
            </div>
          ))
        ) : (
            <div className="empty-box">내 재능 정보를 찾을 수 없습니다.</div>
        )}
      </div>
      
      <p className="matchingInfo">
        매칭이 성립된 이유: 서로 원하는 재능을 가지고 있습니다.<br />
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