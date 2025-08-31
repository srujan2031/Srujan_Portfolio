import React, { useState } from 'react';
import { Project } from '../types';
import { callGemini } from '../services/geminiService';

interface ProjectCardProps {
    project: Project;
    isHighlighted: boolean;
    isDimmed: boolean;
    onHover: (skills: string[] | null) => void;
    onViewDetails: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, isHighlighted, isDimmed, onHover, onViewDetails }) => {
    const [currentDescription, setCurrentDescription] = useState(project.description);
    const [isLoadingSummary, setIsLoadingSummary] = useState(false);
    const [isSummarized, setIsSummarized] = useState(false);

    const handleSummarize = async () => {
        setIsLoadingSummary(true);
        const prompt = `You are an expert technical writer. Summarize the following project for a tech recruiter in one compelling sentence. Focus on the core technology and its measurable business impact. Project Title: "${project.title}". Description: "${project.detailedDescription}"`;
        try {
            const summary = await callGemini(prompt);
            setCurrentDescription(summary);
            setIsSummarized(true);
        } catch (error) {
            console.error("Failed to summarize project:", error);
            setCurrentDescription("Error generating summary. Please try again.");
        } finally {
            setIsLoadingSummary(false);
        }
    };
    
    return (
        <div 
            data-project-id={project.id} 
            className={`group flex flex-col bg-slate-800/50 border border-slate-700 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 ${isHighlighted ? 'highlight' : ''} ${isDimmed ? 'opacity-40' : ''}`}
            onMouseEnter={() => onHover(project.keywords)}
            onMouseLeave={() => onHover(null)}
        >
            
            <div className="relative w-full flex-shrink-0" style={{ paddingTop: '56.25%' }}> {/* 16:9 Aspect Ratio */}
                <img
                    src={project.bgImage}
                    alt={`Visual for ${project.title}`}
                    className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                />
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>

                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                        <span key={tag} className="text-base font-medium bg-sky-500/20 text-sky-400 px-3 py-1 rounded-full">{tag}</span>
                    ))}
                </div>
                <p className="text-slate-400 text-lg mb-4 flex-grow">{currentDescription}</p>
                <div className="flex flex-wrap gap-2 items-center mt-auto">
                    <button onClick={() => onViewDetails(project)} className="text-sky-400 font-semibold text-lg self-start hover:text-sky-300">View Details &rarr;</button>
                    <button 
                        onClick={handleSummarize} 
                        disabled={isLoadingSummary || isSummarized}
                        className="gemini-btn ml-auto text-lg font-semibold py-1 px-3 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-purple-500/20 text-purple-300 border border-purple-400 hover:bg-purple-500/40">
                        {isLoadingSummary ? 'Generating...' : (isSummarized ? 'Done!' : '✨ Summarize with AI')}
                    </button>
                </div>
            </div>
        </div>
    );
};