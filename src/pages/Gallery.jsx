import { useEffect } from 'react';

export default function Gallery() {
  useEffect(() => {
    // انتخاب المان‌ها فقط یک‌بار انجام می‌شود
    const elements = document.querySelectorAll('.animate-on-scroll');

    // IntersectionObserver واحد و بسیار سبک
    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target); // بلافاصله از رصد خارج می‌شود (سبک‌تر)
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px', // کمی حاشیه برای اجرای زودتر انیمیشن
      }
    );

    // ثبت همه المان‌ها در یک حلقه ساده و بهینه
    for (const el of elements) observer.observe(el);

    // پاک‌سازی کامل
    return () => observer.disconnect();
  }, []);

  return (
    <div className='relative flex min-h-screen flex-col overflow-hidden bg-[#000205] text-blue-50'>
      {/* بخش توضیح محصول */}
      <div className='flex h-auto w-full flex-col p-5 md:h-3/5 md:flex-row md:p-8'>
        <div className='animate-on-scroll from-left mb-6 h-auto w-full md:mb-0 md:h-full md:w-[30%]'>
          <p className='pt-5 text-lg font-medium tracking-wide text-blue-200 md:text-xl'>
            XEON Device Gallery
          </p>
        </div>

        <div className='animate-on-scroll from-right flex-1'>
          <h2 className='animate-on-scroll from-right w-full text-3xl font-semibold text-blue-50 md:text-5xl lg:text-6xl'>
            Advanced Archaeological Magnetometer
          </h2>
          <p className='animate-on-scroll from-right w-full pt-4 text-sm leading-relaxed text-blue-100/80 md:pt-8 md:text-base'>
            The <strong>XEON Magnetometer</strong>, developed in 2023 using
            cutting-edge technology, is a highly advanced device designed for
            archaeological exploration. It specializes in detecting buried
            objects such as cavities, tunnels, chambers, and various metals —
            including <strong>gold, silver, and alloys</strong>. The device
            features a user-friendly interface that clearly displays all
            detected targets on its high-resolution screen, making it ideal for
            <strong> treasure hunting</strong> and
            <strong> underground discovery</strong>.
          </p>
        </div>
      </div>

      {/* گرید محصولات */}
      <div className='grid w-full flex-1 auto-rows-fr grid-cols-2 gap-5 p-5 md:grid-cols-2 md:p-8 lg:grid-cols-3'>
        <div className='animate-on-scroll from-left col-span-1 row-span-1 flex min-h-48 items-center justify-center rounded-lg bg-[#000205] md:row-span-2 md:h-auto lg:row-span-2'>
          <img
            src='./images/1.webp'
            alt='product'
            className='h-full w-fit object-contain'
          />
        </div>
        <div className='animate-on-scroll from-left col-span-1 row-span-1 flex min-h-48 items-center justify-center rounded-lg bg-[#000205] md:h-auto'>
          <img
            src='./images/2.webp'
            alt='product'
            className='h-full w-fit object-contain'
          />
        </div>
        <div className='animate-on-scroll from-right col-span-1 row-span-1 flex min-h-48 items-center justify-center rounded-lg bg-[#000205] md:row-span-2 md:h-auto lg:row-span-2'>
          <img
            src='./images/3.webp'
            alt='product'
            className='h-full w-fit object-contain'
          />
        </div>
        <div className='animate-on-scroll from-bottom col-span-1 row-span-1 flex min-h-48 items-center justify-center rounded-lg bg-[#000205] md:row-span-2 md:h-auto lg:row-span-2'>
          <img
            src='./images/4.webp'
            alt='product'
            className='h-full w-fit object-contain'
          />
        </div>
        <div className='animate-on-scroll from-bottom md:from-left col-span-1 row-span-1 flex min-h-48 items-center justify-center rounded-lg bg-[#000205] md:h-auto'>
          <img
            src='./images/5.webp'
            alt='product'
            className='h-full w-fit object-contain'
          />
        </div>
        <div className='animate-on-scroll from-bottom col-span-1 row-span-1 flex min-h-48 items-center justify-center rounded-lg bg-[#000205] md:h-auto'>
          <img
            src='./images/6.webp'
            alt='product'
            className='h-full w-fit object-contain'
          />
        </div>
      </div>
    </div>
  );
}
