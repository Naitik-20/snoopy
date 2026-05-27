import { useState, useEffect } from 'react';
import { X, Eye, EyeOff, User, Mail, Lock, ArrowRight, Check } from 'lucide-react';

// ==========================================================
// AUTH MODAL — Login + Register
// Props:
//   isOpen       → true/false
//   onClose      → function to close modal
//   onLoginSuccess → (userObject) => App ka user state set karo
//   backendUrl   → backend API base URL
// ==========================================================

export default function AuthModal({ isOpen, onClose, onLoginSuccess, backendUrl }) {
  const [tab, setTab] = useState('login');          // 'login' or 'register'
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Login form state
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  // Register form state
  const [regData, setRegData] = useState({
    name: '', email: '', password: '', confirmPass: '', role: 'user',
  });

  // Reset on open/close
  useEffect(() => {
    if (!isOpen) {
      setError(''); setSuccess(''); setLoading(false);
      setLoginData({ email: '', password: '' });
      setRegData({ name: '', email: '', password: '', confirmPass: '', role: 'user' });
    }
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!isOpen) return null;

  // ── LOGIN SUBMIT ──────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      if (data.status === 'success' || data.token) {
        onLoginSuccess(data.user || data.data);
        setSuccess('Logged in successfully! Welcome back 🐾');
        setTimeout(onClose, 1200);
      } else {
        setError(data.message || 'Invalid email or password.');
      }
    } catch {
      // Backend nahi hai → demo login
      onLoginSuccess({ name: loginData.email.split('@')[0], email: loginData.email, role: 'user' });
      setSuccess('Logged in! (Demo mode)');
      setTimeout(onClose, 1200);
    } finally {
      setLoading(false);
    }
  };

  // ── REGISTER SUBMIT ───────────────────────────────────────
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (regData.password !== regData.confirmPass) {
      return setError('Passwords do not match!');
    }
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: regData.name,
          email: regData.email,
          password: regData.password,
          role: regData.role,
        }),
      });
      const data = await res.json();
      if (data.status === 'success' || data.token) {
        onLoginSuccess(data.user || data.data);
        setSuccess('Account created! Welcome to Dr. Snoopy 🎉');
        setTimeout(onClose, 1400);
      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch {
      // Demo mode
      onLoginSuccess({ name: regData.name, email: regData.email, role: regData.role });
      setSuccess('Registered! (Demo mode)');
      setTimeout(onClose, 1200);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="auth-backdrop" onClick={onClose} />

      {/* Modal */}
      <div className="auth-modal" role="dialog" aria-label="Login or Register">

        {/* Close */}
        <button className="auth-close-btn" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        {/* Left Branding Panel */}
        <div className="auth-brand-panel">
          <div className="auth-brand-logo">🐾</div>
          <h2 className="auth-brand-title">Dr. Snoopy</h2>
          <p className="auth-brand-tagline">India's trusted pet store</p>
          <ul className="auth-brand-points">
            {['1,50,000+ happy pet parents', 'Free delivery on ₹499+', 'Vet-approved products', '24/7 expert support'].map(p => (
              <li key={p}><Check size={14} /> {p}</li>
            ))}
          </ul>
        </div>

        {/* Right Form Panel */}
        <div className="auth-form-panel">
          {/* Tabs */}
          <div className="auth-tabs">
            <button className={`auth-tab ${tab === 'login' ? 'active' : ''}`} onClick={() => { setTab('login'); setError(''); }}>
              Login
            </button>
            <button className={`auth-tab ${tab === 'register' ? 'active' : ''}`} onClick={() => { setTab('register'); setError(''); }}>
              Register
            </button>
          </div>

          <h3 className="auth-form-title">
            {tab === 'login' ? 'Welcome back! 👋' : 'Create an Account 🚀'}
          </h3>
          <p className="auth-form-sub">
            {tab === 'login' ? 'Sign in to your Dr. Snoopy account' : 'Join 1,50,000+ pet parents today'}
          </p>

          {/* Error / Success */}
          {error && <div className="auth-alert auth-error">{error}</div>}
          {success && <div className="auth-alert auth-success">{success}</div>}

          {/* ── LOGIN FORM ── */}
          {tab === 'login' && (
            <form className="auth-form" onSubmit={handleLogin}>
              <div className="auth-field">
                <label className="auth-label">Email Address</label>
                <div className="auth-input-wrap">
                  <Mail size={16} className="auth-input-icon" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    className="auth-input"
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div className="auth-field">
                <label className="auth-label">Password</label>
                <div className="auth-input-wrap">
                  <Lock size={16} className="auth-input-icon" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Your password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="auth-input"
                    required
                  />
                  <button type="button" className="auth-pass-toggle" onClick={() => setShowPass(!showPass)}>
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? <span className="auth-spinner" /> : <><ArrowRight size={16} /> Login</>}
              </button>

              <p className="auth-switch-text">
                Don't have an account?{' '}
                <button type="button" className="auth-switch-link" onClick={() => setTab('register')}>
                  Create one
                </button>
              </p>
            </form>
          )}

          {/* ── REGISTER FORM ── */}
          {tab === 'register' && (
            <form className="auth-form" onSubmit={handleRegister}>
              <div className="auth-field">
                <label className="auth-label">Full Name</label>
                <div className="auth-input-wrap">
                  <User size={16} className="auth-input-icon" />
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={regData.name}
                    onChange={(e) => setRegData({ ...regData, name: e.target.value })}
                    className="auth-input"
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div className="auth-field">
                <label className="auth-label">Email Address</label>
                <div className="auth-input-wrap">
                  <Mail size={16} className="auth-input-icon" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={regData.email}
                    onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                    className="auth-input"
                    required
                  />
                </div>
              </div>

              <div className="auth-field">
                <label className="auth-label">Password</label>
                <div className="auth-input-wrap">
                  <Lock size={16} className="auth-input-icon" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={regData.password}
                    onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                    className="auth-input"
                    required
                    minLength={6}
                  />
                  <button type="button" className="auth-pass-toggle" onClick={() => setShowPass(!showPass)}>
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div className="auth-field">
                <label className="auth-label">Confirm Password</label>
                <div className="auth-input-wrap">
                  <Lock size={16} className="auth-input-icon" />
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    value={regData.confirmPass}
                    onChange={(e) => setRegData({ ...regData, confirmPass: e.target.value })}
                    className="auth-input"
                    required
                  />
                </div>
              </div>

              <div className="auth-field">
                <label className="auth-label">Account Type</label>
                <select
                  value={regData.role}
                  onChange={(e) => setRegData({ ...regData, role: e.target.value })}
                  className="auth-select"
                >
                  <option value="user">Customer (Normal User)</option>
                  <option value="wholeseller">Wholeseller</option>
                </select>
                <p className="auth-hint">Admin accounts are created by the system only.</p>
              </div>

              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? <span className="auth-spinner" /> : <><ArrowRight size={16} /> Create Account</>}
              </button>

              <p className="auth-switch-text">
                Already have an account?{' '}
                <button type="button" className="auth-switch-link" onClick={() => setTab('login')}>
                  Login
                </button>
              </p>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .auth-backdrop {
          position: fixed; inset: 0; background: rgba(0,0,0,0.6);
          z-index: 3000; backdrop-filter: blur(4px); animation: fadeIn 0.2s ease;
        }

        .auth-modal {
          position: fixed; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          z-index: 3001; background: white;
          border-radius: var(--radius-lg);
          width: min(820px, 95vw);
          max-height: 92vh; overflow: hidden;
          display: flex; box-shadow: 0 30px 80px rgba(0,0,0,0.3);
          animation: scaleIn 0.25s ease;
        }

        .auth-close-btn {
          position: absolute; top: 14px; right: 14px; z-index: 1;
          background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3);
          width: 34px; height: 34px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: white; transition: var(--transition-smooth);
        }

        .auth-close-btn:hover { background: rgba(255,255,255,0.3); }

        /* Brand Panel */
        .auth-brand-panel {
          width: 280px; flex-shrink: 0;
          background: linear-gradient(150deg, var(--primary-color), #1a7ad4);
          padding: 48px 32px; display: flex; flex-direction: column;
          align-items: flex-start; gap: 12px;
        }

        .auth-brand-logo { font-size: 52px; }
        .auth-brand-title { font-size: 28px; font-weight: 900; color: white; font-family: var(--font-headers); margin: 0; }
        .auth-brand-tagline { font-size: 14px; color: rgba(255,255,255,0.7); margin: 0 0 16px; }

        .auth-brand-points { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .auth-brand-points li { display: flex; align-items: center; gap: 10px; font-size: 14px; color: rgba(255,255,255,0.85); font-weight: 500; }
        .auth-brand-points li svg { color: #fcd34d; flex-shrink: 0; }

        /* Form Panel */
        .auth-form-panel {
          flex: 1; padding: 40px 36px; overflow-y: auto;
        }

        .auth-tabs { display: flex; background: var(--bg-main); border-radius: var(--radius-sm); padding: 4px; margin-bottom: 28px; width: 100%; }

        .auth-tab {
          flex: 1; padding: 10px; background: none; border: none;
          font-size: 14px; font-weight: 700; color: var(--text-medium);
          cursor: pointer; border-radius: calc(var(--radius-sm) - 2px);
          transition: var(--transition-smooth);
        }

        .auth-tab.active { background: white; color: var(--primary-color); box-shadow: var(--shadow-sm); }

        .auth-form-title { font-size: 22px; font-weight: 900; color: var(--text-dark); font-family: var(--font-headers); margin: 0 0 6px; }
        .auth-form-sub { font-size: 14px; color: var(--text-medium); margin: 0 0 24px; }

        .auth-alert { padding: 12px 16px; border-radius: var(--radius-sm); font-size: 13px; font-weight: 600; margin-bottom: 16px; }
        .auth-error { background: #fee2e2; color: #dc2626; border: 1px solid #fca5a5; }
        .auth-success { background: #dcfce7; color: #16a34a; border: 1px solid #86efac; }

        .auth-form { display: flex; flex-direction: column; gap: 18px; }

        .auth-field { display: flex; flex-direction: column; gap: 6px; }
        .auth-label { font-size: 13px; font-weight: 700; color: var(--text-dark); }

        .auth-input-wrap {
          position: relative; display: flex; align-items: center;
          background: var(--bg-main); border: 1.5px solid var(--border-light);
          border-radius: var(--radius-sm); transition: var(--transition-smooth);
        }

        .auth-input-wrap:focus-within { border-color: var(--primary-color); background: white; box-shadow: 0 0 0 3px rgba(10,88,164,0.1); }

        .auth-input-icon { color: var(--text-light); margin-left: 14px; flex-shrink: 0; }

        .auth-input {
          flex: 1; border: none; background: transparent;
          padding: 12px 14px; font-size: 14px; color: var(--text-dark); outline: none;
        }

        .auth-input::placeholder { color: var(--text-light); }

        .auth-pass-toggle {
          background: none; border: none; cursor: pointer;
          color: var(--text-light); padding: 12px 14px;
          display: flex; align-items: center; transition: var(--transition-smooth);
        }

        .auth-pass-toggle:hover { color: var(--primary-color); }

        .auth-select {
          width: 100%; padding: 12px 14px;
          background: var(--bg-main); border: 1.5px solid var(--border-light);
          border-radius: var(--radius-sm); font-size: 14px; color: var(--text-dark);
          outline: none; cursor: pointer; transition: var(--transition-smooth);
        }

        .auth-select:focus { border-color: var(--primary-color); background: white; }

        .auth-hint { font-size: 11px; color: var(--text-light); margin: 4px 0 0; }

        .auth-submit-btn {
          width: 100%; padding: 13px; background: var(--primary-color); color: white;
          border: none; border-radius: var(--radius-sm); font-size: 15px; font-weight: 800;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: var(--transition-smooth); margin-top: 4px;
          box-shadow: 0 4px 14px rgba(10,88,164,0.3);
        }

        .auth-submit-btn:hover:not(:disabled) { background: var(--primary-hover); transform: translateY(-2px); }
        .auth-submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }

        .auth-spinner {
          width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white; border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .auth-switch-text { text-align: center; font-size: 13px; color: var(--text-medium); margin: 0; }

        .auth-switch-link {
          background: none; border: none; color: var(--primary-color);
          font-weight: 700; cursor: pointer; font-size: 13px;
          transition: var(--transition-smooth);
        }

        .auth-switch-link:hover { text-decoration: underline; }

        @media (max-width: 600px) {
          .auth-modal { flex-direction: column; }
          .auth-brand-panel { width: 100%; padding: 28px 24px; flex-direction: row; align-items: center; flex-wrap: wrap; gap: 8px; }
          .auth-brand-logo { font-size: 36px; }
          .auth-brand-title { font-size: 22px; }
          .auth-brand-points { display: none; }
          .auth-form-panel { padding: 24px 20px; }
        }
      `}</style>
    </>
  );
}
