import { useEffect, useRef } from 'react';

export default function Starfield({ starCount = 150 }) {
  const canvasRef = useRef(null);
  const stars = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const targetMouse = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const time = useRef(0);
  const containerVisible = useRef(0); // 0 = خارج، 1 = کاملا داخل

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    resize();
    window.addEventListener('resize', resize);

    // ایجاد ستاره‌ها
    stars.current = Array.from({ length: starCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random(),
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.5 + 0.2,
      oscillationX: Math.random() * 20,
      oscillationY: Math.random() * 10,
      phase: Math.random() * Math.PI * 2,
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    // ثبت موقعیت موس
    const handleMouseMove = (e) => {
      if (!canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      targetMouse.current.x = (e.clientX - rect.left) / rect.width - 0.5;
      targetMouse.current.y = (e.clientY - rect.top) / rect.height - 0.5;
    };
    canvas.parentElement?.addEventListener('mousemove', handleMouseMove);

    // حرکت اسکرول
    const handleScroll = () => {
      if (!canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      scroll.current = window.scrollY - rect.top;

      // تعیین درصد دیده شدن کامپوننت (0 تا 1)
      const topVisible = Math.max(
        0,
        Math.min(
          canvas.parentElement.getBoundingClientRect().top,
          window.innerHeight
        )
      );
      const bottomVisible = Math.max(
        0,
        Math.min(
          canvas.parentElement.getBoundingClientRect().bottom,
          window.innerHeight
        )
      );
      const visibleHeight = bottomVisible - topVisible;
      containerVisible.current = Math.max(
        0,
        Math.min(visibleHeight / canvas.parentElement.clientHeight, 1)
      );
    };
    window.addEventListener('scroll', handleScroll);

    const lerp = (start, end, t) => start + (end - start) * t;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time.current += 0.02;

      // موس را آرام به سمت هدف حرکت می‌دهیم (سینک نرم)
      mouse.current.x = lerp(mouse.current.x, targetMouse.current.x, 0.05);
      mouse.current.y = lerp(mouse.current.y, targetMouse.current.y, 0.05);

      stars.current.forEach((star) => {
        const perspective = 0.5 + 0.5 * star.z;
        const starSize =
          star.size *
          perspective *
          (1 + 0.3 * Math.sin(time.current + star.pulsePhase));
        const starSpeed = star.speed * perspective;

        star.y += starSpeed;
        if (star.y > canvas.height) star.y = 0;

        const offsetX =
          Math.sin(time.current + star.phase) * star.oscillationX * star.z;
        const offsetY =
          Math.cos(time.current + star.phase) * star.oscillationY * star.z;

        const parallaxX = mouse.current.x * 20 * star.z;
        const parallaxY = mouse.current.y * 12 * star.z;

        const scrollEffect = scroll.current * 0.05 * star.z;

        // محو شدن بالا و پایین و ورود/خروج کامپوننت
        const fadeTop = Math.min(star.y / 80, 1);
        const fadeBottom = Math.min((canvas.height - star.y) / 80, 1);
        const opacity =
          Math.max(0, Math.min(fadeTop, fadeBottom)) * containerVisible.current;

        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(
          star.x + offsetX + parallaxX,
          star.y + offsetY + parallaxY + scrollEffect,
          starSize,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });

      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
      canvas.parentElement?.removeEventListener('mousemove', handleMouseMove);
    };
  }, [starCount]);

  return (
    <canvas
      ref={canvasRef}
      className='pointer-events-none absolute top-0 left-0 h-full w-full'
    />
  );
}
