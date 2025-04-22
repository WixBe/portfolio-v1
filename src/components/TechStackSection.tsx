import React from 'react';
import {
    FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGitAlt, FaDocker
} from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiNextdotjs, SiTailwindcss, SiPostgresql, SiMongodb, SiAngular } from 'react-icons/si';
import './TechStackSection.css'; 

interface TechStackSectionProps {
    isVisible: boolean; // For the initial fade-in animation
    isDarkMode: boolean;
}

// --- Define your tech stack data ---
const techStack = [
    { name: 'React', icon: <FaReact size="3em" />, color: '#61DAFB' },
    { name: 'Angular', icon: <SiAngular size="3em" />, color: '#DD0031' },
    { name: 'TypeScript', icon: <SiTypescript size="3em" />, color: '#3178C6' },
    { name: 'JavaScript', icon: <SiJavascript size="3em" />, color: '#F7DF1E' },
    { name: 'Node.js', icon: <FaNodeJs size="3em" />, color: '#68A063' },
    // { name: 'Next.js', icon: <SiNextdotjs size="3em" />, color: '#000000' }, // Color might depend on theme
    { name: 'HTML5', icon: <FaHtml5 size="3em" />, color: '#E34F26' },
    { name: 'CSS3', icon: <FaCss3Alt size="3em" />, color: '#1572B6' },
    // { name: 'Tailwind CSS', icon: <SiTailwindcss size="3em" />, color: '#06B6D4' },
    { name: 'MongoDB', icon: <SiMongodb size="3em" />, color: '#47A248' },
    { name: 'PostgreSQL', icon: <SiPostgresql size="3em" />, color: '#336791' },
    { name: 'Git', icon: <FaGitAlt size="3em" />, color: '#F05032' },
    { name: 'Docker', icon: <FaDocker size="3em" />, color: '#2496ED' },
    { name: 'Python', icon: <img src="https://img.icons8.com/color/48/python.png" alt="Python" style={{ width: '3em', height: '3em' }} />, color: '#3776AB' },
    { name: 'Spring Boot', icon: <img src="https://img.icons8.com/color/48/spring-logo.png" alt="Spring Boot" style={{ width: '3em', height: '3em' }} />, color: '#6DB33F' },
    { name: 'AWS', icon: <img src="https://img.icons8.com/color/48/amazon-web-services.png" alt="AWS" style={{ width: '3em', height: '3em' }} />, color: '#FF9900' },
];
// --- ---

const TechStackSection: React.FC<TechStackSectionProps> = ({ isVisible, isDarkMode }) => {
    return (
        <section className={`tech-stack-section ${isVisible ? 'visible' : ''}`}>
            <h2 className="tech-stack-title">My Tech Stack</h2>
            <div className="tech-grid-container">
                {techStack.map((tech) => {
                    // Determine the color based on the tech name and theme
                    let iconColor = tech.color;
                    if (tech.name === 'Next.js') {
                        iconColor = isDarkMode ? '#FFFFFF' : '#000000'; // White in dark mode, black in light
                    }

                    return (
                        <div key={tech.name} className="tech-item" title={tech.name}>
                            {/* Apply the determined color to the icon */}
                            {React.cloneElement(tech.icon, { style: { color: iconColor } })}
                            {/* <span className="tech-name">{tech.name}</span> */}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default TechStackSection;
