import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { ChevronDown, ChevronUp, Star, ArrowRight } from 'lucide-react';
import './Home.css';

const API = 'http://127.0.0.1:8000/api';

const Home = () => {
  const { addToCart } = useCart();
  const [openFaq, setOpenFaq]                   = useState(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [reviews, setReviews]                   = useState([]);
  const [faqs, setFaqs]                         = useState([]);

  useEffect(() => {
    // Products
    fetch(`${API}/products`)
      .then(r => r.json())
      .then(data => setFeaturedProducts(data.slice(0, 4)))
      .catch(console.error);

    // Reviews
    fetch(`${API}/reviews`)
      .then(r => r.json())
      .then(setReviews)
      .catch(console.error);

    // FAQs — from database
    fetch(`${API}/faqs`)
      .then(r => r.json())
      .then(setFaqs)
      .catch(console.error);
  }, []);

  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content animate-fade-up">
          <span className="hero-tagline">Haute Parfumerie</span>
          <h1 className="hero-title">The Art of<br/><em>Scent</em></h1>
          <p className="hero-desc">Rare ingredients. Timeless compositions.<br/>Crafted for those who live with intention.</p>
          <div className="hero-actions">
            <Link to="/store" className="btn btn-primary">Explore Collection</Link>
            <Link to="/about" className="btn btn-outline">Our Story</Link>
          </div>
        </div>
        <div className="hero-visual animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <img
            src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800"
            alt="Luxury Perfume"
            className="hero-img"
          />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee">
        <div className="marquee-track">
          {['Oud','Attar','Signature','Loyalty','Gift Sets','Oud','Attar','Signature','Loyalty','Gift Sets','Oud','Attar','Signature','Loyalty','Gift Sets'].map((t, i, a) => (
            <React.Fragment key={i}>
              <span>{t}</span>
              {i < a.length - 1 && <span className="dot">•</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <section className="section container">
        <div className="section-header">
          <div>
            <span className="section-label">Curated Selection</span>
            <h2 className="section-title">Featured <em>Masterpieces</em></h2>
          </div>
          <Link to="/store" className="view-all">View All <ArrowRight size={16} /></Link>
        </div>

        <div className="product-grid">
          {featuredProducts.length === 0 ? (
            <p style={{ color: 'var(--text-color)' }}>Loading...</p>
          ) : (
            featuredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-img">
                  <Link to={`/product/${product.id}`} className="img-link-wrapper">
                    <span className="product-badge">{product.type}</span>
                    <img src={product.image} alt={product.name} />
                  </Link>
                  <div className="product-overlay">
                    <button className="btn btn-primary" onClick={() => addToCart(product)}>Add to Cart</button>
                    <Link to={`/product/${product.id}`} className="btn btn-outline btn-slide-fill">View Details</Link>
                  </div>
                </div>
                <Link to={`/product/${product.id}`} className="product-info">
                  <h3>{product.name}</h3>
                  <span className="type">{product.type}</span>
                  <div className="product-meta">
                    <span className="price">Rs. {product.price.toLocaleString()}</span>
                    <div className="rating">
                      <Star size={14} fill="currentColor" />
                      <span>{product.rating}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </section>

      {/* CATEGORIES / COLLECTIONS */}
      <section className="section container categories-section">
        <h2 className="section-title text-center mb-5">Shop by <em>Category</em></h2>
        <div className="categories-grid">
          <Link to="/store/oud" className="cat-card cat-large">
            <img src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&q=80&w=800" alt="Oud" />
            <div className="cat-info"><h3>Majestic Oud</h3><span>Explore &rarr;</span></div>
          </Link>
          <div className="cat-column">
            <Link to="/store/attar" className="cat-card">
              <img src="https://images.unsplash.com/photo-1595532542520-21a473f32420?auto=format&fit=crop&q=80&w=400" alt="Attar" />
              <div className="cat-info"><h3>Pure Attar</h3></div>
            </Link>
            <Link to="/store/under1500" className="cat-card">
              <img src="https://images.unsplash.com/photo-1605369680376-795a973a4b95?auto=format&fit=crop&q=80&w=400" alt="Under 1500" />
              <div className="cat-info"><h3>Under Rs. 1500</h3></div>
            </Link>
          </div>
          <div className="cat-column">
            <Link to="/store/giftbox" className="cat-card">
              <img src="https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&q=80&w=400" alt="Gift Box" />
              <div className="cat-info"><h3>Gift Boxes</h3></div>
            </Link>
            <Link to="/store/tester" className="cat-card">
              <img src="https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=400" alt="Tester Boxes" />
              <div className="cat-info"><h3>Tester Boxes</h3></div>
            </Link>
          </div>
        </div>
      </section>

      {/* REVIEWS CAROUSEL */}
      <section className="section reviews-section">
        <div className="container">
          <h2 className="section-title text-center mb-5">Words from <em>Connoisseurs</em></h2>
          {reviews.length > 0 ? (
            <div className="reviews-carousel">
              <div className="reviews-track">
                {[...reviews, ...reviews].map((review, idx) => (
                  <div key={idx} className="review-card">
                    <div className="stars">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} size={16} fill={i <= review.rating ? 'currentColor' : 'none'} />
                      ))}
                    </div>
                    <p className="review-text">"{review.content}"</p>
                    <div className="review-author">
                      <h4>{review.author}</h4>
                      <span>Verified Buyer</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center" style={{ color: 'var(--text-color)' }}>Loading reviews...</p>
          )}
        </div>
      </section>

      {/* FAQS — from API */}
      <section className="section container faq-section">
        <span className="section-label text-center">Support</span>
        <h2 className="section-title text-center mb-5">Frequently Asked <em>Questions</em></h2>

        <div className="faq-list">
          {faqs.length === 0 ? (
            <p className="text-center" style={{ color: 'var(--text-color)' }}>Loading FAQs...</p>
          ) : (
            faqs.map((faq, index) => (
              <div
                key={faq.id || index}
                className={`faq-item ${openFaq === index ? 'open' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-question">
                  <h3>{faq.question}</h3>
                  {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
