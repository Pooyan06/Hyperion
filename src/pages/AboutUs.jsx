import { useEffect, useRef } from 'react';
import Starfield from '../Components/Starfield';

export default function AboutUs() {
  const imageRefs = useRef([]);

  // انیمیشن ورود متن‌ها
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, delay);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // حرکت موس روی تصاویر (parallax hover)
  useEffect(() => {
    const handleMouseMove = (e) => {
      imageRefs.current.forEach((img) => {
        if (!img) return;
        const rect = img.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateX = (y / rect.height) * 3;
        const rotateY = (x / rect.width) * -3;
        img.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
      });
    };
    const handleMouseLeave = () => {
      imageRefs.current.forEach((img) => {
        if (!img) return;
        img.style.transform =
          'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)';
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className='relative flex w-full flex-col items-center justify-center gap-12 overflow-hidden p-4 text-slate-300 sm:gap-16 sm:p-6 md:gap-20 md:p-8'>
      {/* کامپوننت ستاره‌ها */}
      <Starfield starCount={200} />

      {/* بخش اول متن و تصویر */}
      <div className='flex w-full flex-col gap-8 md:flex-row md:gap-12'>
        <div className='flex flex-1 items-center'>
          <div
            className='animate-on-scroll from-left pr-0 sm:pr-10 md:pr-20'
            data-delay='0'
          >
            <h2 className='pb-2 text-lg text-blue-400 sm:text-xl md:text-2xl'>
              [About us]
            </h2>
            <h3 className='pb-3 text-3xl sm:text-4xl md:text-7xl'>
              Test test test test test test test
            </h3>
            <p className='text-sm sm:text-base md:text-slate-400'>
              Test test test test test test test test test test tetst test test
            </p>
          </div>
        </div>

        <div
          className='animate-on-scroll from-right h-60 w-full flex-1 overflow-hidden rounded-2xl sm:h-80 md:h-120'
          data-delay='200'
          ref={(el) => (imageRefs.current[0] = el)}
        >
          <img src='./images/3.webp' className='h-full w-full object-cover' />
        </div>
      </div>

      {/* متن وسط */}
      <div
        className='animate-on-scroll from-bottom px-4 text-center sm:px-12 md:px-50'
        data-delay='400'
      >
        <p className='text-sm sm:text-base md:text-lg'>
          Test test test test test test test test test test test test test test
          test test test test test test test test test test test test test test
          test test test test test test test test test test test test test test
          ...
          <span className='text-slate-400'>Test test test test test test</span>
        </p>
      </div>

      {/* آمار */}
      <div
        className='animate-on-scroll from-bottom flex w-full flex-col justify-around gap-4 px-4 sm:flex-row sm:gap-6 sm:px-10 md:gap-10 md:px-70'
        data-delay='600'
      >
        <div className='text-center'>
          <p className='pb-1 text-2xl sm:text-3xl md:text-4xl'>150+</p>
          <p className='text-sm text-slate-400 sm:text-base md:text-base'>
            Test test
          </p>
        </div>
        <div className='text-center'>
          <p className='pb-1 text-2xl sm:text-3xl md:text-4xl'>100+</p>
          <p className='text-sm text-slate-400 sm:text-base md:text-base'>
            Test test
          </p>
        </div>
        <div className='text-center'>
          <p className='pb-1 text-2xl sm:text-3xl md:text-4xl'>200+</p>
          <p className='text-sm text-slate-400 sm:text-base md:text-base'>
            Test test
          </p>
        </div>
        <div className='text-center'>
          <p className='pb-1 text-2xl sm:text-3xl md:text-4xl'>30</p>
          <p className='text-sm text-slate-400 sm:text-base md:text-base'>
            Test test
          </p>
        </div>
      </div>

      {/* بخش دوم متن و تصاویر */}
      <div className='flex w-full flex-col gap-8 md:flex-row md:gap-12'>
        <div
          className='animate-on-scroll from-left relative max-h-80 flex-1 rounded-2xl sm:max-h-96 md:max-h-120'
          data-delay='800'
          ref={(el) => (imageRefs.current[1] = el)}
        >
          <img
            src='./images/6.webp'
            className='h-full w-full rounded-2xl object-cover'
          />
          <div
            className='animate-on-scroll from-right absolute top-1/7 right-10 h-40 w-40 overflow-hidden rounded-2xl bg-[#000205] shadow shadow-white sm:h-48 sm:w-48 md:h-50 md:w-50'
            data-delay='1000'
            ref={(el) => (imageRefs.current[2] = el)}
          >
            <img
              src='./images/1.webp'
              className='h-full w-full object-contain'
            />
          </div>
        </div>

        <div className='flex flex-1 items-center'>
          <div
            className='animate-on-scroll from-right pl-0 sm:pl-10 md:pl-20'
            data-delay='1200'
          >
            <h3 className='pb-3 text-3xl sm:text-4xl md:text-7xl'>
              Test test test test test test test
            </h3>
            <p className='text-sm sm:text-base md:text-slate-400'>
              Test test test test test test test test test test tetst test test
            </p>
            <div className='pt-2 text-sm text-slate-400 sm:text-base md:text-base'>
              <p>
                ✔ <span>Test test test test test test test test</span>
              </p>
              <p>
                ✔ <span>Test test test test test test</span>
              </p>
              <p>
                ✔ <span>Test test test test test</span>
              </p>
              <p>
                ✔ <span>Test test test test test test test</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
