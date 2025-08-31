import React, { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SkillsNetwork } from './components/SkillsNetwork';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Chatbot } from './components/Chatbot';
import { ProjectModal } from './components/ProjectModal';
import { projectsData } from './constants';
import { Project } from './types';

type SectionKey = 'hero' | 'skills' | 'projects' | 'experience' | 'about' | 'contact';

const App: React.FC = () => {
    const [activeSkill, setActiveSkill] = useState<string | null>(null);
    const [viewedProjectSkills, setViewedProjectSkills] = useState<string[] | null>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const sectionRefs = {
        hero: useRef<HTMLElement>(null),
        skills: useRef<HTMLElement>(null),
        projects: useRef<HTMLElement>(null),
        experience: useRef<HTMLElement>(null),
        about: useRef<HTMLElement>(null),
        contact: useRef<HTMLElement>(null),
    };
    
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1 });

        Object.values(sectionRefs).forEach(ref => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        return () => {
            Object.values(sectionRefs).forEach(ref => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            });
        };
    }, []);

    useEffect(() => {
        // Toggle body scroll based on modal state
        document.body.style.overflow = selectedProject ? 'hidden' : 'auto';
    }, [selectedProject]);


    const handleSkillSelect = (skillId: string | null) => {
        setActiveSkill(skillId);
        if (skillId) {
            const firstMatchingProject = projectsData.find(p => p.keywords.includes(skillId));
            if (firstMatchingProject) {
                setTimeout(() => {
                    const projectCardElement = document.querySelector(`[data-project-id="${firstMatchingProject.id}"]`);
                    projectCardElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
            } else {
                sectionRefs.projects.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            // When 'Reset View' is clicked (skillId is null), scroll back to the skills section.
            sectionRefs.skills.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleProjectHover = (skills: string[] | null) => {
        setViewedProjectSkills(skills);
    };
    
    const handleViewDetails = (project: Project) => {
        setSelectedProject(project);
    };

    const handleCloseModal = () => {
        setSelectedProject(null);
    };

    const handleNavigate = (section: SectionKey) => {
        sectionRefs[section].current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="bg-slate-950 text-slate-300">
            <div className="background-glow"></div>
            <Header onNavigate={handleNavigate} />
            <main className="container mx-auto px-6">
                <Hero sectionRef={sectionRefs.hero} onNavigate={handleNavigate} />
                <SkillsNetwork 
                    sectionRef={sectionRefs.skills} 
                    activeSkill={activeSkill} 
                    onSkillSelect={handleSkillSelect}
                    viewedProjectSkills={viewedProjectSkills} 
                />
                <Projects 
                    sectionRef={sectionRefs.projects} 
                    activeSkill={activeSkill}
                    onProjectHover={handleProjectHover}
                    onViewDetails={handleViewDetails}
                />
                <Experience sectionRef={sectionRefs.experience} />
                <About sectionRef={sectionRefs.about} />
                <Contact sectionRef={sectionRefs.contact} />
            </main>
            <Chatbot />
            {selectedProject && <ProjectModal project={selectedProject} onClose={handleCloseModal} />}
        </div>
    );
};

export default App;