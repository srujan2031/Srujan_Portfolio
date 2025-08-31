
import React from 'react';
import { Experience } from '../types';

const UniversityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
);

const ShippingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 12.5V17.5L12 21.5L20 17.5V12.5L12 16.5L4 12.5Z" />
    </svg>
);

const iconMap = {
    university: <UniversityIcon />,
    shipping: <ShippingIcon />,
};

interface TimelineItemProps {
    item: Experience;
    index: number;
    isLast: boolean;
    itemRef: React.RefObject<HTMLDivElement>;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ item, isLast, index, itemRef }) => {
    const isLeftAlignedOnDesktop = index % 2 === 0;

    return (
        <div ref={itemRef} className="relative md:grid md:grid-cols-[1fr,auto,1fr] md:gap-x-10 lg:gap-x-16 fade-in-section">
            
            {/* 1. Content Card */}
            <div className={`
                md:row-start-1
                ${isLeftAlignedOnDesktop ? 'md:col-start-1 md:col-end-2 md:text-right' : 'md:col-start-3 md:col-end-4 md:text-left'}
            `}>
                <div className="p-6 bg-slate-800/40 backdrop-blur-sm rounded-xl shadow-lg border border-slate-700/80 transition-all duration-300 hover:border-sky-400 hover:shadow-sky-500/10 hover:-translate-y-1 ml-12 md:ml-0">
                    <time className="text-lg text-slate-400 mb-1 block">{item.date}</time>
                    <h4 className="text-xl font-bold text-white">{item.role}</h4>
                    <p className="text-sky-300 font-medium">{item.company}</p>
                </div>
            </div>

            {/* 2. Middle Connector (line and icon) */}
            <div className="absolute md:relative w-12 md:w-auto md:col-start-2 md:col-end-3 md:row-start-1 flex justify-center self-stretch">
                <div className="flex flex-col items-center w-full h-full">
                    <div className="relative group z-10 mt-6 md:mt-0 p-3 bg-slate-800 border-2 border-sky-400 rounded-full shadow-lg">
                        {iconMap[item.icon]}
                         <span className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1 bg-slate-800 text-sm rounded-md pointer-events-none whitespace-nowrap border border-slate-700">
                            {item.icon === 'university' ? 'University' : 'Company'}
                        </span>
                    </div>
                    {!isLast && <div className="w-0.5 flex-grow bg-slate-600 rounded"></div>}
                </div>
            </div>
            
            {/* 3. Spacer for desktop to create the alternating effect */}
            <div className={`hidden md:block ${isLeftAlignedOnDesktop ? 'md:col-start-3 md:col-end-4' : 'md:col-start-1 md:col-end-2'}`}></div>
        </div>
    );
};