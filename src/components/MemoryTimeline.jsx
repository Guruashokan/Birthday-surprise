import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const MEMORIES = [
  {
    id: 1,
    label: 'Chapter One',
    title: 'The Day I Met You',
    subtitle: 'The universe rearranged itself.',
    body: `I remember the exact moment. The way the light fell, the way you laughed at something ordinary — and suddenly nothing was ordinary anymore. I didn't know then that I was standing at the beginning of the best chapter of my life. But somewhere deep inside, I felt it: this is someone who will matter.`,
    icon: '✦',
    color: '#f9b8d4',
    accent: 'linear-gradient(135deg, rgba(249,184,212,0.12), rgba(201,174,230,0.06))',
    image: 'memory1.jpeg',
  },
  {
    id: 2,
    label: 'Chapter Two',
    title: 'Moments I\'ll Never Forget',
    subtitle: 'Frozen in time, kept forever.',
    body: `The late-night conversations that turned into morning. The silences that felt louder than words. The way you hold on just a little longer in a hug. The songs that became ours. The inside jokes that make no sense to anyone else. Every ordinary Tuesday that became a memory because you were in it.`,
    icon: '◈',
    color: '#f5c97a',
    accent: 'linear-gradient(135deg, rgba(245,201,122,0.12), rgba(249,184,212,0.06))',
    image: 'memory2.jpeg',
  },
  {
    id: 3,
    label: 'Chapter Three',
    title: 'Why You Mean Everything to Me',
    subtitle: 'Some things can\'t be measured.',
    body: `You are the stillness in my chaos. The thing I look forward to. You make ordinary moments feel like gifts. You've seen the parts of me I don't show — and you stayed. That means more than a thousand words could hold. You are home.`,
    icon: '♡',
    color: '#c9aee6',
    accent: 'linear-gradient(135deg, rgba(201,174,230,0.12), rgba(245,201,122,0.06))',
    image: 'memory3.jpeg',
  },
  {
    id: 4,
    label: 'Chapter Four',
    title: 'A Beautiful Journey',
    subtitle: 'Every step with you is my favorite one.',
    body: `Looking back, I realize how much my life has changed since you walked into it. The small moments, the unexpected laughs, and the quiet comfort between us. I don't know exactly what the future holds, but as long as you're by my side, I know it's going to be something wonderful.`,
    icon: '✨',
    color: '#e87aac',
    accent: 'linear-gradient(135deg, rgba(232,122,172,0.12), rgba(249,184,212,0.06))',
    image: 'memory4.jpeg',
  },
];

/* ── Single Memory Card ── */
function MemoryCard({ memory, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [80, 0, 0, -40]);
  const scale = useTransform(scrollYProgress, [0, 0.25], [0.92, 1]);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, scale }}
      className="glass-card"
      initial={false}
      css={undefined}
    >
      <div style={{
        display: 'flex',
        flexDirection: isEven ? 'row' : 'row-reverse',
        gap: '2rem',
        padding: '2.5rem',
        alignItems: 'center',
        flexWrap: 'wrap',
        background: memory.accent,
        borderRadius: '24px',
      }}>

        {/* Image placeholder */}
        <div style={{
          flex: '0 0 280px',
          minWidth: 200,
          height: 240,
          borderRadius: '16px',
          background: 'rgba(255,255,255,0.05)',
          border: memory.image ? 'none' : '1px dashed rgba(255,255,255,0.15)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.6rem',
          color: 'rgba(255,255,255,0.35)',
          fontSize: '0.8rem',
          letterSpacing: '0.08em',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {memory.image ? (
            <img 
              src={memory.image} 
              alt={memory.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
            />
          ) : (
            <>
              {/* Decorative corner */}
              <div style={{
                position: 'absolute', top: 12, left: 12,
                width: 24, height: 24,
                borderTop: '2px solid rgba(255,255,255,0.2)',
                borderLeft: '2px solid rgba(255,255,255,0.2)',
                borderRadius: '2px',
              }} />
              <div style={{
                position: 'absolute', bottom: 12, right: 12,
                width: 24, height: 24,
                borderBottom: '2px solid rgba(255,255,255,0.2)',
                borderRight: '2px solid rgba(255,255,255,0.2)',
                borderRadius: '2px',
              }} />
              <span style={{ fontSize: '2rem', opacity: 0.4 }}>📸</span>
              <span style={{ fontFamily: 'var(--font-sans)' }}>Your photo here</span>
            </>
          )}
        </div>

        {/* Text content */}
        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem',
          }}>
            <span style={{
              fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: memory.color,
              filter: `drop-shadow(0 0 8px ${memory.color})`,
            }}>{memory.icon}</span>
            <span style={{
              fontFamily: 'var(--font-sans)', fontSize: '0.7rem',
              letterSpacing: '0.2em', color: memory.color, textTransform: 'uppercase',
            }}>{memory.label}</span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-script)',
            fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
            color: '#fff',
            marginBottom: '0.3rem',
            filter: `drop-shadow(0 0 12px ${memory.color}55)`,
          }}>{memory.title}</h2>

          <p style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: '0.95rem',
            color: memory.color,
            marginBottom: '1rem',
            opacity: 0.9,
          }}>{memory.subtitle}</p>

          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
            lineHeight: 1.8,
            color: 'rgba(253,232,240,0.85)',
            fontWeight: 300,
          }}>{memory.body}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function MemoryTimeline() {
  return (
    <div style={{
      background: 'linear-gradient(180deg, #0d0a14 0%, #140b20 40%, #0f0c18 100%)',
      padding: '5rem 0',
    }}>
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1 }}
        style={{ textAlign: 'center', marginBottom: '4rem', padding: '0 2rem' }}
      >
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: '0.72rem',
          letterSpacing: '0.28em', textTransform: 'uppercase',
          color: 'rgba(201,174,230,0.7)', marginBottom: '0.8rem',
        }}>our story</p>
        <h2 style={{
          fontFamily: 'var(--font-script)',
          fontSize: 'clamp(2.4rem, 7vw, 4.5rem)',
          background: 'linear-gradient(135deg, #fde8f0, #f9b8d4, #c9aee6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          The Chapters That Define Us
        </h2>
      </motion.div>

      {/* Timeline */}
      <div style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: '0 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem',
        position: 'relative',
      }}>
        {/* Vertical line */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: 1,
          background: 'linear-gradient(180deg, transparent, rgba(249,184,212,0.3), rgba(201,174,230,0.3), transparent)',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
        }} />

        {MEMORIES.map((memory, i) => (
          <MemoryCard key={memory.id} memory={memory} index={i} />
        ))}
      </div>
    </div>
  );
}
