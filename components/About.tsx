import React from 'react';

export const About: React.FC<{ sectionRef: React.RefObject<HTMLElement> }> = ({ sectionRef }) => {
    return (
        <section id="about" ref={sectionRef} className="py-20 fade-in-section">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-white mb-6">About Me</h2>
                <div className="text-xl text-slate-400 space-y-6">
                    <p className="about-paragraph">
                        Hello! I'm Srujan, a data scientist and machine learning engineer driven by a passion for transforming complex data into tangible solutions. My journey into tech began with a deep curiosity for how things work, which quickly evolved into a fascination with using code and algorithms to solve real-world problems.
                    </p>
                    <p className="about-paragraph">
                        From optimizing supply chains at a shipping company to building AI-powered legal tools, my focus has always been on creating value and driving impact. I thrive on the entire lifecycle of a data product—from the initial spark of an idea and rigorous data analysis to deploying a robust, scalable system.
                    </p>
                    <p className="about-paragraph">
                        Beyond data science, I'm also passionate about software development and building complete applications. When I'm not architecting data pipelines or training models, I enjoy exploring the latest advancements in AI, creating personal projects that leverage its power, and thinking about the next big challenge to tackle.
                    </p>
                </div>
            </div>
        </section>
    );
};