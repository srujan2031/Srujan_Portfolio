import { Project, Experience, NetworkData } from './types';

// Updated set of static, high-quality image URLs from a reliable source (Pexels).
// These images are more contextually relevant to each project to improve the portfolio's visual storytelling.
const projectImages = {
    proj1: 'https://images.pexels.com/photos/5989933/pexels-photo-5989933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // YouTube app on phone with charts
    proj6: 'https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Legal tech - gavel and laptop
    proj2: 'https://images.pexels.com/photos/5905497/pexels-photo-5905497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // New Student Score Predictor - teacher with charts
    proj5: 'https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Tech conference audience
    proj3: 'https://images.pexels.com/photos/7988241/pexels-photo-7988241.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Warehouse/supply chain analytics
    proj4: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' // New Netflix Data Analytics - team with charts
};


export const projectsData: Project[] = [
    { 
        id: 'proj1', 
        title: 'YouTube Sentiment Analysis Pipeline', 
        shortTitle: 'Sentiment Analysis', 
        github: 'https://github.com/srujan2031/Mlops_youtube_sentiment_analysis', 
        tags: ['MLOps', 'NLP', 'DVC', 'MLflow', 'Flask'], 
        description: 'An end-to-end MLOps project that automates sentiment analysis for YouTube comments, from data versioning to model serving.', 
        detailedDescription: 'This project addresses the challenge of building a reproducible and scalable machine learning pipeline. By implementing a full MLOps workflow, it automates data ingestion, preprocessing, model training with experiment tracking via MLflow, and versioning with DVC. The final model is served via a Flask API, containerized with Docker, and deployed on AWS, demonstrating a complete production-ready solution.',
        keywords: ['docker', 'flask', 'github', 'aws', 'mlflow', 'python', 'scikit-learn', 'pandas', 'dvc'], 
        bgImage: projectImages.proj1 
    },
    { 
        id: 'proj6', 
        title: 'Citizen Legal Assist AI', 
        shortTitle: 'Legal Assist AI', 
        github: 'https://github.com/srujan2031/Citizen-Legal-Assist', 
        liveDemo: '#',
        tags: ['React', 'TypeScript', 'Gemini API', 'RAG'], 
        description: 'An AI-powered web app that makes complex legal information accessible using a RAG pipeline with Google Search for verifiable answers.',
        detailedDescription: "To tackle legal information complexity, I developed an AI assistant that provides users with clear, verifiable answers to their legal questions. The app utilizes a Retrieval-Augmented Generation (RAG) pipeline, grounding the Gemini model's responses in real-time Google Search results. This approach ensures answers are not only accurate but also up-to-date and auditable, bridging the gap between legal jargon and public understanding.",
        keywords: [], 
        bgImage: projectImages.proj6 
    },
    { 
        id: 'proj2', 
        title: 'Student Score Prediction System', 
        shortTitle: 'Score Predictor', 
        github: 'https://github.com/srujan2031/Ml_project_Data_Science', 
        tags: ['ML', 'Scikit-learn', 'Flask', 'Docker', 'AWS'], 
        description: 'A production-style ML app to predict student math scores, helping educators identify at-risk students.',
        detailedDescription: "This project provides an early warning system for educators by predicting student performance based on demographic and historical data. I engineered a robust machine learning model using CatBoost and XGBoost, wrapped it in a Flask API, and containerized it with Docker for seamless deployment on AWS. The result is a scalable tool that enables proactive educational interventions.",
        keywords: ['python', 'pandas', 'scikit-learn', 'xgboost', 'catboost', 'flask', 'docker', 'aws'], 
        bgImage: projectImages.proj2 
    },
    { 
        id: 'proj5', 
        title: 'Full-Stack Conference Management System', 
        shortTitle: 'Conference App', 
        github: 'https://github.com/srujan2031/nextjs-conference-project', 
        tags: ['Next.js', 'MySQL', 'TailwindCSS', 'Full-Stack'], 
        description: 'A full-stack web application built with Next.js to streamline the organization of academic and industry conferences.',
        detailedDescription: "This application simplifies conference management by providing a centralized platform for organizers, reviewers, and attendees. Built on a modern stack featuring Next.js for server-side rendering and a MySQL database for robust data management, it offers features like user registration, submission handling, and schedule viewing. The responsive UI, crafted with TailwindCSS, ensures a seamless experience across all devices.",
        keywords: ['sql', 'next.js', 'mysql'], 
        bgImage: projectImages.proj5 
    },
    { 
        id: 'proj3', 
        title: 'Vendor Performance Analytics Dashboard', 
        shortTitle: 'Vendor Analytics', 
        github: 'https://github.com/srujan2031/vendor-performance-analytics', 
        tags: ['Analytics', 'SQL', 'Power BI', 'Python'], 
        description: 'An analytics solution that identified key vendor inefficiencies, leading to a 5% increase in gross profit margin.',
        detailedDescription: "To combat rising supply chain costs, I engineered an analytics pipeline to evaluate vendor performance. Using SQL for data extraction and Python for transformation, I developed key performance indicators and built an interactive Power BI dashboard. This tool provided actionable insights that helped optimize stock levels, reduce reliance on underperforming vendors, and ultimately boosted gross profit by 5%.",
        keywords: ['python', 'sql', 'power bi', 'pandas', 'scikit-learn'], 
        bgImage: projectImages.proj3 
    },
    { 
        id: 'proj4', 
        title: 'Netflix Data Engineering Pipeline', 
        shortTitle: 'Netflix Analytics', 
        github: 'https://github.com/srujan2031/netflix_dbt_project', 
        tags: ['dbt', 'Snowflake', 'S3', 'Looker'], 
        description: 'A modern data stack implementation for transforming and analyzing Netflix data, enabling faster, more reliable insights.',
        detailedDescription: "This project demonstrates a modern approach to data engineering by building a scalable pipeline for Netflix viewership data. Raw data is ingested into AWS S3, loaded into a Snowflake data warehouse, and transformed using dbt (data build tool) for modeling and testing. The final, analytics-ready datasets are then visualized in Looker, providing a robust and maintainable system for business intelligence.",
        keywords: ['sql', 'aws', 'snowflake', 'dbt'], 
        bgImage: projectImages.proj4 
    }
];

