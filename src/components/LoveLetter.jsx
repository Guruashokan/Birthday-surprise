import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const LETTER_LINES = [
  { text: "Varshu,", delayBefore: 1000 },
  { text: "I don’t think we met by accident.", delayBefore: 1200 },
  { text: "Somewhere, it really feels like things happened the way they were meant to.", delayBefore: 1800 },
  { text: "I still don’t know how to explain it properly…", delayBefore: 2000 },
  { text: "but I feel truly lucky to have someone like you in my world.", delayBefore: 1500 },
  { text: "That first time, after Mirth — when we met for the certificate…", delayBefore: 2200 },
  { text: "I think that’s where something quietly began.", delayBefore: 1800 },
  { text: "And from there, everything just flowed so naturally…", delayBefore: 1600 },
  { text: "from random conversations to those daily calls that slowly became a part of my day.", delayBefore: 1500 },
  { text: "There are so many moments I remember,", delayBefore: 2200 },
  { text: "but that video call stays with me the most —", delayBefore: 1400 },
  { text: "your cozy face, your calm presence…", delayBefore: 1600 },
  { text: "it brought a kind of comfort I didn’t expect.", delayBefore: 1800 },
  { text: "Your childish talks, your little acts,", delayBefore: 2000 },
  { text: "the way you understand, the way you care,", delayBefore: 1400 },
  { text: "and the way you share your honest thoughts…", delayBefore: 1500 },
  { text: "it all means more than I can put into words.", delayBefore: 1800 },
  { text: "And somewhere along the way…", delayBefore: 2200 },
  { text: "you became my Saiyaara —", delayBefore: 1600 },
  { text: "something I can’t fully explain,", delayBefore: 2000 },
  { text: "but something that just feels right.", delayBefore: 1500 },
  { text: "Even now, while writing this,", delayBefore: 2200 },
  { text: "I feel a bit speechless.", delayBefore: 1400 },
  { text: "All I know is —", delayBefore: 2000 },
  { text: "having you around makes things feel lighter, better…", delayBefore: 1500 },
  { text: "and somehow more meaningful.", delayBefore: 1800 },
  { text: "You’ve become someone important in my life, Varshu.", delayBefore: 2200 },
  { text: "And just thinking about all this…", delayBefore: 1800 },
  { text: "brings a kind of quiet happiness,", delayBefore: 1500 },
  { text: "the kind that even shows up as tears sometimes.", delayBefore: 1500 },
  { text: "I don’t have perfect words for everything…", delayBefore: 2500 },
  { text: "but I just wanted you to know this.", delayBefore: 1500 },
  { text: "", delayBefore: 3000 },
  { text: "✨ Final Birthday Ending ✨", delayBefore: 0, overrideStyle: true },
  { text: "And today…", delayBefore: 1000 },
  { text: "I just hope you feel as special as you truly are.", delayBefore: 1500 },
  { text: "Not just today, but in every moment ahead.", delayBefore: 1800 },
  { text: "Happy Birthday, Varshu.", delayBefore: 2000 },
  { text: "— from someone who quietly cherishes you.", delayBefore: 1500, isSignature: true }
];

/* ── Letter Line Component ── */
function LetterLine({ lineData, show, onTypingComplete }) {
  const [displayed, setDisplayed] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const onCompleteRef = useRef(onTypingComplete);
  onCompleteRef.current = onTypingComplete;

  useEffect(() => {
    if (!show) return;
    
    if (displayed.length >= lineData.text.length && lineData.text !== "") {
      onCompleteRef.current();
      return;
    }

    if (lineData.text === "") {
      onCompleteRef.current();
      return;
    }

    let i = displayed.length;
    let cancelled = false;
    const speed = lineData.isSignature ? 40 : 25;
    setIsTyping(true);

    const interval = setInterval(() => {
      if (cancelled) return;
      
      i++;
      setDisplayed(lineData.text.slice(0, i));
      
      if (i >= lineData.text.length) {
        clearInterval(interval);
        setIsTyping(false);
        onCompleteRef.current();
      }
    }, speed);

    return () => {
      cancelled = true;
      clearInterval(interval);
      setIsTyping(false);
    };
  }, [show, lineData.text, lineData.isSignature]); // Intentionally omitted displayed.length

  // If not shown and it's not an empty line, render blank space to preserve layout
  if (!show && lineData.text !== "") {
    return <p style={{ minHeight: lineData.overrideStyle ? '2.5em' : '1.9em', margin: 0 }} />;
  }

  if (lineData.text === "") {
    return <div style={{ height: '1.5rem' }} />;
  }

  const isSig = lineData.isSignature;
  const isSpecial = lineData.overrideStyle;

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        fontFamily: isSig ? 'var(--font-script)' : 'var(--font-serif)',
        fontSize: isSig ? 'clamp(1.5rem, 3.5vw, 2rem)' : isSpecial ? 'clamp(1.1rem, 2vw, 1.3rem)' : 'clamp(0.9rem, 1.8vw, 1.05rem)',
        fontWeight: isSig ? 600 : isSpecial ? 500 : 300,
        fontStyle: isSig ? 'normal' : 'normal',
        color: isSig ? '#f5c97a' : isSpecial ? '#f9b8d4' : 'rgba(253,232,240,0.88)',
        lineHeight: '1.9',
        minHeight: '1.9em',
        letterSpacing: isSpecial ? '0.05em' : '0.01em',
        filter: isSig ? 'drop-shadow(0 0 10px rgba(245,201,122,0.5))' : 'none',
        margin: isSig ? '1.5rem 0 0 0' : isSpecial ? '1rem 0' : 0,
        textAlign: isSpecial ? 'center' : 'left'
      }}
    >
      {displayed}
      {isTyping && (
        <span style={{ opacity: 0.6, animation: 'heartbeat 0.8s infinite', marginLeft: '2px' }}>|</span>
      )}
    </motion.p>
  );
}

