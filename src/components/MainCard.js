import React, { useState } from 'react';
import { Heart, X } from 'lucide-react';
import cakeImg from '../assets/cake.png'; 
import MessageCard from './MessageCard';
import '../styles/Card.css';

const MainCard = () => {
  const [candles, setCandles] = useState([true, true, true, true, true]);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  const candleStyles = ['candle-spiral-1', 'candle-spiral-2', 'candle-spiral-3', 'candle-spiral-4', 'candle-spiral-5'];

  const extinguishCandle = (index) => {
    const newCandles = [...candles];
    newCandles[index] = false;
    setCandles(newCandles);

    if (newCandles.every(c => c === false)) {
      setIsConfettiActive(true);
      setIsMessageOpen(true);
      setTimeout(() => setIsConfettiActive(false), 4000);
    }
  };

  const closeMessage = () => {
    setIsMessageOpen(false);
    setCandles([true, true, true, true, true]);
  };

  return (
    <div className="card shadow-effect">
      <div className="card-header">
        <h1>Mutlu Yıllar!</h1>
      </div>

      <div className="cake-container">
        <img src={cakeImg} alt="Cake" className="cake-image" />
        <div className="candles-layer">
          {candles.map((isLit, index) => (
            <div 
              key={index} 
              className={`candle-item ${isLit ? 'lit' : 'out'} ${candleStyles[index]}`}
              onMouseEnter={() => isLit && extinguishCandle(index)}
            >
              {isLit && <div className="flame"></div>}
              <div className="candle-stick"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="card-footer">
        <p><i>Mumları üfle..</i></p>
      </div>

      <div className="footer-credits">
          <p className="credits-text">
            Made with
            <Heart className="heart-icon" />
            and
            <span className="react-text">React</span>
          </p>
        </div>

      {isMessageOpen && (
        <div className="message-overlay" onClick={closeMessage}>
          <div className="message-card-popup" onClick={(e) => e.stopPropagation()}>
            <button className="close-message-btn" onClick={closeMessage}>&times;</button>
            <MessageCard />
          </div>
        </div>
      )}


      {isConfettiActive && (
        <div className="confetti-global-container">
          {[...Array(50)].map((_, i) => (
            <div 
              key={i} 
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ['#ee5253', '#74b9ff', '#feca57', '#ff9ff3', '#1dd1a1'][Math.floor(Math.random() * 5)],
                animationDelay: `${Math.random() * 2}s`,
                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                width: `${Math.random() * 8 + 5}px`,
                height: `${Math.random() * 8 + 5}px`
              }}
            ></div>
          ))}
        </div>
      )}
      
    </div>
    

    
  );
};

export default MainCard;