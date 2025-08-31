import React, { useEffect, useRef } from 'react';
import { Project } from '../types';

interface ProjectModalProps {
    project: Project;
    onClose: () => void;
}

const GitHubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.218.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .266.18.577.688.48A10.001 10.001 0 0020 10c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
    </svg>
);

const ExternalLinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
    </svg>
);


export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        const handleFocusTrap = (event: KeyboardEvent) => {
             if (event.key === 'Tab' && modalRef.current) {
                const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
                    'a[href], button, textarea, input, select'
                );
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (event.shiftKey) { // Shift+Tab
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        event.preventDefault();
                    }
                } else { // Tab
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        event.preventDefault();
                    }
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keydown', handleFocusTrap);

        // Focus the modal content on open
        modalRef.current?.focus();

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keydown', handleFocusTrap);
        };
    }, [onClose]);

    return (
        <div 
            className="modal-overlay open" 
            onClick={onClose} 
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
        >
            <div 
                ref={modalRef}
                className="modal-content" 
                onClick={e => e.stopPropagation()} 
                tabIndex={-1}
            >
                <button onClick={onClose} className="absolute top-4 right-5 text-slate-400 hover:text-white transition-colors text-3xl" aria-label="Close project details">
                    &times;
                </button>
                
                <h2 id="project-modal-title" className="text-3xl font-bold text-white mb-3 pr-8">{project.title}</h2>
                
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => (
                        <span key={tag} className="text-base font-medium bg-sky-500/20 text-sky-400 px-3 py-1 rounded-full">{tag}</span>
                    ))}
                </div>

                <p className="text-lg text-slate-300 mb-6">{project.detailedDescription}</p>

                <div className="flex flex-wrap gap-4">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-lg bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-5 rounded-full transition-colors">
                        <GitHubIcon />
                        View on GitHub
                    </a>
                    {project.liveDemo && (
                         <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-lg bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-5 rounded-full transition-colors">
                            <ExternalLinkIcon />
                            Live Demo
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};
