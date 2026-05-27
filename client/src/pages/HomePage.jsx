import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, ShoppingCart, Star,
  Stethoscope, Clock, Shield, HeartPulse, Truck,
  Phone, Mail, MapPin, ArrowRight, Sparkles, Tag
} from 'lucide-react';
import '../Home.css';

// ─── DATA ──────────────────────────────────────────────────────────────────

const HERO_SLIDES = [
  {
    id: 1,
    headline: 'Nutritious Meals',
    highlight: 'for Every Paw',
    sub: 'Premium pet food from Royal Canin, Pedigree & more',
    cta: 'Shop Food',
    path: '/category/Food',
    bg: 'linear-gradient(120deg,#0a3a6e 0%,#1268a8 60%,#0f5298 100%)',
    img: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=700&q=80',
    badge: '🍖 Premium Food',
  },
  {
    id: 2,
    headline: 'Grooming & Care',
    highlight: 'Made Easy',
    sub: 'Complete grooming kits, shampoos & spa products',
    cta: 'Shop Grooming',
    path: '/category/Grooming Essentials',
    bg: 'linear-gradient(120deg,#7c3aed 0%,#a855f7 60%,#7c3aed 100%)',
    img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=700&q=80',
    badge: '✂️ Grooming',
  },
  {
    id: 3,
    headline: 'Vet-Approved',
    highlight: 'Pet Pharmacy',
    sub: 'Dewormer, tick & flea, supplements & more',
    cta: 'Shop Pharmacy',
    path: '/category/Pharmacy',
    bg: 'linear-gradient(120deg,#065f46 0%,#059669 60%,#047857 100%)',
    img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=700&q=80',
    badge: '💊 Pharmacy',
  },
];

