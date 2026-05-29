import React, { useState, useEffect } from 'react';
import { callGemini } from '../services/geminiService';

const contactLinks = [
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
        text: 'chintasrujan07@gmail.com',
        href: 'mailto:chintasrujan07@gmail.com'
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>,
        text: 'LinkedIn',
        href: 'https://www.linkedin.com/in/srujanchinta82/'
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" /></svg>,
        text: 'GitHub',
        href: 'https://github.com/srujan2031'
    }
];

const placeholders = [
    "Let's discuss a project...",
    "I have a question about your skills...",
    "I'd like to connect about an opportunity...",
    "Can we collaborate on something?"
];

const useTypingEffect = (words: string[], typingSpeed = 100, deletingSpeed = 50, delay = 2000) => {
    const [text, setText] = useState('');
    const [index, setIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const handleTyping = () => {
            const currentWord = words[index];
            const updatedText = isDeleting
                ? currentWord.substring(0, text.length - 1)
                : currentWord.substring(0, text.length + 1);

            setText(updatedText);

            if (!isDeleting && updatedText === currentWord) {
                setTimeout(() => setIsDeleting(true), delay);
            } else if (isDeleting && updatedText === '') {
                setIsDeleting(false);
                setIndex((prev) => (prev + 1) % words.length);
            }
        };

        const timeout = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
        return () => clearTimeout(timeout);
    }, [text, isDeleting, index, words, typingSpeed, deletingSpeed, delay]);

    return text;
};

