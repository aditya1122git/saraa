import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar, faWandMagicSparkles, faGift, faCrown, faRocket } from '@fortawesome/free-solid-svg-icons';
import './App.css';

// Sketch Cards for Saraa's sketches
function SketchCards() {
  const sketches = [
    { src: '/s1.jpg', label: 'Sketch 1' },
    { src: '/s2.jpg', label: 'Sketch 2' },
    { src: '/s3.jpg', label: 'Sketch 3' },
    { src: '/s4.jpg', label: 'Sketch 4' },
  ];
  return (
    <div className="sketch-cards-section">
      <h3 className="sketch-cards-title fancy-font">Some of Saraa's Sketches 🎨</h3>
      <div className="sketch-cards">
        {sketches.map((sketch, i) => (
          <div className="sketch-card" key={i}>
            <img
              src={sketch.src}
              alt={sketch.label}
              className="sketch-img"
              onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
            />
            <div className="sketch-placeholder" style={{ display: 'none' }}>
              <span role="img" aria-label="sketch">🖼️</span>
              <div className="sketch-label">{sketch.label}</div>
              <div className="sketch-note">(Add {sketch.src} to public folder)</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Swipe Photo Gallery Component  

function App() {
  const [phase, setPhase] = useState('intro');
  const [doorOpen, setDoorOpen] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [roses, setRoses] = useState([]);
  const [butterflies, setButterflies] = useState([]);
  const [musicNotes, setMusicNotes] = useState([]);
  const [showTeddy, setShowTeddy] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [teddyAnimation, setTeddyAnimation] = useState('');
  const [loveQuote, setLoveQuote] = useState(0);
  const [loveToast, setLoveToast] = useState(false);
  // Removed photo gallery and heart photo cards state
  const heartIntervalRef = useRef(null);
  const roseIntervalRef = useRef(null);
  const butterflyIntervalRef = useRef(null);
  const musicIntervalRef = useRef(null);

  // Start effects when entering main scene
  useEffect(() => {
    if (phase === 'main') {
      setTimeout(() => setShowTeddy(true), 1000);
      setTimeout(() => setShowGame(true), 2000);
      // Message card shows only after game completion
      startHeartRain();
      startRoseGrow();
      startButterflies();
      if (gameCompleted) startMusicNotes();
    }
    return () => {
      if (heartIntervalRef.current) clearInterval(heartIntervalRef.current);
      if (roseIntervalRef.current) clearInterval(roseIntervalRef.current);
      if (butterflyIntervalRef.current) clearInterval(butterflyIntervalRef.current);
      if (musicIntervalRef.current) clearInterval(musicIntervalRef.current);
    };
  }, [phase]);

  // Love quotes rotation
  const loveQuotes = [
    "You're Simply Amazing! 🦋",
    "Such a Wonderful Person! 👸",
    "You Brighten Everyone's Day! ✨",
    "Keep Being Awesome! 💫",
    "You're One of a Kind! ☀️"
  ];

  useEffect(() => {
    if (gameCompleted) {
      const interval = setInterval(() => {
        setLoveQuote(prev => (prev + 1) % loveQuotes.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [gameCompleted, loveQuotes.length]);

  // Heart rain functions
  const createHeart = () => {
    const newHeart = {
      id: Date.now() + Math.random(),
      left: Math.random() * 100,
      delay: Math.random() * 2
    };
    setHearts(prev => [...prev, newHeart]);
    setTimeout(() => {
      setHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
    }, 3000);
  };

  const startHeartRain = () => {
    if (heartIntervalRef.current) return;
    heartIntervalRef.current = setInterval(() => {
      for (let i = 0; i < 2; i++) createHeart();
    }, 400);
  };

  // Rose grow functions
  const growRose = () => {
    const newRose = {
      id: Date.now() + Math.random(),
      left: 10 + Math.random() * 80,
      delay: Math.random() * 1.5
    };
    setRoses(prev => [...prev, newRose]);
    setTimeout(() => {
      setRoses(prev => prev.filter(rose => rose.id !== newRose.id));
    }, 6000);
  };

  const startRoseGrow = () => {
    if (roseIntervalRef.current) return;
    roseIntervalRef.current = setInterval(() => {
      growRose();
    }, 1500);
  };

  // Butterfly functions
  const createButterfly = () => {
    const newButterfly = {
      id: Date.now() + Math.random(),
      left: Math.random() * 90,
      delay: Math.random() * 2
    };
    setButterflies(prev => [...prev, newButterfly]);
    setTimeout(() => {
      setButterflies(prev => prev.filter(b => b.id !== newButterfly.id));
    }, 8000);
  };

  const startButterflies = () => {
    if (butterflyIntervalRef.current) return;
    butterflyIntervalRef.current = setInterval(() => {
      createButterfly();
    }, 3000);
  };

  // Music notes functions
  const createMusicNote = () => {
    const notes = ['♪', '♫', '♬', '♩'];
    const newNote = {
      id: Date.now() + Math.random(),
      left: Math.random() * 90,
      note: notes[Math.floor(Math.random() * notes.length)],
      delay: Math.random() * 1
    };
    setMusicNotes(prev => [...prev, newNote]);
    setTimeout(() => {
      setMusicNotes(prev => prev.filter(n => n.id !== newNote.id));
    }, 4000);
  };

  const startMusicNotes = () => {
    if (musicIntervalRef.current) return;
    musicIntervalRef.current = setInterval(() => {
      createMusicNote();
    }, 800);
  };

  // Teddy animation with flying hearts
  const animateTeddy = () => {
    setTeddyAnimation('bounce');
    setTimeout(() => setTeddyAnimation(''), 1000);
    
    // Create multiple flying hearts from teddy
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const heart = {
          id: Date.now() + Math.random() + i,
          left: 50 + (Math.random() - 0.5) * 20, // Around teddy position
          delay: Math.random() * 0.5
        };
        setHearts(prev => [...prev, heart]);
        setTimeout(() => {
          setHearts(prev => prev.filter(h => h.id !== heart.id));
        }, 3000);
      }, i * 100);
    }
  };

  // Intro screen with beating heart button
  if (phase === 'intro') {
    return (
      <div className="intro-screen">
        <button className="heart-button" onClick={() => {
          setPhase('door');
          setTimeout(() => setDoorOpen(true), 350);
          setTimeout(() => setPhase('main'), 2200);
        }} aria-label="Click here to enter">
          <div className="heart-emoji-container">
            <div className="heart-emoji">♥️</div>
            <span className="heart-text">Click me</span>
          </div>
        </button>
      </div>
    );
  }

  // Door opening animation
  if (phase === 'door') {
    return (
      <div className="door-screen">
  <div className="door-title">Knock Knock, Saraa 🦋</div>
        <div className={`door-frame ${doorOpen ? 'open' : ''}`}>
          <div className="door left" />
          <div className="door right" />
        </div>
      </div>
    );
  }

  // Main scene with all effects
  return (
    <div className="app">
  {/* Removed photo gallery and heart photo cards UI */}
      {/* Heart rain */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="floating-heart"
          style={{ left: `${heart.left}%`, animationDelay: `${heart.delay}s` }}
        >
          <FontAwesomeIcon icon={faHeart} />
        </div>
      ))}

      {/* Growing roses */}
      {roses.map(rose => (
        <div
          key={rose.id}
          className="growing-rose"
          style={{ left: `${rose.left}%`, animationDelay: `${rose.delay}s` }}
        >
          🌸
        </div>
      ))}

      {/* Flying butterflies */}
      {butterflies.map(butterfly => (
        <div
          key={butterfly.id}
          className="flying-butterfly"
          style={{ left: `${butterfly.left}%`, animationDelay: `${butterfly.delay}s` }}
        >
          🦋
        </div>
      ))}

      {/* Twinkling stars */}
      <div className="stars">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`star star-${i}`}>
            <FontAwesomeIcon icon={faStar} />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="container">
        <div className="header">
          <h1 className="title fancy-font">
            <FontAwesomeIcon icon={faCrown} className="crown-icon" />
            <span className="sparkle">🤍</span>
            For Dear Saraa 👸
            <span className="sparkle">🤍</span>
            <FontAwesomeIcon icon={faCrown} className="crown-icon" />
          </h1>
        </div>

        {/* Teddy bear */}
        {showTeddy && (
          <div className="teddy-container">
            <div className={`teddy ${teddyAnimation}`} onClick={animateTeddy}>
              🧸
            </div>
            <div className="teddy-shadow"></div>
          </div>
        )}

        {/* Love game */}
        {showGame && !gameCompleted && (
          <LoveMemoryGame onWin={() => {
            setGameCompleted(true);
            setShowGame(false);
            setTimeout(() => setShowMessage(true), 500);
            // Extra heart burst when game is won
            for (let i = 0; i < 15; i++) {
              setTimeout(() => createHeart(), i * 80);
            }
            // Start music notes when all games complete
            startMusicNotes();
          }} />
        )}

        {/* Message card - shows only after game completion */}
        {showMessage && gameCompleted && (
          <div className="message-card">
            <div className="sparkles-container">
              <FontAwesomeIcon icon={faWandMagicSparkles} className="sparkle-icon" />
              <FontAwesomeIcon icon={faWandMagicSparkles} className="sparkle-icon delay-1" />
              <FontAwesomeIcon icon={faWandMagicSparkles} className="sparkle-icon delay-2" />
            </div>
            
            <h2 className="message-title fancy-font">
              {loveQuotes[loveQuote]}
            </h2>
            
            <p className="message-text">
              Dear Saraa, you make my world brighter than a thousand stars!<br />
              Every moment with you feels like pure magic. ✨
            </p>
            
            <div className="love-stats">
              <div className="stat">
                <FontAwesomeIcon icon={faHeart} className="stat-icon" />
                <span>Prettiness: Absolutely Mesmerizing ✨</span>
              </div>
              <div className="stat">
                <FontAwesomeIcon icon={faRocket} className="stat-icon" />
                <span>Awesomeness: Over 9000!</span>
              </div>
              <div className="stat">
                <FontAwesomeIcon icon={faGift} className="stat-icon" />
                <span>Positivity: Maximum</span>
              </div>
            </div>

            <button className="love-button" onClick={() => {
              // burst of hearts
              for (let i = 0; i < 10; i++) {
                setTimeout(() => createHeart(), i * 100);
              }
              // start some music notes for a few seconds
              startMusicNotes();
              // show toast then hide
              setLoveToast(true);
              setTimeout(() => setLoveToast(false), 2500);
            }}>
              <FontAwesomeIcon icon={faHeart} />
              Send Appreciation
              <FontAwesomeIcon icon={faHeart} />
            </button>
          </div>
        )}

  {/* Extra cute cards for Saraa */}
        {gameCompleted && (
          <div className="cards-section">
            <h3 className="cards-title fancy-font">Special meanings for you, Saraa ♥️</h3>
            <CuteCards />
          </div>
        )}

        <div className="footer">
          <p>Made with 🤍 by Aditya</p>
          {/* <div className="mini-teddies">
            <span className="mini-teddy">🧸</span>
            <span className="mini-teddy">🌻</span>
            <span className="mini-teddy">🧸</span>
          </div> */}
        </div>

        {loveToast && (
          <div className="love-toast">You're amazing! 🌟</div>
        )}
      </div>
    </div>
  );
}

export default App;
