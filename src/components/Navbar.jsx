import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { Moon, Sun, ShoppingBag, Menu, X, User, ChevronDown } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled]         = useState(false);
  const [isMobileOpen, setIsMobileOpen]     = useState(false);
  const [mobileContact, setMobileContact]   = useState(false);
  const { theme, toggleTheme }              = useTheme();
  const { user, logout }                    = useAuth();
  const { cartCount, setIsCartOpen }        = useCart();
  const location  = useLocation();
  const navigate  = useNavigate();
  const contactRef = useRef(null);

  const handleLogout = () => { logout(); navigate('/'); };

  useEffect(() => {
    const onScroll  = () => setIsScrolled(window.scrollY > 50);
    const onResize  = () => { if (window.innerWidth > 1024) setIsMobileOpen(false); };
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize); };
  }, []);

  useEffect(() => { setIsMobileOpen(false); setMobileContact(false); }, [location]);

  const contactLinks = [
    { label: 'Contact Us',       to: '/contact' },
    { label: 'Shipping Policy',  to: '/policy/shipping' },
    { label: 'Terms of Service', to: '/policy/terms' },
    { label: 'Privacy Policy',   to: '/policy/privacy' },
  ];

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/" className="nav-logo">LU<span>M</span>IÈRE</Link>

          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/store">Store</Link></li>
            <li><Link to="/about">About</Link></li>

            {/* Contact dropdown */}
            <li className="nav-dropdown-wrap" ref={contactRef}>
              <span className="nav-dropdown-trigger">
                Contact <ChevronDown size={12} />
              </span>
              <div className="nav-dropdown">
                {contactLinks.map(l => (
                  <Link key={l.to} to={l.to}>{l.label}</Link>
                ))}
              </div>
            </li>
          </ul>

          <div className="nav-actions">
            <button onClick={toggleTheme} className="icon-btn" aria-label="Toggle Theme">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <div className="auth-desktop">
              {user ? (
                <div className="profile-dropdown">
                  <Link to="/profile" className="profile-btn">
                    <User size={20} />
                    <span>{user.name.split(' ')[0]}</span>
                  </Link>
                  <div className="dropdown-menu">
                    <Link to="/profile">Settings</Link>
                    <button onClick={handleLogout} className="logout-btn-nav">Logout</button>
                  </div>
                </div>
              ) : (
                <div className="auth-links">
                  <Link to="/login" className="login-link">Log In</Link>
                  <Link to="/signup" className="signup-link">Sign Up</Link>
                </div>
              )}
            </div>

            <button onClick={() => setIsCartOpen(true)} className="cart-btn" aria-label="Cart">
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>

            <button className="mobile-toggle" onClick={() => setIsMobileOpen(!isMobileOpen)}>
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <Link to="/">Home</Link>
          <Link to="/store">Store</Link>
          <Link to="/about">About</Link>

          {/* Mobile Contact accordion */}
          <div className="mobile-contact-group">
            <button
              className="mobile-contact-toggle"
              onClick={() => setMobileContact(o => !o)}
            >
              Contact {mobileContact ? <X size={16} /> : <ChevronDown size={16} />}
            </button>
            {mobileContact && (
              <div className="mobile-contact-links">
                {contactLinks.map(l => (
                  <Link key={l.to} to={l.to}>{l.label}</Link>
                ))}
              </div>
            )}
          </div>

          <hr />
          {user ? (
            <>
              <Link to="/profile">Profile Settings</Link>
            </>
          ) : (
            <div className="mobile-auth-row">
              <Link to="/login" className="mobile-login-btn">Log In</Link>
              <Link to="/signup" className="mobile-signup-btn">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
