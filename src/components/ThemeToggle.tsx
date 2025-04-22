import { FaLightbulb, FaRegLightbulb  } from "react-icons/fa6";
import './ThemeToggle.css';

interface ThemeToggleProps {
    isDarkMode: boolean;
    toggleTheme: () => void;
  }
  
  const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, toggleTheme }) => {
    return (
      <button
        className="theme-toggle-button"
        onClick={toggleTheme}
        aria-label={isDarkMode ? 'Activate light mode' : 'Activate dark mode'}
        title={isDarkMode ? 'Activate light mode' : 'Activate dark mode'}
      >
        {isDarkMode ? (
          <FaRegLightbulb size={24} /> // "On" lamp for dark mode
        ) : (
            <FaLightbulb size={24} /> // "Off" lamp for light mode
        )}
      </button>
    );
  };
  
  export default ThemeToggle;
  