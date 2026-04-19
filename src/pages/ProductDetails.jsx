import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { ShieldCheck, Truck, RotateCcw, Star } from 'lucide-react';
import './ProductDetails.css';

const API = 'http://127.0.0.1:8000/api';

// ─── Skeleton shimmer component ──────────────────────────────
const Skeleton = ({ width = '100%', height = '20px', style = {} }) => (
  <div
    className="skeleton-shimmer"
    style={{ width, height, borderRadius: '4px', ...style }}
  />
);

const ProductDetailsSkeleton = () => (
  <div className="product-details-page page-padding">
    <div className="container">
      <div className="product-details-grid">
        <Skeleton height="500px" style={{ borderRadius: '16px' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Skeleton width="80px" height="14px" />
          <Skeleton width="70%" height="48px" />
          <Skeleton width="50%" height="32px" />
          <Skeleton height="100px" />
          <Skeleton height="60px" />
          <Skeleton height="60px" />
        </div>
      </div>
    </div>
  </div>
);

const ProductDetails = () => {
  const { id } = useParams();
  const navigate  = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct]               = useState(null);
  const [suggestedProducts, setSuggested]   = useState([]);
  const [loading, setLoading]               = useState(true);
  const [notFound, setNotFound]             = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setNotFound(false);
    setProduct(null);
    setSuggested([]);

    // Fetch main product
    fetch(`${API}/products/${id}`, { headers: { Accept: 'application/json' } })
      .then(r => {
        if (!r.ok) throw new Error('not found');
        return r.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setNotFound(true);
      });

    // Fetch suggested (separate — won't block main product)
    fetch(`${API}/products`, { headers: { Accept: 'application/json' } })
      .then(r => r.json())
      .then(data => {
        const others   = data.filter(p => p.id !== parseInt(id));
        const shuffled = [...others].sort(() => 0.5 - Math.random());
        setSuggested(shuffled.slice(0, 4));
      })
      .catch(() => {});
  }, [id]);

  // ── Loading state ─────────────────────────────────────────
  if (loading) return <ProductDetailsSkeleton />;

  // ── Not found state ───────────────────────────────────────
  if (notFound) {
    return (
      <div className="product-details-page page-padding text-center" style={{ paddingTop: '150px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px' }}>Product Not Found</h2>
        <p style={{ color: 'var(--text-muted)', margin: '16px 0 24px' }}>
          This product may have been removed or does not exist.
        </p>
        <Link to="/store" className="btn btn-outline">Back to Store</Link>
      </div>
    );
  }

  const handleCheckoutDirectly = () => {
    addToCart(product);
    navigate('/checkout');
  };

  return (
    <div className="product-details-page page-padding">
      <div className="container">

        {/* Main Product Layout */}
        <div className="product-details-grid">
          <div className="product-details-image animate-fade-up">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-details-content animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <span className="product-badge detail-badge">{product.type}</span>
            <h1 className="product-title">{product.name}</h1>

            <div className="product-meta-row">
              <span className="product-price">Rs. {Number(product.price).toLocaleString()}</span>
              <div className="product-rating">
                <Star size={16} fill="currentColor" className="star-icon" />
                <span>{product.rating}</span>
                <span className="reviews-count">
                  ({product.reviews?.length || 0} Reviews)
                </span>
              </div>
            </div>

            <div className="product-description">
              <p>{product.description}</p>
            </div>

            <div className="product-features">
              <div className="feature-item">
                <ShieldCheck size={20} />
                <span>100% Authentic Guaranteed</span>
              </div>
              <div className="feature-item">
                <Truck size={20} />
                <span>Express Nationwide Shipping</span>
              </div>
              <div className="feature-item">
                <RotateCcw size={20} />
                <span>7-Day Return Policy*</span>
              </div>
            </div>

            <div className="product-actions">
              <button className="btn btn-outline cart-btn" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
              <button className="btn btn-primary checkout-btn" onClick={handleCheckoutDirectly}>
                Proceed to Checkout
              </button>
            </div>

            <p className="secure-checkout-text">Secure Encrypted Checkout</p>
          </div>
        </div>

        {/* Reviews */}
        {product.reviews && product.reviews.length > 0 && (
          <section className="suggested-section animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <h2 className="section-title text-center" style={{ fontSize: '32px', marginBottom: '40px' }}>
              Customer <em>Reviews</em>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {product.reviews.map((review, i) => (
                <div key={i} style={{
                  padding: '24px', border: '1px solid var(--border-color)',
                  borderRadius: '8px', background: 'var(--card-bg)'
                }}>
                  <div style={{ display: 'flex', marginBottom: '12px' }}>
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} size={14} fill={s <= review.rating ? 'currentColor' : 'none'}
                        style={{ color: 'var(--accent-color)' }} />
                    ))}
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', marginBottom: '12px' }}>
                    "{review.content}"
                  </p>
                  <strong style={{ fontSize: '13px' }}>{review.author}</strong>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Suggested Products */}
        {suggestedProducts.length > 0 && (
          <section className="suggested-section animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <h2 className="section-title text-center" style={{ fontSize: '32px', marginBottom: '40px' }}>
              You Might Also <em>Like</em>
            </h2>
            <div className="product-grid">
              {suggestedProducts.map(sugg => (
                <div key={sugg.id} className="product-card">
                  <div className="product-img">
                    <Link to={`/product/${sugg.id}`} className="img-link-wrapper">
                      <span className="product-badge">{sugg.type}</span>
                      <img src={sugg.image} alt={sugg.name} />
                    </Link>
                    <div className="product-overlay">
                      <button className="btn btn-primary" onClick={() => addToCart(sugg)}>Add to Cart</button>
                      <Link to={`/product/${sugg.id}`} className="btn btn-outline btn-slide-fill">View Details</Link>
                    </div>
                  </div>
                  <Link to={`/product/${sugg.id}`} className="product-info">
                    <h3>{sugg.name}</h3>
                    <span className="type">{sugg.type}</span>
                    <div className="product-meta">
                      <span className="price">Rs. {Number(sugg.price).toLocaleString()}</span>
                      <div className="rating">
                        <Star size={14} fill="currentColor" />
                        <span>{sugg.rating}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default ProductDetails;
