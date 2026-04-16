import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/* ── Individual Star ── */
function Star({ x, y, size, delay, chosen }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: '50%',
        background: chosen
          ? 'radial-gradient(circle, #fff 0%, #f5c97a 40%, #f9b8d4 80%, transparent 100%)'
          : `rgba(255,255,255,${0.4 + Math.random() * 0.5})`,
        pointerEvents: 'none',
      }}
      animate={chosen ? {
        scale: [1, 2.5, 3.5, 2.8],
        opacity: [0.7, 1, 1, 1],
        boxShadow: [
          '0 0 6px #fff',
          '0 0 30px #f5c97a, 0 0 60px #f9b8d4',
          '0 0 60px #f5c97a, 0 0 120px #f9b8d4',
          '0 0 40px #f5c97a, 0 0 80px #f9b8d4',
        ],
      } : {
        opacity: [0.3, 1, 0.3],
        scale: [1, 1.3, 1],
      }}
      transition={chosen ? {
        duration: 2.5,
        delay: delay + 1.5,
        ease: 'easeInOut',
        times: [0, 0.3, 0.6, 1],
      } : {
        duration: 2 + Math.random() * 3,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

/* ── Shooting Star ── */
function ShootingStar({ delay }) {
  return (
    <motion.div
      initial={{ x: '-5vw', y: '10vh', opacity: 0 }}
      animate={{
        x: ['0vw', '60vw'],
        y: ['0vh', '40vh'],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 1.5,
        delay,
        ease: 'easeOut',
        repeat: Infinity,
        repeatDelay: 6 + Math.random() * 8,
      }}
      style={{
        position: 'absolute',
        top: `${10 + Math.random() * 30}%`,
        left: `${Math.random() * 40}%`,
        width: 2,
        height: 2,
        borderRadius: '50%',
        background: '#fff',
        boxShadow: '-60px 0 20px 1px rgba(255,255,255,0.7)',
        pointerEvents: 'none',
      }}
    />
  );
}

export default function FinalScene() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [heartPhase, setHeartPhase] = useState(false);

  useEffect(() => {
    if (isInView) {
      const t = setTimeout(() => setHeartPhase(true), 3500);
      return () => clearTimeout(t);
    }
  }, [isInView]);

  // Generate stars
  const stars = React.useMemo(() => Array.from({ length: 160 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 4,
    chosen: i === 42, // the special star
  })), []);

  const shootingStars = [0, 1, 2].map(i => ({
    id: i, delay: 2 + i * 4.5,
  }));

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at 50% 0%, #1a0d2e 0%, #0a0710 50%, #04030a 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Stars Layer */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {stars.map(s => (
          <Star key={s.id} {...s} />
        ))}
        {shootingStars.map(s => (
          <ShootingStar key={s.id} delay={s.delay} />
        ))}
      </div>

      {/* Horizon glow */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '30%',
        background: 'linear-gradient(0deg, rgba(26,13,46,0.8) 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* Milky Way Band */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 0.12 : 0 }}
        transition={{ duration: 3, delay: 0.5 }}
        style={{
          position: 'absolute',
          top: '10%', left: '-10%', right: '-10%',
          height: '40%',
          background: 'linear-gradient(135deg, transparent 20%, rgba(201,174,230,0.6) 50%, transparent 80%)',
          transform: 'rotate(-20deg)',
          filter: 'blur(30px)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 5, textAlign: 'center', padding: '2rem' }}>
        {/* Star transforms into Heart */}
        <motion.div
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}
        >
          {!heartPhase ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ duration: 1.5, delay: 1 }}
              style={{
                fontSize: '3rem',
                filter: 'drop-shadow(0 0 20px #f5c97a) drop-shadow(0 0 40px #f9b8d4)',
              }}
            >
              ✦
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                fontSize: 'clamp(4rem, 12vw, 7rem)',
                filter: 'drop-shadow(0 0 30px #f9b8d4) drop-shadow(0 0 60px #e87aac)',
                animation: 'heartbeat 1.8s ease-in-out infinite',
                lineHeight: 1,
              }}
            >
              ♡
            </motion.div>
          )}
        </motion.div>

        {/* Final Message */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }}
          transition={{ duration: 1.4, delay: 1.8, ease: 'easeOut' }}
        >
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.72rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(201,174,230,0.7)',
            marginBottom: '1.2rem',
          }}>always & forever</p>

          <blockquote style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.3rem, 4vw, 2.1rem)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: '#fde8f0',
            lineHeight: 1.75,
            maxWidth: 680,
            margin: '0 auto',
            letterSpacing: '0.02em',
          }}>
            "No matter where life takes us,
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #f9b8d4, #f5c97a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 400,
            }}>
              you will always be my forever."
            </span>
          </blockquote>
        </motion.div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 1.2, delay: 3, ease: 'easeOut' }}
          style={{ marginTop: '3rem' }}
        >
          <p style={{
            fontFamily: 'var(--font-script)',
            fontSize: 'clamp(1.6rem, 4vw, 2.5rem)',
            color: 'var(--gold)',
            filter: 'drop-shadow(0 0 12px rgba(245,201,122,0.5))',
          }}>
            Happy Birthday ♡
          </p>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isInView ? 1 : 0 }}
            transition={{ duration: 1.5, delay: 3.5, ease: 'easeInOut' }}
            style={{
              height: 1,
              width: 200,
              margin: '1.5rem auto 0',
              background: 'linear-gradient(90deg, transparent, rgba(249,184,212,0.5), rgba(245,201,122,0.5), transparent)',
              transformOrigin: 'center',
            }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 0.5 : 0 }}
            transition={{ duration: 1, delay: 4.2 }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.45)',
              marginTop: '1rem',
            }}
          >
            made with love by bunny junior
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
