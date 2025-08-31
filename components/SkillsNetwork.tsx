
import React, { useRef, useEffect, useCallback, useState } from 'react';
import { networkData, projectsData } from '../constants';
import { NetworkData, SkillNode } from '../types';

const ANIMATION_DURATION = 500; // ms

interface SkillsNetworkProps {
    sectionRef: React.RefObject<HTMLElement>;
    activeSkill: string | null;
    onSkillSelect: (skillId: string | null) => void;
    viewedProjectSkills: string[] | null;
}

export const SkillsNetwork: React.FC<SkillsNetworkProps> = ({ sectionRef, activeSkill, onSkillSelect, viewedProjectSkills }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const nodeElementsRef = useRef<{ [key: string]: HTMLDivElement }>({});
    const [tooltip, setTooltip] = useState<{ content: string; x: number; y: number } | null>(null);
    // FIX: Explicitly initialize useRef with null to resolve the "Expected 1 arguments, but got 0" error.
    const animationFrameId = useRef<number | null>(null);
    const animationStartTime = useRef<number | null>(null);

    const drawSynapse = useCallback((ctx: CanvasRenderingContext2D, startEl: HTMLElement, endEl: HTMLElement, color: string, width: number, alpha: number = 1) => {
        if (!startEl || !endEl || !containerRef.current) return;
        const containerRect = containerRef.current.getBoundingClientRect();
        const startRect = startEl.getBoundingClientRect();
        const endRect = endEl.getBoundingClientRect();
        
        const startX = startRect.right - containerRect.left;
        const startY = startRect.top + startRect.height / 2 - containerRect.top;
        const endX = endRect.left - containerRect.left;
        const endY = endRect.top + endRect.height / 2 - containerRect.top;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.bezierCurveTo(startX + 60, startY, endX - 60, endY, endX, endY);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.stroke();
        ctx.restore();
    }, []);
    
    const drawAllSynapses = useCallback((animationProgress: number = 1) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw base connections
        networkData.layers.slice(0, -1).forEach((layer, i) => {
            const nextLayer = networkData.layers[i + 1];
            if (nextLayer && nextLayer.name !== 'Output Layer') {
                layer.nodes.forEach(startNode => {
                    nextLayer.nodes.forEach(endNode => {
                        const startEl = nodeElementsRef.current[startNode.id];
                        const endEl = nodeElementsRef.current[endNode.id];
                        drawSynapse(ctx, startEl, endEl, '#334155', 0.5);
                    });
                });
            }
        });

        // Determine which skills to highlight
        const skillsToHighlight = new Set<string>();
        if (activeSkill) skillsToHighlight.add(activeSkill);
        if (viewedProjectSkills) {
            viewedProjectSkills.forEach(skill => skillsToHighlight.add(skill));
        }
        const highlightedNodeIds = Array.from(skillsToHighlight);

        // Draw highlighted connections
        if (highlightedNodeIds.length > 0) {
            highlightedNodeIds.forEach(highlightedNodeId => {
                projectsData.forEach(proj => {
                    if (proj.keywords && proj.keywords.includes(highlightedNodeId)) {
                        const startEl = nodeElementsRef.current[highlightedNodeId];
                        const endEl = nodeElementsRef.current[proj.id];
                        if (startEl && endEl) {
                             const glowColor = startEl.style.getPropertyValue('--glow-color');
                             // Animate the highlight
                            if (activeSkill === highlightedNodeId) {
                                drawSynapse(ctx, startEl, endEl, glowColor, 2.5, animationProgress * 0.8);
                            } else { // for hovered projects
                                drawSynapse(ctx, startEl, endEl, glowColor, 2, 0.6);
                            }
                        }
                    }
                });
            });
        }
    }, [drawSynapse, activeSkill, viewedProjectSkills]);
    
    useEffect(() => {
        const animate = (timestamp: number) => {
            if (!animationStartTime.current) {
                animationStartTime.current = timestamp;
            }
            const elapsedTime = timestamp - animationStartTime.current;
            const progress = Math.min(elapsedTime / ANIMATION_DURATION, 1);
            
            drawAllSynapses(progress);
            
            if (progress < 1) {
                animationFrameId.current = requestAnimationFrame(animate);
            }
        };

        const startAnimation = () => {
             if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
            animationStartTime.current = null;
            animationFrameId.current = requestAnimationFrame(animate);
        };
        
        startAnimation();

        const resizeCanvas = () => {
            const canvas = canvasRef.current;
            const container = containerRef.current;
            if (canvas && container) {
                canvas.width = container.clientWidth;
                canvas.height = container.clientHeight;
                drawAllSynapses(1); // Draw without animation on resize
            }
        };
        
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if(animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [activeSkill, viewedProjectSkills, drawAllSynapses]);
    
    const handleNodeClick = (nodeId: string) => {
        const newSkill = activeSkill === nodeId ? null : nodeId;
        onSkillSelect(newSkill);
    };

    const handleNodeInteraction = (e: React.MouseEvent | React.KeyboardEvent, nodeId: string, isOutputNode: boolean) => {
        if (!isOutputNode) {
            e.stopPropagation();
            handleNodeClick(nodeId);
        }
    };
    
    const handleNodeMouseEnter = (e: React.MouseEvent, node: SkillNode) => {
        const description = node.description;
        if (!description || !containerRef.current) return;

        const rect = (e.target as HTMLElement).getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();

        setTooltip({
            content: `<strong>${node.name}</strong><br/>${description}`,
            x: rect.left - containerRect.left + rect.width / 2,
            y: rect.top - containerRect.top,
        });
    };

    const handleNodeMouseLeave = () => {
        setTooltip(null);
    };

    return (
        <section id="skills" ref={sectionRef} className="py-20 fade-in-section">
            <h2 className="text-4xl font-bold text-center text-white mb-4">Interactive Neural Network</h2>
            <p className="text-center text-xl text-slate-400 mb-12 max-w-2xl mx-auto">A conceptual map of my abilities. Click a skill to see how it connects to my project work.</p>
            <div className="relative">
                <div ref={containerRef} className="skills-network-container" onClick={() => onSkillSelect(null)}>
                    <canvas ref={canvasRef} id="network-canvas"></canvas>
                    
                    {tooltip && (
                        <div
                            className="network-tooltip"
                            style={{ left: tooltip.x, top: tooltip.y }}
                            dangerouslySetInnerHTML={{ __html: tooltip.content }}
                        />
                    )}

                    {networkData.layers.map(layer => (
                        <div key={layer.name} className="network-layer">
                            {layer.nodes.map(node => {
                                const isOutputNode = layer.name === 'Output Layer';

                                // Determine the state of the node based on user interaction
                                const isClickedSkill = activeSkill === node.id;
                                const isHoveredSkill = viewedProjectSkills?.includes(node.id) ?? false;
                                const isRelatedProject = activeSkill ? projectsData.some(p => p.id === node.id && p.keywords.includes(activeSkill)) : false;

                                // A node is visually highlighted if it's the directly clicked skill or part of a hovered project's skills.
                                const isHighlighted = isClickedSkill || isHoveredSkill;

                                // A node is "active" (i.e., not dimmed) if it's highlighted or a project related to the clicked skill.
                                const isActive = isHighlighted || isRelatedProject;

                                // A node is dimmed if a skill is selected, but this node is not active.
                                const isDimmed = activeSkill !== null && !isActive;

                                return (
                                    <div
                                        key={node.id}
                                        ref={el => { if (el) nodeElementsRef.current[node.id] = el; }}
                                        className={`network-node ${isOutputNode ? 'output-node' : ''} ${isHighlighted ? 'highlight' : ''} ${isDimmed ? 'dimmed' : ''}`}
                                        style={{ '--bg-color': layer.color, '--glow-color': layer.color } as React.CSSProperties}
                                        onClick={(e) => handleNodeInteraction(e, node.id, isOutputNode)}
                                        onKeyDown={(e) => {
                                            if (!isOutputNode && (e.key === 'Enter' || e.key === ' ')) {
                                                e.preventDefault();
                                                handleNodeInteraction(e, node.id, isOutputNode);
                                            }
                                        }}
                                        onMouseEnter={(e) => handleNodeMouseEnter(e, node)}
                                        onMouseLeave={handleNodeMouseLeave}
                                        role={isOutputNode ? undefined : 'button'}
                                        tabIndex={isOutputNode ? -1 : 0}
                                        aria-pressed={isOutputNode ? undefined : isClickedSkill}
                                        aria-label={`Select skill: ${node.name}`}
                                    >
                                        {node.name}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
                {activeSkill && (
                    <div className="absolute -bottom-14 left-1/2 -translate-x-1/2">
                        <button 
                            onClick={() => onSkillSelect(null)}
                            className="bg-slate-700/80 backdrop-blur-sm text-slate-300 font-semibold py-2 px-5 rounded-full border border-slate-600 hover:bg-slate-600/80 hover:text-white transition-all">
                            Reset View
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};