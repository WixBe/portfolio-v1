import React from 'react';
import './AboutSection.css';

interface AboutSectionProps {
    isVisible: boolean;
}

const AboutSection: React.FC<AboutSectionProps> = ({ isVisible }) => {
    return (
        <section className={`about-section ${isVisible ? 'visible' : ''}`}>
            <div className="about-content">
                <h2>About Me</h2>
                <p>
                    Welcome to my portfolio! I'm a passionate Software Engineer
                    with experience in creating dynamic and user-friendly web applications.
                    I love tackling challenging problems and continuously learning new technologies.
                </p>
                <p>
                    I'm currently employed at UST a leading IT services company, where I work on various
                    projects that enhance my skills and contribute to the team's success.
                    I'm always eager to collaborate on exciting projects. Feel free to look
                    around and get in touch!
                </p>
                {/* Add more paragraphs or content as needed */}
            </div>
            <div className="image-placeholder">
                {/* Placeholder for your image - you can add an <img> tag here later */}
                <img className="pfp" src="./pfp.jpg" alt="Narendran Murali" />
                {/* For now, we'll use a simple div as a placeholder */}
                {/* <div className="placeholder-box">Your Image Here</div> */}
            </div>
        </section>
    );
};

export default AboutSection;