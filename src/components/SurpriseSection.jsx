import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Floating Heart ── */
function FloatingHeart({ id, x, size, color, delay, onDone }) {
  return (
    <motion.div
      key={id}
      initial={{ x, y: '100vh', opacity: 1, scale: 0, rotate: Math.random() * 30 - 15 }}
      animate={{
        y: '-120vh',
        opacity: [1, 1, 0],
        scale: [0, 1, 0.8],
        rotate: Math.random() * 60 - 30,
      }}
      transition={{
        duration: 4 + Math.random() * 2,
        delay,
        ease: 'easeOut',
      }}
      onAnimationComplete={onDone}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        fontSize: size,
        color,
        pointerEvents: 'none',
        zIndex: 200,
        filter: `drop-shadow(0 0 ${size / 3}px ${color})`,
        userSelect: 'none',
      }}
    >
      ♡
    </motion.div>
  );
}

/* ── Sparkle ── */
function Sparkle({ x, y, id }) {
  const size = 4 + Math.random() * 6;
  const colors = ['#f5c97a', '#f9b8d4', '#c9aee6', '#fde8f0', '#fff'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  return (
    <motion.div
      initial={{ x, y, scale: 0, opacity: 1 }}
      animate={{
        x: x + (Math.random() - 0.5) * 300,
        y: y + (Math.random() - 0.5) * 300,
        scale: [0, 1.5, 0],
        opacity: [1, 1, 0],
        rotate: Math.random() * 360,
      }}
      transition={{ duration: 1.5 + Math.random(), ease: 'easeOut' }}
      style={{
        position: 'fixed',
        width: size, height: size,
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 ${size}px ${color}`,
        pointerEvents: 'none',
        zIndex: 201,
      }}
    />
  );
}

let heartId = 0;
let sparkleId = 0;

export default function SurpriseSection() {
  const [triggered, setTriggered] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  const launchHearts = useCallback(() => {
    const newHearts = Array.from({ length: 30 }, () => ({
      id: heartId++,
      x: Math.random() * window.innerWidth,
      size: Math.floor(Math.random() * 30 + 18),
      color: ['#f9b8d4', '#e87aac', '#f5c97a', '#c9aee6', '#fde8f0'][Math.floor(Math.random() * 5)],
      delay: Math.random() * 2.5,
    }));
    setHearts(prev => [...prev, ...newHearts]);
  }, []);

  const launchSparkles = useCallback(() => {
    const newSparkles = Array.from({ length: 50 }, () => ({
      id: sparkleId++,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }));
    setSparkles(prev => [...prev, ...newSparkles]);
  }, []);

  function handleSurprise() {
    if (triggered) return;
    setTriggered(true);
    launchHearts();
    launchSparkles();
    setTimeout(() => {
      setShowMessage(true);
      launchHearts();
    }, 600);
    setTimeout(() => {
      launchHearts();
      launchSparkles();
    }, 1400);
  }

  return (
    <div className="section-wrapper" style={{
      background: 'linear-gradient(160deg, #0d0a14 0%, #1c0a25 50%, #0d0a14 100%)',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Floating hearts */}
      {hearts.map(h => (
        <FloatingHeart
          key={h.id} {...h}
          onDone={() => setHearts(prev => prev.filter(x => x.id !== h.id))}
        />
      ))}

      {/* Sparkles */}
      {sparkles.map(s => (
        <Sparkle key={s.id} {...s} />
      ))}

      {/* Ambient glow when triggered */}
      <AnimatePresence>
        {triggered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'radial-gradient(ellipse at 50% 50%, rgba(232,122,172,0.15) 0%, transparent 70%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Content */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1 }}
          style={{ marginBottom: '3rem' }}
        >
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: '0.72rem',
            letterSpacing: '0.28em', textTransform: 'uppercase',
            color: 'rgba(249,184,212,0.7)', marginBottom: '0.8rem',
          }}>something special awaits</p>
          <h2 style={{
            fontFamily: 'var(--font-script)',
            fontSize: 'clamp(2.2rem, 6vw, 4rem)',
            background: 'linear-gradient(135deg, #fde8f0, #f9b8d4, #c9aee6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>A Little Surprise</h2>
        </motion.div>

        {/* Surprise Button */}
        {!triggered && (
          <motion.button
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSurprise}
            style={{
              padding: '1.1rem 2.8rem',
              borderRadius: '50px',
              border: '1px solid rgba(249,184,212,0.4)',
              background: 'linear-gradient(135deg, rgba(249,184,212,0.15), rgba(201,174,230,0.1))',
              color: '#fde8f0',
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              fontStyle: 'italic',
              cursor: 'pointer',
              letterSpacing: '0.05em',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 0 40px rgba(249,184,212,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Shimmer effect */}
            <motion.div
              style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
                backgroundSize: '200% 100%',
              }}
              animate={{ backgroundPosition: ['200% center', '-200% center'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
            />
            <span style={{ position: 'relative' }}>🎁 Click for a Surprise</span>
          </motion.button>
        )}

        {/* Birthday Message */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
              style={{ maxWidth: 600, margin: '0 auto', padding: '0 1.5rem' }}
            >
              {/* Main message */}
              <motion.div
                animate={{
                  filter: [
                    'drop-shadow(0 0 20px rgba(249,184,212,0.5))',
                    'drop-shadow(0 0 50px rgba(249,184,212,0.9))',
                    'drop-shadow(0 0 20px rgba(249,184,212,0.5))',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <h3 style={{
                  fontFamily: 'var(--font-script)',
                  fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                  background: 'linear-gradient(135deg, #fde8f0, #f9b8d4, #f5c97a)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1.2,
                  marginBottom: '1rem',
                }}>
                  Happy Birthday<br />Varshu ❤️
                </h3>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                  fontStyle: 'italic',
                  color: 'rgba(253,232,240,0.85)',
                  lineHeight: 1.7,
                }}
              >
                Every year with you feels like the beginning of something beautiful.
                Thank you for existing. Thank you for being mine.
              </motion.p>

              {/* Photo grid placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.75rem',
                  marginTop: '2rem',
                }}
              >
                {['surprise1.jpeg', 'surprise2.jpeg', 'surprise3.jpeg', 'surprise4.jpeg', 'surprise5.jpeg', 'surprise6.jpeg'].map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8, rotate: (Math.random() - 0.5) * 10 }}
                    animate={{ opacity: 1, scale: 1, rotate: (Math.random() - 0.5) * 6 }}
                    transition={{ delay: 1.2 + i * 0.12, duration: 0.5 }}
                    whileHover={{ scale: 1.08, rotate: 0, zIndex: 10 }}
                    style={{
                      aspectRatio: '1',
                      borderRadius: '12px',
                      background: `rgba(${
                        [
                          '249,184,212','201,174,230','245,201,122',
                          '232,122,172','253,232,240','192,82,122',
                        ][i]
                      }, 0.12)`,
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.8rem',
                      cursor: 'pointer',
                      overflow: 'hidden',
                    }}
                  >
                    <img 
                      src={img} 
                      alt={`Surprise ${i + 1}`} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
