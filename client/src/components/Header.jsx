import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  Phone,
} from 'lucide-react';

export default function Header({
  searchTerm,
  setSearchTerm,
  cartCount,
  onCartClick,
  onLoginClick,
  user,
  onLogout,
  onToggleMobileSidebar,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => setIsMobileMenuOpen(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/shop');
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'Services', path: '/services' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* ── TOP ANNOUNCEMENT BAR ── */}
      <div className="header-announcement">
        <Phone size={13} />
        <span>Free delivery on orders above ₹499 &nbsp;|&nbsp; Call us: +91 98765 43210</span>
      </div>

      {/* ── MAIN HEADER ── */}
      <header className={`site-header ${isScrolled ? 'header-scrolled' : ''}`}>
        <div className="header-inner container">

          {/* LEFT: New Paw + Text Logo */}
          <Link to="/" className="header-logo" onClick={handleNavClick}>
            <div className="logo-badge">
              <svg width="42" height="42" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="50" fill="#0a58a4"/>
                {/* Paw pad */}
                <ellipse cx="50" cy="62" rx="18" ry="15" fill="white" opacity="0.95"/>
                {/* Top toe pads */}
                <ellipse cx="30" cy="44" rx="9" ry="10" fill="white" opacity="0.95"/>
                <ellipse cx="42" cy="36" rx="8" ry="9" fill="white" opacity="0.95"/>
                <ellipse cx="58" cy="36" rx="8" ry="9" fill="white" opacity="0.95"/>
                <ellipse cx="70" cy="44" rx="9" ry="10" fill="white" opacity="0.95"/>
              </svg>
            </div>
            <div className="logo-text-block">
              <span className="logo-name">Dr. Snoopy</span>
              <span className="logo-sub">Pet Store</span>
            </div>
          </Link>

          {/* CENTER: Search Bar */}
          <form
            className={`header-search ${isSearchFocused ? 'search-focused' : ''}`}
            onSubmit={handleSearchSubmit}
          >
            <Search size={17} className="search-icon-left" />
            <input
              type="text"
              placeholder="Search pet food, medicines, toys..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="header-search-input"
            />
            {searchTerm && (
              <button type="button" className="search-clear-btn" onClick={() => setSearchTerm('')}>
                <X size={14} />
              </button>
            )}
            <button type="submit" className="search-submit-btn">Search</button>
          </form>

          {/* RIGHT: Cart + Login — BIGGER & PROMINENT */}
          <div className="header-actions">

            {/* Cart Button — Big pill style */}
            <button className="header-cart-pill" onClick={onCartClick} id="cart-btn">
              <div className="cart-pill-icon">
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount > 99 ? '99+' : cartCount}</span>
                )}
              </div>
              <div className="cart-pill-text">
                <span className="cart-pill-label">My Cart</span>
                <span className="cart-pill-sub">{cartCount > 0 ? `${cartCount} item${cartCount > 1 ? 's' : ''}` : 'Empty'}</span>
              </div>
            </button>

            {/* Login / User Button — Big */}
            {user ? (
              <div className="user-dropdown-wrapper">
                <button className="header-user-pill" onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}>
                  <div className="user-avatar-big">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="user-pill-text">
                    <span className="user-pill-label">Hello, {user.name?.split(' ')[0]}</span>
                    <span className="user-pill-sub">My Account</span>
                  </div>
                  <ChevronDown size={15} />
                </button>
                {isUserDropdownOpen && (
                  <div className="user-dropdown">
                    <div className="user-dropdown-header">
                      <p className="dropdown-user-name">{user.name}</p>
                      <p className="dropdown-user-email">{user.email}</p>
                    </div>
                    <hr className="dropdown-divider" />
                    <Link to="/profile" className="dropdown-item" onClick={() => setIsUserDropdownOpen(false)}>
                      <User size={14} /> My Profile
                    </Link>
                    <button className="dropdown-item dropdown-logout"
                      onClick={() => { onLogout(); setIsUserDropdownOpen(false); }}>
                      <LogOut size={14} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="header-login-pill" onClick={onLoginClick} id="login-btn">
                <User size={22} />
                <div className="user-pill-text">
                  <span className="user-pill-label">Login</span>
                  <span className="user-pill-sub">My Account</span>
                </div>
              </button>
            )}

            {/* Mobile Hamburger */}
            <button className="header-hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* ── BOTTOM NAV BAR ── */}
        <nav className="header-nav">
          <div className="header-nav-inner container">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className="nav-link" onClick={handleNavClick}>
                {link.label}
              </Link>
            ))}
            <div className="nav-dropdown-wrapper">
              <button className="nav-link nav-dropdown-trigger">
                Categories <ChevronDown size={14} />
              </button>
              <div className="nav-dropdown-menu">
                <div className="dropdown-grid">
                  {[
                    { icon: '💊', label: 'Pharmacy', path: '/category/Pharmacy' },
                    { icon: '🍖', label: 'Food', path: '/category/Food' },
                    { icon: '🦴', label: 'Snacks & Treats', path: '/category/Snacks & Treats' },
                    { icon: '✂️', label: 'Grooming', path: '/category/Grooming Essentials' },
                    { icon: '🎀', label: 'Accessories', path: '/category/Accessories' },
                    { icon: '🎾', label: 'Toys', path: '/category/Toys' },
                  ].map((cat) => (
                    <Link key={cat.label} to={cat.path} className="dropdown-cat-item" onClick={handleNavClick}>
                      <span className="dropdown-cat-icon">{cat.icon}</span>
                      <span>{cat.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* ── MOBILE MENU ── */}
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <form className="mobile-search-form" onSubmit={handleSearchSubmit}>
              <Search size={16} />
              <input type="text" placeholder="Search products..." value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} className="mobile-search-input" autoFocus />
            </form>
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className="mobile-nav-link" onClick={handleNavClick}>
                {link.label}
              </Link>
            ))}
            {!user && (
              <button className="mobile-login-btn" onClick={() => { onLoginClick(); handleNavClick(); }}>
                Login / Register
              </button>
            )}
          </div>
        )}
      </header>

      <style>{`
        .header-announcement {
          background: var(--primary-color);
          color: white;
          text-align: center;
          font-size: 13px;
          font-weight: 500;
          padding: 7px 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
        }

        .site-header {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: white;
          border-bottom: 1px solid var(--border-light);
          transition: box-shadow 0.3s ease;
        }

        .header-scrolled {
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        .header-inner {
          display: flex;
          align-items: center;
          gap: 20px;
          padding-top: 12px;
          padding-bottom: 12px;
        }

        /* ── NEW LOGO ── */
        .header-logo {
          display: flex;
          align-items: center;
          gap: 11px;
          text-decoration: none;
          flex-shrink: 0;
        }

        .logo-badge {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 4px 14px rgba(10,88,164,0.3);
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }

        .header-logo:hover .logo-badge {
          transform: rotate(-5deg) scale(1.05);
        }

        .logo-badge svg {
          width: 100%;
          height: 100%;
        }

        .logo-text-block {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }

        .logo-name {
          font-size: 20px;
          font-weight: 850;
          color: var(--primary-color);
          font-family: var(--font-headers);
          letter-spacing: -0.3px;
        }

        .logo-sub {
          font-size: 11px;
          font-weight: 600;
          color: var(--secondary-color);
          letter-spacing: 0.8px;
          text-transform: uppercase;
        }

        /* ── SEARCH ── */
        .header-search {
          flex: 1;
          display: flex;
          align-items: center;
          background: var(--bg-main);
          border: 1.5px solid var(--border-light);
          border-radius: 10px;
          padding: 0 6px 0 14px;
          height: 46px;
          gap: 8px;
          transition: var(--transition-smooth);
          max-width: 550px;
        }

        .header-search.search-focused {
          border-color: var(--primary-color);
          background: white;
          box-shadow: 0 0 0 3px rgba(10,88,164,0.1);
        }

        .search-icon-left { color: var(--text-light); flex-shrink: 0; }

        .header-search-input {
          flex: 1; border: none; background: transparent;
          outline: none; font-size: 14px; color: var(--text-dark);
        }

        .header-search-input::placeholder { color: var(--text-light); }

        .search-clear-btn {
          background: none; border: none; color: var(--text-light);
          cursor: pointer; padding: 4px; display: flex; align-items: center;
          border-radius: 50%; transition: var(--transition-smooth);
        }

        .search-clear-btn:hover { background: var(--border-light); color: var(--text-medium); }

        .search-submit-btn {
          background: var(--secondary-color); color: white; border: none;
          padding: 9px 20px; border-radius: 8px; font-size: 13px;
          font-weight: 700; cursor: pointer; transition: var(--transition-smooth);
          white-space: nowrap; height: 36px;
        }

        .search-submit-btn:hover { background: var(--secondary-hover); }

        /* ── ACTIONS: BIG CART + LOGIN ── */
        .header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
          margin-left: auto;
        }

        /* Cart pill — big prominent button */
        .header-cart-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--secondary-color);
          border: none;
          border-radius: 12px;
          padding: 10px 18px;
          cursor: pointer;
          transition: var(--transition-smooth);
          position: relative;
          color: white;
          box-shadow: 0 4px 14px rgba(247,147,30,0.35);
        }

        .header-cart-pill:hover {
          background: var(--secondary-hover);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(247,147,30,0.45);
        }

        .cart-pill-icon {
          position: relative;
          display: flex;
          align-items: center;
        }

        .cart-badge {
          position: absolute;
          top: -10px;
          right: -10px;
          background: white;
          color: var(--secondary-color);
          font-size: 10px;
          font-weight: 800;
          min-width: 18px;
          height: 18px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 4px;
        }

        .cart-pill-text {
          display: flex;
          flex-direction: column;
          line-height: 1.15;
          text-align: left;
        }

        .cart-pill-label {
          font-size: 14px;
          font-weight: 800;
          color: white;
        }

        .cart-pill-sub {
          font-size: 11px;
          color: rgba(255,255,255,0.8);
          font-weight: 500;
        }

        /* Login pill */
        .header-login-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--primary-color);
          border: none;
          border-radius: 12px;
          padding: 10px 18px;
          cursor: pointer;
          transition: var(--transition-smooth);
          color: white;
          box-shadow: 0 4px 14px rgba(10,88,164,0.3);
        }

        .header-login-pill:hover {
          background: var(--primary-hover);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(10,88,164,0.4);
        }

        /* User logged in pill */
        .header-user-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--primary-color);
          border: none;
          border-radius: 12px;
          padding: 8px 14px;
          cursor: pointer;
          transition: var(--transition-smooth);
          color: white;
        }

        .header-user-pill:hover { background: var(--primary-hover); }

        .user-avatar-big {
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(255,255,255,0.25); color: white;
          font-size: 16px; font-weight: 800;
          display: flex; align-items: center; justify-content: center;
          border: 2px solid rgba(255,255,255,0.4);
        }

        .user-pill-text { display: flex; flex-direction: column; line-height: 1.2; text-align: left; }

        .user-pill-label { font-size: 13px; font-weight: 700; color: white; }
        .user-pill-sub { font-size: 11px; color: rgba(255,255,255,0.75); font-weight: 500; }

        /* User Dropdown */
        .user-dropdown-wrapper { position: relative; }

        .user-dropdown {
          position: absolute; top: calc(100% + 10px); right: 0;
          background: white; border: 1px solid var(--border-light);
          border-radius: var(--radius-md); box-shadow: var(--shadow-premium);
          min-width: 210px; animation: scaleIn 0.15s ease; z-index: 999;
        }

        .user-dropdown-header { padding: 14px 16px; }
        .dropdown-user-name { font-size: 14px; font-weight: 700; color: var(--text-dark); }
        .dropdown-user-email { font-size: 12px; color: var(--text-light); margin-top: 2px; }
        .dropdown-divider { border: none; border-top: 1px solid var(--border-light); margin: 0; }

        .dropdown-item {
          display: flex; align-items: center; gap: 10px; width: 100%;
          padding: 11px 16px; font-size: 14px; font-weight: 500;
          color: var(--text-dark); text-decoration: none; background: none;
          border: none; cursor: pointer; transition: var(--transition-smooth); text-align: left;
        }

        .dropdown-item:hover { background: var(--bg-main); color: var(--primary-color); }
        .dropdown-logout { color: #ef4444; }
        .dropdown-logout:hover { background: #fef2f2; color: #dc2626; }

        /* Nav bar */
        .header-nav { border-top: 1px solid var(--border-light); background: white; }

        .header-nav-inner {
          display: flex; align-items: center; gap: 4px; height: 44px;
        }

        .nav-link {
          padding: 8px 14px; font-size: 14px; font-weight: 600;
          color: var(--text-medium); text-decoration: none;
          border-radius: var(--radius-sm); transition: var(--transition-smooth);
          white-space: nowrap; background: none; border: none; cursor: pointer;
          display: flex; align-items: center; gap: 5px;
        }

        .nav-link:hover { color: var(--primary-color); background: rgba(10,88,164,0.06); }

        .nav-dropdown-wrapper { position: relative; }

        .nav-dropdown-menu {
          display: none; position: absolute; top: calc(100% + 8px); left: 0;
          background: white; border: 1px solid var(--border-light);
          border-radius: var(--radius-md); box-shadow: var(--shadow-premium);
          padding: 12px; z-index: 999; min-width: 320px;
        }

        .nav-dropdown-wrapper:hover .nav-dropdown-menu {
          display: block; animation: fadeIn 0.2s ease;
        }

        .dropdown-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }

        .dropdown-cat-item {
          display: flex; align-items: center; gap: 10px; padding: 10px 14px;
          border-radius: var(--radius-sm); font-size: 14px; font-weight: 600;
          color: var(--text-dark); text-decoration: none; transition: var(--transition-smooth);
        }

        .dropdown-cat-item:hover { background: var(--bg-main); color: var(--primary-color); }
        .dropdown-cat-icon { font-size: 18px; }

        .header-hamburger {
          display: none; background: none; border: none; cursor: pointer;
          padding: 8px; color: var(--text-dark); border-radius: var(--radius-sm);
        }

        .mobile-menu {
          display: none; flex-direction: column; background: white;
          border-top: 1px solid var(--border-light); padding: 16px;
          gap: 4px; animation: fadeIn 0.2s ease;
        }

        .mobile-search-form {
          display: flex; align-items: center; gap: 10px;
          background: var(--bg-main); border: 1.5px solid var(--border-light);
          border-radius: var(--radius-sm); padding: 10px 14px; margin-bottom: 12px;
          color: var(--text-light);
        }

        .mobile-search-input {
          flex: 1; border: none; background: transparent; outline: none;
          font-size: 14px; color: var(--text-dark);
        }

        .mobile-nav-link {
          display: block; padding: 13px 14px; font-size: 15px; font-weight: 600;
          color: var(--text-dark); text-decoration: none; border-radius: var(--radius-sm);
          transition: var(--transition-smooth);
        }

        .mobile-nav-link:hover { background: var(--bg-main); color: var(--primary-color); }

        .mobile-login-btn {
          margin-top: 12px; width: 100%; background: var(--primary-color); color: white;
          border: none; padding: 13px; border-radius: var(--radius-sm); font-size: 15px;
          font-weight: 700; cursor: pointer; transition: var(--transition-smooth);
        }

        .mobile-login-btn:hover { background: var(--primary-hover); }

        @media (max-width: 900px) {
          .header-search { max-width: none; }
          .cart-pill-text, .user-pill-text { display: none; }
          .header-cart-pill, .header-login-pill, .header-user-pill { padding: 10px 14px; }
        }

        @media (max-width: 768px) {
          .header-inner { flex-wrap: wrap; }
          .header-search { order: 3; flex: 1 1 100%; }
          .header-nav { display: none; }
          .header-hamburger { display: flex; align-items: center; }
          .mobile-menu { display: flex; }
          .search-submit-btn { display: none; }
          .header-announcement { font-size: 11px; }
          .cart-pill-text, .user-pill-text { display: none; }
        }
      `}</style>
    </>
  );
}
