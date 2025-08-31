import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { callGemini } from '../services/geminiService';
import { portfolioContext } from '../constants';

const TypingIndicator = () => (
    <div className="typing-indicator self-start p-3">
        <span></span><span></span><span></span>
    </div>
);

const ChatBubble: React.FC<{ message: ChatMessage }> = ({ message }) => (
    <div
        className={`p-3 rounded-lg max-w-[85%] break-words text-lg ${message.sender === 'bot' ? 'bg-slate-700 self-start' : 'bg-sky-600 text-white self-end'}`}
        style={{ whiteSpace: 'pre-wrap' }}
    >
        {message.text}
    </div>
);

export const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            sender: 'bot',
            text: "Hello! I'm Srujan's Gemini-powered AI assistant. Ask me anything about his resume.",
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const systemPrompt = `You are a friendly and professional AI assistant for Srujan Chinta's portfolio. Your goal is to answer questions from potential recruiters and collaborators based ONLY on the provided context about his experience, projects, and skills. Do not invent information. Keep your answers concise and helpful. If a question is outside of this context, politely state that you can only answer questions about Srujan's resume.`;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages, isLoading]);

    const clearChat = () => {
        setMessages([{
            sender: 'bot',
            text: "Hello! I'm Srujan's Gemini-powered AI assistant. Ask me anything about his resume.",
        }]);
    };

    const handleSendMessage = async () => {
        if (inputValue.trim() === '' || isLoading) return;

        const userMessage: ChatMessage = { sender: 'user', text: inputValue };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        const fullQuery = `Based on the context below, please answer the user's question.\n\n---CONTEXT---\n${portfolioContext}\n\n---USER QUESTION---\n${userMessage.text}`;
        
        const botResponseText = await callGemini(fullQuery, systemPrompt);
        const botMessage: ChatMessage = { sender: 'bot', text: botResponseText };
        
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
    };

    return (
        <>
            <div id="chatbot-toggle" onClick={() => setIsOpen(!isOpen)} className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-sky-400 shadow-lg flex items-center justify-center cursor-pointer transition-transform hover:scale-110 z-[1001]">
                <svg className="w-8 h-8 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
            </div>
            <div id="chatbot-window" className={`fixed bottom-[6.5rem] right-8 w-[350px] h-[500px] bg-slate-800/90 backdrop-blur-md border border-slate-700 rounded-xl shadow-2xl flex flex-col transition-transform transition-opacity duration-300 transform-gpu ${isOpen ? 'open' : 'scale-95 opacity-0 pointer-events-none'}`} >
                <div className="p-4 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
                    <div>
                        <h4 className="font-bold text-white text-lg">✨ AI Assistant</h4>
                        <p className="text-base text-slate-400">Powered by Gemini</p>
                    </div>
                    <div>
                        <button onClick={clearChat} className="text-base text-slate-400 hover:text-white transition-colors mr-3">Clear</button>
                        <button onClick={() => setIsOpen(false)} className="text-2xl text-slate-400 hover:text-white transition-colors leading-none">&times;</button>
                    </div>
                </div>
                <div id="chat-messages" className="flex-1 p-4 flex flex-col space-y-3 overflow-y-auto">
                    {messages.map((msg, index) => <ChatBubble key={index} message={msg} />)}
                    {isLoading && <TypingIndicator />}
                    <div ref={messagesEndRef} />
                </div>
                <div className="p-4 border-t border-slate-700">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        disabled={isLoading}
                        className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-50 text-base"
                        placeholder="Ask a question..."
                    />
                </div>
            </div>
        </>
    );
};