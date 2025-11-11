import React from 'react';

function MobileNav({
  links,
  menuOpen,
  currentPath,
  handleLinkClick,
  closeMenu,
}) {
  return (
    <>
      <div
        className={`fixed top-[70px] right-2 left-2 z-40 flex flex-col items-start gap-4 rounded-2xl bg-[#121527c0]/90 p-6 text-cyan-100/90 shadow-2xl backdrop-blur-lg transition-all duration-300 md:hidden ${
          menuOpen
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-2 opacity-0'
        }`}
      >
        {links.map((link, index) => (
          <div
            key={link.id}
            onClick={() => handleLinkClick(link.id)}
            style={{ '--navigation': index }}
            className={`w-full cursor-pointer py-2 text-xl font-medium transition-colors duration-300 ${
              currentPath === link.path ? 'text-blue-50' : 'hover:text-blue-100'
            }`}
          >
            {link.name}
          </div>
        ))}
      </div>

      {menuOpen && (
        <div className='fixed inset-0 z-30 md:hidden' onClick={closeMenu}></div>
      )}
    </>
  );
}

export default React.memo(MobileNav);
