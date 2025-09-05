import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar, faWandMagicSparkles, faGift, faCrown, faRocket } from '@fortawesome/free-solid-svg-icons';
import './App.css';

// Love Memory Game Component
function LoveMemoryGame({ onWin }) {
  const [gameType, setGameType] = useState('sequence'); // 'sequence', 'memory', 'quiz', 'catch'
  const [sequence, setSequence] = useState([0, 1, 2]);
  const [clicked, setClicked] = useState([]);
  const [won, setWon] = useState(false);
  const [currentGame, setCurrentGame] = useState(1);
  const [memoryCards, setMemoryCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [quizQuestion, setQuizQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [catchHearts, setCatchHearts] = useState([]);
  const [caughtHearts, setCaughtHearts] = useState(0);
  const [gameTimer, setGameTimer] = useState(10);

  const quizQuestions = [
<<<<<<< HEAD
  { question: "What makes Shreya special? ❤️", options: ["Her smile", "Her kindness", "Her personality", "Everything!"], correct: 3 },
  { question: "How amazing is Shreya's presence? 🌻", options: ["Nice", "Great", "Incredible", "Magical!"], correct: 3 },
  { question: "What do you think about Shreya? ✨", options: ["She's okay", "She's cool", "She's wonderful", "She's absolutely perfect!"], correct: 3 }
=======
  { question: "What makes Saraa special? ❤️", options: ["Her smile", "Her kindness", "Her personality", "Everything!"], correct: 3 },
  { question: "How amazing is Saraa's presence? 🌻", options: ["Nice", "Great", "Incredible", "Magical!"], correct: 3 },
  { question: "What do you think about Saraa? ✨", options: ["She's okay", "She's cool", "She's wonderful", "She's absolutely perfect!"], correct: 3 }
>>>>>>> f8413c7 (feat: add SketchCards section for Saraa's sketches)
  ];

  // Initialize memory game
  useEffect(() => {
    if (gameType === 'memory') {
      const cards = ['💗', '🌹', '⭐', '🦋', '🌻', '🎀'].flatMap((emoji, i) => [
        { id: i * 2, emoji, matched: false },
        { id: i * 2 + 1, emoji, matched: false }
      ]).sort(() => Math.random() - 0.5);
      setMemoryCards(cards);
    }
  }, [gameType]);

  // Catch hearts game timer (reliable interval-based)
  useEffect(() => {
    if (gameType !== 'catch') return;
    if (won) return; // pause if already won

    const id = setInterval(() => {
      setGameTimer(prev => {
        if (prev <= 1) {
          clearInterval(id);
          // Decide outcome when timer hits 0
          if (caughtHearts >= 5) {
            setWon(true);
          } else {
            // Reset to retry
            setCaughtHearts(0);
            return 10; // restart
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [gameType, won, caughtHearts]);

  // Create falling hearts for catch game
  useEffect(() => {
    if (gameType === 'catch' && gameTimer > 0 && !won) {
      const interval = setInterval(() => {
        const newHeart = {
          id: Date.now() + Math.random(),
          left: Math.random() * 80 + 10,
          top: -10
        };
        setCatchHearts(prev => [...prev, newHeart]);
        
        setTimeout(() => {
          setCatchHearts(prev => prev.filter(h => h.id !== newHeart.id));
        }, 3000);
      }, 800);
      return () => clearInterval(interval);
    }
  }, [gameType, gameTimer, won]);

  const handleSequenceClick = (idx) => {
    if (won) return;
    if (idx === sequence[clicked.length]) {
      const next = [...clicked, idx];
      setClicked(next);
      if (next.length === sequence.length) {
        setWon(true);
        // Don't call onWin immediately, let user click next
      }
    } else {
      setClicked([]);
    }
  };

  const handleMemoryCardClick = (cardId) => {
    if (flippedCards.length === 2 || flippedCards.includes(cardId) || matchedCards.includes(cardId)) return;
    
    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);
    
    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      const firstCard = memoryCards.find(c => c.id === first);
      const secondCard = memoryCards.find(c => c.id === second);
      
      if (firstCard.emoji === secondCard.emoji) {
        const newMatched = [...matchedCards, first, second];
        setMatchedCards(newMatched);
        setFlippedCards([]);
        
        if (newMatched.length === memoryCards.length) {
          setWon(true);
          // Don't call onWin immediately, let user click next
        }
      } else {
        setTimeout(() => setFlippedCards([]), 600);
      }
    }
  };

  const handleQuizAnswer = (answerIdx) => {
    const newAnswers = [...quizAnswers, answerIdx];
    setQuizAnswers(newAnswers);
    
    if (newAnswers.length === quizQuestions.length) {
      const allCorrect = newAnswers.every((answer, i) => answer === quizQuestions[i].correct);
      if (allCorrect) {
        setWon(true);
        // Don't call onWin immediately, let user click next
      } else {
        setQuizAnswers([]);
        setQuizQuestion(0);
      }
    } else {
      setQuizQuestion(prev => prev + 1);
    }
  };

  const catchHeart = (heartId) => {
    setCatchHearts(prev => prev.filter(h => h.id !== heartId));
    setCaughtHearts(prev => {
      const newCount = prev + 1;
      // Auto-complete as soon as 5 hearts are caught
      if (gameType === 'catch' && newCount >= 5) {
        setWon(true);
      }
      return newCount;
    });
  };

  const nextGame = () => {
    if (currentGame < 4) {
      if (currentGame === 1) {
        setGameType('memory');
        setCurrentGame(2);
      } else if (currentGame === 2) {
        setGameType('quiz');
        setCurrentGame(3);
      } else if (currentGame === 3) {
        setGameType('catch');
        setCurrentGame(4);
      }
      setWon(false);
      setClicked([]);
      setFlippedCards([]);
      setMatchedCards([]);
      setQuizAnswers([]);
      setQuizQuestion(0);
  setCaughtHearts(0);
  setGameTimer(10);
    } else {
      // All games complete, call onWin
      onWin();
    }
  };

  return (
    <div className="love-game">
      {gameType === 'sequence' && (
        <>
          <div className="game-instructions">🩷 Game 1/4: Click hearts in order (1→2→3) 🩷</div>
          <div className="game-hearts">
            {sequence.map((_, i) => (
              <button
                key={i}
                className={`game-heart ${clicked.includes(i) ? 'clicked' : ''}`}
                onClick={() => handleSequenceClick(i)}
              >
                <FontAwesomeIcon icon={faHeart} />
                <span className="heart-number">{i + 1}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {gameType === 'memory' && (
        <>
          <div className="game-instructions">🩷 Game 2/4: Find matching pairs! 🩷</div>
          <div className="memory-grid">
            {memoryCards.map(card => (
              <button
                key={card.id}
                className={`memory-card ${flippedCards.includes(card.id) || matchedCards.includes(card.id) ? 'flipped' : ''}`}
                onClick={() => handleMemoryCardClick(card.id)}
              >
                {flippedCards.includes(card.id) || matchedCards.includes(card.id) ? card.emoji : '🍁'}
              </button>
            ))}
          </div>
        </>
      )}

      {gameType === 'quiz' && (
        <>
          <div className="game-instructions">🩷 Game 3/4: Answer with your heart! 🩷</div>
          <div className="quiz-container">
            {quizQuestion < quizQuestions.length && (
              <div className="quiz-question">
                <h3>{quizQuestions[quizQuestion].question}</h3>
                <div className="quiz-options">
                  {quizQuestions[quizQuestion].options.map((option, i) => (
                    <button
                      key={i}
                      className="quiz-option"
                      onClick={() => handleQuizAnswer(i)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {gameType === 'catch' && (
        <>
          <div className="game-instructions">🩷 Game 4/4: Catch 5 hearts in {gameTimer}s! 🩷</div>
          <div className="catch-stats">💖 Caught: {caughtHearts}/5 | ⏰ Time: {gameTimer}s</div>
          <div className="catch-area">
            {catchHearts.map(heart => (
              <button
                key={heart.id}
                className="falling-heart"
                style={{ left: `${heart.left}%`, top: `${heart.top}px` }}
                onClick={() => catchHeart(heart.id)}
              >
                💖
              </button>
            ))}
          </div>
        </>
      )}

      {won && (
        <div className="game-win">
      {currentGame < 4 ? (
            <>
              <div>🎉 Level {currentGame} Complete! 💖</div>
              <button className="next-game-btn" onClick={nextGame}>
                🤍 Next Challenge 🤍
              </button>
            </>
          ) : (
            <>
              <div>🥳 All games complete! You won my heart! 🫀</div>
              <button className="next-game-btn" onClick={nextGame}>
        🎉 View Surprise ! 🎉
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

<<<<<<< HEAD
// Cute flippable cards for Shreya
function CuteCards() {
  const cards = [
    { front: 'S', back: 'Spark that brightens even ordinary moments ✨' },
    { front: 'H', back: 'Heart of pure kindness and grace 🌙' },
    { front: 'R', back: 'Radiant aura that feels so calming 🧚‍♀️' },
    { front: 'E', back: 'Elegance in every little expression 🌷' },
    { front: 'Y', back: 'Youthful glow and effortless charm 💖' },
    { front: 'A', back: 'Admirably genuine and thoughtful always 🌟' },
=======
// Cute flippable cards for Saraa
function CuteCards() {
  const cards = [
    { front: 'S', back: 'Smiles that light up every room ☺️' },
    { front: 'A', back: 'Always caring and thoughtful 💖' },
    { front: 'R', back: 'Radiates positivity and warmth 🌈' },
    { front: 'A', back: 'Amazingly unique and inspiring 🌟' },
    { front: 'A', back: 'Adorable in every way 🦋' },
>>>>>>> f8413c7 (feat: add SketchCards section for Saraa's sketches)
  ];
  const [flipped, setFlipped] = useState(Array(cards.length).fill(false));

  const toggle = (i) => {
    const copy = [...flipped];
    copy[i] = !copy[i];
    setFlipped(copy);
  };

  return (
    <>
      <div className="cute-cards">
        {cards.map((c, i) => (
          <button key={i} className={`cute-card ${flipped[i] ? 'flipped' : ''}`} onClick={() => toggle(i)}>
            <div className="card-face card-front">{c.front}</div>
            <div className="card-face card-back">{c.back}</div>
          </button>
        ))}
      </div>
      <SketchCards />
    </>
  );
}

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
<<<<<<< HEAD
  <div className="door-title">Knock Knock, Shreya 🦋</div>
=======
  <div className="door-title">Knock Knock, Saraa 🦋</div>
>>>>>>> f8413c7 (feat: add SketchCards section for Saraa's sketches)
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
<<<<<<< HEAD
            For Dear Shreya 👸
=======
            For Dear Saraa 👸
>>>>>>> f8413c7 (feat: add SketchCards section for Saraa's sketches)
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
<<<<<<< HEAD
              Dear Shreya, you make my world brighter than a thousand stars!<br />
=======
              Dear Saraa, you make my world brighter than a thousand stars!<br />
>>>>>>> f8413c7 (feat: add SketchCards section for Saraa's sketches)
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

<<<<<<< HEAD
  {/* Extra cute cards for Shreya */}
        {gameCompleted && (
          <div className="cards-section">
            <h3 className="cards-title fancy-font">Special meanings for you, Shreya ♥️</h3>
=======
  {/* Extra cute cards for Saraa */}
        {gameCompleted && (
          <div className="cards-section">
            <h3 className="cards-title fancy-font">Special meanings for you, Saraa ♥️</h3>
>>>>>>> f8413c7 (feat: add SketchCards section for Saraa's sketches)
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
