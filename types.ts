export interface Project {
    id: string;
    title: string;
    shortTitle: string;
    github: string;
    liveDemo?: string;
    tags: string[];
    description: string;
    detailedDescription: string;
    keywords: string[];
    bgImage: string;
}

export interface SkillNode {
    id: string;
    name: string;
    description?: string;
}

export interface SkillLayer {
    name: string;
    color: string;
    nodes: SkillNode[];
}

export interface NetworkData {
    layers: SkillLayer[];
}

export interface Experience {
    id: string;
    role: string;
    company: string;
    date: string;
    details: string[];
    icon: 'university' | 'shipping';
}

export interface ChatMessage {
    sender: 'user' | 'bot';
    text: string;
}