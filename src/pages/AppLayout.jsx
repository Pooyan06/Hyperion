import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';

const Home = lazy(() => import('./Home'));
const Product = lazy(() => import('./Product'));
const Gallery = lazy(() => import('./Gallery'));

function LoadingScreen() {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-[#000205] text-blue-50'>
      <div className='flex flex-col items-center gap-3'>
        <div className='h-10 w-10 animate-spin rounded-full border-4 border-blue-400 border-t-transparent'></div>
        <p className='text-sm text-blue-100/80'>Loading...</p>
      </div>
    </div>
  );
}

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const sectionRefs = useRef({});
  const observerRef = useRef(null);
  const timeoutRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [loadedPages, setLoadedPages] = useState({});

  const sections = [
    { id: 'home', path: '/home', component: Home },
    { id: 'product', path: '/product', component: Product },
    { id: 'gallery', path: '/gallery', component: Gallery },
  ];

  const handleScrollToSection = (id, path) => {
    const el = sectionRefs.current[id];
    if (!el) return;
    setIsScrolling(true);
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
      navigate(path, { replace: true });
    }, 600); // هماهنگ با مدت زمان اسکرول
  };

  // انتقال به سکشن درست هنگام ورود مستقیم با URL
  useEffect(() => {
    const currentSection = sections.find((s) => s.path === location.pathname);
    if (currentSection) {
      setTimeout(() => {
        const el = sectionRefs.current[currentSection.id];
        if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' });
      }, 100);
    }
  }, []); // فقط بار اول

  // IntersectionObserver برای تغییر URL هنگام اسکرول
  useEffect(() => {
    observerRef.current?.disconnect();
    const observer = new IntersectionObserver(
      (entries) => {
        let mostVisible = null;
        let maxRatio = 0;
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            mostVisible = entry.target;
            maxRatio = entry.intersectionRatio;
          }
        }
        if (mostVisible && !isScrolling) {
          const section = sections.find((s) => s.id === mostVisible.id);
          if (section && location.pathname !== section.path) {
            navigate(section.path, { replace: true });
          }
        }
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: '-10% 0px -10% 0px' }
    );
    observerRef.current = observer;

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isScrolling, navigate, location.pathname]);

  const markPageLoaded = (id) => {
    setLoadedPages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <>
      <Header
        handleScroll={handleScrollToSection}
        currentPath={location.pathname}
      />

      {sections.map(({ id, path, component: Component }) => (
        <section
          key={id}
          id={id}
          ref={(el) => (sectionRefs.current[id] = el)}
          className='min-h-screen snap-start scroll-mt-20'
        >
          <Suspense fallback={<LoadingScreen />}>
            <Component onLoad={() => markPageLoaded(id)} />
          </Suspense>
        </section>
      ))}
    </>
  );
}
