"use client";
import React, { useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Work History', href: '/work-history' },
  { name: 'Consulting Services', href: '/consulting-services' },
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  React.useEffect(() => {
    if (!contactOpen) return;
    const handleClick = (e: MouseEvent) => {
      // Only close if click is outside the popover
      setContactOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [contactOpen]);

  // Professional, modern, and attractive Navbar redesign
  return (
    <nav className="w-screen left-0 right-0 bg-white/80 shadow-md backdrop-blur-md fixed top-0 z-50 border-b border-slate-200">
      <div className="flex items-center justify-between h-16 relative w-full">
        {/* Left: Logo & Contact Popover */}
        <div className="absolute left-0 top-0 h-16 flex items-center pl-4 min-w-[220px]">
          <button
            onClick={() => setContactOpen((v) => !v)}
            className="group flex items-center gap-2 focus:outline-none focus:ring-0 focus:border-0 active:outline-none active:ring-0 active:border-0 transition-transform hover:scale-105"
            aria-label="Open contact card"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <img src="/Lets_Talk.png" alt="Home" className="w-10 h-10 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-200 bg-white" />
            <span className="hidden sm:inline text-xl font-extrabold tracking-tight text-blue-700 ml-1">Parag Jain</span>
          </button>
          {/* Contact Card Popover */}
          {contactOpen && (
            <div
              className="absolute left-0 top-14 z-50 animate-slideDown bg-white rounded-2xl shadow-2xl p-6 w-80 border border-slate-100 flex flex-col items-start gap-4 transition-transform duration-300 min-w-[260px]"
              style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}
              onClick={e => e.stopPropagation()}
            >
              <button className="absolute top-3 right-3 text-slate-400 hover:text-blue-600 text-lg" onClick={() => setContactOpen(false)} aria-label="Close contact card">✕</button>
              <div className="flex items-center gap-4 mb-2">
                <img src="/home_icon.png" alt="Profile" className="w-14 h-14 rounded-full shadow bg-white" />
                <div>
                  <h2 className="text-lg font-bold text-slate-800 leading-tight">Pj</h2>
                  <span className="text-xs text-slate-500">Technology Strategist</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full mt-2">
                <div className="flex items-center gap-3 text-slate-700 text-sm">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5.5A2.5 2.5 0 0 1 5.5 3h9A2.5 2.5 0 0 1 17 5.5v9A2.5 2.5 0 0 1 14.5 17h-9A2.5 2.5 0 0 1 3 14.5v-9Z"/><path d="M8 7h4M8 10h4M8 13h2"/></svg>
                  <span className="font-medium">+91-9535209090</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700 text-sm">
                  <svg width="20" height="20" fill="currentColor" className="inline"><path d="M10 .3a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 10 5.8c.85.004 1.7.115 2.5.337 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 10 .3Z"/></svg>
                  <a href="https://github.com/paragjn" target="_blank" rel="noopener noreferrer" className="hover:underline font-medium">@paragjain</a>
                </div>
                <div className="flex items-center gap-3 text-slate-700 text-sm">
                  <svg width="20" height="20" fill="currentColor" className="inline"><path d="M16.5 2A2.5 2.5 0 0 1 19 4.5v11A2.5 2.5 0 0 1 16.5 18h-13A2.5 2.5 0 0 1 1 15.5v-11A2.5 2.5 0 0 1 3.5 2h13zm-8.75 13V8.75H5.25V15h2.5zm-1.25-7.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5zm9.25 7.25v-3.25c0-1.1-.9-2-2-2s-2 .9-2 2V15h2.5zm-4.25 0V8.75H10.5V15h2.5z"/></svg>
                  <a href="https://linkedin.com/in/paragj_11" target="_blank" rel="noopener noreferrer" className="hover:underline font-medium">LinkedIn</a>
                </div>
                <div className="flex items-center gap-3 text-slate-700 text-sm">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M6 16c0-2.21 3.58-4 8-4s8 1.79 8 4"/></svg>
                  <span className="font-medium">India</span>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Right: Navigation Links */}
        <div className="hidden md:flex gap-1.5 items-center absolute right-0 top-0 h-16 pr-4 min-w-[320px] justify-end">
          {navLinks.map(link => {
            const isInternal = link.href.startsWith('/');
            return isInternal ? (
              <Link
                key={link.name}
                href={link.href}
                className="text-slate-700 hover:text-blue-600 font-semibold text-base tracking-wide transition-colors duration-200 px-2 py-1 rounded-lg focus:outline-none focus:ring-0 active:text-blue-700"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-700 hover:text-blue-600 font-semibold text-base tracking-wide transition-colors duration-200 px-2 py-1 rounded-lg focus:outline-none focus:ring-0 active:text-blue-700"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </a>
            );
          })}
        </div>
        {/* Center: Spacer (flex-grow) for mobile menu button */}
        <div className="flex-1" />
        {/* Right: Mobile Menu Button */}
        <div className="md:hidden flex items-center absolute right-0 top-0 h-16 pr-4">
          <button
            aria-label="Open menu"
            className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-blue-50 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-700"><line x1="4" y1="8" x2="24" y2="8" /><line x1="4" y1="14" x2="24" y2="14" /><line x1="4" y1="20" x2="24" y2="20" /></svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 shadow-xl border-t border-slate-100 animate-fadeIn">
          <div className="flex flex-col items-center gap-6 py-6">
            {navLinks.map(link => {
              const isInternal = link.href.startsWith('/');
              return isInternal ? (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-slate-700 hover:text-blue-600 font-semibold text-lg px-4 py-2 rounded-lg transition-colors duration-200 focus:text-blue-600 focus:outline-none focus:ring-0 active:text-blue-700"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-slate-700 hover:text-blue-600 font-semibold text-lg px-4 py-2 rounded-lg transition-colors duration-200 focus:text-blue-600 focus:outline-none focus:ring-0 active:text-blue-700"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
