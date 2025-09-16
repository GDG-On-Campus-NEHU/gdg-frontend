import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './components/BlogDetailPage';
import ProjectsPage from './pages/ProjectsPage'; 
import RoadmapsPage from './pages/RoadmapsPage'; 
import TeamPage from './pages/TeamPage';       

function App() {
  return (
    <>
      {/* These shared elements will appear on every page */}
      <div className="background-container">
        <div className="background-gradient"></div>
      </div>
      <Header />

      {/* The Routes component will render the correct page based on the URL */}
      <Routes>
        {/* Main landing page */}
        <Route path="/" element={<HomePage />} />
        
        {/* Dedicated pages for each section */}
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/blog/:postId" element={<BlogDetailPage />} />
        <Route path="/roadmaps" element={<RoadmapsPage />} />
        <Route path="/team" element={<TeamPage />} />
        {/* ... other routes */}

      </Routes>
    </>
  );
}

export default App;

