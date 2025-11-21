import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackArrowIcon from '../assets/icon/left.png'; 

const styles = {
    Back: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: '390px',  
        margin: '0 auto',    
        height: '100%',
        flexShrink: 0,
        borderRadius: '0 0 12px 12px',
        position: 'relative',
    },
    backArrow: {
        width: '24px',
        height: '24px',
        flexShrink: 0,
        padding: '10px 16px', 
        cursor: 'pointer',
        zIndex: 10,
    },
    title: {
        color: '#212529', 
        textAlign: 'center',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        maxWidth: '70%', 
        fontFamily: 'SUIT',
        fontSize: '20px',
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: '140%', 
        letterSpacing: '-0.5px',
        margin: 0, 
    }
};

export default function Back({ title, onBack }) {
    const navigate = useNavigate();
    
    const handleBackClick = () => {
        console.log("메인으로 이동");
        navigate("/");
    };
    
    return (
        <div style={styles.Back}>
            <img src={BackArrowIcon} alt="뒤로 가기 아이콘" style={styles.backArrow} onClick={handleBackClick}/>
            <h1 style={styles.title}>{title}</h1>
        </div>
    );
}