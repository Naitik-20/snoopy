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
  const [showEmailForm, setShowEmailForm] = useState(false);

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
      setShowEmailForm(false);
      setLoginData({ email: '', password: '' });
      setRegData({ name: '', email: '', password: '', confirmPass: '', role: 'user' });
    }
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleTabChange = (newTab) => {
    setTab(newTab);
    setError('');
    setShowEmailForm(false);
  };

  // ── SOCIAL AUTH HANDLERS ──────────────────────────────────
  const handleGoogleAuth = () => {
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess({
        name: 'Google User',
        email: 'google.user@gmail.com',
        avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=google',
        role: 'user'
      });
      setSuccess('Logged in with Google! Welcome back 🐾');
      setTimeout(onClose, 1200);
    }, 1000);
  };

  const handleFacebookAuth = () => {
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess({
        name: 'Facebook User',
        email: 'facebook.user@outlook.com',
        avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=facebook',
        role: 'user'
      });
      setSuccess('Logged in with Facebook! Welcome back 🐾');
      setTimeout(onClose, 1200);
    }, 1000);
  };

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
            <button className={`auth-tab ${tab === 'login' ? 'active' : ''}`} onClick={() => handleTabChange('login')}>
              Login
            </button>
            <button className={`auth-tab ${tab === 'register' ? 'active' : ''}`} onClick={() => handleTabChange('register')}>
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

          {/* Social Authentication Block */}
          <div className="auth-social-btns">
            <button 
              type="button" 
              className="auth-social-btn google" 
              onClick={handleGoogleAuth}
              disabled={loading}
            >
              <svg className="auth-social-icon" viewBox="0 0 24 24" width="20" height="20">
                <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.68 1.54 14.98 1 12 1 7.35 1 3.37 3.67 1.39 7.56l3.85 2.99c.9-2.7 3.4-4.51 6.76-4.51z"/>
                <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.44h6.44c-.28 1.48-1.12 2.73-2.37 3.58v2.98h3.84c2.24-2.06 3.58-5.1 3.58-8.66z"/>
                <path fill="#FBBC05" d="M5.24 10.55c-.23-.69-.36-1.42-.36-2.18s.13-1.49.36-2.18L1.39 5.2A11.957 11.957 0 000 12c0 2.56.8 4.93 2.18 6.9l3.85-2.99c-.47-.83-.79-1.84-.79-3.36z"/>
                <path fill="#34A853" d="M12 23c3.24 0 5.97-1.08 7.96-2.91l-3.84-2.98c-1.14.77-2.6 1.22-4.12 1.22-3.36 0-5.86-1.81-6.76-4.51L1.39 16.8C3.37 20.33 7.35 23 12 23z"/>
              </svg>
              <span>{tab === 'login' ? 'Sign in with Google' : 'Sign up with Google'}</span>
            </button>
            
            <button 
              type="button" 
              className="auth-social-btn facebook" 
              onClick={handleFacebookAuth}
              disabled={loading}
            >
              <svg className="auth-social-icon" viewBox="0 0 24 24" width="20" height="20" fill="white">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>{tab === 'login' ? 'Sign in with Facebook' : 'Sign up with Facebook'}</span>
            </button>
          </div>

          <div className="auth-separator">or</div>

          {/* Toggle form visibility button or form itself */}
          {!showEmailForm ? (
            <button 
              type="button" 
              className="auth-email-toggle-btn"
              onClick={() => setShowEmailForm(true)}
            >
              {tab === 'login' ? 'Sign in with email' : 'Sign up with email'}
            </button>
          ) : (
            <>
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
                    <button type="button" className="auth-switch-link" onClick={() => handleTabChange('register')}>
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
                    <button type="button" className="auth-switch-link" onClick={() => handleTabChange('login')}>
                      Login
                    </button>
                  </p>
                </form>
              )}
            </>
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

        /* Social Authentication Buttons */
        .auth-social-btns {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
          width: 100%;
        }

        .auth-social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          width: 100%;
          padding: 12px;
          font-size: 15px;
          font-weight: 700;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: var(--transition-smooth);
          border: 1.5px solid var(--border-light);
        }

        .auth-social-btn.google {
          background: #ffffff;
          color: #2d3748;
          border-color: #ebd3bd;
        }

        .auth-social-btn.google:hover:not(:disabled) {
          background: #fdfaf7;
          border-color: #f7931e;
          transform: translateY(-1px);
        }

        .auth-social-btn.facebook {
          background: #1877f2;
          color: #ffffff;
          border-color: #1877f2;
        }

        .auth-social-btn.facebook:hover:not(:disabled) {
          background: #166fe5;
          border-color: #166fe5;
          transform: translateY(-1px);
        }

        .auth-social-icon {
          flex-shrink: 0;
        }

        /* Or Separator */
        .auth-separator {
          display: flex;
          align-items: center;
          text-align: center;
          color: var(--text-light);
          font-size: 14px;
          margin: 20px 0;
          font-weight: 600;
        }

        .auth-separator::before,
        .auth-separator::after {
          content: '';
          flex: 1;
          border-bottom: 1.5px solid #ebd3bd;
        }

        .auth-separator:not(:empty)::before {
          margin-right: 12px;
        }

        .auth-separator:not(:empty)::after {
          margin-left: 12px;
        }

        /* Toggle Email Form Button */
        .auth-email-toggle-btn {
          width: 100%;
          padding: 12px;
          background: #ffffff;
          color: var(--primary-color);
          border: 1.5px solid var(--primary-color);
          border-radius: var(--radius-sm);
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: var(--transition-smooth);
          text-align: center;
        }

        .auth-email-toggle-btn:hover:not(:disabled) {
          background: #fff8f0;
          border-color: var(--primary-hover);
          color: var(--primary-hover);
          transform: translateY(-1.5px);
          box-shadow: 0 4px 12px rgba(247, 147, 30, 0.08);
        }

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
