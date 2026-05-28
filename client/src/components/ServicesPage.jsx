import { Link } from 'react-router-dom';
import { Scissors, Stethoscope, Bath, Clock, Star, ArrowRight, CheckCircle } from 'lucide-react';

const SERVICES = [
  {
    id: 'grooming',
    icon: <Scissors size={32} />,
    title: 'Full Grooming',
    desc: 'Complete coat care — bath, blow dry, haircut, nail clipping, ear cleaning & perfume.',
    price: '₹499',
    duration: '90 min',
    features: ['Bath & Blow Dry', 'Breed-specific Haircut', 'Nail Clipping', 'Ear Cleaning', 'Cologne Spray'],
    color: '#6366f1',
    bg: '#eef2ff',
  },
  {
    id: 'consultation',
    icon: <Stethoscope size={32} />,
    title: 'Vet Consultation',
    desc: 'Online or in-clinic consultation with BVSC certified veterinarians for health checkups.',
    price: '₹199',
    duration: '30 min',
    features: ['Health Assessment', 'Prescription', 'Vaccination Schedule', 'Diet Advice', 'Follow-up Support'],
    color: '#0a58a4',
    bg: '#eff6ff',
  },
  {
    id: 'spa',
    icon: <Bath size={32} />,
    title: 'Pet Spa & Massage',
    desc: 'Relaxation & stress relief with anti-tick bath, deep conditioning & coat massage.',
    price: '₹349',
    duration: '60 min',
    features: ['Anti-Tick Bath', 'Deep Conditioner', 'Relaxing Massage', 'Paw Treatment', 'Shine Spray'],
    color: '#7c3aed',
    bg: '#fdf4ff',
  },
  {
    id: 'styling',
    icon: <Star size={32} />,
    title: 'Fashion Styling',
    desc: 'Make your pet look their best with our breed-specific styling and accessories.',
    price: '₹699',
    duration: '120 min',
    features: ['Custom Haircut', 'Bow / Bandana', 'Nail Art', 'Photo Session', 'Premium Products'],
    color: '#f7931e',
    bg: '#fff7ed',
  },
];

