import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Star, Filter } from 'lucide-react';
import './Store.css';

const API = 'http://127.0.0.1:8000/api';

const CATEGORIES = [
  { id: 'all',      name: 'All Collection' },
  { id: 'oud',      name: 'Oud' },
  { id: 'attar',    name: 'Attar' },
  { id: 'signature',name: 'Signature' },
  { id: 'under1500',name: 'Under 1500Rs' },
  { id: 'tester',   name: 'Tester Box' },
  { id: 'giftbox',  name: 'Gift Box' },
  { id: 'loyalty',  name: 'Main Loyalty' },
];

// ── Skeleton card ────────────────────────────────────────────
const ProductSkeleton = () => (
  <div className="product-card skeleton-card">
    <div className="skeleton-shimmer" style={{ aspectRatio: '3/4', borderRadius: '4px', marginBottom: '16px' }} />
    <div className="skeleton-shimmer" style={{ height: '20px', width: '70%', marginBottom: '8px' }} />
    <div className="skeleton-shimmer" style={{ height: '14px', width: '40%', marginBottom: '12px' }} />
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div className="skeleton-shimmer" style={{ height: '18px', width: '35%' }} />
      <div className="skeleton-shimmer" style={{ height: '18px', width: '25%' }} />
    </div>
  </div>
);

const Store = () => {
  const { category }  = useParams();
  const { addToCart } = useCart();

  const [activeCat, setActiveCat]               = useState(category || 'all');
  const [products, setProducts]                 = useState([]);
  const [allFetchedProducts, setAllFetched]     = useState([]);
  const [loading, setLoading]                   = useState(true);
  const [sidebarOpen, setSidebarOpen]           = useState(false);
  const hasFetched = useRef(false);

  // First load — fetch all products ONCE
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetch(`${API}/products`, { headers: { Accept: 'application/json' } })
      .then(r => r.json())
      .then(data => {
        setAllFetched(data);
        const cat = category || 'all';
        setProducts(cat === 'all' ? data : data.filter(p => p.category === cat));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Category change — instant filter, no reload
  useEffect(() => {
    const cat = category || 'all';
    setActiveCat(cat);
    if (allFetchedProducts.length > 0) {
      setProducts(cat === 'all' ? allFetchedProducts : allFetchedProducts.filter(p => p.category === cat));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSidebarOpen(false);
  }, [category, allFetchedProducts]);

  return (
    <div className="store-page page-padding">
      <div className="store-header animate-fade-up">
        <span className="section-label text-center">Collection</span>
        <h1 className="section-title text-center">The <em>Boutique</em></h1>
      </div>

      <div className="store-container container">

        {/* Mobile filter toggle */}
        <button
          className="mobile-filter-toggle btn btn-outline"
          onClick={() => setSidebarOpen(o => !o)}
        >
          <Filter size={16} /> {sidebarOpen ? 'Hide Filters' : 'Filter'}
        </button>

        {/* Sidebar */}
        <aside className={`store-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <div className="sidebar-header">
            <h3><Filter size={18} /> Categories</h3>
          </div>
          <ul className="category-list">
            {CATEGORIES.map(c => (
              <li key={c.id}>
                <Link
                  to={c.id === 'all' ? '/store' : `/store/${c.id}`}
                  className={activeCat === c.id ? 'active' : ''}
                >
                  {c.name}
                  {/* Show count if loaded */}
                  {!loading && (
                    <span className="cat-count">
                      {c.id === 'all'
                        ? allFetchedProducts.length
                        : allFetchedProducts.filter(p => p.category === c.id).length}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Products */}
        <main className="store-main">
          <div className="store-meta">
            {loading
              ? <p>Loading...</p>
              : <p>Showing <strong>{products.length}</strong> product{products.length !== 1 ? 's' : ''}</p>
            }
          </div>

          <div className="product-grid">
            {loading ? (
              // 8 skeleton cards while loading
              Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
            ) : products.length === 0 ? (
              <div className="no-products">
                <p>No products found in this category.</p>
                <Link to="/store" className="btn btn-outline" style={{ marginTop: '16px' }}>
                  View All Products
                </Link>
              </div>
            ) : (
              products.map(product => (
                <div key={product.id} className="product-card animate-fade-up">
                  <div className="product-img">
                    <Link to={`/product/${product.id}`} className="img-link-wrapper">
                      <span className="product-badge">{product.type}</span>
                      <img src={product.image} alt={product.name} loading="lazy" />
                    </Link>
                    <div className="product-overlay">
                      <button className="btn btn-primary" onClick={() => addToCart(product)}>
                        Add to Cart
                      </button>
                      <Link to={`/product/${product.id}`} className="btn btn-outline btn-slide-fill">
                        View Details
                      </Link>
                    </div>
                  </div>
                  <Link to={`/product/${product.id}`} className="product-info">
                    <h3>{product.name}</h3>
                    <span className="type">{product.type}</span>
                    <div className="product-meta">
                      <span className="price">Rs. {Number(product.price).toLocaleString()}</span>
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
        </main>
      </div>
    </div>
  );
};

export default Store;
