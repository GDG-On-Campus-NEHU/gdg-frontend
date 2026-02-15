import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Linkedin, Instagram, Github, Globe } from 'lucide-react';
import { CLUB_INFO, SOCIAL_LINKS } from '../config/siteLinks';

function SocialLinkIcon({ socialKey }) {
  if (socialKey === 'whatsapp') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" width="16" height="16">
        <path
          fill="currentColor"
          d="M12.05 2C6.58 2 2.13 6.45 2.13 11.92c0 1.75.46 3.45 1.32 4.95L2 22l5.24-1.38a9.86 9.86 0 0 0 4.81 1.24h.01c5.47 0 9.92-4.45 9.92-9.92A9.84 9.84 0 0 0 12.05 2Zm0 18.18h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.11.82.83-3.03-.2-.31a8.17 8.17 0 0 1-1.25-4.36c0-4.52 3.68-8.2 8.21-8.2 2.19 0 4.25.85 5.8 2.4a8.15 8.15 0 0 1 2.4 5.8c0 4.52-3.68 8.2-8.2 8.2Zm4.5-6.16c-.25-.12-1.47-.72-1.7-.8-.23-.08-.4-.13-.57.12-.17.26-.65.82-.8.98-.14.17-.3.2-.56.07-.25-.13-1.07-.4-2.05-1.27-.76-.68-1.27-1.52-1.42-1.77-.15-.25-.02-.39.11-.52.12-.12.25-.3.38-.46.12-.14.17-.25.25-.42.08-.17.04-.3-.02-.43-.06-.13-.57-1.38-.78-1.88-.2-.49-.4-.43-.57-.44h-.49c-.17 0-.44.06-.68.31-.23.25-.89.87-.89 2.13s.91 2.48 1.04 2.65c.13.17 1.78 2.72 4.31 3.8.61.27 1.07.43 1.45.55.59.18 1.14.15 1.57.09.48-.07 1.47-.6 1.69-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.17-.48-.3Z"
        />
      </svg>
    );
  }

  if (socialKey === 'linkedin') return <Linkedin size={16} aria-hidden="true" />;
  if (socialKey === 'instagram') return <Instagram size={16} aria-hidden="true" />;
  return <Github size={16} aria-hidden="true" />;
}

function JoinPage() {
  return (
    <main className="join-page">
      <section className="join-hero" aria-labelledby="join-hero-title">
        <div className="join-hero-inner">
          <p className="join-eyebrow">Join GDG On Campus</p>
          <h1 id="join-hero-title">Build. Learn. Lead.</h1>
          <p className="join-hero-copy">
            Google Developer Groups (GDG) On Campus is a student-led community where curiosity
            meets capability. We empower students to bridge the gap between academic theory and
            industry practice, transforming passionate learners into confident, real-world builders.
          </p>
          <div className="join-hero-actions">
            <a
              href={CLUB_INFO.communityPortal}
              target="_blank"
              rel="noopener noreferrer"
              className="join-primary-cta"
            >
              Join Community Portal
            </a>
            <Link to="/events" className="join-secondary-cta">
              Explore Events
            </Link>
          </div>
        </div>
      </section>

      <section className="join-section">
        <h2>Who We Are</h2>
        <p>
          As a local chapter of the global Google Developer Groups network, we provide a launchpad
          for students who want to go beyond the classroom. We are not just a club; we are a
          collaborative ecosystem of developers, designers, and innovators focused on solving
          real-world problems through technology.
        </p>
        <p className="join-highlight">
          Growth happens when you build, iterate, and innovate together.
        </p>
      </section>

      <section className="join-section">
        <h2>Our Mission</h2>
        <p>
          Our goal is to create a thriving environment for peer-to-peer learning and professional
          growth. We are committed to:
        </p>
        <ul className="join-bullets">
          <li><strong>Upskilling:</strong> Preparing students for the global tech workforce.</li>
          <li><strong>Hands-on Impact:</strong> Promoting a learning-by-doing philosophy.</li>
          <li><strong>Innovation:</strong> Encouraging experimentation with emerging technologies.</li>
          <li><strong>Community:</strong> Building a supportive network of future tech leaders.</li>
        </ul>
      </section>

      <section className="join-section">
        <h2>Is This For You?</h2>
        <p>
          Short answer: Yes. Whether you are exploring your first technology concept or already
          building advanced solutions in your domain, there is a place for you here. We welcome
          students from all academic backgrounds, including non-engineering branches. Our only
          criterion is passion for technology. We value curiosity, collaboration, and consistency
          over perfection.
        </p>
        <div className="join-personas">
          <article className="join-persona">
            <h3>The Beginner</h3>
            <p>Starting your journey and building confidence through practical learning.</p>
          </article>
          <article className="join-persona">
            <h3>The Specialist</h3>
            <p>Deep-diving into your chosen field and sharpening advanced technical skills.</p>
          </article>
          <article className="join-persona">
            <h3>The Leader</h3>
            <p>Ready to lead teams, manage projects, and inspire peers across disciplines.</p>
          </article>
        </div>
      </section>

      <section className="join-section">
        <h2>Your Path to Growth</h2>
        <ol className="join-steps">
          <li><strong>Connect:</strong> Join our official community platform.</li>
          <li><strong>Learn:</strong> Attend hands-on sessions and earn digital badges.</li>
          <li><strong>Collaborate:</strong> Partner with peers on meaningful projects.</li>
          <li><strong>Lead:</strong> Showcase your work and mentor the next cohort.</li>
        </ol>
      </section>

      <section className="join-section join-connect">
        <h2>Stay Connected</h2>
        <p>Don&apos;t miss an update. Follow our journey and join the conversation.</p>
        <div className="join-links-grid">
          {SOCIAL_LINKS.map((item) => {
            return (
              <a key={item.key} href={item.url} target="_blank" rel="noopener noreferrer" className="join-link-card">
                <span className="join-link-label">
                  <SocialLinkIcon socialKey={item.key} />
                  <span>{item.label}</span>
                </span>
                <ExternalLink size={16} aria-hidden="true" />
              </a>
            );
          })}
          <a
            href={CLUB_INFO.communityPortal}
            target="_blank"
            rel="noopener noreferrer"
            className="join-link-card join-link-card--primary"
          >
            <span className="join-link-label">
              <Globe size={16} aria-hidden="true" />
              <span>Community Portal</span>
            </span>
            <ExternalLink size={16} aria-hidden="true" />
          </a>
        </div>
        <p className="join-portal-note">Official membership starts here.</p>
        <p className="join-footer-note">
          Questions? Write to{' '}
          <a href={`mailto:${CLUB_INFO.email}`}>{CLUB_INFO.email}</a>{' '}
          or go back to the <Link to="/">homepage</Link>.
        </p>
      </section>
    </main>
  );
}

export default JoinPage;