export const Contact: React.FC<{ sectionRef: React.RefObject<HTMLElement> }> = ({ sectionRef }) => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({ name: '', email: '', message: '' });
    const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [isLoadingSuggestion, setIsLoadingSuggestion] = useState(false);
    const [suggestionError, setSuggestionError] = useState('');
    const typedPlaceholder = useTypingEffect(placeholders);

    const validateField = (name: string, value: string): string => {
        switch (name) {
            case 'name':
                if (!value.trim()) return 'Name is required.';
                break;
            case 'email':
                if (!value.trim()) return 'Email is required.';
                if (!/\S+@\S+\.\S+/.test(value)) return 'Email address is invalid.';
                break;
            case 'message':
                if (!value.trim()) return 'Message is required.';
                break;
            default:
                break;
        }
        return '';
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        if (name === 'message' && suggestionError) {
            setSuggestionError('');
        }
    };
    
    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleSuggest = async () => {
        setSuggestionError('');
        if (!formData.message.trim()) {
            setSuggestionError("Please type a brief message first so I can help complete it.");
            return;
        }
        setIsLoadingSuggestion(true);
        const prompt = `A user named "${formData.name || 'User'}" is writing a message to Srujan Chinta. Their current draft is: "${formData.message}". Polish and complete this message in a professional and friendly tone, keeping it concise and ready to send.`;
        try {
            const suggestion = await callGemini(prompt);
            setFormData(prev => ({ ...prev, message: suggestion }));
        } catch (error) {
            console.error("Failed to get suggestion:", error);
            setSuggestionError("Sorry, I couldn't generate a suggestion right now.");
        } finally {
            setIsLoadingSuggestion(false);
        }
    };

    const handleClearForm = () => {
        setFormData({ name: '', email: '', message: '' });
        setErrors({ name: '', email: '', message: '' });
        setSuggestionError('');
        setFormStatus('idle');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuggestionError('');
        const nameError = validateField('name', formData.name);
        const emailError = validateField('email', formData.email);
        const messageError = validateField('message', formData.message);

        if (nameError || emailError || messageError) {
            setErrors({
                name: nameError,
                email: emailError,
                message: messageError
            });
            return;
        }

        setFormStatus('loading');

        // IMPORTANT: Replace this with your own Formspree endpoint URL!
        // 1. Go to https://formspree.io
        // 2. Create a new form
        // 3. Copy the endpoint URL and paste it below
        const formspreeEndpoint = 'https://formspree.io/f/xdklzoqk';

        try {
            const response = await fetch(formspreeEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('Form submitted successfully via Formspree');
                setFormStatus('success');
            } else {
                const data = await response.json();
                console.error('Form submission failed via Formspree', data.errors);
                setFormStatus('error');
            }
        } catch (error) {
            console.error('An error occurred during form submission:', error);
            setFormStatus('error');
        }
    };

    const isSuggestDisabled = isLoadingSuggestion || formStatus === 'loading' || !formData.message;

    return (
        <section id="contact" ref={sectionRef} className="py-20 fade-in-section">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                {/* Left Column: Info */}
                <div className="text-center md:text-left">
                    <h2 className="text-4xl font-bold text-white mb-4">Let's Build Something Great</h2>
                    <p className="text-xl text-slate-400 mb-8">
                        Whether you have a project in mind, a question about my work, or just want to connect, I'd love to hear from you.
                    </p>
                    <div className="space-y-4">
                        {contactLinks.map(link => (
                            <a key={link.text} href={link.href} target="_blank" rel="noopener noreferrer"
                                className="flex items-center justify-center md:justify-start gap-3 text-lg text-slate-300 hover:text-sky-400 transition-all duration-200 hover:-translate-y-1">
                                {link.icon}
                                <span>{link.text}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Right Column: Form */}
                <div className="bg-slate-800/50 p-8 rounded-xl shadow-2xl border border-slate-700">
                    {formStatus === 'success' ? (
                        <div className="text-center py-10">
                             <div className="mx-auto bg-green-500/20 text-green-300 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                            <p className="text-slate-400 text-lg">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                        </div>
                    ) : formStatus === 'error' ? (
                        <div className="text-center py-10">
                            <div className="mx-auto bg-red-500/20 text-red-300 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                           </div>
                           <h3 className="text-2xl font-bold text-white mb-2">Submission Failed</h3>
                           <p className="text-slate-400 text-lg mb-6">Oops! Something went wrong. Please try sending your message again.</p>
                            <button
                               type="button"
                               onClick={() => setFormStatus('idle')}
                               className="text-lg bg-sky-500 text-white font-bold py-3 px-8 rounded-full hover:bg-sky-600 transition-colors"
                           >
                               Try Again
                           </button>
                       </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                            <div>
                                <label htmlFor="name" className="block text-lg font-medium text-slate-300 mb-2">Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleInputChange} 
                                    onBlur={handleBlur}
                                    className={`w-full bg-slate-700/50 border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 transition-all ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-sky-500'}`}
                                    aria-invalid={!!errors.name}
                                    aria-describedby={errors.name ? 'name-error' : undefined}
                                />
                                {errors.name && <p id="name-error" className="text-red-400 text-sm mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-lg font-medium text-slate-300 mb-2">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    value={formData.email} 
                                    onChange={handleInputChange} 
                                    onBlur={handleBlur}
                                    className={`w-full bg-slate-700/50 border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 transition-all ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-sky-500'}`} 
                                    aria-invalid={!!errors.email}
                                    aria-describedby={errors.email ? 'email-error' : undefined}
                                />
                                {errors.email && <p id="email-error" className="text-red-400 text-sm mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-lg font-medium text-slate-300 mb-2">Message</label>
                                <textarea 
                                    id="message" 
                                    name="message" 
                                    value={formData.message} 
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    rows={5} 
                                    placeholder={typedPlaceholder + '|'} 
                                    className={`w-full bg-slate-700/50 border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 transition-all resize-none ${errors.message || suggestionError ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-sky-500'}`}
                                    aria-invalid={!!errors.message}
                                    aria-describedby={errors.message ? 'message-error' : suggestionError ? 'suggestion-error' : undefined}
                                ></textarea>
                                {errors.message && <p id="message-error" className="text-red-400 text-sm mt-1">{errors.message}</p>}
                                {suggestionError && !errors.message && <p id="suggestion-error" className="text-amber-400 text-sm mt-1">{suggestionError}</p>}
                            </div>
                             <div className="flex flex-col gap-y-4">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button type="submit" disabled={formStatus === 'loading'} className="w-full sm:w-auto flex-grow text-lg bg-sky-500 text-white font-bold py-3 px-8 rounded-full hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-wait">
                                        {formStatus === 'loading' ? 'Sending...' : 'Send Message'}
                                    </button>
                                    <button type="button" onClick={handleSuggest} disabled={isSuggestDisabled} className="w-full sm:w-auto text-lg font-semibold py-3 px-6 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-purple-500/20 text-purple-300 border border-purple-400 hover:bg-purple-500/40">
                                        {isLoadingSuggestion ? 'Thinking...' : '✨ Suggest with AI'}
                                    </button>
                                </div>
                                <button type="button" onClick={handleClearForm} disabled={formStatus === 'loading'} className="text-slate-400 hover:text-white transition-colors text-sm self-center sm:self-end disabled:opacity-50">
                                    Clear Form
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};
