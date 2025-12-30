import { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ----------------------------------------------------------------------
// ✅ Data outside the component (to avoid re-creation each render)
// ----------------------------------------------------------------------
const products = [
  {
    image: './images/1.webp',
    title: 'XEON Magnetometer',
    description:
      'The XEON Magnetometer, developed in 2023, is a highly advanced archaeological exploration device that detects buried objects such as cavities, tunnels, chambers, and various metals including gold, silver, and alloys. It offers a user-friendly interface with clear on-screen visualization of detected targets.',
    items: [
      'Scanning depth up to 36 meters for metals and cavities',
      'High-frequency induction coil with low noise and power consumption',
      'Real-time 3D visualization using GRADIOM software',
      'Battery life up to 10 hours with Li-ion power pack',
    ],
  },
  {
    image: './images/2.webp',
    title: 'Technical Specifications',
    description:
      'The XEON device combines cutting-edge gradiometer technology with precision engineering. Its lightweight military-grade aluminum body ensures both durability and portability, making it ideal for professional exploration in all environments.',
    items: [
      'Advanced sensor with ~5 nT sensitivity',
      'Supports step and laser search modes',
      'Built-in Wi-Fi for data transfer and recording output',
      'High-resolution display with 3D visualization support',
    ],
  },
  {
    image: './images/3.webp',
    title: 'Professional Features',
    description:
      'Equipped with multiple advanced systems, the XEON Magnetometer provides stable performance in complex terrains, offering unparalleled detection accuracy and global operability.',
    items: [
      'Noise-cancelling system for accurate measurements',
      'Integrated compass and satellite data for location guidance',
      'Detects both magnetic and non-magnetic metals',
      'Usable in all geographical and climatic conditions worldwide',
    ],
  },
];

// ----------------------------------------------------------------------
// ✅ Simple IntersectionObserver Hook
// ----------------------------------------------------------------------
const useInView = (ref, rootMargin = '0px') => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return visible;
};

// ----------------------------------------------------------------------
// ✅ Main Product Component
// ----------------------------------------------------------------------
export default function Product() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [itemsVisible, setItemsVisible] = useState(true);

  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const itemsContainerRef = useRef(null);

  const imageInView = useInView(imageRef);
  const titleInView = useInView(titleRef);
  const itemsContainerInView = useInView(itemsContainerRef);

  const getLoadClasses = (isVisible, base, delay = 0) =>
    `animate-on-scroll ${base} ${isVisible ? 'visible' : ''} ${
      delay ? `delay-${delay}` : ''
    }`;

  // ✅ Auto slide every 5s
  useEffect(() => {
    let nextIndex = 0;
    const interval = setInterval(() => {
      setFadeOut(true);
      setItemsVisible(false);

      setTimeout(() => {
        nextIndex = (nextIndex + 1) % products.length;
        setCurrentIndex(nextIndex);
        setFadeOut(false);
        requestAnimationFrame(() => setItemsVisible(true));
      }, 400);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const product = useMemo(() => products[currentIndex], [currentIndex]);

  // ✅ Framer Motion image animation
  const imageVariants = {
    initial: { opacity: 0, scale: 1.1, filter: 'blur(6px)' },
    animate: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1.2,
        type: 'spring',
        stiffness: 60,
        damping: 15,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      filter: 'blur(4px)',
      transition: { duration: 0.5 },
    },
  };

  // ----------------------------------------------------------------------
  // ✅ JSX (responsive layout)
  // ----------------------------------------------------------------------
  return (
    <div className='relative flex min-h-screen flex-col overflow-hidden bg-[#000205] text-blue-50 md:h-screen md:flex-row'>
      {/* ---------------- IMAGE SECTION ---------------- */}
      <div
        ref={imageRef}
        className={`flex w-full flex-1 items-center justify-center bg-[#000205] p-4 sm:p-6 md:w-6/12 md:p-8 ${getLoadClasses(
          imageInView,
          'from-bottom',
          0
        )}`}
      >
        <AnimatePresence mode='wait'>
          <motion.img
            key={product.image}
            src={product.image}
            alt='product'
            variants={imageVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            className='max-h-[60vh] w-full rounded-xl object-cover shadow-2xl sm:max-h-[70vh] md:h-full md:max-h-none md:rounded-2xl'
          />
        </AnimatePresence>
      </div>

      {/* ---------------- CONTENT SECTION ---------------- */}
      <div className='flex w-full flex-col justify-evenly bg-[#000205] md:w-6/12'>
        {/* Title & Description */}
        <div
          ref={titleRef}
          className={`flex flex-col justify-center px-5 py-6 text-2xl transition-all duration-500 ease-in-out sm:px-8 sm:py-8 sm:text-3xl md:text-4xl lg:text-5xl ${
            fadeOut ? '-translate-x-16 opacity-0' : 'translate-x-0 opacity-100'
          } ${getLoadClasses(titleInView, 'from-left', 200)}`}
        >
          <h2 className='font-semibold'>{product.title}</h2>
          <p className='pt-4 text-sm leading-relaxed text-blue-100/80 sm:text-base md:pt-6 md:text-lg'>
            {product.description}
          </p>
        </div>

        {/* Features / Items */}
        <div className='flex w-full items-start justify-center px-5 pb-10 sm:px-8 md:pb-16'>
          <div
            ref={itemsContainerRef}
            className='grid w-full grid-cols-2 gap-x-6 gap-y-4 sm:gap-x-10 sm:gap-y-6 md:gap-x-16 md:gap-y-12'
          >
            {product.items.map((item, i) => (
              <div
                key={i}
                className={`transform text-xs transition-all duration-500 ease-out sm:text-sm md:text-base ${
                  itemsVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-10 opacity-0'
                } ${getLoadClasses(
                  itemsContainerInView,
                  'from-right',
                  500 + i * 150
                )}`}
                style={{
                  transitionDelay: itemsVisible ? `${i * 150}ms` : '0ms',
                }}
              >
                <div className='h-0.5 w-1/4 bg-red-50'></div>
                <p className='pt-2 font-medium'>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