export const networkData: NetworkData = {
    layers: [
        { name: 'Input Layer', color: '#38bdf8', nodes: [
            { id: 'python', name: 'Python', description: 'Versatile language for scripting, backend development, and data analysis.' }, 
            { id: 'sql', name: 'SQL', description: 'Standard language for managing and querying relational databases.' }, 
            { id: 'scikit-learn', name: 'Scikit-learn', description: 'Core Python library for machine learning, featuring various algorithms.' }, 
            { id: 'pandas', name: 'Pandas', description: 'Essential data manipulation and analysis library for Python.' }
        ] },
        { name: 'Hidden Layer 1', color: '#818cf8', nodes: [
            { id: 'docker', name: 'Docker', description: 'Platform for developing, shipping, and running applications in containers.' }, 
            { id: 'flask', name: 'Flask', description: 'A lightweight web framework in Python for building APIs and web apps.' }, 
            { id: 'xgboost', name: 'XGBoost', description: 'Optimized gradient boosting library designed for speed and performance.' }, 
            { id: 'next.js', name: 'Next.js', description: 'React framework for building full-stack, server-rendered applications.' }
        ] },
        { name: 'Hidden Layer 2', color: '#34d399', nodes: [
            { id: 'aws', name: 'AWS', description: 'Amazon Web Services, a comprehensive cloud computing platform.' }, 
            { id: 'mlflow', name: 'MLflow', description: 'Open-source platform for managing the end-to-end machine learning lifecycle.' }, 
            { id: 'github', name: 'GitHub Actions', description: 'Automate CI/CD workflows directly within GitHub repositories.' }, 
            { id: 'dbt', name: 'dbt', description: 'Data build tool that enables analytics engineers to transform data in their warehouse.' }, 
            { id: 'snowflake', name: 'Snowflake', description: 'Cloud-based data warehousing platform for storage and analytics.' }
        ] },
        { name: 'Output Layer', color: '#fbbf24', nodes: projectsData.map(p => ({ id: p.id, name: p.shortTitle, description: p.title })) }
    ]
};

export const experienceData: Experience[] = [
    { 
        id: 'exp1', 
        role: 'Data Analyst', 
        company: 'Bank of America', 
        date: 'Aug 2024 - Present', 
        details: [], 
        icon: 'bank-of-america',
        location: 'Texas, United States'
    },
    { 
        id: 'exp2', 
        role: 'Data Analyst', 
        company: 'HCLTech', 
        date: 'Aug 2021 - Mar 2023', 
        details: [], 
        icon: 'hcltech',
        location: 'India'
    }
];

export const portfolioContext = `
    Srujan Chinta's Portfolio Context:
    Professional Experience:
    ${experienceData.map(exp => `- Role: ${exp.role} at ${exp.company} (${exp.date}). Key Achievements: ${exp.details.join(', ')}`).join('\n')}
    Projects:
    ${projectsData.map(p => `- Project: ${p.title}. Description: ${p.description} Technologies: ${p.tags.join(', ')}`).join('\n')}
    Skills:
    - Foundational: Python, SQL, Scikit-learn, Pandas
    - Tools: Docker, Flask, XGBoost, Next.js, dbt
    - Advanced: AWS, MLflow, GitHub Actions, Snowflake
`;
