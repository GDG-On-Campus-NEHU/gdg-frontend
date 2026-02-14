import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Instagram, Linkedin } from 'lucide-react';
import { CLUB_INFO, SOCIAL_LINKS } from '../config/siteLinks';

function SocialIcon({ socialKey }) {
  if (socialKey === 'whatsapp') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="footer-social-icon whatsapp-icon">
        <path
          fill="currentColor"
          d="M12.05 2C6.58 2 2.13 6.45 2.13 11.92c0 1.75.46 3.45 1.32 4.95L2 22l5.24-1.38a9.86 9.86 0 0 0 4.81 1.24h.01c5.47 0 9.92-4.45 9.92-9.92A9.84 9.84 0 0 0 12.05 2Zm0 18.18h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.11.82.83-3.03-.2-.31a8.17 8.17 0 0 1-1.25-4.36c0-4.52 3.68-8.2 8.21-8.2 2.19 0 4.25.85 5.8 2.4a8.15 8.15 0 0 1 2.4 5.8c0 4.52-3.68 8.2-8.2 8.2Zm4.5-6.16c-.25-.12-1.47-.72-1.7-.8-.23-.08-.4-.13-.57.12-.17.26-.65.82-.8.98-.14.17-.3.2-.56.07-.25-.13-1.07-.4-2.05-1.27-.76-.68-1.27-1.52-1.42-1.77-.15-.25-.02-.39.11-.52.12-.12.25-.3.38-.46.12-.14.17-.25.25-.42.08-.17.04-.3-.02-.43-.06-.13-.57-1.38-.78-1.88-.2-.49-.4-.43-.57-.44h-.49c-.17 0-.44.06-.68.31-.23.25-.89.87-.89 2.13s.91 2.48 1.04 2.65c.13.17 1.78 2.72 4.31 3.8.61.27 1.07.43 1.45.55.59.18 1.14.15 1.57.09.48-.07 1.47-.6 1.69-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.17-.48-.3Z"
        />
      </svg>
    );
  }

  if (socialKey === 'linkedin') return <Linkedin size={18} aria-hidden="true" />;
  if (socialKey === 'instagram') return <Instagram size={18} aria-hidden="true" />;
  return <Github size={18} aria-hidden="true" />;
}

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer-inner">
        <div className="footer-brand-block">
          <Link to="/" className="footer-logo">{CLUB_INFO.name}</Link>
          <p className="footer-copy">&copy; {new Date().getFullYear()} Club. All rights reserved.</p>
          <p className="footer-address">{CLUB_INFO.address}</p>
        </div>

        <div className="footer-meta-block">
          <div className="footer-socials" aria-label="Club social links">
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.key}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label={item.label}
              >
                <SocialIcon socialKey={item.key} />
                <span className="sr-only">{item.label}</span>
              </a>
            ))}
          </div>

          <a href={`mailto:${CLUB_INFO.email}`} className="footer-email">{CLUB_INFO.email}</a>
          <Link to="/dev" className="footer-dev-link" aria-label="Open developer easter egg page">
            {CLUB_INFO.developedBy}
          </Link>
        </div>
      </div>
    </footer>
  );
}
