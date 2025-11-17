import React, { useState } from 'react';
import SendIconImage from '../assets/icon/Send.png'; 

const MessageInput = ({ onSendMessage, isBlocked }) => {
    const [inputText, setInputText] = useState('');
    
    const handleChange = (event) => {
        setInputText(event.target.value);
    };

    const handleSend = () => {
        if (isBlocked) { 
            return;
        }

        if (inputText.trim() !== '') {
            if (onSendMessage) {
                onSendMessage(inputText.trim());
            }
            setInputText(''); 
        }
    };
    
    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !isSendDisabled) {
            event.preventDefault(); 
            handleSend();
        }
    };

    const isSendDisabled = isBlocked || inputText.trim() === '';
    return (
        <div className="message-input-container">
            <div className="input-field-wrapper">
                <input 
                    type="text" 
                    className="message-input-field" 
                    value={inputText} 
                    onChange={handleChange} 
                    onKeyPress={handleKeyPress} 
                    placeholder={isBlocked ? "쪽지를 보낼 수 없습니다." : "전송할 내용을 입력해주세요"} 
                    disabled={isBlocked}
                />
                <button 
                    type="button" 
                    className="message-send-button"
                    onClick={handleSend}
                    disabled={isSendDisabled}
                >
                    <img src={SendIconImage} alt="Send" className="send-arrow-icon"/>
                </button>
            </div> 
        </div>
    );
};

export default MessageInput;