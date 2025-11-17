import React, { useState } from 'react';
import '../styles/Chat.css'; 
import { useNavigate } from 'react-router-dom';
import BackArrowIcon from '../assets/icon/left.png'; 

const ChatHeader = ({ interlocutorName, infoText, onBlockUser }) => {
    const navigate = useNavigate();
    
    const [isMenuOpen, setIsMenuOpen] = useState(false); 
    const [isReportModalVisible, setIsReportModalVisible] = useState(false);

    const categorySeparator = ' ';
    const categories = infoText ? infoText.split(categorySeparator) : [];
    const interlocutorCategory = categories[0] || '';
    const myCategory = categories[1] || '';

    const handleBackClick = () => {
        console.log("뒤로 가기 버튼 클릭됨");
        navigate(-1); 
    };
    
    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // 신고하기
    const handleReport = () => {
        setIsMenuOpen(false); 
        setIsReportModalVisible(true); 
    };

    // 차단하기
    const handleBlock = () => {
        setIsMenuOpen(false); 
        if (onBlockUser) {
            onBlockUser();
        }
    };

    const handleModalClose = () => {
        setIsReportModalVisible(false);
    };

    // 신고 사유 선택
    const handleReasonClick = (reason) => {
        alert(`신고 사유: "${reason}"이(가) 선택되었습니다. 신고를 접수합니다.`);
        handleModalClose(); 
    };

    // 신고 사유 목록
    const reportReasons = [
        "부적절한 발언",
        "노쇼 (연락 없이 예약 장소에 나타나지 않음)",
        "기타 사유"
    ];


    const renderReportModal = () => {
        if (!isReportModalVisible) return null;

        return (
            <div className="modal-overlay" onClick={handleModalClose}> 
                <div className="report-modal" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        <p className="modal-title">신고 사유를 선택해주세요</p>
                        <button className="close-button" onClick={handleModalClose}>
                            &times; 
                        </button>
                    </div>
                    
                    <div className="modal-body">
                        {reportReasons.map((reason, index) => (
                            <div 
                                key={index} 
                                className="reason-item" 
                                onClick={() => handleReasonClick(reason)}
                            >
                                {reason}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };


    return (
        <>
            <div className="chat-header">
                <div className="back-button" onClick={handleBackClick}>
                    <img src={BackArrowIcon} alt="뒤로 가기 아이콘" className="back-arrow-icon" />
                </div>
                
                <div className="header-info">
                    <p className="title">'{interlocutorName}'님과의 쪽지</p>
                    {infoText ? (
                        <p className="subtitle">
                            {interlocutorCategory}
                            {' ⇆ '}
                            {myCategory}
                        </p>
                    ) : (
                         <p className="subtitle">{infoText}</p>
                    )}
                </div>
                
                <div className="menu-container"> 
                    <div className="menu-button" onClick={handleMenuToggle}>
                        &#8942;
                    </div>
                    
                    {isMenuOpen && (
                        <div className="menu-popup"> 
                            <div className="menu-item" onClick={handleReport}>
                                신고하기
                            </div>
                            <div className="menu-item" onClick={handleBlock}>
                                차단하기
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {renderReportModal()}
        </>
    );
};

export default ChatHeader;