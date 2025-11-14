import { useEffect, useRef } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import FAQ from '../Components/FAQ';

export default function ContactUs() {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const elements = sectionRefs.current;
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
    elements.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className='flex w-full flex-col justify-center gap-12 p-4 text-slate-300 sm:gap-14 sm:p-6 md:gap-16 md:p-8'>
      {/* عنوان */}
      <div
        className='animate-on-scroll from-top text-center'
        data-delay='0'
        ref={(el) => (sectionRefs.current[0] = el)}
      >
        <h2 className='pb-5 text-3xl sm:text-4xl md:text-5xl'>
          Take to our expert
        </h2>
        <p className='cursor-hover text-base text-slate-500 sm:text-lg md:text-lg'>
          {`Have question about pricing, plans, or how we can help? We'd love to chat!`}
        </p>
      </div>

      {/* کارت‌های واتساپ */}
      <div
        className='flex flex-wrap justify-center gap-4 sm:gap-6'
        ref={(el) => (sectionRefs.current[1] = el)}
        data-delay='200'
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className='animate-on-scroll from-bottom flex h-48 w-full max-w-xs flex-col overflow-hidden rounded-2xl shadow shadow-white sm:h-50 sm:w-72'
            data-delay={i * 100}
            ref={(el) => (sectionRefs.current[1 + i] = el)}
          >
            <div className='flex-[0.5] p-3'>
              <FaWhatsapp
                size={36}
                className='rounded-xl border border-slate-400 p-1'
              />
            </div>
            <div className='flex-[0.5] pl-3'>
              <h3 className='text-base sm:text-lg'>Chat to Whatsapp</h3>
              <p className='cursor-hover text-sm text-slate-400 sm:text-sm'>
                Speak to our friendly team.
              </p>
              <p className='cursor-hover pt-2 text-sm underline sm:text-sm'>
                <a className='cursor-pointer' href='#'>
                  @hyperion
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div
        className='flex flex-col items-center gap-5 pb-10 sm:gap-6 md:gap-7'
        ref={(el) => (sectionRefs.current[5] = el)}
        data-delay='600'
      >
        <h3
          className='animate-on-scroll from-bottom pt-7 text-2xl sm:text-3xl md:text-3xl'
          data-delay='600'
        >
          Frequently Asked Questions
        </h3>
        <div className='flex flex-col gap-4 text-base sm:gap-5 sm:text-lg md:text-xl'>
          {[1, 2, 3, 4].map((i) => (
            <FAQ
              key={i}
              icon={<FaWhatsapp />}
              title={`Test FAQ ${i}`}
              className='animate-on-scroll from-bottom'
              data-delay={i * 100}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Test
              content for FAQ {i}.
            </FAQ>
          ))}
        </div>
      </div>
    </div>
  );
}