export default function ServicesPage() {
  return (
    <div className="services-page">

      {/* ── HERO ── */}
      <div className="services-hero">
        <div className="services-hero-inner container">
          <p className="services-eyebrow">🐾 Premium Pet Care</p>
          <h1 className="services-headline">Our Services</h1>
          <p className="services-subhead">
            Professional grooming, expert vet consultation & spa treatments — all under one roof.
            Trusted by 1,50,000+ pet parents across India.
          </p>
        </div>
      </div>

      {/* ── SERVICES GRID ── */}
      <div className="services-grid-wrap container">
        <div className="services-grid">
          {SERVICES.map((svc) => (
            <div key={svc.id} className="service-card" style={{ '--svc-color': svc.color, '--svc-bg': svc.bg }}>
              {/* Icon */}
              <div className="svc-icon-wrap">{svc.icon}</div>

              {/* Info */}
              <div className="svc-meta">
                <span className="svc-price">{svc.price}</span>
                <span className="svc-duration"><Clock size={12} /> {svc.duration}</span>
              </div>

              <h2 className="svc-title">{svc.title}</h2>
              <p className="svc-desc">{svc.desc}</p>

              {/* Feature list */}
              <ul className="svc-features">
                {svc.features.map((f) => (
                  <li key={f}>
                    <CheckCircle size={14} /> {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link to={`/online-consultation/${svc.id}`} className="svc-book-btn">
                Book Now <ArrowRight size={15} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* ── WHY CHOOSE US ── */}
      <div className="services-why container">
        <h2 className="services-why-title">Why Choose Dr. Snoopy?</h2>
        <div className="services-why-grid">
          {[
            { icon: '🏅', title: 'Certified Groomers', desc: 'Professionally trained, breed-expert groomers with 5+ years experience.' },
            { icon: '🩺', title: 'BVSC Vets', desc: 'All consultations handled by licensed veterinarians only.' },
            { icon: '💯', title: 'Safe Products', desc: 'Only pet-safe, chemical-free grooming products used.' },
            { icon: '📅', title: 'Easy Booking', desc: 'Book a slot online in under 60 seconds. Cancel anytime.' },
          ].map((w) => (
            <div key={w.title} className="why-card">
              <span className="why-icon">{w.icon}</span>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── GET IN TOUCH ── */}
      <div className="services-git-section">
        <div className="services-git-inner container">
          <h2 className="services-git-title">
            <span className="orange-text">Get In</span> <span className="blue-text">Touch</span>
          </h2>
          <p className="services-git-desc">
            Have questions about our products or need help choosing the best for your furry friend? 
            We're here to help! Reach out to us anytime — our team loves connecting 
            with pet parents and making tails wag.
          </p>
          <Link to="/contact" className="services-git-btn">
            Contact Us
          </Link>
        </div>
      </div>

      <style>{`
        .services-page { background: var(--bg-main); min-height: 100vh; }

        .services-hero {
<<<<<<< HEAD
          background: linear-gradient(135deg, #0d1b2a, #1a3a6a);
          padding: 72px 0 60px;
          text-align: center;
=======
          background: linear-gradient(rgba(10, 25, 47, 0.75), rgba(15, 34, 64, 0.85)), 
                      url('/services-hero-bg.png') no-repeat center center;
          background-size: cover;
          padding: 100px 0 90px;
          text-align: center;
          position: relative;
>>>>>>> 4d65c12d32117059894ff540579bea8645f692da
        }

        .services-hero-inner { max-width: 650px; margin: 0 auto; }
        .services-eyebrow { font-size: 13px; font-weight: 700; color: #fcd34d; letter-spacing: 1px; margin-bottom: 12px; }
        .services-headline { font-size: clamp(32px, 5vw, 56px); font-weight: 900; color: white; font-family: var(--font-headers); margin: 0 0 16px; }
        .services-subhead { font-size: 16px; color: rgba(255,255,255,0.65); line-height: 1.7; max-width: 500px; margin: 0 auto; }

        .services-grid-wrap { padding: 64px 2rem; }
        .services-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }

        .service-card {
          background: white; border-radius: 20px;
          border: 2px solid var(--border-light);
          padding: 32px 28px;
          box-shadow: var(--shadow-sm);
          transition: all 0.35s;
          display: flex; flex-direction: column; gap: 14px;
        }

        .service-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(0,0,0,0.1);
          border-color: var(--svc-color);
        }

        .svc-icon-wrap {
          width: 68px; height: 68px; border-radius: 18px;
          background: var(--svc-bg); color: var(--svc-color);
          display: flex; align-items: center; justify-content: center;
          transition: var(--transition-smooth);
        }

        .service-card:hover .svc-icon-wrap {
          background: var(--svc-color); color: white;
          transform: scale(1.1) rotate(-5deg);
        }

        .svc-meta { display: flex; align-items: center; gap: 12px; }
        .svc-price { font-size: 22px; font-weight: 900; color: var(--svc-color); font-family: var(--font-headers); }
        .svc-duration { display: flex; align-items: center; gap: 5px; font-size: 13px; color: var(--text-light); font-weight: 600; }

        .svc-title { font-size: 22px; font-weight: 900; color: var(--text-dark); font-family: var(--font-headers); margin: 0; }
        .svc-desc { font-size: 14px; color: var(--text-medium); line-height: 1.65; margin: 0; }

        .svc-features {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: 8px;
        }

        .svc-features li {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; font-weight: 600; color: var(--text-medium);
        }

        .svc-features li svg { color: var(--svc-color); flex-shrink: 0; }

        .svc-book-btn {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          background: var(--svc-color); color: white;
          text-decoration: none; padding: 13px 24px;
          border-radius: var(--radius-sm); font-size: 14px; font-weight: 800;
          transition: all 0.3s; margin-top: auto;
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
        }

        .svc-book-btn:hover { opacity: 0.9; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.2); }

        /* Why section */
        .services-why { padding: 0 2rem 64px; }
        .services-why-title { font-size: clamp(22px, 3vw, 34px); font-weight: 900; color: var(--text-dark); font-family: var(--font-headers); margin-bottom: 32px; }
        .services-why-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }

        .why-card {
          background: white; border-radius: var(--radius-md); padding: 24px 20px;
          border: 1.5px solid var(--border-light); text-align: center;
          transition: var(--transition-smooth);
        }

        .why-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); border-color: var(--secondary-color); }

        .why-icon { font-size: 36px; display: block; margin-bottom: 14px; }
        .why-card h3 { font-size: 16px; font-weight: 800; color: var(--text-dark); margin-bottom: 8px; }
        .why-card p { font-size: 13px; color: var(--text-medium); line-height: 1.6; margin: 0; }

<<<<<<< HEAD
=======
        /* Get In Touch section */
        .services-git-section {
          background: #ffffff;
          padding: 64px 2rem;
          text-align: center;
          border-top: 1px solid var(--border-light);
        }

        .services-git-inner {
          max-width: 700px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .services-git-title {
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 800;
          font-family: var(--font-headers);
          line-height: 1.1;
        }

        .services-git-title .orange-text {
          color: var(--secondary-color);
        }

        .services-git-title .blue-text {
          color: var(--primary-color);
        }

        .services-git-desc {
          color: var(--text-medium);
          font-size: 15px;
          line-height: 1.65;
          max-width: 600px;
          font-weight: 400;
        }

        .services-git-btn {
          background-color: var(--primary-color);
          color: white;
          border: none;
          padding: 12px 32px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
          display: inline-block;
          transition: var(--transition-smooth);
          box-shadow: 0 4px 14px rgba(10, 88, 164, 0.15);
        }

        .services-git-btn:hover {
          background-color: var(--primary-hover);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(10, 88, 164, 0.25);
        }

        .services-git-btn:active {
          transform: translateY(0);
        }

>>>>>>> 4d65c12d32117059894ff540579bea8645f692da
        @media (max-width: 768px) {
          .services-grid { grid-template-columns: 1fr; }
          .services-why-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 480px) {
          .services-why-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