export default function LoveLetter() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  
  // Tracks which lines are ready to be shown
  const [activeLines, setActiveLines] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    if (isInView && currentIndex === -1) {
      // Start the sequence!
      triggerNext(0);
    }
  }, [isInView, currentIndex]);

  const triggerNext = (index) => {
    if (index >= LETTER_LINES.length) return;
    setIsWaiting(true);
    
    // Wait for the specific delay BEFORE showing the line
    setTimeout(() => {
      setIsWaiting(false);
      setActiveLines(prev => [...prev, index]);
      setCurrentIndex(index);
    }, LETTER_LINES[index].delayBefore);
  };

  const handleTypingComplete = (index) => {
    // When a line finishes typing, trigger the next one
    if (index === currentIndex) {
      triggerNext(index + 1);
    }
  };

  return (
    <div className="section-wrapper" style={{
      background: 'linear-gradient(160deg, #110820 0%, #1a0d2e 50%, #0d0a14 100%)',
      padding: '5rem 2rem',
    }}>
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1 }}
        style={{ textAlign: 'center', marginBottom: '3rem' }}
      >
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: '0.72rem',
          letterSpacing: '0.28em', textTransform: 'uppercase',
          color: 'rgba(245,201,122,0.7)', marginBottom: '0.8rem',
        }}>written just for you</p>
        <h2 style={{
          fontFamily: 'var(--font-script)',
          fontSize: 'clamp(2.2rem, 6vw, 4rem)',
          background: 'linear-gradient(135deg, #fde8f0, #f5c97a)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          A Letter From My Heart
        </h2>
      </motion.div>

      {/* Letter Card */}
      <div style={{ maxWidth: 720, width: '100%', position: 'relative' }}>
        {/* Decorative corner flourishes */}
        {['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map(corner => (
          <div key={corner} style={{
            position: 'absolute',
            ...corner.includes('top') ? { top: 20 } : { bottom: 20 },
            ...corner.includes('Left') ? { left: 20 } : { right: 20 },
            width: 40, height: 40,
            borderTop: corner.includes('top') ? '1px solid rgba(245,201,122,0.3)' : 'none',
            borderBottom: corner.includes('bottom') ? '1px solid rgba(245,201,122,0.3)' : 'none',
            borderLeft: corner.includes('Left') ? '1px solid rgba(245,201,122,0.3)' : 'none',
            borderRight: corner.includes('Right') ? '1px solid rgba(245,201,122,0.3)' : 'none',
            borderRadius: 2,
            pointerEvents: 'none',
            zIndex: 2,
          }} />
        ))}

        <div className="glass-card" ref={containerRef} style={{
          padding: 'clamp(2rem, 5vw, 3.5rem)',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(245,201,122,0.03))',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Watermark heart */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '18rem', lineHeight: 1,
            opacity: 0.015, pointerEvents: 'none',
            fontFamily: 'serif', userSelect: 'none',
            color: '#f9b8d4',
            zIndex: 0,
          }}>♡</div>

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {LETTER_LINES.map((lineData, i) => (
              <LetterLine
                key={i}
                lineData={lineData}
                show={activeLines.includes(i)}
                onTypingComplete={() => handleTypingComplete(i)}
              />
            ))}
            
            {/* Blinking cursor while waiting perfectly for the next line */}
            {isWaiting && activeLines.length > 0 && activeLines.length < LETTER_LINES.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ height: 0, marginTop: '-0.4rem' }}
              >
                <span style={{ 
                  color: 'rgba(253,232,240,0.88)', 
                  opacity: 0.6, 
                  animation: 'heartbeat 0.8s infinite' 
                }}>|</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Wax seal decoration */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          style={{
            position: 'absolute',
            bottom: -26,
            right: 40,
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 30%, #e87aac, #c0527a)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(232,122,172,0.5), 0 0 0 3px rgba(255,255,255,0.08)',
            fontSize: '1.4rem',
            cursor: 'default',
            zIndex: 3,
          }}
        >
          ♡
        </motion.div>
      </div>
    </div>
  );
}
