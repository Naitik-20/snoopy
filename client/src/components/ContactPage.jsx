import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone:'', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1400);
  };

  return (
    <div className="contact-page">

      {/* ── HERO ── */}
      <div className="contact-hero">
        <div className="container">
          <p className="contact-eyebrow">💬 We're Here For You</p>
          <h1 className="contact-headline">Contact Us</h1>
          <p className="contact-subhead">
            Any question about your pet's health, orders, or services? We're happy to help!
          </p>
        </div>
      </div>

      <div className="contact-body container">

        {/* ── LEFT: Quick Contact Cards ── */}
        <div className="contact-info-col">
          <h2 className="contact-info-title">Get In Touch</h2>

          {/* Phone — clickable */}
          <a href="tel:+919876543210" className="contact-info-card contact-card-blue">
            <div className="contact-info-icon-wrap">
              <Phone size={26} />
            </div>
            <div>
              <p className="contact-info-label">Call Us</p>
              <p className="contact-info-value">+91 98765 43210</p>
              <p className="contact-info-hint">Mon–Sat, 9am to 7pm IST</p>
            </div>
          </a>

          {/* Email — clickable */}
          <a href="mailto:support@drsnoopy.co.in" className="contact-info-card contact-card-green">
            <div className="contact-info-icon-wrap">
              <Mail size={26} />
            </div>
            <div>
              <p className="contact-info-label">Email Us</p>
              <p className="contact-info-value">support@drsnoopy.co.in</p>
              <p className="contact-info-hint">We reply within 24 hours</p>
            </div>
          </a>

          {/* WhatsApp — clickable */}
          <a
            href="https://wa.me/919876543210?text=Hi%20Dr.%20Snoopy%2C%20I%20have%20a%20query%20about%20my%20pet."
            target="_blank" rel="noreferrer"
            className="contact-info-card contact-card-whatsapp"
          >
            <div className="contact-info-icon-wrap">
              <MessageSquare size={26} />
            </div>
            <div>
              <p className="contact-info-label">WhatsApp</p>
              <p className="contact-info-value">Chat with us</p>
              <p className="contact-info-hint">Quick reply in minutes</p>
            </div>
          </a>

          {/* Address — opens Google Maps */}
          <a
            href="https://www.google.com/maps/search/Eluru+Andhra+Pradesh+534002+India"
            target="_blank" rel="noreferrer"
            className="contact-info-card contact-card-orange"
          >
            <div className="contact-info-icon-wrap">
              <MapPin size={26} />
            </div>
            <div>
              <p className="contact-info-label">Visit Our Store</p>
              <p className="contact-info-value">Eluru, Andhra Pradesh</p>
              <p className="contact-info-hint">PIN: 534002 — Open in Maps ↗</p>
            </div>
          </a>

          {/* Store Hours */}
          <div className="store-hours-card">
            <h4><Clock size={16}/> Store Hours</h4>
            <div className="hours-row"><span>Mon – Fri</span><span>9:00 AM – 7:00 PM</span></div>
            <div className="hours-row"><span>Saturday</span><span>9:00 AM – 5:00 PM</span></div>
            <div className="hours-row"><span>Sunday</span><span className="closed">Closed</span></div>
          </div>
        </div>

        {/* ── RIGHT: Contact Form ── */}
        <div className="contact-form-col">
          <div className="contact-form-card">
            {!submitted ? (
              <>
                <h2 className="contact-form-title">Send Us a Message</h2>
                <p className="contact-form-sub">Fill in the form and we'll get back to you within 24 hours.</p>

                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="contact-form-row">
                    <div className="contact-field">
                      <label>Your Name *</label>
                      <input
                        type="text" required placeholder="Full name"
                        value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                        className="contact-input"
                      />
                    </div>
                    <div className="contact-field">
                      <label>Email Address *</label>
                      <input
                        type="email" required placeholder="you@example.com"
                        value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                        className="contact-input"
                      />
                    </div>
                  </div>

                  <div className="contact-field">
    <label>Phone Number *</label>

    <input
      type="tel"
      required
      placeholder="+91 9876543210"
      value={form.phone || ''}
      onChange={e =>
        setForm({
          ...form,
          phone: e.target.value
        })
      }
      className="contact-input"
    />
  </div>

                  <div className="contact-field">
                  
                    <label>Subject</label>
                    <select
                      value={form.subject}
                      onChange={e => setForm({...form, subject: e.target.value})}
                      className="contact-select"
                    >
                      <option value="">Select a topic...</option>
                      <option>Order Issue</option>
                      <option>Product Query</option>
                      <option>Grooming Appointment</option>
                      <option>Vet Consultation</option>
                      <option>Wholesale Inquiry</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="contact-field">
                    <label>Your Message *</label>
                    <textarea
                      required placeholder="Tell us about your query or concern..."
                      value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                      className="contact-textarea" rows={5}
                    />
                  </div>

                  <button type="submit" className="contact-submit-btn" disabled={loading}>
                    {loading
                      ? <span className="contact-spinner"/>
                      : <><Send size={16}/> Send Message</>
                    }
                  </button>
                </form>
              </>
            ) : (
              /* Success State */
              <div className="contact-success">
                <CheckCircle size={64} color="#16a34a" />
                <h3>Message Sent! 🎉</h3>
                <p>Thanks for reaching out, <strong>{form.name}</strong>! We'll reply to <strong>{form.email}</strong> within 24 hours.</p>
                <button
                  className="contact-reset-btn"
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>

          {/* Map embed */}
          <div className="contact-map-wrap">
            <a
              href="https://www.google.com/maps/search/Eluru+Andhra+Pradesh+534002"
              target="_blank" rel="noreferrer"
              className="contact-map-link"
            >
              <div className="contact-map-placeholder">
                <MapPin size={36} />
                <p>Dr. Snoopy Pet Store</p>
                <p className="map-sub">Eluru, Andhra Pradesh 534002</p>
                <span className="map-cta">Open in Google Maps ↗</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .contact-page { background: var(--bg-main); min-height: 100vh; }

        .contact-hero {
          background: linear-gradient(135deg, #065f46, #059669);
          padding: 64px 0 52px; text-align: center;
        }

        .contact-eyebrow { font-size: 13px; font-weight: 700; color: #a7f3d0; letter-spacing: 1px; margin-bottom: 12px; }
        .contact-headline { font-size: clamp(32px, 5vw, 56px); font-weight: 900; color: white; font-family: var(--font-headers); margin: 0 0 14px; }
        .contact-subhead { font-size: 16px; color: rgba(255,255,255,0.7); max-width: 480px; margin: 0 auto; line-height: 1.65; }

        .contact-body {
          display: grid; grid-template-columns: 340px 1fr;
          gap: 36px; padding-top: 56px; padding-bottom: 80px;
        }

        /* Info Column */
        .contact-info-col { display: flex; flex-direction: column; gap: 14px; }
        .contact-info-title { font-size: 20px; font-weight: 900; color: var(--text-dark); font-family: var(--font-headers); margin: 0 0 6px; }

        .contact-info-card {
          display: flex; align-items: center; gap: 18px;
          border-radius: 14px; padding: 18px 20px;
          text-decoration: none; transition: all 0.35s;
          border: 2px solid transparent;
        }

        .contact-card-blue { background: #eff6ff; }
        .contact-card-green { background: #f0fdf4; }
        .contact-card-whatsapp { background: #f0fdf4; }
        .contact-card-orange { background: #fff7ed; }

        .contact-info-card:hover { transform: translateX(6px); }
        .contact-card-blue:hover { border-color: #3b82f6; box-shadow: 0 8px 24px rgba(59,130,246,0.12); }
        .contact-card-green:hover { border-color: #22c55e; box-shadow: 0 8px 24px rgba(34,197,94,0.12); }
        .contact-card-whatsapp:hover { border-color: #25d366; box-shadow: 0 8px 24px rgba(37,211,102,0.12); }
        .contact-card-orange:hover { border-color: #f97316; box-shadow: 0 8px 24px rgba(249,115,22,0.12); }

        .contact-info-icon-wrap {
          width: 52px; height: 52px; border-radius: 13px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.3s;
        }

        .contact-card-blue .contact-info-icon-wrap { background: #3b82f6; color: white; }
        .contact-card-green .contact-info-icon-wrap { background: #22c55e; color: white; }
        .contact-card-whatsapp .contact-info-icon-wrap { background: #25d366; color: white; }
        .contact-card-orange .contact-info-icon-wrap { background: #f97316; color: white; }

        .contact-info-card:hover .contact-info-icon-wrap { transform: scale(1.1) rotate(-5deg); }

        .contact-info-label { font-size: 11px; font-weight: 700; color: var(--text-light); text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 3px; }
        .contact-info-value { font-size: 15px; font-weight: 800; color: var(--text-dark); margin: 0 0 3px; }
        .contact-info-hint { font-size: 12px; color: var(--text-light); margin: 0; }

        /* Store Hours */
        .store-hours-card {
          background: white; border-radius: 14px; padding: 20px;
          border: 1.5px solid var(--border-light);
        }

        .store-hours-card h4 {
          display: flex; align-items: center; gap: 8px;
          font-size: 14px; font-weight: 800; color: var(--text-dark); margin: 0 0 14px;
        }

        .hours-row {
          display: flex; justify-content: space-between;
          font-size: 13px; color: var(--text-medium); padding: 6px 0;
          border-bottom: 1px solid var(--border-light);
        }

        .hours-row:last-child { border-bottom: none; }
        .hours-row span:first-child { font-weight: 600; }
        .closed { color: #ef4444; font-weight: 700; }

        /* Form Column */
        .contact-form-col { display: flex; flex-direction: column; gap: 24px; }

        .contact-form-card {
          background: white; border-radius: var(--radius-lg);
          border: 1.5px solid var(--border-light); padding: 36px;
          box-shadow: var(--shadow-sm);
        }

        .contact-form-title { font-size: 22px; font-weight: 900; color: var(--text-dark); font-family: var(--font-headers); margin: 0 0 6px; }
        .contact-form-sub { font-size: 14px; color: var(--text-medium); margin: 0 0 28px; }

        .contact-form { display: flex; flex-direction: column; gap: 20px; }
        .contact-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .contact-field { display: flex; flex-direction: column; gap: 6px; }
        .contact-field label { font-size: 13px; font-weight: 700; color: var(--text-dark); }

        .contact-input, .contact-select, .contact-textarea {
          width: 100%; padding: 12px 14px;
          background: var(--bg-main); border: 1.5px solid var(--border-light);
          border-radius: var(--radius-sm); font-size: 14px; color: var(--text-dark);
          outline: none; transition: var(--transition-smooth); font-family: inherit;
        }

        .contact-input:focus, .contact-select:focus, .contact-textarea:focus {
          border-color: var(--primary-color); background: white;
          box-shadow: 0 0 0 3px rgba(10,88,164,0.1);
        }

        .contact-textarea { resize: vertical; }

        .contact-submit-btn {
          width: 100%; padding: 14px; background: var(--primary-color); color: white;
          border: none; border-radius: var(--radius-sm); font-size: 16px; font-weight: 800;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: var(--transition-smooth); box-shadow: 0 4px 14px rgba(10,88,164,0.3);
        }

        .contact-submit-btn:hover:not(:disabled) { background: var(--primary-hover); transform: translateY(-2px); }
        .contact-submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }

        .contact-spinner { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: cspin 0.7s linear infinite; }
        @keyframes cspin { to { transform: rotate(360deg); } }

        /* Success */
        .contact-success {
          text-align: center; padding: 48px 24px;
          display: flex; flex-direction: column; align-items: center; gap: 16px;
        }

        .contact-success h3 { font-size: 26px; font-weight: 900; color: var(--text-dark); font-family: var(--font-headers); }
        .contact-success p { font-size: 15px; color: var(--text-medium); line-height: 1.65; }

        .contact-reset-btn {
          padding: 12px 28px; background: var(--primary-color); color: white;
          border: none; border-radius: var(--radius-sm); font-size: 14px; font-weight: 700;
          cursor: pointer; transition: var(--transition-smooth);
        }

        .contact-reset-btn:hover { background: var(--primary-hover); }

        /* Map */
        .contact-map-wrap {
          border-radius: 14px; overflow: hidden;
          border: 1.5px solid var(--border-light); box-shadow: var(--shadow-sm);
        }

        .contact-map-link { display: block; text-decoration: none; }

        .contact-map-placeholder {
          background: linear-gradient(135deg, #e0f2fe, #bae6fd);
          padding: 48px 24px; text-align: center;
          display: flex; flex-direction: column; align-items: center; gap: 10px;
          transition: all 0.3s;
        }

        .contact-map-link:hover .contact-map-placeholder { background: linear-gradient(135deg, #bae6fd, #7dd3fc); }

        .contact-map-placeholder svg { color: var(--primary-color); }
        .contact-map-placeholder p { font-size: 18px; font-weight: 800; color: var(--text-dark); margin: 0; }
        .map-sub { font-size: 14px; color: var(--text-medium); font-weight: 500 !important; }

        .map-cta {
          display: inline-block; margin-top: 8px;
          background: var(--primary-color); color: white;
          padding: 10px 24px; border-radius: 8px;
          font-size: 14px; font-weight: 800;
          transition: all 0.3s;
        }

        .contact-map-link:hover .map-cta { background: var(--primary-hover); }

        @media (max-width: 900px) {
          .contact-body { grid-template-columns: 1fr; }
          .contact-form-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
