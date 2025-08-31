import React from 'react';
import { projectsData } from '../constants';
import { ProjectCard } from './ProjectCard';
import { Project } from '../types';

interface ProjectsProps {
    sectionRef: React.RefObject<HTMLElement>;
    activeSkill: string | null;
    onProjectHover: (skills: string[] | null) => void;
    onViewDetails: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ sectionRef, activeSkill, onProjectHover, onViewDetails }) => {
    return (
        <section id="projects" ref={sectionRef} className="py-20 fade-in-section">
            <h2 className="text-4xl font-bold text-center text-white mb-12">Professional Showcase</h2>
            <div id="projects-grid" className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectsData.map(project => {
                    const isHighlighted = activeSkill ? project.keywords.includes(activeSkill) : false;
                    const isDimmed = activeSkill ? !isHighlighted : false;
                    return <ProjectCard key={project.id} project={project} isHighlighted={isHighlighted} isDimmed={isDimmed} onHover={onProjectHover} onViewDetails={onViewDetails} />;
                })}
            </div>
        </section>
    );
};