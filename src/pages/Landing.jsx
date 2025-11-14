import { useState, useEffect, useRef } from 'react';

export default function Landing() {
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef(null);

  const hotspots = [
    {
      id: 1,
      top: 9.5,
      left: 5,
      width: 14,
      height: 95,
      image: './product/product1.webp',
      title: 'Test1',
      tooltip: 'test test test test test test',
    },
    {
      id: 2,
      top: 0,
      left: 80,
      width: 8,
      height: 26,
      image: './product/product2.webp',
      title: 'Test2',
      tooltip: 'test test test test test test',
    },
    {
      id: 3,
      top: 35,
      left: 63,
      width: 14,
      height: 8,
      image: './product/product3.webp',
      title: 'Test3',
      tooltip: 'test test test test test test',
    },
    {
      id: 4,
      top: 14,
      left: 21,
      width: 18,
      height: 14,
      image: './product/product4.webp',
      title: 'Test4',
      tooltip: 'test test test test test test',
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.hotspot')) {
        setActiveTooltip(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className='pt-5'>
      <div className='text-center'>
        <h2 className='text-5xl text-slate-300'>Test</h2>
        <p className='pt-5 text-xl text-slate-400'>test test test</p>
      </div>

      <div
        ref={containerRef}
        className='flex w-full justify-center overflow-hidden pt-6'
      >
        {/* Wrapper با نسبت ثابت (بسیار مهم برای حفظ مختصات) */}
        <div className='relative mx-auto aspect-[3/4] w-full max-w-[450px]'>
          {/* تصویر */}
          <img
            src={
              activeTooltip
                ? hotspots.find((h) => h.id === activeTooltip)?.image
                : './product/product.webp'
            }
            className='absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ease-in-out'
            alt='product'
          />

          {/* Hotspots */}
          {hotspots.map((hotspot) => (
            <div
              key={hotspot.id}
              className='hotspot absolute cursor-pointer'
              style={{
                top: `${hotspot.top}%`,
                left: `${hotspot.left}%`,
                width: `${hotspot.width}%`,
                height: `${hotspot.height}%`,
              }}
              onMouseEnter={() => setActiveTooltip(hotspot.id)}
              onMouseLeave={() => setActiveTooltip(null)}
              onClick={() =>
                setActiveTooltip((prev) =>
                  prev === hotspot.id ? null : hotspot.id
                )
              }
            >
              {/* Tooltip */}
              <div
                className={`pointer-events-none absolute z-20 origin-bottom-left border-b border-slate-300 bg-[#0000006b] px-3 py-2 text-sm text-white shadow-lg transition-all duration-300 ease-out ${
                  activeTooltip === hotspot.id
                    ? 'translate-y-0 scale-100 opacity-100'
                    : 'translate-y-2 scale-90 opacity-0'
                }`}
                style={{
                  top: 0,
                  left: `calc(${hotspot.width}% + 55px)`,
                  whiteSpace: 'nowrap',
                }}
              >
                <h3 className='text-lg text-slate-300'>{hotspot.title}</h3>
                <p className='pl-2 text-sm text-slate-400'>{hotspot.tooltip}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
