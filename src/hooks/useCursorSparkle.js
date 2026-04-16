import { useEffect } from 'react';

export function useCursorSparkle() {
  useEffect(() => {
    const colors = ['#f9b8d4', '#f5c97a', '#c9aee6', '#fde8f0', '#e87aac'];
    let lastTime = 0;

    function handleMouseMove(e) {
      const now = Date.now();
      if (now - lastTime < 60) return; // throttle
      lastTime = now;

      const el = document.createElement('div');
      el.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: ${4 + Math.random() * 5}px;
        height: ${4 + Math.random() * 5}px;
        border-radius: 50%;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 6px currentColor;
        animation: fadeOut 0.6s ease forwards;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 700);
    }

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
}
