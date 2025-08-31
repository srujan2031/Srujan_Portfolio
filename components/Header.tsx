import React, { useState } from 'react';

type SectionKey = 'hero' | 'skills' | 'projects' | 'experience' | 'about' | 'contact';

interface HeaderProps {
    onNavigate: (section: SectionKey) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleNavClick = (section: SectionKey) => {
        onNavigate(section);
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
        }
    };

    const navLinks = [
        { section: 'skills', label: 'Skills' },
        { section: 'projects', label: 'Projects' },
        { section: 'experience', label: 'Experience' },
        { section: 'about', label: 'About' },
        { section: 'contact', label: 'Contact' },
    ] as const;


    return (
        <nav className="bg-slate-950/70 backdrop-blur-md sticky top-0 z-50 border-b border-slate-800">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <button onClick={() => handleNavClick('hero')} className="text-2xl font-bold text-white text-left bg-transparent border-none p-0 cursor-pointer">
                    Srujan Chinta
                </button>
                <div className="hidden md:flex space-x-8">
                    {navLinks.map(link => (
                         <button key={link.section} onClick={() => handleNavClick(link.section)} className="text-lg text-slate-300 hover:text-sky-400 transition-colors bg-transparent border-none p-0 cursor-pointer">
                            {link.label}
                        </button>
                    ))}
                </div>
                <div className="md:hidden">
                    <button id="menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-300 hover:text-sky-400 focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"/></svg>
                    </button>
                </div>
            </div>
            <div id="mobile-menu" className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden px-6 pb-4 space-y-2`}>
                 {navLinks.map(link => (
                     <button key={link.section} onClick={() => handleNavClick(link.section)} className="block text-lg text-slate-300 hover:text-sky-400 transition-colors text-left w-full bg-transparent border-none p-0 cursor-pointer">
                        {link.label}
                    </button>
                ))}
            </div>
        </nav>
    );
};