import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const hoveringRef = useRef(false);
  const isMobileRef = useRef(false);

  useEffect(() => {
    // ✅ تشخیص موبایل با User-Agent
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    isMobileRef.current = /android|iphone|ipad|ipod|mobile/i.test(ua);

    if (isMobileRef.current) return; // موبایل = هیچ چیزی render نشه

    let animationFrameId;

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleHover = (e) => {
      hoveringRef.current = !!e.target.closest('.cursor-hover');
    };

    const animate = () => {
      const { x: mx, y: my } = mousePos.current;
      let { x: cx, y: cy } = cursorPos.current;

      const ease = 0.35; // سرعت دنبال کردن موس
      cx += (mx - cx) * ease;
      cy += (my - cy) * ease;
      cursorPos.current = { x: cx, y: cy };

      if (cursorRef.current) {
        cursorRef.current.style.width = hoveringRef.current ? '30px' : '22px';
        cursorRef.current.style.height = hoveringRef.current ? '30px' : '22px';
        cursorRef.current.style.backgroundColor = hoveringRef.current
          ? 'white'
          : 'transparent';
        cursorRef.current.style.boxShadow = hoveringRef.current
          ? '0 0 20px rgba(255,255,255,0.9)'
          : '0 0 8px rgba(255,255,255,0.4)';
        cursorRef.current.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', handleHover);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleHover);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (isMobileRef.current) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className='pointer-events-none fixed top-0 left-0 z-999 rounded-full border mix-blend-difference transition-all duration-150 ease-out'
        style={{
          width: 22,
          height: 22,
          borderWidth: '2px',
          borderColor: 'white',
          backgroundColor: 'transparent',
          boxShadow: '0 0 8px rgba(255,255,255,0.4)',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <style>{`
        body, * { cursor: none !important; }
      `}</style>
    </>
  );
}
