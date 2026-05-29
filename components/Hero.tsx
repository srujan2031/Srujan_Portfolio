import React, { useState, useEffect } from 'react';

interface HeroProps {
    sectionRef: React.RefObject<HTMLElement>;
    onNavigate: (section: 'skills') => void;
}

export const Hero: React.FC<HeroProps> = ({ sectionRef, onNavigate }) => {
    const [typedText, setTypedText] = useState('');
    const fullText = "Data Analyst & Data Scientist";

    useEffect(() => {
        if (typedText.length < fullText.length) {
            const timeoutId = setTimeout(() => {
                setTypedText(fullText.slice(0, typedText.length + 1));
            }, 100);
            return () => clearTimeout(timeoutId);
        }
    }, [typedText]);

    const handleExploreClick = () => {
        onNavigate('skills');
    };

    return (
        <section id="hero" ref={sectionRef} className="text-center py-20 md:py-32 fade-in-section">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
                Srujan Chinta
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold text-sky-400 mb-8 min-h-[3.5rem]">
                <span>{typedText}</span><span className="typing-cursor" aria-hidden="true"></span>
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-slate-400 mb-8 font-light leading-relaxed">
                Transforming complex data into actionable intelligence and high-impact business decisions. Welcome to my portfolio.
            </p>
            <button onClick={handleExploreClick} className="bg-sky-500 text-white font-bold py-3 px-8 rounded-full hover:bg-sky-600 transition-colors text-lg">Explore My Skills</button>
        </section>
    );
};
