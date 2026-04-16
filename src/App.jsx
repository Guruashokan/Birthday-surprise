import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import OpeningScene    from './components/OpeningScene';
import NameReveal      from './components/NameReveal';
import MemoryTimeline  from './components/MemoryTimeline';
import LoveLetter      from './components/LoveLetter';
import MusicPlayer     from './components/MusicPlayer';
import SurpriseSection from './components/SurpriseSection';
import FinalScene      from './components/FinalScene';
import Countdown       from './components/Countdown';
import { useCursorSparkle } from './hooks/useCursorSparkle';

/* ── ✦ Change name here ✦ ── */
const HER_NAME = "Varshu";

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  useCursorSparkle();

  useEffect(() => {
    if (!unlocked) return;
    const playMusic = () => {
      const audio = document.getElementById('bg-music');
      if (audio && audio.paused) {
        audio.volume = 0.15;
        audio.play().catch(e => console.log("Audio play blocked", e));
      }
    };
    window.addEventListener('click', playMusic, { once: true });
    window.addEventListener('scroll', playMusic, { once: true });
    window.addEventListener('touchstart', playMusic, { once: true });
    return () => {
      window.removeEventListener('click', playMusic);
      window.removeEventListener('scroll', playMusic);
      window.removeEventListener('touchstart', playMusic);
    };
  }, [unlocked]);

  return (
    <div style={{ position: 'relative' }}>
      <audio id="bg-music" src="bg-music.mp3" loop preload="auto" />
      <AnimatePresence>
        {!unlocked && (
          <Countdown 
            key="countdown"
            targetDateStr="2026-04-17T00:00:00" 
            onUnlock={() => setUnlocked(true)} 
          />
        )}
      </AnimatePresence>

      {unlocked && (
        <>
          {/* Intro overlay */}
          <AnimatePresence>
            {!introComplete && (
              <OpeningScene onComplete={() => setIntroComplete(true)} />
            )}
          </AnimatePresence>

          {/* Main content — rendered under the overlay */}
          <main style={{ opacity: introComplete ? 1 : 0, transition: 'opacity 1s ease' }}>
            {/* 1 — Name Reveal */}
            <section id="name">
              <NameReveal name={HER_NAME} />
            </section>

            {/* 2 — Memory Timeline */}
            <section id="memories">
              <MemoryTimeline />
            </section>

            {/* 3 — Love Letter */}
            <section id="letter">
              <LoveLetter />
            </section>

            {/* 4 — Music Player */}
            <section id="music">
              <MusicPlayer />
            </section>

            {/* 5 — Surprise */}
            <section id="surprise">
              <SurpriseSection />
            </section>

            {/* 6 — Final Scene */}
            <section id="final">
              <FinalScene />
            </section>
          </main>
        </>
      )}
    </div>
  );
}
