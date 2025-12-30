import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import { useNavigate } from 'react-router-dom';

export default function Header({ handleScroll, currentPath }) {
  const [locked, setLocked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setLocked(window.scrollY >= 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (e) => {
      if (!headerRef.current?.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const links = useMemo(
    () => [
      { name: 'Home', id: 'home', path: '/home' },
      { name: 'Product', id: 'product', path: '/product' },
      { name: 'Landing', id: 'landing', path: '/landing' },
      { name: 'Gallery', id: 'gallery', path: '/gallery' },
      { name: 'About us', id: 'about-us', path: '/about-us' },
      { name: 'Contact us', id: 'contact-us', path: '/contact-us' },
    ],
    []
  );

  const handleLinkClick = useCallback(
    (id, path) => {
      handleScroll(id); // scroll
      navigate(path); // update URL
      setMenuOpen(false);
    },
    [handleScroll, navigate]
  );

  useEffect(() => {
    const header = headerRef.current;
    if (header) {
      requestAnimationFrame(() => {
        header.classList.remove('preload');
        header.classList.add('header-loaded');
      });
    }
  }, []);

  return (
    <header ref={headerRef} className='preload fixed top-0 z-50 w-full p-2'>
      <div
        className={`flex w-full items-center justify-between rounded-full px-6 py-3 transition-all duration-500 ${
          locked || menuOpen ? 'ring-1 ring-cyan-100/30 backdrop-blur-lg' : ''
        }`}
      >
        <div className='flex flex-1 justify-start'>
          <h1 className='logo-animate text-xl font-semibold tracking-wide text-blue-50'>
            Hyperion
          </h1>
        </div>

        <DesktopNav
          links={links}
          currentPath={currentPath}
          handleLinkClick={(id, path) => handleLinkClick(id, path)}
        />

        <div className='flex flex-1 justify-end'>
          <button
            className='text-3xl text-blue-50 transition-transform hover:scale-110 md:hidden'
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label='Toggle menu'
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      <MobileNav
        links={links}
        menuOpen={menuOpen}
        currentPath={currentPath}
        handleLinkClick={handleLinkClick}
        closeMenu={() => setMenuOpen(false)}
      />
    </header>
  );
}
