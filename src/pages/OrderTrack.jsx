import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Truck, Home, AlertCircle } from 'lucide-react';
import './OrderTrack.css';

const API = 'http://127.0.0.1:8000/api';

// Status sequence for the timeline
const STATUS_STEPS = ['pending', 'processing', 'shipped', 'delivered'];

const getStepIndex = (status) => {
  const map = {
    pending:    0,
    processing: 1,
    shipped:    2,
    delivering: 2,
    delivered:  3,
  };
  return map[status?.toLowerCase()] ?? 0;
};

const OrderTrack = () => {
  const location = useLocation();
  const navigate  = useNavigate();
  const state     = location.state;

  const [trackInput, setTrackInput]   = useState(state?.orderId || '');
  const [trackingData, setTrackingData] = useState(
    state?.success
      ? { status: 'pending', order_id: state.orderId, total_price: state.total }
      : null
  );
  const [loading, setLoading]         = useState(false);
  const [notFound, setNotFound]       = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!trackInput.trim()) return;

    setLoading(true);
    setNotFound(false);
    setTrackingData(null);

    try {
      const res = await fetch(`${API}/track/${trackInput.trim()}`);
      if (!res.ok) {
        setNotFound(true);
      } else {
        const data = await res.json();
        setTrackingData(data);
      }
    } catch {
      setNotFound(true);
    }

    setLoading(false);
  };

  const stepIndex = getStepIndex(trackingData?.status);

  const steps = [
    { label: 'Order Placed',  desc: 'We have received your order',  icon: <Package size={20} />, key: 'pending'    },
    { label: 'Processing',    desc: 'Order is being prepared',        icon: <Package size={20} />, key: 'processing' },
    { label: 'Shipped',       desc: 'Out for delivery',               icon: <Truck size={20} />,   key: 'shipped'    },
    { label: 'Delivered',     desc: 'Arrived at destination',         icon: <Home size={20} />,    key: 'delivered'  },
  ];

  return (
    <div className="track-page page-padding">
      <div className="container track-container">

        {/* SUCCESS BANNER after placing order */}
        {state?.success && (
          <div className="success-banner animate-fade-up">
            <CheckCircle size={48} className="success-icon" />
            <h2>Order <em>Confirmed!</em></h2>
            <p>Thank you for your purchase. Your order has been received and is being processed.</p>

            <div className="success-details">
              <div className="detail-box">
                <span>Order ID</span>
                <strong>{state.orderId}</strong>
              </div>
              <div className="detail-box">
                <span>Shipping</span>
                <strong>Rs. {state.shippingCharges}</strong>
              </div>
              <div className="detail-box">
                <span>Total Paid</span>
                <strong>Rs. {state.total?.toLocaleString()}</strong>
              </div>
            </div>
          </div>
        )}

        {/* TRACKING SECTION */}
        <div className="track-section animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="track-header">
            <h2>Track Your <em>Order</em></h2>
            <p>Enter your Order ID (e.g. ORD-12) to see live updates.</p>
          </div>

          <form className="track-form" onSubmit={handleTrack}>
            <input
              type="text"
              placeholder="e.g. ORD-12"
              value={trackInput}
              onChange={e => setTrackInput(e.target.value)}
            />
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Tracking...' : 'Track'}
            </button>
          </form>

          {/* NOT FOUND */}
          {notFound && (
            <div
              className="animate-fade-up"
              style={{
                marginTop: '24px',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                background: 'var(--card-bg)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: '#e74c3c',
              }}
            >
              <AlertCircle size={24} />
              <div>
                <strong>Order Not Found</strong>
                <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: 'var(--text-color)' }}>
                  Please check your Order ID and try again. Format: ORD-12
                </p>
              </div>
            </div>
          )}

          {/* TRACKING RESULT */}
          {trackingData && (
            <div className="animate-fade-up" style={{ marginTop: '32px' }}>

              {/* Order Summary */}
              <div
                style={{
                  padding: '16px 20px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--card-bg)',
                  marginBottom: '24px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '20px',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <small style={{ color: 'var(--text-muted)', display: 'block' }}>Order ID</small>
                  <strong>{trackingData.order_id || trackInput}</strong>
                </div>
                <div>
                  <small style={{ color: 'var(--text-muted)', display: 'block' }}>Status</small>
                  <strong style={{ textTransform: 'capitalize' }}>{trackingData.status}</strong>
                </div>
                {trackingData.total_price && (
                  <div>
                    <small style={{ color: 'var(--text-muted)', display: 'block' }}>Total</small>
                    <strong>Rs. {Number(trackingData.total_price).toLocaleString()}</strong>
                  </div>
                )}
                {trackingData.tracking_number && (
                  <div>
                    <small style={{ color: 'var(--text-muted)', display: 'block' }}>Courier Tracking</small>
                    <strong>{trackingData.tracking_number}</strong>
                  </div>
                )}
              </div>

              {/* Timeline */}
              <div className="tracking-timeline">
                {steps.map((step, idx) => (
                  <React.Fragment key={step.key}>
                    <div className={`timeline-step ${idx <= stepIndex ? 'active' : ''}`}>
                      <div className="step-icon">{step.icon}</div>
                      <div className="step-info">
                        <h4>{step.label}</h4>
                        <p>{step.desc}</p>
                      </div>
                    </div>
                    {idx < steps.length - 1 && (
                      <div className={`timeline-connector ${idx < stepIndex ? 'active' : ''}`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* BACK TO STORE */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button
            className="btn btn-outline"
            onClick={() => navigate('/store')}
          >
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
};

export default OrderTrack;
