import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <header className="main-header" id="mainHeader">
      <nav className="navbar">
        <div className="logo">
          <Link to="/">Google Developer's Group, NEHU</Link>
        </div>

        <ul className="nav-links">
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/roadmaps">Roadmaps</Link></li>
          <li><Link to="/team">Team</Link></li>
        </ul>
        <div className="nav-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-pressed={theme === 'dark'}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <span className="theme-icon theme-icon-moon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                role="presentation"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ fill: 'none', stroke: 'currentColor' }}
              >
                <path d="M21 14.2A8.5 8.5 0 1 1 9.8 3a7 7 0 0 0 11.2 11.2Z" />
              </svg>
            </span>
            <span className="theme-icon theme-icon-sun" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                role="presentation"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ fill: 'none', stroke: 'currentColor' }}
              >
                <circle cx="12" cy="12" r="4.5" />
                <path d="M12 2.5v2.5M12 19v2.5M2.5 12h2.5M19 12h2.5M5 5l1.8 1.8M17.2 17.2l1.8 1.8M19 5l-1.8 1.8M6.8 17.2l-1.8 1.8" />
              </svg>
            </span>
            <span className="sr-only">
              {theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            </span>
          </button>
          <Link to="/join" className="cta-button">Join Us</Link>
        </div>

        <button
          className="hamburger-menu"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className={`bar ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isMenuOpen ? 'open' : ''}`}></span>
        </button>
      </nav>

      <div className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/projects" onClick={toggleMenu}>Projects</Link>
        <Link to="/blog" onClick={toggleMenu}>Blog</Link>
        <Link to="/events" onClick={toggleMenu}>Events</Link>
        <Link to="/roadmaps" onClick={toggleMenu}>Roadmaps</Link>
        <Link to="/team" onClick={toggleMenu}>Team</Link>
        <button
          type="button"
          className="theme-toggle mobile"
          onClick={toggleTheme}
          aria-pressed={theme === 'dark'}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <span className="theme-icon theme-icon-moon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              role="presentation"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ fill: 'none', stroke: 'currentColor' }}
            >
              <path d="M21 14.2A8.5 8.5 0 1 1 9.8 3a7 7 0 0 0 11.2 11.2Z" />
            </svg>
          </span>
          <span className="theme-icon theme-icon-sun" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              role="presentation"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ fill: 'none', stroke: 'currentColor' }}
            >
              <circle cx="12" cy="12" r="4.5" />
              <path d="M12 2.5v2.5M12 19v2.5M2.5 12h2.5M19 12h2.5M5 5l1.8 1.8M17.2 17.2l1.8 1.8M19 5l-1.8 1.8M6.8 17.2l-1.8 1.8" />
            </svg>
          </span>
          <span className="sr-only">
            {theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          </span>
        </button>
      </div>
    </header>
  );
}

export default Header;

