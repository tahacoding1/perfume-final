import React, { useState } from 'react';
import { useNavigate, useLocation, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeft, Package, Truck, CheckCircle, Clock, User, ShoppingBag, X } from 'lucide-react';
import './Misc.css';

const API = 'http://127.0.0.1:8000/api';

// ══════════════════════════════════════════════════════════════
// FORGOT PASSWORD MODAL
// ══════════════════════════════════════════════════════════════
const ForgotPasswordModal = ({ onClose }) => {
  const [step, setStep]         = useState(1); // 1=email, 2=otp, 3=newpass, 4=done
  const [email, setEmail]       = useState('');
  const [otp, setOtp]           = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const sendOtp = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await fetch(`${API}/forgot-password/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) { setStep(2); }
      else setError(data.message || 'Something went wrong.');
    } catch { setError('Network error.'); }
    setLoading(false);
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await fetch(`${API}/forgot-password/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (res.ok && data.valid) setStep(3);
      else setError(data.message || 'Invalid OTP.');
    } catch { setError('Network error.'); }
    setLoading(false);
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch(`${API}/forgot-password/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, otp, password, password_confirmation: confirm }),
      });
      const data = await res.json();
      if (res.ok) setStep(4);
      else setError(data.message || 'Reset failed.');
    } catch { setError('Network error.'); }
    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" style={{ maxWidth: '440px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Reset <em>Password</em></h3>
          <button className="close-btn" onClick={onClose}><X size={18} /></button>
        </div>

        {/* Step indicators */}
        <div className="otp-steps">
          {['Email', 'OTP', 'New Password'].map((s, i) => (
            <div key={s} className={`otp-step ${step > i + 1 ? 'done' : step === i + 1 ? 'active' : ''}`}>
              <div className="otp-step-dot">{step > i + 1 ? '✓' : i + 1}</div>
              <span>{s}</span>
            </div>
          ))}
        </div>

        {error && <p style={{ color: '#e74c3c', fontSize: '13px', margin: '0 0 16px', textAlign: 'center' }}>{error}</p>}

        {/* Step 1 — Email */}
        {step === 1 && (
          <form onSubmit={sendOtp} className="auth-form" style={{ marginTop: '20px' }}>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required disabled={loading}
                placeholder="your@email.com" />
              <small style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                A 6-digit OTP will be sent to this email.
              </small>
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </form>
        )}

        {/* Step 2 — OTP */}
        {step === 2 && (
          <form onSubmit={verifyOtp} className="auth-form" style={{ marginTop: '20px' }}>
            <div className="form-group">
              <label>Enter OTP</label>
              <input type="text" value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                required disabled={loading} placeholder="6-digit code"
                style={{ letterSpacing: '8px', fontSize: '22px', textAlign: 'center' }} maxLength={6} />
              <small style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                Check your email — <strong>{email}</strong>. Valid for 10 minutes.
              </small>
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={loading || otp.length < 6}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <button type="button" className="btn btn-outline w-100" style={{ marginTop: '10px' }}
              onClick={() => setStep(1)}>
              Change Email
            </button>
          </form>
        )}

        {/* Step 3 — New Password */}
        {step === 3 && (
          <form onSubmit={resetPassword} className="auth-form" style={{ marginTop: '20px' }}>
            <div className="form-group">
              <label>New Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                required disabled={loading} placeholder="Min. 6 characters" minLength={6} />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)}
                required disabled={loading} placeholder="Repeat password" />
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}

        {/* Step 4 — Done */}
        {step === 4 && (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
            <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '12px' }}>Password Reset!</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
              Your password has been updated. You can now log in.
            </p>
            <button className="btn btn-primary" onClick={onClose}>Back to Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

// ── Status badge helper ───────────────────────────────────────
const statusStyle = (status) => {
  const map = {
    pending:    { bg: '#f39c12', label: 'Pending' },
    processing: { bg: '#3498db', label: 'Processing' },
    shipped:    { bg: '#8a1c3b', label: 'Shipped' },
    delivered:  { bg: '#27ae60', label: 'Delivered' },
    cancelled:  { bg: '#e74c3c', label: 'Cancelled' },
  };
  return map[status?.toLowerCase()] || { bg: '#888', label: status };
};

// ── Track Modal ───────────────────────────────────────────────
const TrackModal = ({ order, onClose }) => {
  const [data, setData] = useState(null);
  const [loading, setL] = useState(true);
  const [error, setErr] = useState(false);

  React.useEffect(() => {
    fetch(`${API}/track/${order.id}`, { headers: { Accept: 'application/json' } })
      .then(r => r.json()).then(d => { setData(d); setL(false); })
      .catch(() => { setErr(true); setL(false); });
  }, [order.id]);

  const steps = [
    { key: 'pending',    label: 'Order Placed', icon: <Clock size={18} /> },
    { key: 'processing', label: 'Processing',   icon: <Package size={18} /> },
    { key: 'shipped',    label: 'Shipped',       icon: <Truck size={18} /> },
    { key: 'delivered',  label: 'Delivered',     icon: <CheckCircle size={18} /> },
  ];
  const stepMap = { pending: 0, processing: 1, shipped: 2, delivering: 2, delivered: 3 };
  const current = stepMap[data?.status?.toLowerCase()] ?? 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Track <em>ORD-{order.id}</em></h3>
          <button className="close-btn" onClick={onClose}><X size={18} /></button>
        </div>
        {loading && <p style={{ color: 'var(--text-muted)' }}>Loading...</p>}
        {error   && <p style={{ color: '#e74c3c' }}>Could not load tracking info.</p>}
        {data && (
          <>
            <div className="track-summary">
              <div><small>Status</small><strong style={{ textTransform: 'capitalize' }}>{data.status}</strong></div>
              <div><small>Total</small><strong>Rs. {Number(data.total_price).toLocaleString()}</strong></div>
              {data.tracking_number && <div><small>Courier #</small><strong>{data.tracking_number}</strong></div>}
            </div>
            <div className="mini-timeline">
              {steps.map((step, i) => (
                <React.Fragment key={step.key}>
                  <div className={`mini-step ${i <= current ? 'active' : ''}`}>
                    <div className="mini-step-icon">{step.icon}</div>
                    <span>{step.label}</span>
                  </div>
                  {i < steps.length - 1 && <div className={`mini-connector ${i < current ? 'active' : ''}`} />}
                </React.Fragment>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// LOGIN
// ══════════════════════════════════════════════════════════════
export const Login = () => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [showForgot, setForgot] = useState(false);
  const { loginUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const ok = await loginUser(email, password);
    setLoading(false);
    if (ok) navigate(from, { replace: true });
  };

  return (
    <div className="auth-page page-padding animate-fade-up" style={{ position: 'relative' }}>
      <button onClick={() => navigate('/')} className="btn"
        style={{ position: 'absolute', top: '20px', left: '20px', background: 'transparent', color: 'var(--text-main)', display: 'flex', gap: '8px', padding: 0 }}>
        <ArrowLeft size={18} /> Go Back to Home
      </button>

      <div className="auth-container">
        <h2>Welcome <em>Back</em></h2>
        <p>Enter your details to access your luxury account.</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required disabled={loading} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required disabled={loading} />
            <div style={{ textAlign: 'right', marginTop: '6px' }}>
              <button type="button" onClick={() => setForgot(true)}
                style={{ background: 'none', border: 'none', color: 'var(--accent-color)', fontSize: '12px', cursor: 'pointer', padding: 0 }}>
                Forgot Password?
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <p className="auth-switch">Don't have an account? <Link to="/signup" state={{ from }}>Register</Link></p>
      </div>

      {showForgot && <ForgotPasswordModal onClose={() => setForgot(false)} />}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// SIGNUP
// ══════════════════════════════════════════════════════════════
export const Signup = () => {
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const { registerUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const ok = await registerUser({ name, email, password });
    setLoading(false);
    if (ok) navigate(from, { replace: true });
  };

  return (
    <div className="auth-page page-padding animate-fade-up" style={{ position: 'relative' }}>
      <button onClick={() => navigate('/')} className="btn"
        style={{ position: 'absolute', top: '20px', left: '20px', background: 'transparent', color: 'var(--text-main)', display: 'flex', gap: '8px', padding: 0 }}>
        <ArrowLeft size={18} /> Go Back to Home
      </button>
      <div className="auth-container">
        <h2>Join <em>LUMIÈRE</em></h2>
        <p>Create an account for exclusive access to signature scents.</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group"><label>Full Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required disabled={loading} />
          </div>
          <div className="form-group"><label>Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required disabled={loading} />
          </div>
          <div className="form-group"><label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required disabled={loading} minLength={6} />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>
        <p className="auth-switch">Already have an account? <Link to="/login" state={{ from }}>Sign In</Link></p>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// PROFILE — 2 Tabs
// ══════════════════════════════════════════════════════════════
export const Profile = () => {
  const { user, logout, updateProfile } = useAuth();
  const [activeTab, setActiveTab]   = useState('orders');
  const [name, setName]             = useState(user?.name || '');
  const [phone, setPhone]           = useState(user?.phone || '');
  const [address, setAddress]       = useState(user?.address || '');
  const [orders, setOrders]         = useState([]);
  const [ordersLoaded, setOL]       = useState(false);
  const [ordersLoading, setOLoad]   = useState(false);
  const [trackingOrder, setTO]      = useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (activeTab !== 'orders' || ordersLoaded) return;
    setOLoad(true);
    const token = localStorage.getItem('auth_token');
    fetch(`${API}/user/orders`, {
      headers: { Accept: 'application/json', Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(d => { setOrders(Array.isArray(d) ? d : []); setOL(true); setOLoad(false); })
      .catch(() => { setOL(true); setOLoad(false); });
  }, [activeTab, ordersLoaded]);

  if (!user) return <Navigate to="/" replace />;

  const handleUpdate = (e) => {
    e.preventDefault();
    updateProfile({ name, phone, address });
  };

  return (
    <div className="profile-page page-padding animate-fade-up">
      <div className="container" style={{ maxWidth: '860px', margin: '0 auto' }}>

        <div className="profile-hero">
          <div className="profile-avatar">{user.name?.charAt(0).toUpperCase()}</div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', margin: '0 0 4px' }}>{user.name}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>{user.email}</p>
          </div>
        </div>

        <div className="profile-tabs">
          <button className={`profile-tab ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
            <ShoppingBag size={16} /> My Orders
          </button>
          <button className={`profile-tab ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
            <User size={16} /> Settings
          </button>
        </div>

        {/* MY ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="profile-tab-content animate-fade-up">
            <div className="orders-tab-header">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', margin: 0 }}>Order <em>History</em></h3>
              <Link to="/track-order" className="btn btn-outline" style={{ fontSize: '12px', padding: '8px 18px' }}>
                Track by Order ID
              </Link>
            </div>

            {ordersLoading && <p style={{ color: 'var(--text-muted)', padding: '40px 0', textAlign: 'center' }}>Loading orders...</p>}

            {!ordersLoading && orders.length === 0 && (
              <div className="orders-empty">
                <Package size={48} style={{ opacity: 0.2, marginBottom: '16px' }} />
                <p>No orders placed yet.</p>
                <Link to="/store" className="btn btn-primary" style={{ marginTop: '16px' }}>Browse Collection</Link>
              </div>
            )}

            {!ordersLoading && orders.length > 0 && (
              <div className="orders-list">
                {orders.map(o => {
                  const badge = statusStyle(o.status);
                  return (
                    <div key={o.id} className="order-card">
                      <div className="order-card-header">
                        <div>
                          <strong style={{ fontFamily: 'var(--font-display)', fontSize: '20px' }}>ORD-{o.id}</strong>
                          <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--text-muted)' }}>
                            {new Date(o.created_at).toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </p>
                        </div>
                        <span className="order-status-badge" style={{ background: badge.bg }}>{badge.label}</span>
                      </div>

                      {Array.isArray(o.items) && o.items.length > 0 && (
                        <div className="order-items-list">
                          {o.items.map((item, idx) => (
                            <div key={idx} className="order-item-row">
                              <img src={item.image || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=60&h=60&fit=crop'}
                                alt={item.name} className="order-item-img" />
                              <div style={{ flex: 1 }}>
                                <p style={{ margin: 0, fontSize: '14px', fontWeight: 500 }}>{item.name}</p>
                                <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'var(--text-muted)' }}>
                                  Qty: {item.quantity} &times; Rs. {Number(item.price).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="order-card-footer">
                        <div>
                          <small style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>Total Paid</small>
                          <strong style={{ color: 'var(--accent-color)', fontSize: '20px' }}>
                            Rs. {Number(o.total_price).toLocaleString()}
                          </strong>
                        </div>
                        <button className="btn btn-outline" style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
                          onClick={() => setTO(o)}>
                          <Truck size={14} /> Track Order
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="profile-tab-content animate-fade-up">
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', marginBottom: '28px' }}>Account <em>Settings</em></h3>
            <form onSubmit={handleUpdate} className="auth-form" style={{ maxWidth: '480px' }}>
              <div className="form-group"><label>Full Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div className="form-group"><label>Email</label>
                <input type="email" value={user.email} disabled />
              </div>
              <div className="form-group"><label>Phone Number (Optional)</label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="03XXXXXXXXX" />
              </div>
              <div className="form-group"><label>Home Address (Optional)</label>
                <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Your delivery address..." />
              </div>
              <button type="submit" className="btn btn-outline w-100 mb-3">Save Changes</button>
              <button type="button" className="btn btn-primary w-100" onClick={() => { logout(); navigate('/'); }}>Log Out</button>
            </form>
          </div>
        )}
      </div>

      {trackingOrder && <TrackModal order={trackingOrder} onClose={() => setTO(null)} />}
    </div>
  );
};