const CATEGORIES = [
  { icon: '💊', label: 'Pharmacy', path: '/category/Pharmacy', color: '#fff0f0', accent: '#ef4444', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80' },
  { icon: '🍖', label: 'Food', path: '/category/Food', color: '#fff7ed', accent: '#f97316', img: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&q=80' },
  { icon: '🦴', label: 'Snacks & Treats', path: '/category/Snacks & Treats', color: '#fefce8', accent: '#eab308', img: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=400&q=80' },
  { icon: '✂️', label: 'Grooming', path: '/category/Grooming Essentials', color: '#f0f9ff', accent: '#0ea5e9', img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80' },
  { icon: '🎀', label: 'Accessories', path: '/category/Accessories', color: '#fdf4ff', accent: '#a855f7', img: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=400&q=80' },
  { icon: '🎾', label: 'Toys', path: '/category/Toys', color: '#f0fdf4', accent: '#22c55e', img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80' },
];

const TOP_BRANDS = ['Royal Canin','Pedigree','Drools','Pedigree Pro','Whiskas','Meo','Purepet','Himalaya','Jerhigh','Canine Creek'];

const TOP_PRODUCTS = [
  { id: 1, name: 'Royal Canin Medium Adult', brand: 'Royal Canin', mrp: 3200, price: 2850, img: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500&q=80', tag: 'Best Seller', rating: 4.8 },
  { id: 2, name: 'Pedigree Adult Chicken & Rice', brand: 'Pedigree', mrp: 1599, price: 1299, img: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=500&q=80', tag: 'Top Rated', rating: 4.7 },
  { id: 3, name: 'Simparica Trio Tick & Flea', brand: 'Zoetis', mrp: 2745, price: 2600, img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&q=80', tag: 'Vet Pick', rating: 4.9 },
  { id: 4, name: 'Drools Focus Puppy Super Premium', brand: 'Drools', mrp: 1999, price: 1699, img: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=500&q=80', tag: 'New Arrival', rating: 4.6 },
  { id: 5, name: 'Whiskas Adult Ocean Fish', brand: 'Whiskas', mrp: 899, price: 749, img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&q=80', tag: 'Cat Fav', rating: 4.5 },
];

const FEATURED_PRODUCTS = [
  { id: 1, name: 'First Bark Soft Chicken Tenders 70g', brand: 'First Bark', mrp: 199, price: 190, img: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=400&q=80' },
  { id: 2, name: 'Jerhigh Chicken Stick Dog Treats', brand: 'Jerhigh', mrp: 150, price: 130, img: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&q=80' },
  { id: 3, name: 'Venkys Boww Soap 75g', brand: 'Venkys', mrp: 90, price: 80, img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80' },
  { id: 4, name: 'Tik Out Soap 150g', brand: 'Tick Out', mrp: 147, price: 140, img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80' },
  { id: 5, name: 'Proviboost Syrup 200ml', brand: 'Proviboost', mrp: 300, price: 285, img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80' },
  { id: 6, name: 'Vetoquinol Health Up Pro 200ml', brand: 'Vetoquinol', mrp: 280, price: 260, img: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=400&q=80' },
  { id: 7, name: 'Eazypet Puppy Dewormer 20ml', brand: 'Eazypet', mrp: 205, price: 190, img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&q=80' },
  { id: 8, name: 'Tickfree Shampoo Lavender 75g', brand: 'Tickfree', mrp: 110, price: 105, img: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=400&q=80' },
];

const BREEDS = [
  { name: 'Rottweiler', img: 'https://images.unsplash.com/photo-1567752881298-894bb81f9379?w=400&q=80' },
  { name: 'Labrador', img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80' },
  { name: 'German Shepherd', img: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&q=80' },
  { name: 'Husky', img: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=400&q=80' },
  { name: 'Beagle', img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80' },
  { name: 'Shih Tzu', img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&q=80' },
];

const CONSULT_REASONS = [
  { icon: <Stethoscope size={32} />, title: 'Expert Vets', desc: 'BVSC & AH qualified veterinarians with 10+ years experience' },
  { icon: <Clock size={32} />, title: '24/7 Available', desc: 'Round-the-clock online consultation for your pet emergencies' },
  { icon: <Shield size={32} />, title: 'Trusted & Safe', desc: 'Verified prescriptions, safe treatments & zero side-effect products' },
  { icon: <HeartPulse size={32} />, title: 'Pet Health Plans', desc: 'Customized vaccination & wellness schedule for your pet' },
  { icon: <Truck size={32} />, title: 'Home Delivery', desc: 'Medicines & food delivered within 24 hours pan-India' },
  { icon: <Sparkles size={32} />, title: 'Grooming @ Home', desc: 'Professional groomers visit your home at your convenience' },
];

// ─── COMPONENT ─────────────────────────────────────────────────────────────

export default function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [activeBrand, setActiveBrand] = useState('Royal Canin');
  const [activeFilter, setActiveFilter] = useState('All');
  const navigate = useNavigate();
  const heroTimer = useRef(null);

  // Auto-slide hero
  useEffect(() => {
    heroTimer.current = setInterval(() => {
      setHeroIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(heroTimer.current);
  }, []);

  const goHero = (dir) => {
    clearInterval(heroTimer.current);
    setHeroIndex((i) => (i + dir + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const brandFilters = ['All', ...TOP_BRANDS.slice(0, 6)];
  const filteredTopProducts = activeFilter === 'All'
    ? TOP_PRODUCTS
    : TOP_PRODUCTS.filter(p => p.brand === activeFilter);

  return (
    <div className="home-page-wrapper">

      {/* ═══════════════════════════════════════════════════
          HERO SLIDER
      ═══════════════════════════════════════════════════ */}
      <section className="hero-section">
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            className={`hero-slide ${i === heroIndex ? 'active' : ''}`}
            style={{ background: slide.bg }}
          >
            <div className="hero-content">
              <div className="hero-text">
                <span className="hero-badge">{slide.badge}</span>
                <h1 className="hero-headline">
                  {slide.headline} <br />
                  <span className="hero-highlight">{slide.highlight}</span>
                </h1>
                <p className="hero-sub">{slide.sub}</p>
                <div className="hero-ctas">
                  <Link to={slide.path} className="hero-btn-primary">{slide.cta}</Link>
                  <Link to="/shop" className="hero-btn-outline">Browse All</Link>
                </div>
              </div>
              <div className="hero-img-wrap">
                <img src={slide.img} alt={slide.headline} className="hero-img" />
              </div>
            </div>
          </div>
        ))}

        {/* Arrows */}
        <button className="hero-arrow hero-arrow-left" onClick={() => goHero(-1)}><ChevronLeft size={24}/></button>
        <button className="hero-arrow hero-arrow-right" onClick={() => goHero(1)}><ChevronRight size={24}/></button>

        {/* Dots */}
        <div className="hero-dots">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} className={`hero-dot ${i === heroIndex ? 'active' : ''}`} onClick={() => setHeroIndex(i)} />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SHOP BY CATEGORY — with banner + big images + effects
      ═══════════════════════════════════════════════════ */}
      <section className="section category-section-wrap">
        {/* Top Banner */}
        <div className="category-top-banner">
          <div className="cat-banner-left">
            <Tag size={20} />
            <div>
              <p className="cat-banner-tag">🐾 Shop Smart</p>
              <h2 className="cat-banner-headline">Shop By Category</h2>
            </div>
          </div>
          <Link to="/shop" className="cat-banner-cta">View All Products <ArrowRight size={16}/></Link>
        </div>

        {/* Category Cards — bigger images */}
        <div className="category-cards-grid">
          {CATEGORIES.map((cat) => (
            <Link key={cat.label} to={cat.path} className="cat-card" style={{ '--cat-accent': cat.accent }}>
              <div className="cat-card-img-wrap">
                <img src={cat.img} alt={cat.label} className="cat-card-img" />
                <div className="cat-card-overlay">
                  <span className="cat-card-icon">{cat.icon}</span>
                </div>
              </div>
              <div className="cat-card-footer">
                <span className="cat-card-label">{cat.label}</span>
                <span className="cat-card-arrow"><ArrowRight size={14}/></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          30% DISCOUNT BANNER — updated font + design
      ═══════════════════════════════════════════════════ */}
      <section className="deal-banner-section">
        <div className="deal-banner-inner container">
          <div className="deal-banner-left">
            <div className="deal-percent-block">
              <span className="deal-percent-num">30</span>
              <div className="deal-percent-right">
                <span className="deal-percent-sign">%</span>
                <span className="deal-off-text">OFF</span>
              </div>
            </div>
            <div className="deal-copy-block">
              <h2 className="deal-title">On Your First Purchase</h2>
              <p className="deal-sub">
                New to Dr. Snoopy? Get flat 30% off on your first order.
                From tasty treats to premium food — your pet deserves the best!
              </p>
              <div className="deal-actions">
                <Link to="/shop" className="deal-btn-main">Grab the Deal 🎉</Link>
                <span className="deal-code-badge">Use code: <strong>FIRST30</strong></span>
              </div>
            </div>
          </div>
          <div className="deal-banner-img-wrap">
            <img
              src="https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=600&q=85"
              alt="Happy pets"
              className="deal-banner-img"
            />
            <div className="deal-banner-sticker">
              <span>🐕</span>
              <span className="sticker-text">Happy Pets!</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          TOP SELLING — bigger images + filter + 5 products
      ═══════════════════════════════════════════════════ */}
      <section className="section top-selling-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <p className="section-eyebrow">⭐ Community Picks</p>
              <h2 className="section-title">Top Selling Products</h2>
            </div>
            <Link to="/shop" className="section-view-all">View All <ArrowRight size={15}/></Link>
          </div>

          {/* Brand Filters */}
          <div className="ts-filter-row">
            {brandFilters.map((f) => (
              <button
                key={f}
                className={`ts-filter-btn ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          {/* 5 Products — big cards */}
          <div className="ts-products-grid">
            {(filteredTopProducts.length > 0 ? filteredTopProducts : TOP_PRODUCTS).slice(0, 5).map((p, idx) => (
              <div key={p.id} className={`ts-product-card ${idx === 0 ? 'ts-card-featured' : ''}`}>
                <div className="ts-img-wrap">
                  <img src={p.img} alt={p.name} className="ts-img" />
                  <span className="ts-tag">{p.tag}</span>
                  <div className="ts-rating">
                    <Star size={12} fill="#f7931e" color="#f7931e"/>
                    {p.rating}
                  </div>
                </div>
                <div className="ts-info">
                  <p className="ts-brand">{p.brand}</p>
                  <h3 className="ts-name">{p.name}</h3>
                  <div className="ts-price-row">
                    <span className="ts-sale">₹{p.price.toLocaleString()}</span>
                    <span className="ts-mrp">₹{p.mrp.toLocaleString()}</span>
                    <span className="ts-off">{Math.round((1 - p.price / p.mrp) * 100)}% off</span>
                  </div>
                  <button className="ts-add-btn" onClick={() => navigate('/shop')}>
                    <ShoppingCart size={14}/> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          TOP BRANDS
      ═══════════════════════════════════════════════════ */}
      <section className="section brand-strip-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <p className="section-eyebrow">🏆 Trusted Names</p>
              <h2 className="section-title">Top Selling Brands</h2>
            </div>
            <Link to="/shop" className="section-view-all">View All <ArrowRight size={15}/></Link>
          </div>
          <div className="brand-pills-wrap">
            {TOP_BRANDS.map((b) => (
              <Link key={b} to={`/category/${b}`} className="brand-pill">{b}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FEATURED PRODUCTS — with border + gap
      ═══════════════════════════════════════════════════ */}
      <section className="section featured-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <p className="section-eyebrow">✨ Hand Picked</p>
              <h2 className="section-title">Featured Products</h2>
            </div>
            <Link to="/shop" className="section-view-all">View All <ArrowRight size={15}/></Link>
          </div>

          <div className="featured-grid">
            {FEATURED_PRODUCTS.map((p) => (
              <div key={p.id} className="feat-card">
                <div className="feat-img-wrap">
                  <img src={p.img} alt={p.name} className="feat-img" loading="lazy" />
                  <div className="feat-hover-layer">
                    <button className="feat-quick-view" onClick={() => navigate('/shop')}>
                      Quick View
                    </button>
                  </div>
                </div>
                <div className="feat-info">
                  <span className="feat-brand">{p.brand}</span>
                  <h3 className="feat-name">{p.name}</h3>
                  <div className="feat-price-row">
                    <span className="feat-sale">₹{p.price}</span>
                    <span className="feat-mrp">₹{p.mrp}</span>
                  </div>
                  <button className="feat-add-btn" onClick={() => navigate('/shop')}>
                    <ShoppingCart size={13}/> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SHOP BY BREED
      ═══════════════════════════════════════════════════ */}
      <section className="section breed-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <p className="section-eyebrow">🐕 Find Your Match</p>
              <h2 className="section-title">Shop By Breed</h2>
            </div>
            <Link to="/shop" className="section-view-all">View All <ArrowRight size={15}/></Link>
          </div>
          <div className="breed-grid">
            {BREEDS.map((b) => (
              <Link key={b.name} to={`/category/${b.name}`} className="breed-card">
                <div className="breed-img-wrap">
                  <img src={b.img} alt={b.name} className="breed-img" loading="lazy"/>
                  <div className="breed-gradient"/>
                </div>
                <span className="breed-name">{b.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          WHY CONSULT US — dark background + new icons
      ═══════════════════════════════════════════════════ */}
      <section className="consult-section">
        <div className="container">
          <div className="consult-header">
            <p className="section-eyebrow consult-eyebrow">🩺 Expert Care</p>
            <h2 className="consult-title">Why Consult With Us?</h2>
            <p className="consult-sub">
              Trusted by over 1,50,000 pet parents across India for expert vet advice, premium products & same-day delivery.
            </p>
          </div>
          <div className="consult-grid">
            {CONSULT_REASONS.map((r) => (
              <div key={r.title} className="consult-card">
                <div className="consult-icon-wrap">{r.icon}</div>
                <h3 className="consult-card-title">{r.title}</h3>
                <p className="consult-card-desc">{r.desc}</p>
              </div>
            ))}
          </div>
          <div className="consult-cta-row">
            <Link to="/services" className="consult-cta-btn">Book a Consultation</Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          CONTACT US — clickable phone, email, map
      ═══════════════════════════════════════════════════ */}
      <section className="contact-strip-section">
        <div className="container">
          <h2 className="contact-strip-title">Get In Touch</h2>
          <div className="contact-strip-cards">

            <a href="tel:+919876543210" className="contact-strip-card contact-phone">
              <div className="contact-card-icon"><Phone size={28}/></div>
              <div>
                <p className="contact-card-label">Call Us</p>
                <p className="contact-card-value">+91 98765 43210</p>
                <p className="contact-card-hint">Mon–Sat, 9am–7pm</p>
              </div>
            </a>

            <a href="mailto:support@drsnoopy.co.in" className="contact-strip-card contact-email">
              <div className="contact-card-icon"><Mail size={28}/></div>
              <div>
                <p className="contact-card-label">Email Us</p>
                <p className="contact-card-value">support@drsnoopy.co.in</p>
                <p className="contact-card-hint">We reply within 24 hours</p>
              </div>
            </a>

            <a
              href="https://www.google.com/maps/search/Eluru+Andhra+Pradesh+534002"
              target="_blank"
              rel="noreferrer"
              className="contact-strip-card contact-address"
            >
              <div className="contact-card-icon"><MapPin size={28}/></div>
              <div>
                <p className="contact-card-label">Visit Us</p>
                <p className="contact-card-value">Eluru, Andhra Pradesh</p>
                <p className="contact-card-hint">Open in Google Maps ↗</p>
              </div>
            </a>

          </div>
        </div>
      </section>

      {/* ─── All HomePage Styles ─── */}
      <style>{`
        /* ── HERO ─────────────────────────── */
        .hero-section {
          position: relative;
          height: 88vh;
          min-height: 520px;
          max-height: 760px;
          overflow: hidden;
        }

        .hero-slide {
          position: absolute; inset: 0;
          opacity: 0; transition: opacity 1.2s ease;
          display: flex; align-items: center;
        }

        .hero-slide.active { opacity: 1; z-index: 1; }

        .hero-content {
          width: 100%; max-width: 1280px; margin: 0 auto;
          padding: 0 2rem; display: flex;
          align-items: center; justify-content: space-between; gap: 40px;
        }

        .hero-text { flex: 1; color: white; }

        .hero-badge {
          display: inline-block; background: rgba(255,255,255,0.2);
          border: 1px solid rgba(255,255,255,0.4); padding: 6px 16px;
          border-radius: 999px; font-size: 13px; font-weight: 700;
          color: white; margin-bottom: 20px; backdrop-filter: blur(8px);
        }

        .hero-headline {
          font-size: clamp(2.2rem, 5vw, 4rem);
          font-weight: 900; line-height: 1.1; color: white;
          font-family: var(--font-headers); margin-bottom: 16px;
        }

        .hero-highlight { color: #fcd34d; }

        .hero-sub { font-size: 17px; color: rgba(255,255,255,0.8); margin-bottom: 32px; max-width: 440px; line-height: 1.6; }

        .hero-ctas { display: flex; gap: 14px; flex-wrap: wrap; }

        .hero-btn-primary {
          padding: 14px 32px; background: #f7931e; color: white;
          border-radius: 10px; font-size: 15px; font-weight: 800;
          text-decoration: none; transition: all 0.3s; box-shadow: 0 6px 20px rgba(247,147,30,0.45);
        }

        .hero-btn-primary:hover { background: #db7d14; transform: translateY(-3px); }

        .hero-btn-outline {
          padding: 14px 28px; background: rgba(255,255,255,0.15); color: white;
          border: 2px solid rgba(255,255,255,0.5); border-radius: 10px;
          font-size: 15px; font-weight: 700; text-decoration: none; transition: all 0.3s;
          backdrop-filter: blur(8px);
        }

        .hero-btn-outline:hover { background: rgba(255,255,255,0.25); }

        .hero-img-wrap {
          flex-shrink: 0; width: 42%; max-width: 480px;
          border-radius: 20px; overflow: hidden;
          box-shadow: 0 30px 80px rgba(0,0,0,0.35);
          border: 3px solid rgba(255,255,255,0.15);
        }

        .hero-img { width: 100%; height: 380px; object-fit: cover; display: block; }

        .hero-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          z-index: 2; background: rgba(255,255,255,0.15); border: 2px solid rgba(255,255,255,0.4);
          color: white; width: 46px; height: 46px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.3s; backdrop-filter: blur(8px);
        }

        .hero-arrow:hover { background: rgba(255,255,255,0.35); }
        .hero-arrow-left { left: 20px; }
        .hero-arrow-right { right: 20px; }

        .hero-dots {
          position: absolute; bottom: 24px; left: 50%; transform: translateX(-50%);
          z-index: 2; display: flex; gap: 8px;
        }

        .hero-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: rgba(255,255,255,0.4); border: none; cursor: pointer;
          transition: all 0.3s; padding: 0;
        }

        .hero-dot.active { width: 28px; border-radius: 4px; background: white; }

        /* ── SHARED SECTION STYLES ─────────── */
        .section { padding: 64px 0; }

        .section-header-row {
          display: flex; align-items: flex-end; justify-content: space-between;
          margin-bottom: 36px; flex-wrap: wrap; gap: 12px;
        }

        .section-eyebrow { font-size: 13px; font-weight: 700; color: var(--secondary-color); margin-bottom: 4px; letter-spacing: 0.5px; }
        .section-title { font-size: clamp(22px, 3.5vw, 34px); font-weight: 850; color: var(--text-dark); font-family: var(--font-headers); margin: 0; }
        .section-view-all {
          display: flex; align-items: center; gap: 6px; font-size: 14px;
          font-weight: 700; color: var(--primary-color); text-decoration: none;
          padding: 8px 16px; border: 2px solid var(--primary-color); border-radius: 8px;
          transition: all 0.3s; white-space: nowrap;
        }
        .section-view-all:hover { background: var(--primary-color); color: white; }

        /* ── CATEGORY SECTION ──────────────── */
        .category-section-wrap { background: #f8fafc; }

        .category-top-banner {
          display: flex; align-items: center; justify-content: space-between;
          background: linear-gradient(135deg, var(--primary-color), #1a7ad4);
          border-radius: 16px; padding: 20px 28px; margin: 0 auto 36px;
          max-width: 1280px; padding-left: calc(2rem + 20px); padding-right: calc(2rem + 20px);
          flex-wrap: wrap; gap: 16px;
        }

        .cat-banner-left { display: flex; align-items: center; gap: 14px; color: white; }
        .cat-banner-tag { font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.7); margin: 0 0 4px; letter-spacing: 0.5px; }
        .cat-banner-headline { font-size: 22px; font-weight: 850; color: white; margin: 0; font-family: var(--font-headers); }

        .cat-banner-cta {
          display: flex; align-items: center; gap: 8px; background: white;
          color: var(--primary-color); padding: 10px 22px; border-radius: 8px;
          font-size: 14px; font-weight: 800; text-decoration: none; transition: all 0.3s;
          white-space: nowrap;
        }

        .cat-banner-cta:hover { background: #f7931e; color: white; }

        /* Category Cards Grid */
        .category-cards-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 18px;
          max-width: 1280px; margin: 0 auto; padding: 0 2rem;
        }

        .cat-card {
          text-decoration: none; border-radius: 16px; overflow: hidden;
          background: white; box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
          border: 2px solid transparent;
        }

        .cat-card:hover {
          transform: translateY(-8px) scale(1.03);
          box-shadow: 0 16px 40px rgba(0,0,0,0.14);
          border-color: var(--cat-accent);
        }

        .cat-card-img-wrap {
          position: relative; overflow: hidden; height: 170px;
        }

        .cat-card-img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform 0.5s ease;
        }

        .cat-card:hover .cat-card-img { transform: scale(1.12); }

        .cat-card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%);
          display: flex; align-items: flex-end; padding: 10px;
          opacity: 0; transition: opacity 0.35s;
        }

        .cat-card:hover .cat-card-overlay { opacity: 1; }

        .cat-card-icon { font-size: 28px; filter: drop-shadow(0 2px 6px rgba(0,0,0,0.4)); }

        .cat-card-footer {
          padding: 12px 14px; display: flex; align-items: center;
          justify-content: space-between; border-top: 1px solid #f1f5f9;
        }

        .cat-card-label { font-size: 13px; font-weight: 800; color: var(--text-dark); }

        .cat-card-arrow {
          width: 24px; height: 24px; border-radius: 50%;
          background: var(--bg-main); display: flex; align-items: center;
          justify-content: center; color: var(--cat-accent);
          transition: all 0.3s;
        }

        .cat-card:hover .cat-card-arrow {
          background: var(--cat-accent); color: white; transform: translateX(3px);
        }

        /* ── 30% DEAL BANNER ────────────────── */
        .deal-banner-section {
          background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
          padding: 60px 0; overflow: hidden; position: relative;
        }

        .deal-banner-inner {
          display: flex; align-items: center;
          justify-content: space-between; gap: 40px; flex-wrap: wrap;
        }

        .deal-banner-left { flex: 1; display: flex; align-items: center; gap: 36px; flex-wrap: wrap; }

        /* Huge percent number */
        .deal-percent-block {
          display: flex; align-items: flex-start; gap: 4px;
          flex-shrink: 0;
        }

        .deal-percent-num {
          font-size: clamp(80px, 12vw, 140px);
          font-weight: 900; color: #fcd34d;
          font-family: 'Outfit', sans-serif; line-height: 1;
          text-shadow: 0 0 60px rgba(252,211,77,0.4);
          letter-spacing: -4px;
        }

        .deal-percent-right { display: flex; flex-direction: column; margin-top: 16px; }
        .deal-percent-sign { font-size: 52px; font-weight: 900; color: #fcd34d; line-height: 1; font-family: 'Outfit', sans-serif; }
        .deal-off-text { font-size: 28px; font-weight: 900; color: #f7931e; letter-spacing: 2px; font-family: 'Outfit', sans-serif; }

        .deal-copy-block { flex: 1; }
        .deal-title { font-size: clamp(20px, 3vw, 34px); font-weight: 900; color: white; font-family: var(--font-headers); margin: 0 0 12px; }
        .deal-sub { font-size: 15px; color: rgba(255,255,255,0.65); line-height: 1.65; margin-bottom: 28px; }

        .deal-actions { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }

        .deal-btn-main {
          padding: 14px 32px; background: #f7931e; color: white; border-radius: 10px;
          font-size: 16px; font-weight: 800; text-decoration: none;
          transition: all 0.3s; box-shadow: 0 6px 20px rgba(247,147,30,0.45);
        }

        .deal-btn-main:hover { background: #db7d14; transform: translateY(-3px); }

        .deal-code-badge {
          font-size: 14px; color: rgba(255,255,255,0.75);
          border: 1.5px dashed rgba(255,255,255,0.4);
          padding: 10px 18px; border-radius: 8px;
        }

        .deal-code-badge strong { color: #fcd34d; }

        .deal-banner-img-wrap {
          flex-shrink: 0; width: 320px; position: relative;
          border-radius: 20px; overflow: hidden;
          box-shadow: 0 24px 60px rgba(0,0,0,0.4);
        }

        .deal-banner-img { width: 100%; height: 280px; object-fit: cover; display: block; }

        .deal-banner-sticker {
          position: absolute; bottom: 16px; right: 16px;
          background: white; border-radius: 12px; padding: 10px 14px;
          display: flex; align-items: center; gap: 8px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.2); font-size: 22px;
        }

        .sticker-text { font-size: 13px; font-weight: 800; color: var(--primary-color); }

        /* ── TOP SELLING ────────────────────── */
        .top-selling-section { background: white; }

        .ts-filter-row {
          display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 32px;
        }

        .ts-filter-btn {
          padding: 8px 20px; border-radius: 999px; font-size: 13px; font-weight: 700;
          background: var(--bg-main); border: 1.5px solid var(--border-light);
          color: var(--text-medium); cursor: pointer; transition: all 0.25s;
        }

        .ts-filter-btn.active, .ts-filter-btn:hover {
          background: var(--primary-color); color: white; border-color: var(--primary-color);
        }

        .ts-products-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 20px;
        }

        .ts-product-card {
          border-radius: 16px; overflow: hidden; background: white;
          border: 2px solid var(--border-light);
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
          transition: all 0.35s;
        }

        .ts-product-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.12);
          border-color: var(--primary-color);
        }

        .ts-card-featured { border-color: var(--secondary-color); }

        .ts-img-wrap { position: relative; overflow: hidden; height: 220px; }
        .ts-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s ease; }
        .ts-product-card:hover .ts-img { transform: scale(1.08); }

        .ts-tag {
          position: absolute; top: 12px; left: 12px;
          background: var(--secondary-color); color: white;
          font-size: 11px; font-weight: 800; padding: 4px 10px;
          border-radius: 999px; letter-spacing: 0.3px;
        }

        .ts-card-featured .ts-tag { background: var(--primary-color); }

        .ts-rating {
          position: absolute; bottom: 10px; right: 10px;
          background: rgba(0,0,0,0.65); color: white;
          font-size: 12px; font-weight: 700;
          padding: 4px 8px; border-radius: 6px;
          display: flex; align-items: center; gap: 4px;
          backdrop-filter: blur(6px);
        }

        .ts-info { padding: 14px 16px; }
        .ts-brand { font-size: 11px; font-weight: 700; color: var(--secondary-color); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
        .ts-name { font-size: 13px; font-weight: 700; color: var(--text-dark); line-height: 1.4; margin-bottom: 10px; }

        .ts-price-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
        .ts-sale { font-size: 18px; font-weight: 900; color: var(--primary-color); }
        .ts-mrp { font-size: 13px; color: var(--text-light); text-decoration: line-through; }
        .ts-off { font-size: 12px; font-weight: 800; color: #16a34a; background: #dcfce7; padding: 2px 8px; border-radius: 999px; }

        .ts-add-btn {
          width: 100%; padding: 10px; background: var(--primary-color); color: white;
          border: none; border-radius: 8px; font-size: 13px; font-weight: 700;
          cursor: pointer; transition: all 0.3s; display: flex; align-items: center;
          justify-content: center; gap: 7px;
        }

        .ts-add-btn:hover { background: var(--primary-hover); transform: translateY(-1px); }

        /* ── BRAND STRIP ─────────────────────── */
        .brand-strip-section { background: #fff4ee; }

        .brand-pills-wrap { display: flex; flex-wrap: wrap; gap: 10px; }

        .brand-pill {
          padding: 9px 20px; background: white; border-radius: 999px;
          font-size: 13px; font-weight: 700; color: var(--text-dark);
          text-decoration: none; transition: all 0.3s;
          border: 1.5px solid var(--border-light);
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .brand-pill:hover { background: var(--secondary-color); color: white; border-color: var(--secondary-color); transform: translateY(-2px); box-shadow: 0 6px 16px rgba(247,147,30,0.3); }

        /* ── FEATURED PRODUCTS ───────────────── */
        .featured-section { background: #f8fafc; }

        .featured-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .feat-card {
          border-radius: 16px; overflow: hidden; background: white;
          border: 2px solid var(--border-light);
          box-shadow: 0 4px 16px rgba(0,0,0,0.05);
          transition: all 0.35s; display: flex; flex-direction: column;
        }

        .feat-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.12);
          border-color: var(--secondary-color);
        }

        .feat-img-wrap { position: relative; overflow: hidden; height: 200px; }
        .feat-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s ease; }
        .feat-card:hover .feat-img { transform: scale(1.08); }

        .feat-hover-layer {
          position: absolute; inset: 0; background: rgba(10,88,164,0.8);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity 0.3s;
        }

        .feat-card:hover .feat-hover-layer { opacity: 1; }

        .feat-quick-view {
          background: white; color: var(--primary-color); border: none;
          padding: 10px 24px; border-radius: 8px; font-size: 13px;
          font-weight: 800; cursor: pointer; transition: all 0.2s;
        }

        .feat-quick-view:hover { background: var(--secondary-color); color: white; }

        .feat-info { padding: 14px 16px; flex: 1; display: flex; flex-direction: column; }
        .feat-brand { font-size: 11px; font-weight: 700; color: var(--secondary-color); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
        .feat-name { font-size: 13px; font-weight: 700; color: var(--text-dark); line-height: 1.4; flex: 1; margin-bottom: 10px; }

        .feat-price-row { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
        .feat-sale { font-size: 17px; font-weight: 900; color: var(--primary-color); }
        .feat-mrp { font-size: 12px; color: var(--text-light); text-decoration: line-through; }

        .feat-add-btn {
          width: 100%; padding: 9px; background: var(--secondary-color); color: white;
          border: none; border-radius: 8px; font-size: 13px; font-weight: 700;
          cursor: pointer; transition: all 0.3s; display: flex; align-items: center;
          justify-content: center; gap: 7px; margin-top: auto;
        }

        .feat-add-btn:hover { background: var(--secondary-hover); transform: translateY(-1px); }

        /* ── BREED ──────────────────────────── */
        .breed-section { background: white; }

        .breed-grid {
          display: grid; grid-template-columns: repeat(6, 1fr); gap: 18px;
        }

        .breed-card {
          position: relative; border-radius: 16px; overflow: hidden;
          height: 200px; display: block; text-decoration: none;
          box-shadow: 0 4px 16px rgba(0,0,0,0.1); transition: all 0.35s;
        }

        .breed-card:hover { transform: translateY(-6px) scale(1.03); box-shadow: 0 16px 40px rgba(0,0,0,0.2); }

        .breed-img-wrap { position: absolute; inset: 0; }
        .breed-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s; }
        .breed-card:hover .breed-img { transform: scale(1.12); }

        .breed-gradient {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%);
        }

        .breed-name {
          position: absolute; bottom: 14px; left: 0; right: 0; text-align: center;
          color: white; font-size: 14px; font-weight: 800;
          text-shadow: 0 2px 8px rgba(0,0,0,0.5);
        }

        /* ── WHY CONSULT US ─────────────────── */
        .consult-section {
          background: linear-gradient(135deg, #0d1b2a 0%, #1a2d4a 50%, #0d1b2a 100%);
          padding: 72px 0;
        }

        .consult-header { text-align: center; margin-bottom: 52px; }
        .consult-eyebrow { color: #fcd34d !important; }
        .consult-title { font-size: clamp(24px, 4vw, 42px); font-weight: 900; color: white; font-family: var(--font-headers); margin: 0 0 14px; }
        .consult-sub { font-size: 16px; color: rgba(255,255,255,0.6); max-width: 560px; margin: 0 auto; line-height: 1.65; }

        .consult-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 48px;
        }

        .consult-card {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px; padding: 32px 28px;
          transition: all 0.35s; backdrop-filter: blur(10px);
          text-align: center;
        }

        .consult-card:hover {
          background: rgba(255,255,255,0.12);
          transform: translateY(-6px);
          border-color: rgba(247,147,30,0.5);
          box-shadow: 0 16px 40px rgba(0,0,0,0.3);
        }

        .consult-icon-wrap {
          width: 68px; height: 68px; border-radius: 18px;
          background: linear-gradient(135deg, var(--secondary-color), #fbbf24);
          display: flex; align-items: center; justify-content: center;
          color: white; margin: 0 auto 20px;
          box-shadow: 0 8px 24px rgba(247,147,30,0.35);
        }

        .consult-card-title { font-size: 18px; font-weight: 800; color: white; margin-bottom: 10px; font-family: var(--font-headers); }
        .consult-card-desc { font-size: 14px; color: rgba(255,255,255,0.6); line-height: 1.65; margin: 0; }

        .consult-cta-row { text-align: center; }

        .consult-cta-btn {
          display: inline-block; padding: 16px 44px;
          background: var(--secondary-color); color: white;
          border-radius: 12px; font-size: 16px; font-weight: 800;
          text-decoration: none; transition: all 0.3s;
          box-shadow: 0 8px 24px rgba(247,147,30,0.4);
        }

        .consult-cta-btn:hover { background: var(--secondary-hover); transform: translateY(-3px); box-shadow: 0 14px 36px rgba(247,147,30,0.5); }

        /* ── CONTACT STRIP ─────────────────── */
        .contact-strip-section { background: white; padding: 64px 0; }
        .contact-strip-title { font-size: clamp(22px, 3vw, 34px); font-weight: 900; color: var(--text-dark); font-family: var(--font-headers); margin-bottom: 32px; }

        .contact-strip-cards {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
        }

        .contact-strip-card {
          display: flex; align-items: center; gap: 20px;
          border-radius: 16px; padding: 24px 28px; text-decoration: none;
          transition: all 0.35s; border: 2px solid transparent;
        }

        .contact-phone { background: #eff6ff; }
        .contact-email { background: #f0fdf4; }
        .contact-address { background: #fff7ed; }

        .contact-strip-card:hover { transform: translateY(-5px); border-color: currentColor; box-shadow: 0 12px 32px rgba(0,0,0,0.1); }
        .contact-phone:hover { border-color: #3b82f6; }
        .contact-email:hover { border-color: #22c55e; }
        .contact-address:hover { border-color: #f97316; }

        .contact-card-icon {
          width: 58px; height: 58px; border-radius: 14px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center; transition: all 0.3s;
        }

        .contact-phone .contact-card-icon { background: #3b82f6; color: white; }
        .contact-email .contact-card-icon { background: #22c55e; color: white; }
        .contact-address .contact-card-icon { background: #f97316; color: white; }

        .contact-strip-card:hover .contact-card-icon { transform: scale(1.1) rotate(-5deg); }

        .contact-card-label { font-size: 12px; font-weight: 700; color: var(--text-light); text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 4px; }
        .contact-card-value { font-size: 15px; font-weight: 800; color: var(--text-dark); margin: 0 0 3px; }
        .contact-card-hint { font-size: 12px; color: var(--text-light); margin: 0; }

        /* ── RESPONSIVE ─────────────────────── */
        @media (max-width: 1100px) {
          .category-cards-grid { grid-template-columns: repeat(3, 1fr); }
          .ts-products-grid { grid-template-columns: repeat(3, 1fr); }
          .featured-grid { grid-template-columns: repeat(2, 1fr); }
          .breed-grid { grid-template-columns: repeat(3, 1fr); }
          .consult-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .hero-section { height: auto; min-height: 480px; }
          .hero-img-wrap { display: none; }
          .hero-content { padding: 40px 1.5rem; }
          .category-cards-grid { grid-template-columns: repeat(2, 1fr); padding: 0 1rem; }
          .category-top-banner { padding: 16px 1rem; }
          .cat-banner-headline { font-size: 18px; }
          .deal-banner-inner { flex-direction: column; }
          .deal-banner-img-wrap { width: 100%; }
          .deal-percent-num { font-size: 80px; }
          .ts-products-grid { grid-template-columns: repeat(2, 1fr); }
          .featured-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
          .breed-grid { grid-template-columns: repeat(2, 1fr); }
          .consult-grid { grid-template-columns: 1fr; }
          .contact-strip-cards { grid-template-columns: 1fr; }
        }

        @media (max-width: 480px) {
          .category-cards-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .ts-products-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
          .featured-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
          .breed-grid { grid-template-columns: repeat(2, 1fr); }
          .ts-img-wrap { height: 160px; }
        }
      `}</style>
    </div>
  );
}
