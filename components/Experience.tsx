
import React, { useRef, useCallback } from 'react';
import { experienceData } from '../constants';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { TimelineItem } from './TimelineItem';

const GraduationCapIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v6" />
    </svg>
);

export const Experience: React.FC<{ sectionRef: React.RefObject<HTMLElement> }> = ({ sectionRef }) => {
    const itemRefs = experienceData.map(() => useRef<HTMLDivElement>(null));

    const observerCallback = useCallback((entry: IntersectionObserverEntry) => {
        entry.target.classList.add('is-visible');
    }, []);

    useIntersectionObserver(itemRefs, observerCallback, { threshold: 0.1 });

    return (
        <section id="experience" ref={sectionRef} className="py-20 fade-in-section">
            <h2 className="text-4xl font-bold text-center text-white mb-16">Experience & Education</h2>
            
            {/* Academic Section */}
            <div className="max-w-4xl mx-auto mb-20">
                <h3 className="text-3xl font-bold text-white mb-8 text-center">Academic Foundation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* MS Degree Card */}
                    <div className="bg-slate-800/40 backdrop-blur-sm p-6 rounded-xl shadow-lg flex items-start gap-4 transition-all duration-300 hover:-translate-y-1 border border-slate-700/80 hover:border-sky-400 hover:shadow-sky-500/10">
                        <div className="flex-shrink-0 p-3 bg-slate-700 rounded-full mt-1">
                            <GraduationCapIcon />
                        </div>
                        <div>
                            <p className="text-white font-bold text-lg">M.S. in Computer Science</p>
                            <p className="text-slate-300 mb-2">The University of Texas at Arlington</p>
                            <p className="text-lg text-slate-400 italic">A deep dive into advanced algorithms and machine learning theory, graduating with a 3.9 GPA.</p>
                        </div>
                    </div>

                    {/* B.Tech Degree Card */}
                    <div className="bg-slate-800/40 backdrop-blur-sm p-6 rounded-xl shadow-lg flex items-start gap-4 transition-all duration-300 hover:-translate-y-1 border border-slate-700/80 hover:border-sky-400 hover:shadow-sky-500/10">
                         <div className="flex-shrink-0 p-3 bg-slate-700 rounded-full mt-1">
                            <GraduationCapIcon />
                        </div>
                        <div>
                            <p className="text-white font-bold text-lg">B.Tech in Computer Science</p>
                            <p className="text-slate-300 mb-2">National Institute of Technology, Calicut</p>
                            <p className="text-lg text-slate-400 italic">Established a rigorous foundation in core software engineering and computational principles.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Experience Timeline */}
            <div>
                 <h3 className="text-3xl font-bold text-white mb-12 text-center">Professional Journey</h3>
                <div className="max-w-4xl mx-auto flex flex-col gap-y-8 md:gap-y-0">
                    {experienceData.map((item, index) => (
                        <TimelineItem 
                            key={item.id} 
                            item={item} 
                            index={index} 
                            isLast={index === experienceData.length - 1}
                            itemRef={itemRefs[index]}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};