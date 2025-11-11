import { useEffect, useRef } from 'react';

export default function Home() {
  const bgRef = useRef(null);
  const textRef = useRef(null);
  const productRef = useRef(null);

  useEffect(() => {
    let mouseX = 0,
      mouseY = 0,
      targetX = 0,
      targetY = 0,
      rafId;
    let introDone = false;

    const handleMouseMove = (e) => {
      targetX = e.clientX - window.innerWidth / 2;
      targetY = e.clientY - window.innerHeight / 2;
    };

    // 🚀 انیمیشن اولیه (intro)
    const playIntro = () => {
      if (!bgRef.current || !textRef.current || !productRef.current) return;

      bgRef.current.style.transform = 'scale(1.3)';
      textRef.current.style.opacity = '0';
      textRef.current.style.transform = 'translateY(-40px)';
      productRef.current.style.opacity = '0';
      productRef.current.style.transform = 'scale(1.2) translateY(40px)';

      // با کمی تأخیر بعد از اولین paint شروع کن
      setTimeout(() => {
        // 🌌 پس‌زمینه فقط scale داره
        bgRef.current.style.transition = 'transform 2.5s ease-out';
        bgRef.current.style.transform = 'scale(1.05)';

        // ✨ متن و محصول همزمان fade + translate دارند
        textRef.current.style.transition =
          'opacity 1.6s ease-out, transform 1.6s ease-out';
        textRef.current.style.opacity = '1';
        textRef.current.style.transform = 'translateY(0)';

        productRef.current.style.transition =
          'opacity 2s ease-out, transform 2s ease-out';
        productRef.current.style.opacity = '1';
        productRef.current.style.transform = 'scale(1) translateY(0)';

        // بعد از اتمام intro اجازه بده حرکت موس فعال شه
        setTimeout(() => {
          introDone = true;
        }, 2500);
      }, 100); // ← این تاخیر باعث میشه انیمیشن حتما بعد از render شروع بشه
    };

    // 🎮 انیمیشن حرکت موس
    const animate = () => {
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      if (introDone) {
        if (bgRef.current)
          bgRef.current.style.transform = `translate(${mouseX / -70}px, ${mouseY / -70}px) scale(1.05)`;
        if (textRef.current)
          textRef.current.style.transform = `translate(${mouseX / -40}px, ${mouseY / -40}px)`;
        if (productRef.current)
          productRef.current.style.transform = `translate(${mouseX / -12}px, ${mouseY / -12}px) scale(1)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    // 📜 افکت پیمایش برای کم شدن شدت دیده‌شدن هنگام scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fade = Math.max(1 - scrollY / 400, 0.5);
      if (productRef.current) productRef.current.style.opacity = fade;
      if (textRef.current) textRef.current.style.opacity = fade;
    };

    // 🎬 آغاز انیمیشن‌ها
    playIntro();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className='relative flex h-screen items-center justify-center overflow-hidden'>
      {/* پس‌زمینه */}
      <div
        ref={bgRef}
        className="absolute inset-0 h-full w-full bg-[url('/background.webp')] bg-cover bg-center will-change-transform md:aspect-video"
      />

      {/* متن */}
      <div
        ref={textRef}
        className='absolute top-16 z-0 bg-linear-to-t from-[#051116] to-[#0c1b2191] bg-clip-text text-[4rem] font-bold text-transparent will-change-transform select-none md:text-[8rem] lg:text-[9rem]'
      >
        HYPERION
      </div>

      {/* محصول */}
      <div className='relative z-10 aspect-3/4 w-1/2 max-w-80'>
        <img
          ref={productRef}
          src='/product.webp'
          alt='Product'
          className='h-full w-full object-contain will-change-transform'
        />
      </div>
    </div>
  );
}
