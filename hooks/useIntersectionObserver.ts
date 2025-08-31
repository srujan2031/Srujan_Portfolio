
import React, { useEffect, useRef } from 'react';

type ObserverCallback = (entry: IntersectionObserverEntry) => void;

export const useIntersectionObserver = (
    elements: React.RefObject<HTMLElement>[],
    callback: ObserverCallback,
    options: IntersectionObserverInit = { threshold: 0.2 }
) => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    callback(entry);
                }
            });
        }, options);

        elements.forEach(elementRef => {
            if (elementRef.current) {
                observer.observe(elementRef.current);
            }
        });

        return () => {
            elements.forEach(elementRef => {
                if (elementRef.current) {
                    observer.unobserve(elementRef.current);
                }
            });
        };
    }, [elements, callback, options]);
};