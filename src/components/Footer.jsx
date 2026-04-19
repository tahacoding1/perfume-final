import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, MessageSquare, Mail, CheckCircle } from 'lucide-react';
import './Footer.css';

const API = 'http://127.0.0.1:8000/api';

const Footer = () => {
  const [email, setEmail]       = useState('');
  const [subStatus, setSubStatus] = useState('idle'); // idle | loading | success | error | duplicate

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setSubStatus('loading');

    try {
      const res = await fetch(`${API}/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubStatus('success');
        setEmail('');
      } else {
        const data = await res.json();
        // Laravel sends 422 with validation error for duplicate email
        const msg = data?.errors?.email?.[0] || '';
        setSubStatus(msg.includes('already') ? 'duplicate' : 'error');
      }
    } catch {
      setSubStatus('error');
    }

    // Reset status after 4 seconds
    setTimeout(() => setSubStatus('idle'), 4000);
  };

  const statusMsg = {
    loading:   'Subscribing...',
    success:   '✓ Welcome to the club!',
    error:     '✗ Something went wrong.',
    duplicate: '✓ Already subscribed!',
  };

  return (
    <footer className="footer animate-fade-up">
      <div className="footer-top container">

        <div className="footer-brand">
          <Link to="/" className="footer-logo">LU<span>M</span>IÈRE</Link>
          <p>
            Experience the art of fine fragrance.
            Crafted with the rarest ingredients for the modern connoisseur.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Website"><Globe size={18} /></a>
            <a href="#" aria-label="Mail"><Mail size={18} /></a>
            <a href="#" aria-label="Message"><MessageSquare size={18} /></a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/store">Our Collections</Link></li>
            <li><Link to="/about">Our Story</Link></li>
            <li><Link to="/store/signature">Signature Scents</Link></li>
            <li><Link to="/store/giftbox">Gift Sets</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Customer Care</h4>
          <ul>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/track-order">Track Your Order</Link></li>
            <li><Link to="/policy/shipping">Shipping Policy</Link></li>
            <li><Link to="/policy/terms">Terms of Service</Link></li>
            <li><Link to="/policy/privacy">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className="footer-col footer-newsletter">
          <h4>Join the Club</h4>
          <p>Subscribe for exclusive access to limited editions and private sales.</p>

          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Your Email Address"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={subStatus === 'loading' || subStatus === 'success'}
            />
            <button
              type="submit"
              aria-label="Subscribe"
              disabled={subStatus === 'loading' || subStatus === 'success'}
            >
              {subStatus === 'success'
                ? <CheckCircle size={16} />
                : <Mail size={16} />
              }
            </button>
          </form>

          {subStatus !== 'idle' && (
            <p
              style={{
                marginTop: '8px',
                fontSize: '0.8rem',
                color: subStatus === 'success' || subStatus === 'duplicate'
                  ? 'var(--primary-color)'
                  : '#e74c3c',
              }}
            >
              {statusMsg[subStatus]}
            </p>
          )}
        </div>
      </div>

      <div className="footer-bottom container">
        <p>&copy; {new Date().getFullYear()} LUMIÈRE. All rights reserved.</p>
        <p>Crafted for elegance.</p>
      </div>
    </footer>
  );
};

export default Footer;
