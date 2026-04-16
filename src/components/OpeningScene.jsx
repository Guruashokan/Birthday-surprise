import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Typewriter Hook ─── */
function useTypewriter(text, speed = 60, startDelay = 1200) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    let timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, ++i));
        if (i >= text.length) { clearInterval(interval); setDone(true); }
      }, speed);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);
  return { displayed, done };
}

/* ─── Floating Particle ─── */
const Particle = ({ x, y, size, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0, x, y }}
    animate={{ opacity: [0, 1, 0], scale: [0, 1, 0.5], y: y - 200,
               x: x + (Math.random() - 0.5) * 160 }}
    transition={{ delay, duration: 3, ease: 'easeOut' }}
    style={{
      position: 'absolute', width: size, height: size,
      borderRadius: '50%', background: color, pointerEvents: 'none',
    }}
  />
);

/* ── Glowing Heart SVG ── */
const GlowHeart = ({ size = 120, pulse = true }) => (
  <motion.svg
    width={size} height={size} viewBox="0 0 100 92"
    style={{ filter: 'drop-shadow(0 0 20px #f9b8d4) drop-shadow(0 0 40px #e87aac)' }}
    animate={pulse ? { scale: [1, 1.12, 1, 1.06, 1] } : {}}
    transition={pulse ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut' } : {}}
  >
    <defs>
      <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#fde8f0" />
        <stop offset="40%"  stopColor="#f9b8d4" />
        <stop offset="70%"  stopColor="#e87aac" />
        <stop offset="100%" stopColor="#c0527a" />
      </linearGradient>
    </defs>
    <path
      d="M50 88s-40-26-40-50a20 20 0 0 1 40-4 20 20 0 0 1 40 4c0 24-40 50-40 50z"
      fill="url(#heartGrad)"
    />
  </motion.svg>
);

/* ════════════════════════════════════════
   OPENING SCENE COMPONENT
   ════════════════════════════════════════ */
export default function OpeningScene({ onComplete }) {
  const line1 = "Happy Birthday Saiyaara…";
  const { displayed: text1, done: done1 } = useTypewriter(line1, 55, 1800);

  const line2 = "This one's for you, Varshu. ♡";
  const { displayed: text2, done: done2 } = useTypewriter(done1 ? line2 : '', 65, 400);

  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 320,
    y: (Math.random() - 0.5) * 200,
    size: Math.random() * 6 + 3,
    color: ['#f9b8d4','#fde8f0','#f5c97a','#c9aee6'][Math.floor(Math.random() * 4)],
    delay: 1.5 + Math.random() * 2,
  }));

  useEffect(() => {
    if (done2) {
      const t = setTimeout(onComplete, 2200);
      return () => clearTimeout(t);
    }
  }, [done2, onComplete]);

  return (
    <motion.div
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'radial-gradient(ellipse at center, #1a0a1f 0%, #0d0a14 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '2.5rem',
        overflow: 'hidden',
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.6, ease: 'easeInOut' }}
    >
      {/* Background ambient glow */}
      <motion.div
        style={{
          position: 'absolute', width: 420, height: 420,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,122,172,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Particles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {particles.map(p => <Particle key={p.id} {...p} />)}
      </div>

      {/* Heart */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <GlowHeart size={130} pulse />
      </motion.div>

      {/* Typewriter Text */}
      <div style={{ textAlign: 'center', maxWidth: 600, padding: '0 1.5rem' }}>
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.3rem, 4vw, 2rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          color: '#fde8f0',
          letterSpacing: '0.04em',
          lineHeight: 1.6,
          minHeight: '2.4em',
        }}>
          {text1}
          {!done1 && <span style={{ animation: 'heartbeat 1s infinite', display: 'inline-block' }}>|</span>}
        </p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: done1 ? 1 : 0, y: done1 ? 0 : 10 }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-script)',
            fontSize: 'clamp(1.1rem, 3vw, 1.6rem)',
            color: 'var(--gold)',
            marginTop: '0.8rem',
            minHeight: '2em',
          }}
        >
          {text2}
          {done1 && !done2 && <span style={{ display: 'inline-block' }}>|</span>}
        </motion.p>
      </div>

      {/* Skip button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 3, duration: 1 }}
        whileHover={{ opacity: 1 }}
        onClick={onComplete}
        style={{
          position: 'absolute', bottom: '2rem', right: '2rem',
          background: 'transparent', border: '1px solid rgba(255,255,255,0.2)',
          color: 'rgba(255,255,255,0.6)', padding: '0.4rem 1rem',
          borderRadius: '20px', cursor: 'pointer', fontSize: '0.8rem',
          fontFamily: 'var(--font-sans)', letterSpacing: '0.08em',
          transition: 'all 0.3s',
        }}
      >
        skip intro →
      </motion.button>
    </motion.div>
  );
}
