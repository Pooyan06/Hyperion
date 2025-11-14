import { useState, useRef, useEffect } from 'react';
import { IoIosArrowBack } from 'react-icons/io';

export default function FAQ({ icon, title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('visible');
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 }
    );
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className='w-full max-w-[600px] translate-y-6 cursor-pointer rounded-2xl border p-3 opacity-0 transition-all duration-700 ease-out'
    >
      <div
        className='cursor-hover flex items-center justify-between'
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className='flex items-center gap-3'>
          <div className='rounded-xl border border-slate-400 p-1 text-3xl'>
            {icon}
          </div>
          <h4 className='text-base sm:text-lg md:text-lg'>{title}</h4>
        </div>
        <IoIosArrowBack
          size={22}
          className={`transition-transform duration-300 ${isOpen ? '-rotate-90' : 'rotate-0'}`}
        />
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'mt-4 max-h-96 opacity-100' : 'mt-0 max-h-0 opacity-0'
        }`}
      >
        <div className='p-3 text-sm text-slate-400 sm:p-4 sm:text-base md:text-lg'>
          {children}
        </div>
      </div>
    </div>
  );
}
