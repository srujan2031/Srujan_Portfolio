import React from 'react';

export const About: React.FC<{ sectionRef: React.RefObject<HTMLElement> }> = ({ sectionRef }) => {
    return (
        <section id="about" ref={sectionRef} className="py-20 fade-in-section">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-white mb-6">About Me</h2>
                <div className="text-lg md:text-xl text-slate-300 space-y-6 max-w-3xl mx-auto leading-relaxed">
                    <p className="about-paragraph">
                        Hello! I'm Srujan Chinta, a Data Analyst with over 3 years of professional experience across banking and retail analytics. I specialize in transforming complex data ecosystems into clear, actionable insights that empower strategic, enterprise-level decision-making.
                    </p>
                    <p className="about-paragraph">
                        My background includes constructing reliable cash-flow forecasting workflows, automated cloud-based ETL pipelines on AWS and Azure, and high-quality BI reporting on Power BI and Tableau. I'm passionate about engineering secure statistical check systems and optimizing data pipelines to deliver 99.9% database integrity for critical reporting tables.
                    </p>
                    <p className="about-paragraph text-slate-400 text-base">
                        I hold a Master's degree in Computer Science from the University of Texas at Arlington and a Bachelor's in Computer Science and Engineering from the National Institute of Technology Calicut. I am also certified as an AWS Data Engineer and Microsoft Fabric Data Engineer Associate.
                    </p>
                </div>
            </div>
        </section>
    );
};
