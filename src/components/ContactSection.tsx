// src/components/ContactSection.tsx
import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa'; // Example icons
import { BiLogoInstagramAlt } from "react-icons/bi";
import './ContactSection.css'; // We'll create this CSS file next

interface ContactSectionProps {
    isVisible: boolean;
    // isDarkMode: boolean; // We might not need isDarkMode if using CSS currentColor
}

// --- Define your social/contact links ---
const socialLinks = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/narendran-m-33b077293/', icon: <FaLinkedin size="2em" /> },
    { name: 'GitHub', url: 'https://github.com/WixBe', icon: <FaGithub size="2em" /> },
    { name: 'Twitter', url: 'https://x.com/SourCandy2ndG', icon: <FaTwitter size="2em" /> },
    { name: 'Instagram', url: 'https://www.instagram.com/_na.ren.__/', icon: <BiLogoInstagramAlt size="2em" /> },
    // Add more or remove as needed
];

const email = 'narendranmurali2001@gmail.com';
// --- ---

const ContactSection: React.FC<ContactSectionProps> = ({ isVisible }) => {
    return (
        <section className={`contact-section ${isVisible ? 'visible' : ''}`}>
            <h2 className="contact-title">Get In Touch</h2>
            <p className="contact-intro">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                Feel free to reach out!
            </p>

            <div className="contact-methods">
                {/* Email Link */}
                <a href={`mailto:${email}`} className="contact-email">
                    <span className="email-icon">
                        <FaEnvelope size="1.5em" />
                    </span>
                    <span>{email}</span>
                </a>

                {/* Social Links */}
                <div className="social-links">
                    {socialLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank" // Open in new tab
                            rel="noopener noreferrer" // Security best practice
                            className="social-icon-link"
                            title={link.name} // Tooltip on hover
                            aria-label={`Visit my ${link.name} profile`} // Accessibility
                        >
                            {link.icon}
                        </a>
                    ))}
                </div>
            </div>

            {/* Optional: Footer or Copyright */}
            <footer className="contact-footer">
                © {new Date().getFullYear()} Narendran M. All rights reserved.
            </footer>
        </section>
    );
};

export default ContactSection;
