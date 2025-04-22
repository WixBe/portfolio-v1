// src/App.tsx
import { useState, useEffect, useRef } from 'react';
import ThemeToggle from './components/ThemeToggle';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import TechStackSection from './components/TechStackSection';
import ContactSection from './components/ContactSection'; 
import './App.css';
import ScrollFloat from './animations/ScrollFloat';

// Define key for localStorage
const THEME_STORAGE_KEY = 'portfolio-theme-mode';

function App() {
  // Initialize state by reading from localStorage or defaulting to dark
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedPreference = localStorage.getItem(THEME_STORAGE_KEY);
    if (storedPreference) {
      return storedPreference === 'dark'; // Convert stored string to boolean
    }
    // Optional: Check system preference if no stored preference
    // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // return prefersDark;
    return true; // Default to dark mode if nothing stored/checked
  });

  const [isFlickering, setIsFlickering] = useState(false);
  const [isNameScrolled, setIsNameScrolled] = useState(false);

  // State for section visibility
  const [aboutInView, setAboutInView] = useState(false);
  const [projectsInView, setProjectsInView] = useState(false);
  const [techStackInView, setTechStackInView] = useState(false);
  const [contactInView, setContactInView] = useState(false); // Add state for contact section

  // Refs for observing sections
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const projectsSectionRef = useRef<HTMLDivElement>(null);
  const techStackSectionRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLDivElement>(null); // Add ref for contact section

  // --- toggleTheme function ---
  const toggleTheme = () => {
    // Calculate the next state
    const nextIsDarkMode = !isDarkMode;

    if (nextIsDarkMode) {
      // Switching to Dark mode (smooth)
      setIsDarkMode(true);
    } else {
      // Switching to Light mode (with flicker)
      setIsFlickering(true);
      setTimeout(() => {
        setIsDarkMode(false);
        setIsFlickering(false);
      }, 300);
    }
  };

  // ---Effect for theme classes AND saving to localStorage ---
  useEffect(() => {
    document.body.classList.remove('dark-mode', 'light-mode', 'flickering');

    if (isFlickering) {
      document.body.classList.add('flickering', 'light-mode');
      // No need to save 'flickering' state, just the target theme
    } else {
      const currentMode = isDarkMode ? 'dark' : 'light';
      document.body.classList.add(`${currentMode}-mode`);

      // --- Save preference to localStorage ---
      try {
        localStorage.setItem(THEME_STORAGE_KEY, currentMode);
      } catch (error) {
        console.error("Failed to save theme preference:", error);
      }
      // --- ---
    }
  }, [isDarkMode, isFlickering]); // Run when theme or flicker state changes

  // --- Effect for scroll detection (name animation) (Keep as is) ---
  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 25;
      setIsNameScrolled(window.scrollY > scrollThreshold);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Effect for Intersection Observer on sections ---
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.20 // Adjust threshold if needed
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.target === aboutSectionRef.current) {
          setAboutInView(entry.isIntersecting);
        } else if (entry.target === projectsSectionRef.current) {
          setProjectsInView(entry.isIntersecting);
        } else if (entry.target === techStackSectionRef.current) {
          setTechStackInView(entry.isIntersecting);
        } else if (entry.target === contactSectionRef.current) { // Check for contact section
          setContactInView(entry.isIntersecting); // Update contact state
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Get current refs
    const aboutRefCurrent = aboutSectionRef.current;
    const projectsRefCurrent = projectsSectionRef.current;
    const techStackRefCurrent = techStackSectionRef.current;
    const contactRefCurrent = contactSectionRef.current; // Get contact ref

    // Observe sections if refs exist
    if (aboutRefCurrent) observer.observe(aboutRefCurrent);
    if (projectsRefCurrent) observer.observe(projectsRefCurrent);
    if (techStackRefCurrent) observer.observe(techStackRefCurrent);
    if (contactRefCurrent) observer.observe(contactRefCurrent); // Observe contact section

    // Cleanup function
    return () => {
      if (aboutRefCurrent) observer.unobserve(aboutRefCurrent);
      if (projectsRefCurrent) observer.unobserve(projectsRefCurrent);
      if (techStackRefCurrent) observer.unobserve(techStackRefCurrent);
      if (contactRefCurrent) observer.unobserve(contactRefCurrent); // Unobserve contact section
      observer.disconnect();
    };
  }, []); // Run once on mount


  return (
    <>
      <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      {/* Landing Section */}
      <div className="landing-section">
        <h1 className={`name-heading ${isNameScrolled ? 'bend-fade-out' : ''}`}>
        <ScrollFloat
            animationDuration={1}
            ease='back.inOut(2)'
            scrollStart='center bottom+=50%'
            scrollEnd='bottom bottom-=40%'
            stagger={0.03}
          >
            Narendran Murali
          </ScrollFloat>
        </h1>
      </div>

      {/* About Section */}
      <div ref={aboutSectionRef}>
        <AboutSection isVisible={aboutInView} />
      </div>

      {/* Projects Section */}
      <div ref={projectsSectionRef}>
          <ProjectsSection isVisible={projectsInView} />
      </div>

      {/* Tech Stack Section */}
      <div ref={techStackSectionRef}>
          <TechStackSection isVisible={techStackInView} isDarkMode={isDarkMode} />
      </div>

      {/* Contact Section - Add the final section */}
      <div ref={contactSectionRef}>
          <ContactSection isVisible={contactInView} />
          {/* No need to pass isDarkMode unless specific styling requires it */}
      </div>

    </>
  );
}

export default App;
