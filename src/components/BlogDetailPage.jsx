import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import GlassCard from '../components/GlassCard'; // We'll reuse our card for related posts

const API_BASE_URL = 'http://127.0.0.1:8000';

function BlogDetailPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    // When the postId changes, scroll to the top of the new page
    window.scrollTo(0, 0); 
    
    fetch(`${API_BASE_URL}/api/blog/${postId}/`)
      .then(response => response.json())
      .then(data => setPost(data))
      .catch(error => console.error('Error fetching post:', error));
  }, [postId]);

  useEffect(() => {
    if (post && window.Prism) {
      const timer = setTimeout(() => {
        window.Prism.highlightAll();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [post]);

  if (!post) {
    return <main className="page-container"><div>Loading...</div></main>;
  }

  const sanitizedContent = DOMPurify.sanitize(post.content);
  const formattedDate = new Date(post.publish_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="page-container">
      <div className="blog-post-container">
        {/* --- NEW VERGE-INSPIRED HEADER --- */}
        <div className="blog-post-header">
          <p className="post-category">ELECTROPHOENIX BLOG</p>
          <h1 className="blog-post-title">{post.title}</h1>
          {post.author && (
            <p className="blog-post-meta">
              by <strong>{post.author.name}</strong> on {formattedDate}
            </p>
          )}
        </div>
        
        <div 
          className="blog-post-content" 
          dangerouslySetInnerHTML={{ __html: sanitizedContent }} 
        />
        
        {post.author && (
          <div className="author-box">
            <img src={post.author.photo} alt={post.author.name} className="author-photo" />
            <div className="author-details">
              <h3>About the Author</h3>
              <p className="author-name">{post.author.name}</p>
              <p>{post.author.bio}</p>
              {post.author.linkedin_url && (
                <a href={post.author.linkedin_url} target="_blank" rel="noopener noreferrer" className="author-link">
                  Visit Profile
                </a>
              )}
            </div>
          </div>
        )}
        
        {/* --- NEW "YOU MAY ALSO LIKE" SECTION --- */}
        {post.related_posts && post.related_posts.length > 0 && (
          <div className="related-posts-section">
            <h2 className="related-posts-title">You may also like</h2>
            <div className="grid-layout">
              {post.related_posts.map(relatedPost => (
                <Link to={`/blog/${relatedPost.id}`} key={relatedPost.id} className="card-link">
                  <GlassCard
                    imgSrc={relatedPost.image}
                    title={relatedPost.title}
                    description={relatedPost.summary}
                    date={relatedPost.publish_date}
                    tags={[]} // Tags aren't needed for these smaller cards
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
        
        <div className="back-link-container">
          <Link to="/blog" className="see-more-button">&larr; All Posts</Link>
        </div>
      </div>
    </main>
  );
}

export default BlogDetailPage;

