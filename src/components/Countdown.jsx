import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Countdown({ targetDateStr, onUnlock }) {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const target = new Date(targetDateStr).getTime();
    
    // Check initially
    if (new Date().getTime() >= target) {
      onUnlock();
      return;
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;
      
      if (difference <= 0) {
        clearInterval(interval);
        onUnlock();
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [targetDateStr, onUnlock]);

  if (!timeLeft) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 1.5 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'radial-gradient(ellipse at center, #1a0a1f 0%, #0d0a14 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '2rem', textAlign: 'center'
      }}>

      <motion.div
        style={{
          position: 'absolute', width: 420, height: 420,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,122,172,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <motion.div animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 4, repeat: Infinity }} style={{ position: 'relative', zIndex: 1 }}>
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: '0.8rem',
          letterSpacing: '0.28em', textTransform: 'uppercase',
          color: 'rgba(245,201,122,0.7)', marginBottom: '1rem',
        }}>Please wait...</p>
        <h1 
          className="countdown-title"
          style={{
            fontFamily: 'var(--font-script)',
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            background: 'linear-gradient(135deg, #fde8f0, #f9b8d4, #c9aee6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '4rem',
            filter: 'drop-shadow(0 0 20px rgba(249,184,212,0.3))'
        }}>
          Something special is unlocking soon
        </h1>
      </motion.div>
      
      <div style={{ display: 'flex', gap: 'clamp(0.5rem, 3vw, 1.5rem)', zIndex: 1 }}>
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              background: 'rgba(255,255,255,0.03)', 
              border: '1px solid rgba(255,255,255,0.08)',
              padding: 'clamp(1rem, 3vw, 1.5rem) clamp(1rem, 4vw, 2rem)', 
              borderRadius: '20px', 
              minWidth: 'clamp(70px, 12vw, 100px)',
              fontFamily: 'var(--font-sans)', 
              fontSize: 'clamp(2rem, 5vw, 3rem)', 
              fontWeight: 300,
              color: '#fde8f0',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 0 20px rgba(249,184,212,0.05)'
            }}>
              {value.toString().padStart(2, '0')}
            </div>
            <span style={{
              marginTop: '1.2rem', 
              fontSize: 'clamp(0.6rem, 1.5vw, 0.8rem)', 
              letterSpacing: '0.2em',
              textTransform: 'uppercase', 
              color: 'rgba(201,174,230,0.8)', 
              fontFamily: 'var(--font-sans)'
            }}>{unit}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
