// src/components/ProjectsSection.tsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import './ProjectsSection.css';
import projects from '../data/projectProps';

interface ProjectsSectionProps {
    isVisible: boolean;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ isVisible }) => {
    const [activePage, setActivePage] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const autoSlideIntervalRef = useRef<number | null>(null);
    const isHoveringRef = useRef(false);
    // Flag to temporarily disable observer updates after manual/auto navigation
    const navigationInProgressRef = useRef(false);
    const navigationTimeoutRef = useRef<number | null>(null);

    // Initialize or resize the refs array when projects change
    useEffect(() => {
        itemRefs.current = Array(projects.length).fill(null).map(
            (_, i) => itemRefs.current[i] || null
        );
    }, [projects.length]);

    // --- Timer Management Callbacks ---
    const stopAutoSlide = useCallback(() => {
        if (autoSlideIntervalRef.current) {
            clearInterval(autoSlideIntervalRef.current);
            autoSlideIntervalRef.current = null;
        }
    }, []);

    const startAutoSlide = useCallback(() => {
        stopAutoSlide(); // Ensure no duplicates
        if (isVisible && !isHoveringRef.current && projects.length > 1) {
            autoSlideIntervalRef.current = window.setInterval(() => {
                setActivePage(prevActivePage => {
                    const nextPageIndex = (prevActivePage + 1) % projects.length;
                    const targetElement = itemRefs.current[nextPageIndex];
                    if (targetElement) {
                        navigationInProgressRef.current = true;
                        if (navigationTimeoutRef.current) clearTimeout(navigationTimeoutRef.current);
                        navigationTimeoutRef.current = window.setTimeout(() => {
                            navigationInProgressRef.current = false;
                        }, 800);

                        targetElement.scrollIntoView({
                            behavior: 'smooth', inline: 'center', block: 'nearest'
                        });
                    }
                    return nextPageIndex;
                });
            }, 3000);
        }
    }, [stopAutoSlide, projects.length, isVisible]);

    const resetAutoSlideTimer = useCallback(() => {
        startAutoSlide();
    }, [startAutoSlide]);

    // --- Unified Navigation Function (for Clicks) ---
    const navigateToPage = useCallback((index: number) => {
        if (index < 0 || index >= projects.length) return;

        if (index === activePage) {
            resetAutoSlideTimer();
            return;
        }

        setActivePage(index);

        const targetElement = itemRefs.current[index];
        if (targetElement) {
            navigationInProgressRef.current = true;
            if (navigationTimeoutRef.current) clearTimeout(navigationTimeoutRef.current);
            navigationTimeoutRef.current = window.setTimeout(() => {
                navigationInProgressRef.current = false;
            }, 1000);

            targetElement.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest'
            });
        }
        resetAutoSlideTimer();
    }, [projects.length, activePage, resetAutoSlideTimer]);

    // --- Intersection Observer (Updates state based on manual scroll) ---
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container || itemRefs.current.length !== projects.length || itemRefs.current.some(ref => !ref)) {
            return;
        }

        const observerOptions = {
            root: container, rootMargin: '0px', threshold: 0.6
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            if (navigationInProgressRef.current) {
                return;
            }

            let bestEntry: IntersectionObserverEntry | null = null;
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
                        bestEntry = entry;
                    }
                }
            });

            if (bestEntry) {
                const intersectingIndex = itemRefs.current.findIndex(ref => ref === bestEntry?.target);
                if (intersectingIndex !== -1 && intersectingIndex !== activePage) {
                    setActivePage(intersectingIndex);
                }
            }
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        itemRefs.current.forEach(item => { if (item) observer.observe(item); });

        return () => {
            itemRefs.current.forEach(item => { if (item) observer.unobserve(item); });
            observer.disconnect();
            if (navigationTimeoutRef.current) clearTimeout(navigationTimeoutRef.current);
        };
    }, [projects.length, activePage]);

    // --- Effect to manage auto-slide based on component visibility ---
    useEffect(() => {
        if (isVisible) {
            startAutoSlide();
        } else {
            stopAutoSlide();
        }
        return stopAutoSlide;
    }, [isVisible, startAutoSlide, stopAutoSlide]);

    // --- Hover Handlers for Pausing Auto-slide ---
    const handleMouseEnterInteractiveArea = () => {
        isHoveringRef.current = true;
        stopAutoSlide();
    };

    const handleMouseLeaveInteractiveArea = () => {
        isHoveringRef.current = false;
        resetAutoSlideTimer();
    };

    // --- Render Logic ---
    return (
        <section className={`projects-section ${isVisible ? 'visible' : ''}`}>
            <h2 className="projects-title">Projects</h2>

            <div
                className="projects-scroll-wrapper"
                onMouseEnter={handleMouseEnterInteractiveArea}
                onMouseLeave={handleMouseLeaveInteractiveArea}
            >
                <div
                    className="projects-grid-container"
                    ref={scrollContainerRef}
                >
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            className={`project-card ${index === activePage ? 'active-card' : ''}`}
                            ref={el => { itemRefs.current[index] = el; }}
                            onClick={() => navigateToPage(index)}
                        >
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                                <button className="view-project-button">View Project</button>
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            {projects.length > 1 && (
                <div className="pagination-dots">
                    {Array.from({ length: projects.length }).map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === activePage ? 'active' : ''}`}
                            onClick={() => navigateToPage(index)}
                            aria-label={`Go to project ${index + 1}`}
                            title={`Go to project ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default ProjectsSection;
