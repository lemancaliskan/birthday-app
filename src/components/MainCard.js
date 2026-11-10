import React, { useEffect, useState } from 'react';
import { Heart, X } from 'lucide-react';
import cakeImg from '../assets/cake.png';
import MessageCard from './MessageCard';
import '../styles/Card.css';

const MainCard = () => {
  const [candles, setCandles] = useState([true, true, true, true, true]);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  const candleStyles = ['candle-spiral-1', 'candle-spiral-2', 'candle-spiral-3', 'candle-spiral-4', 'candle-spiral-5'];
  const extinguishedCandles = candles.filter((isLit) => !isLit).length;

  const extinguishCandle = (index) => {
    if (!candles[index]) return;

    const newCandles = candles.map((isLit, candleIndex) => candleIndex === index ? false : isLit);
    setCandles(newCandles);

    if (newCandles.every((isLit) => !isLit)) {
      setIsConfettiActive(true);
      setIsMessageOpen(true);
      setTimeout(() => setIsConfettiActive(false), 4000);
    }
  };

  const closeMessage = () => {
    setIsMessageOpen(false);
    setCandles([true, true, true, true, true]);
  };

  useEffect(() => {
    if (!isMessageOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMessageOpen(false);
        setCandles([true, true, true, true, true]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMessageOpen]);

  return (
    <div className="card shadow-effect">
      <div className="card-header">
        <p className="card-eyebrow"><span className="eyebrow-dot"></span> Bir dilek tut</p>
        <h1>Mutlu Yıllar<span className="title-period">!</span></h1>
        <p className="card-subtitle">Bugün bütün güzellikler seninle olsun.</p>
      </div>

      <div className="cake-container">
        <img src={cakeImg} alt="Üç katlı kutlama pastası" className="cake-image" />
        <div className="candles-layer">
          {candles.map((isLit, index) => (
            <div
              key={index}
              className={`candle-item ${isLit ? 'lit' : 'out'} ${candleStyles[index]}`}
              onMouseEnter={() => isLit && extinguishCandle(index)}
              onClick={() => isLit && extinguishCandle(index)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  extinguishCandle(index);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Mum ${index + 1}, ${isLit ? 'yanıyor' : 'söndürüldü'}`}
              aria-pressed={!isLit}
            >
              {isLit && <div className="flame"></div>}
              <div className="candle-stick"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="card-footer">
        <p className="card-instruction">{extinguishedCandles === 0 ? 'Mumları tek tek üfle' : 'Harika gidiyorsun, devam et!'}</p>
        <div className="progress-meta" aria-live="polite">
          <div className="progress-dots" aria-hidden="true">
            {candles.map((isLit, index) => (
              <span key={index} className={`progress-dot ${!isLit ? 'is-complete' : ''}`}></span>
            ))}
          </div>
          <span>{extinguishedCandles} / {candles.length}</span>
        </div>
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
          <div className="message-card-popup" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="birthday-message-title">
            <button className="close-message-btn" onClick={closeMessage} aria-label="Mesajı kapat" type="button"><X size={18} strokeWidth={1.8} /></button>
            <MessageCard />
          </div>
        </div>
      )}

      {isConfettiActive && (
        <div className="confetti-global-container" aria-hidden="true">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ['#e77380', '#83b7cf', '#e9bd6f', '#d983a3', '#83b89a'][Math.floor(Math.random() * 5)],
                animationDelay: `${Math.random() * 1.6}s`,
                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                width: `${Math.random() * 7 + 5}px`,
                height: `${Math.random() * 9 + 5}px`
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MainCard;
