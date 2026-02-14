import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { CLUB_INFO, SOCIAL_LINKS } from '../config/siteLinks';

const activityItems = [
  {
    activity: 'Technical Workshops',
    details: 'Deep dives into Google Cloud, Android, AI (Gemini), Web, and Firebase.',
  },
  {
    activity: 'Study Jams',
    details: 'Collective learning journeys through structured Google Cloud and AI tracks.',
  },
  {
    activity: 'Hackathons',
    details: 'Rapid prototyping sessions to turn wild ideas into functional solutions.',
  },
  {
    activity: 'Open Source',
    details: 'Real-world project collaboration to beef up your GitHub and portfolio.',
  },
  {
    activity: 'Speaker Sessions',
    details: 'Direct insights from Google Developer Experts (GDEs) and industry pros.',
  },
];

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
        <h2>What&apos;s In Store?</h2>
        <div className="join-table-wrap">
          <table className="join-table">
            <thead>
              <tr>
                <th>Activity</th>
                <th>What to Expect</th>
              </tr>
            </thead>
            <tbody>
              {activityItems.map((item) => (
                <tr key={item.activity}>
                  <td>{item.activity}</td>
                  <td>{item.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="join-section">
        <h2>Is This For You?</h2>
        <p>
          Short answer: Yes. Whether you are writing your first line of code in Python or optimizing
          complex backend architectures, there is a seat at the table for you. We value curiosity over
          expertise and consistency over perfection.
        </p>
        <div className="join-personas">
          <article className="join-persona">
            <h3>The Beginner</h3>
            <p>Starting your journey with Web or App development.</p>
          </article>
          <article className="join-persona">
            <h3>The Specialist</h3>
            <p>Deep-diving into ML, DevOps, or Cloud.</p>
          </article>
          <article className="join-persona">
            <h3>The Leader</h3>
            <p>Looking to manage projects and inspire others.</p>
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
          {SOCIAL_LINKS.map((item) => (
            <a key={item.key} href={item.url} target="_blank" rel="noopener noreferrer" className="join-link-card">
              <span>{item.label}</span>
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          ))}
          <a
            href={CLUB_INFO.communityPortal}
            target="_blank"
            rel="noopener noreferrer"
            className="join-link-card join-link-card--primary"
          >
            <span>Community Portal</span>
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
