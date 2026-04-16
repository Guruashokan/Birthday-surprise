import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

/* ── Glowing Particle around name ── */
function NameParticle({ i, total, radius }) {
  const angle = (i / total) * Math.PI * 2;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  const colors = ['#f9b8d4','#f5c97a','#c9aee6','#fde8f0','#e87aac'];
  const color = colors[i % colors.length];
  const size = Math.random() * 5 + 3;

  return (
    <motion.div
      style={{
        position: 'absolute',
        width: size, height: size,
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 ${size * 2}px ${color}`,
        left: '50%', top: '50%',
        transformOrigin: '0 0',
        pointerEvents: 'none',
      }}
      animate={{
        x: [x * 0.8, x, x * 1.1, x],
        y: [y * 0.8, y, y * 1.1, y],
        opacity: [0.4, 1, 0.7, 1],
        scale: [0.8, 1.2, 0.9, 1],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: i * 0.06,
      }}
    />
  );
}

export default function NameReveal({ name = "My Love" }) {
  const nameRef = useRef(null);
  const [heartVisible, setHeartVisible] = useState(false);
  const particleCount = 28;

  useEffect(() => {
    if (!nameRef.current) return;
    const chars = nameRef.current.querySelectorAll('.char');
    gsap.fromTo(chars,
      { opacity: 0, y: 40, scale: 0.5 },
      {
        opacity: 1, y: 0, scale: 1,
        stagger: 0.12, duration: 1, ease: 'back.out(1.7)', delay: 0.4,
        onComplete: () => setHeartVisible(true),
      }
    );
  }, []);

  return (
    <div className="section-wrapper" style={{
      background: 'radial-gradient(ellipse at 50% 40%, #1e0d2e 0%, #0d0a14 70%)',
      overflow: 'hidden',
    }}>
      {/* Ambient Background Glow */}
      <motion.div style={{
        position: 'absolute', width: 700, height: 700, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,174,230,0.12) 0%, transparent 65%)',
        pointerEvents: 'none',
      }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>

        {/* Subtitle label */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.4em' }}
          animate={{ opacity: 1, letterSpacing: '0.25em' }}
          transition={{ duration: 1.4, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.75rem',
            color: 'rgba(249,184,212,0.7)',
            textTransform: 'uppercase',
            marginBottom: '1rem',
            letterSpacing: '0.25em',
          }}
        >
          this page is made for
        </motion.p>

        {/* Name container with orbital particles */}
        <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
          {/* Massive Background Heart Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.15, scale: [1, 1.05, 1] }}
            transition={{ opacity: { duration: 2, delay: 0.5 }, scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }}
            style={{
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: 'clamp(20rem, 50vw, 40rem)',
              color: '#f9b8d4',
              zIndex: 1,
              pointerEvents: 'none',
              filter: 'blur(40px)',
              lineHeight: 0,
            }}
          >
            ❤
          </motion.div>

          {/* Orbital particles */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'visible', zIndex: 2 }}>
            {Array.from({ length: particleCount }, (_, i) => (
              <NameParticle key={i} i={i} total={particleCount} radius={220} />
            ))}
          </div>

          {/* The Name */}
          <h1
            ref={nameRef}
            style={{
              fontFamily: 'var(--font-script)',
              fontSize: 'clamp(5rem, 16vw, 11rem)',
              fontWeight: 700,
              lineHeight: 1,
              position: 'relative', zIndex: 3,
              cursor: 'default',
              userSelect: 'none',
              margin: 0,
              padding: '2rem 0',
              filter: 'drop-shadow(0 0 40px rgba(249,184,212,0.4))'
            }}
          >
            {name.split('').map((char, i) => (
              <span key={i} className="char" style={{ 
                display: 'inline-block',
                background: 'linear-gradient(135deg, #fff 0%, #fde8f0 30%, #f9b8d4 70%, #f5c97a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                padding: '0 0.2rem',
              }}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>
        </div>

        {/* Heartbeat line */}
        {heartVisible && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}
          >
            {/* ECG-like heartbeat */}
            <HeartbeatLine />
          </motion.div>
        )}

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            fontStyle: 'italic',
            color: 'rgba(249,184,212,0.8)',
            marginTop: '1.5rem',
            letterSpacing: '0.02em',
          }}
        >
          "You are the reason I believe in magic."
        </motion.p>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{ duration: 2.4, delay: 2.5, repeat: Infinity }}
          style={{
            marginTop: '3.5rem', color: 'rgba(245,201,122,0.8)',
            fontSize: '0.85rem', letterSpacing: '0.1em',
          }}
        >
          ↓ scroll to begin our story
        </motion.div>
      </div>
    </div>
  );
}

/* ── Animated ECG Heartbeat SVG ── */
function HeartbeatLine() {
  return (
    <svg width="280" height="50" viewBox="0 0 280 50" fill="none" style={{ overflow: 'visible' }}>
      <motion.polyline
        points="0,25 30,25 45,8 55,42 65,5 75,45 85,25 115,25 130,12 145,38 155,25 280,25"
        stroke="url(#ecgGrad)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: 'easeInOut', delay: 0.3 }}
      />
      <defs>
        <linearGradient id="ecgGrad" x1="0" y1="0" x2="280" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#c9aee6" />
          <stop offset="50%"  stopColor="#f9b8d4" />
          <stop offset="100%" stopColor="#f5c97a" />
        </linearGradient>
      </defs>
      {/* Glow dot traveling */}
      <motion.circle
        cx="0" cy="25" r="4"
        fill="#f9b8d4"
        style={{ filter: 'drop-shadow(0 0 6px #f9b8d4)' }}
        animate={{ cx: [0, 280] }}
        transition={{ duration: 2.5, ease: 'linear', repeat: Infinity, delay: 0.5 }}
      />
    </svg>
  );
}
