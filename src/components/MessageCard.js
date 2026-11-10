import React from 'react';
import '../styles/Card.css';

const MessageCard = () => {
  return (
    <div className="message-content-inner">
      <div className="message-body">
        <p className="message-eyebrow">SÜRPRİZİN HAZIR</p>
        <h2 className="special-text" id="birthday-message-title">
          Yeni yaşında kalbinden geçen tüm güzelliklerin seni bulmasını dilerim.
          Hayatın boyunca her zaman sevgiyle, neşeyle ve sevdiklerinle ol.
          <br />İyi ki doğdun, iyi ki varsın! ✨
        </h2>
        <p className="sub-text">İyi ki doğdun!</p>
      </div>
      <div className="decoration" aria-hidden="true">🎂</div>
    </div>
  );
};

export default MessageCard;
