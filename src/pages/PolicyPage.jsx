import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Misc.css';

const API = 'http://127.0.0.1:8000/api';

// Fallback content agar API down ho
const FALLBACK = {
  privacy: {
    title: 'Privacy Policy',
    content: '<p>At LUMIÈRE, we are committed to safeguarding your privacy. Your data is never sold or shared. Contact us for data removal requests.</p>',
  },
  terms: {
    title: 'Terms of Service',
    content: '<p>By using our website you agree to our terms. All prices in PKR. We reserve the right to limit quantities and cancel orders with pricing errors.</p>',
  },
  shipping: {
    title: 'Shipping Policy',
    content: '<p>Standard nationwide shipping: 3–5 business days — Rs. 250. Free shipping on orders over Rs. 5,000. Opened products cannot be returned.</p>',
  },
};

const PolicyPage = () => {
  const { type } = useParams();
  const [page, setPage]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setPage(null);

    fetch(`${API}/pages/${type}`)
      .then(r => {
        if (!r.ok) throw new Error('Not found');
        return r.json();
      })
      .then(data => {
        setPage(data);
        setLoading(false);
      })
      .catch(() => {
        // API se nahi aya — fallback use karo
        const fb = FALLBACK[type];
        if (fb) {
          setPage(fb);
        } else {
          setError(true);
        }
        setLoading(false);
      });
  }, [type]);

  if (loading) {
    return (
      <div className="info-page page-padding animate-fade-up">
        <div className="container text-center" style={{ paddingTop: '100px' }}>
          <p style={{ color: 'var(--text-color)' }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="info-page page-padding animate-fade-up">
        <div className="container text-center" style={{ paddingTop: '100px' }}>
          <h2 className="section-title"><em>Page Not Found</em></h2>
          <p style={{ color: 'var(--text-color)' }}>The requested policy page does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div key={type} className="info-page page-padding animate-fade-up">
      <div className="container">
        <div className="info-header text-center">
          <h1 className="section-title"><em>{page.title}</em></h1>
        </div>
        <div
          className="policy-content"
          style={{ animationDelay: '0.2s' }}
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>
    </div>
  );
};

export default PolicyPage;
