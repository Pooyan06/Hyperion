import React from 'react';

function DesktopNav({ links, currentPath, handleLinkClick }) {
  return (
    <nav className='hidden flex-2 justify-center md:flex'>
      <ul className='flex cursor-pointer justify-center gap-8 text-[17px] text-cyan-100/70'>
        {links.map((link, index) => (
          <li
            key={link.id}
            onClick={() => handleLinkClick(link.id, link.path)} // تغییر داده شد
            style={{ '--navigation': index }}
            className={`cursor-hover relative whitespace-nowrap transition-all duration-300 ${
              currentPath === link.path ? 'text-blue-50' : 'hover:text-blue-100'
            }`}
          >
            {link.name}
            <span
              className={`absolute -bottom-1 left-0 h-[2px] w-full origin-center scale-x-0 rounded-full bg-blue-50 transition-transform duration-300 ${
                currentPath === link.path ? 'scale-x-100' : 'hover:scale-x-100'
              }`}
            ></span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default React.memo(DesktopNav);
