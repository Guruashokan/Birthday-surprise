import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PLAYLIST = {
  hindi: [
    { title: 'Tum Hi Ho',         artist: 'Arijit Singh',    duration: '0:30', emoji: '🌹', url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/61/1d/3f/611d3f53-8d7b-8455-c66a-af21f28db1cb/mzaf_3524364971696240598.plus.aac.p.m4a" },
    { title: 'Raabta',             artist: 'Arijit Singh',    duration: '0:30', emoji: '💫', url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/0f/f5/da/0ff5dae3-df29-f5d9-0d88-c2d1be7056a4/mzaf_15534038032745935157.plus.aac.p.m4a" },
    { title: 'Kal Ho Naa Ho',      artist: 'Sonu Nigam',      duration: '0:30', emoji: '🌙', url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/f2/dc/3d/f2dc3d30-c133-b7db-b78f-235c1439f1f2/mzaf_956586774622856416.plus.aac.p.m4a" },
    { title: 'Ae Dil Hai Mushkil', artist: 'Arijit Singh',    duration: '0:30', emoji: '✨', url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/11/4d/5f/114d5f2e-795e-67e0-0d33-b28045ef668a/mzaf_3719171959426225060.plus.aac.p.m4a" },
    { title: 'Channa Mereya',      artist: 'Arijit Singh',    duration: '0:30', emoji: '🌸', url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/d5/f9/98/d5f998a7-0090-ee2d-03f8-557ad6c5bf65/mzaf_14251357991592637728.plus.aac.p.m4a" },
  ],
  tamil: [
    { title: 'Venmathi Venmathiye', artist: 'Harris Jayaraj',     duration: '0:30', emoji: '🌺', url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/7d/4f/f4/7d4ff4ba-1b81-5ea2-74c5-9f2378b6764b/mzaf_5062241719859878893.plus.aac.p.m4a" },
    { title: 'Nee Partha Vizhigal', artist: 'Anirudh',            duration: '0:30', emoji: '💎', url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/cd/92/20/cd9220a7-41e1-ddb7-1733-0a0225892fa4/mzaf_4262866015025699145.plus.aac.p.m4a" },
    { title: 'Kannaana Kanney',     artist: 'Anirudh',            duration: '0:30', emoji: '🌙', url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/48/88/5b/48885b7b-6168-185e-4fdf-4cdc65ab0c35/mzaf_5008121729708833334.plus.aac.p.m4a" },
    { title: 'Unnai Kaanadhu Naan', artist: 'Kamal Haasan',       duration: '0:30', emoji: '🌸', url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/d4/82/91/d48291f9-714c-b0e1-b78e-b5d791eabd6a/mzaf_175603851283446085.plus.aac.p.m4a" },
    { title: 'Idhazhin Oram',       artist: 'Anirudh',            duration: 'Full', emoji: '☔', url: 'idhazhin-oram.mp3', startTime: 0 },
  ],
  english: [
    { title: 'A Thousand Years',    artist: 'Christina Perri', duration: '0:30', emoji: '⏳', url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/8e/3a/e7/8e3ae749-5e13-a9ca-fef6-61d615bc3087/mzaf_5415208554281396500.plus.aac.p.m4a" },
    { title: 'Perfect',             artist: 'Ed Sheeran',      duration: '0:30', emoji: '🌟', url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/c7/ba/bc/c7babc66-f598-aaa6-bcf6-307281795817/mzaf_16337361235117168274.plus.aac.p.m4a" },
    { title: 'All of Me',           artist: 'John Legend',     duration: '0:30', emoji: '💍', url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/6c/82/42/6c824284-399d-b1bd-5a60-873e67cf9af8/mzaf_17162071416676008329.plus.aac.p.m4a" },
    { title: 'Make You Feel My Love', artist: 'Adele',         duration: '0:30', emoji: '🌊', url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/7b/36/8a/7b368ad0-752e-fdea-ea87-8e307cf63e3c/mzaf_5613332574982277356.plus.aac.p.m4a" },
    { title: 'Can\'t Help Falling in Love', artist: 'Elvis',  duration: '0:30', emoji: '🍃', url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/cd/8b/b0/cd8bb0f9-d255-c6b9-e55b-3403d135c638/mzaf_11483484905380371632.plus.aac.p.m4a" },
  ],
};

const CATEGORY_LABELS = { hindi: '♩ Hindi', tamil: '♪ Tamil', english: '♫ English' };
const CATEGORY_COLORS = {
  hindi:   { active: '#f9b8d4', glow: 'rgba(249,184,212,0.25)' },
  tamil:   { active: '#c9aee6', glow: 'rgba(201,174,230,0.25)' },
  english: { active: '#f5c97a', glow: 'rgba(245,201,122,0.25)' },
};

/* ── Waveform bar ── */
function WaveBar({ i, isPlaying, color }) {
  return (
    <motion.div
      style={{
        width: 3, borderRadius: 2,
        background: color,
        transformOrigin: 'bottom',
        height: isPlaying ? `${12 + Math.random() * 24}px` : '6px',
      }}
      animate={isPlaying ? {
        scaleY: [0.3, 1, 0.4, 0.9, 0.3],
      } : { scaleY: 0.3 }}
      transition={isPlaying ? {
        duration: 0.8 + Math.random() * 0.6,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: i * 0.07,
      } : { duration: 0.3 }}
    />
  );
}

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [category, setCategory] = useState('hindi');
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState('0:00');
  const [durationStr, setDurationStr] = useState('0:30');
  const color = CATEGORY_COLORS[category].active;

  const songs = PLAYLIST[category];
  const song  = songs[selected];

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  useEffect(() => {
    if (playing) {
      if (audioRef.current) {
        audioRef.current.play().catch(e => {
          console.log("Audio play failed auto", e);
          setPlaying(false);
        });
      }
      // Pause global background music if playing a song
      const bg = document.getElementById('bg-music');
      if (bg) bg.pause();
    } else {
      if (audioRef.current) audioRef.current.pause();
    }
  }, [playing, song.url]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const { currentTime, duration } = audioRef.current;
      setProgress(duration ? (currentTime / duration) * 100 : 0);
      setCurrentTimeStr(formatTime(currentTime));
      if (!isNaN(duration)) setDurationStr(formatTime(duration));
    }
  };

  const handleLoadedMetadata = (e) => {
    const el = e.target;
    if (song.startTime) {
      el.currentTime = song.startTime;
    }
    setDurationStr(formatTime(el.duration));
    setCurrentTimeStr(formatTime(el.currentTime));
  };

  function handleCategory(cat) {
    setCategory(cat);
    setSelected(0);
    setPlaying(false);
    setProgress(0);
  }

  function handleSong(i) {
    setSelected(i);
    setPlaying(true);
    setProgress(0);
  }

  return (
    <div className="section-wrapper" style={{
      background: 'linear-gradient(160deg, #0d0a14 0%, #12091c 50%, #0d0a14 100%)',
    }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1 }}
        style={{ textAlign: 'center', marginBottom: '2.5rem' }}
      >
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: '0.72rem',
          letterSpacing: '0.28em', textTransform: 'uppercase',
          color: 'rgba(245,201,122,0.7)', marginBottom: '0.8rem',
        }}>a playlist for you</p>
        <h2 style={{
          fontFamily: 'var(--font-script)',
          fontSize: 'clamp(2.2rem, 6vw, 4rem)',
          background: 'linear-gradient(135deg, #f9b8d4, #f5c97a)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>Songs That Remind Me of You</h2>
      </motion.div>

      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef} 
        src={song.url} 
        onTimeUpdate={handleTimeUpdate} 
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setPlaying(false)} 
        preload="auto" 
      />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="glass-card"
        style={{
          width: '100%', maxWidth: 720,
          padding: '2.5rem',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))',
          boxShadow: `0 0 60px ${CATEGORY_COLORS[category].glow}, inset 0 1px 0 rgba(255,255,255,0.1)`,
          transition: 'box-shadow 0.6s ease',
        }}
      >
        {/* Category Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleCategory(key)}
              style={{
                flex: 1, minWidth: 100,
                padding: '0.6rem 1rem',
                borderRadius: '12px',
                border: category === key
                  ? `1px solid ${CATEGORY_COLORS[key].active}`
                  : '1px solid rgba(255,255,255,0.1)',
                background: category === key
                  ? `${CATEGORY_COLORS[key].active}22`
                  : 'rgba(255,255,255,0.04)',
                color: category === key ? CATEGORY_COLORS[key].active : 'rgba(255,255,255,0.5)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.82rem',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: category === key
                  ? `0 0 20px ${CATEGORY_COLORS[key].glow}`
                  : 'none',
              }}
            >
              {label}
            </motion.button>
          ))}
        </div>

        {/* Now Playing */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '1.5rem',
          padding: '1.5rem',
          background: 'rgba(255,255,255,0.04)',
          borderRadius: '16px',
          marginBottom: '1.5rem',
          border: '1px solid rgba(255,255,255,0.07)',
        }}>
          {/* Album art placeholder */}
          <div style={{
            width: 72, height: 72, flexShrink: 0,
            borderRadius: '12px',
            background: `radial-gradient(circle at 35% 30%, ${color}44, ${color}11)`,
            border: `1px solid ${color}33`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2rem',
            boxShadow: `0 0 20px ${color}33`,
          }}>
            {song.emoji}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${category}-${selected}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <p style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                  color: '#fff', marginBottom: '0.2rem',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>{song.title}</p>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.8rem',
                  color: 'rgba(255,255,255,0.5)',
                }}>{song.artist}</p>
              </motion.div>
            </AnimatePresence>

            {/* Progress */}
            <div style={{ marginTop: '0.8rem' }}>
              <div style={{
                height: 3, borderRadius: 2,
                background: 'rgba(255,255,255,0.1)',
                position: 'relative', overflow: 'hidden',
              }}>
                <motion.div
                  style={{
                    position: 'absolute', left: 0, top: 0, height: '100%',
                    borderRadius: 2,
                    background: `linear-gradient(90deg, ${color}, ${color}88)`,
                    width: `${progress}%`,
                    boxShadow: `0 0 8px ${color}`,
                  }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: 'linear', duration: 0.2 }}
                />
              </div>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)',
                marginTop: '0.3rem',
              }}>
                <span>{currentTimeStr}</span>
                <span>{song.duration === 'Full' ? durationStr : song.duration}</span>
              </div>
            </div>
          </div>

          {/* Waveform */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '2px', height: 40,
          }}>
            {Array.from({ length: 12 }, (_, i) => (
              <WaveBar key={i} i={i} isPlaying={playing} color={color} />
            ))}
          </div>
        </div>

        {/* Controls */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '1.5rem', marginBottom: '1.5rem',
        }}>
          <ControlBtn onClick={() => handleSong((selected - 1 + songs.length) % songs.length)}
            icon="⏮" color={color} small />
          <ControlBtn
            onClick={() => setPlaying(p => !p)}
            icon={playing ? '⏸' : '▶'}
            color={color}
            large
            glowing
          />
          <ControlBtn onClick={() => handleSong((selected + 1) % songs.length)}
            icon="⏭" color={color} small />
        </div>

        {/* Song List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {songs.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 4, background: 'rgba(255,255,255,0.06)' }}
              onClick={() => handleSong(i)}
              style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                padding: '0.7rem 1rem',
                borderRadius: '10px',
                cursor: 'pointer',
                background: selected === i ? `${color}15` : 'transparent',
                border: selected === i ? `1px solid ${color}30` : '1px solid transparent',
                transition: 'background 0.2s, border 0.2s',
              }}
            >
              <span style={{ fontSize: '1rem', width: 24, textAlign: 'center' }}>{s.emoji}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.88rem',
                  color: selected === i ? color : 'rgba(255,255,255,0.8)',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>{s.title}</p>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.72rem',
                  color: 'rgba(255,255,255,0.35)',
                }}>{s.artist}</p>
              </div>
              <span style={{
                fontSize: '0.72rem',
                color: selected === i ? color : 'rgba(255,255,255,0.3)',
                fontFamily: 'var(--font-sans)', flexShrink: 0,
              }}>{s.duration}</span>
              {selected === i && playing && (
                <div style={{ display: 'flex', gap: 2, alignItems: 'center', height: 16 }}>
                  {[0,1,2].map(j => <WaveBar key={j} i={j} isPlaying color={color} />)}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function ControlBtn({ onClick, icon, color, small, large, glowing }) {
  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.93 }}
      onClick={onClick}
      style={{
        width: large ? 64 : 44,
        height: large ? 64 : 44,
        borderRadius: '50%',
        border: `1px solid ${color}55`,
        background: large ? `radial-gradient(circle, ${color}33, ${color}11)` : 'rgba(255,255,255,0.05)',
        color: color,
        fontSize: large ? '1.4rem' : '1rem',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: glowing && large ? `0 0 25px ${color}55, 0 0 60px ${color}22` : 'none',
        transition: 'box-shadow 0.3s',
        flexShrink: 0,
      }}
    >
      {icon}
    </motion.button>
  );
}
