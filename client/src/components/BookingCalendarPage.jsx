import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Clock, Check, Calendar, User, Mail, Phone, ArrowRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const SERVICE_INFO = {
  grooming: { title: 'Full Grooming', price: 499, duration: '90 min', icon: '✂️' },
  consultation: { title: 'Vet Consultation', price: 199, duration: '30 min', icon: '🩺' },
  spa: { title: 'Pet Spa & Massage', price: 349, duration: '60 min', icon: '🛁' },
  styling: { title: 'Fashion Styling', price: 699, duration: '120 min', icon: '🌟' },
};

const TIME_SLOTS = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

export default function BookingCalendarPage({onLoginClick}) {
  const location = useLocation();
  const isConsultationPage =
    location.pathname === '/consultation';

  const { serviceId } = useParams();
  const navigate = useNavigate();
  const service = SERVICE_INFO[serviceId] || SERVICE_INFO.consultation;

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [step, setStep] = useState(1); // 1: pick date, 2: pick time, 3: form, 4: confirmed
  const [form, setForm] = useState({ name: '', email: '', phone: '', petName: '', petType: 'Dog', notes: '' });
  const [loading, setLoading] = useState(false);

  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = () => {
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else setMonth(m => m - 1);
    setSelectedDay(null);
  };

  const nextMonth = () => {
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else setMonth(m => m + 1);
    setSelectedDay(null);
  };

  const isPast = (day) => new Date(year, month, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const handleBooking = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(4);
    }, 1500);
  };

  const selectedDate = selectedDay ? `${selectedDay} ${MONTHS[month]} ${year}` : '';

  return (
    <div className="booking-page">
      <div className="booking-inner container">

        {/* Left: Info */}
        <div className="booking-sidebar">
          {!isConsultationPage && (
          <button className="booking-back-btn" onClick={() => navigate('/services')}>
            <ChevronLeft size={16} /> Back to Services
          </button>
          )}

          <div className="booking-svc-card">
            <span className="booking-svc-icon">{service.icon}</span>
            <div>
              <h2 className="booking-svc-name">{service.title}</h2>
              <div className="booking-svc-meta">
                <span className="booking-svc-price">₹{service.price}</span>
                <span className="booking-svc-dur"><Clock size={13}/> {service.duration}</span>
              </div>
            </div>
          </div>

          {selectedDay && (
            <div className="booking-summary-card">
              <h4>📋 Booking Summary</h4>
              <div className="summary-line"><Calendar size={14}/> {selectedDate}</div>
              {selectedTime && <div className="summary-line"><Clock size={14}/> {selectedTime}</div>}
              {form.name && <div className="summary-line"><User size={14}/> {form.name}</div>}
              {form.petName && <div className="summary-line">🐾 {form.petName} ({form.petType})</div>}
              <div className="summary-total">Total: <strong>₹{service.price}</strong></div>
            </div>
          )}

          {/* Steps */}
          <div className="booking-steps">
            {['Select Date', 'Choose Time', 'Your Details'].map((s, i) => (
              <div key={s} className={`booking-step ${step > i + 1 ? 'done' : ''} ${step === i + 1 ? 'active' : ''}`}>
                <div className="step-circle">{step > i + 1 ? <Check size={14}/> : i + 1}</div>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Main Content */}
        <div className="booking-main">

          {/* STEP 1: Calendar */}
          {step === 1 && (
            <div className="booking-card">
              <h3 className="booking-step-title">📅 Select a Date</h3>

              {/* Month Nav */}
              <div className="cal-header">
                <button className="cal-nav-btn" onClick={prevMonth}><ChevronLeft size={18}/></button>
                <span className="cal-month-label">{MONTHS[month]} {year}</span>
                <button className="cal-nav-btn" onClick={nextMonth}><ChevronRight size={18}/></button>
              </div>

              {/* Day headers */}
              <div className="cal-grid cal-days-header">
                {DAYS.map(d => <div key={d} className="cal-day-label">{d}</div>)}
              </div>

              {/* Dates */}
              <div className="cal-grid">
                {[...Array(firstDay)].map((_, i) => <div key={`empty-${i}`} />)}
                {[...Array(daysInMonth)].map((_, i) => {
                  const day = i + 1;
                  const past = isPast(day);
                  return (
                    <button
                      key={day}
                      className={`cal-date-btn ${past ? 'cal-past' : ''} ${selectedDay === day ? 'cal-selected' : ''}`}
                      onClick={() => !past && setSelectedDay(day)}
                      disabled={past}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              <button
                className="booking-next-btn"
                disabled={!selectedDay}
                onClick={() => setStep(2)}
              >
                Continue <ArrowRight size={16}/>
              </button>
            </div>
          )}

          {/* STEP 2: Time Slots */}
          {step === 2 && (
            <div className="booking-card">
              <button className="step-back-link" onClick={() => setStep(1)}><ChevronLeft size={15}/> Change Date</button>
              <h3 className="booking-step-title">🕐 Select a Time Slot</h3>
              <p className="booking-step-sub">Available slots for <strong>{selectedDate}</strong></p>

              <div className="time-slots-grid">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    className={`time-slot-btn ${selectedTime === slot ? 'selected' : ''}`}
                    onClick={() => setSelectedTime(slot)}
                  >
                    <Clock size={14}/> {slot}
                  </button>
                ))}
              </div>

              <button
                className="booking-next-btn"
                disabled={!selectedTime}
                onClick={() => setStep(3)}
              >
                Continue <ArrowRight size={16}/>
              </button>
            </div>
          )}

          {/* STEP 3: Form */}
          {step === 3 && (
            <div className="booking-card">
              <button className="step-back-link" onClick={() => setStep(2)}><ChevronLeft size={15}/> Change Time</button>
              <h3 className="booking-step-title">📝 Your Details</h3>

              <form className="booking-form" onSubmit={handleBooking}>
                <div className="booking-form-row">
                  <div className="booking-field">
                    <label>Your Name *</label>
                    <div className="booking-input-wrap">
                      <User size={15}/>
                      <input required placeholder="Full name" value={form.name}
                        onChange={e => setForm({...form, name: e.target.value})}/>
                    </div>
                  </div>
                  <div className="booking-field">
                    <label>Email *</label>
                    <div className="booking-input-wrap">
                      <Mail size={15}/>
                      <input required type="email" placeholder="you@example.com" value={form.email}
                        onChange={e => setForm({...form, email: e.target.value})}/>
                    </div>
                  </div>
                </div>

                <div className="booking-form-row">
                  <div className="booking-field">
                    <label>Phone *</label>
                    <div className="booking-input-wrap">
                      <Phone size={15}/>
                      <input required placeholder="+91 98765 43210" value={form.phone}
                        onChange={e => setForm({...form, phone: e.target.value})}/>
                    </div>
                  </div>
                  <div className="booking-field">
                    <label>Pet Name</label>
                    <div className="booking-input-wrap">
                      <span style={{marginLeft:12,fontSize:16}}>🐾</span>
                      <input placeholder="Your pet's name" value={form.petName}
                        onChange={e => setForm({...form, petName: e.target.value})}/>
                    </div>
                  </div>
                </div>

                <div className="booking-field">
                  <label>Pet Type</label>
                  <select value={form.petType} onChange={e => setForm({...form, petType: e.target.value})} className="booking-select">
                    {['Dog','Cat','Bird','Rabbit','Other'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>

                <div className="booking-field">
                  <label>Additional Notes</label>
                  <textarea placeholder="Any special instructions or health concerns..."
                    value={form.notes} onChange={e => setForm({...form, notes: e.target.value})}
                    className="booking-textarea" rows={3}/>
                </div>

                <div className="login-notice">
                   Have an account? <span onClick={onLoginClick}>Log in</span>
                </div>

                <button type="submit" className="booking-next-btn" disabled={loading}>
                  {loading ? <span className="auth-spinner"/> : <>Confirm Booking ₹{service.price} <Check size={16}/></>}
                </button>
              </form>
            </div>
          )}

          {/* STEP 4: Confirmed */}
          {step === 4 && (
            <div className="booking-card booking-confirmed">
              <div className="confirmed-icon">🎉</div>
              <h2 className="confirmed-title">Booking Confirmed!</h2>
              <p className="confirmed-sub">Your appointment has been booked successfully.</p>
              <div className="confirmed-details">
                <div className="confirmed-row"><Calendar size={16}/> {selectedDate}</div>
                <div className="confirmed-row"><Clock size={16}/> {selectedTime}</div>
                <div className="confirmed-row"><span>{service.icon}</span> {service.title}</div>
                <div className="confirmed-row">💰 ₹{service.price} (Pay at clinic)</div>
              </div>
              <p className="confirmed-note">We'll send a confirmation to <strong>{form.email}</strong>. See you soon! 🐾</p>
              <button className="booking-next-btn" onClick={() => navigate('/')}>Back to Home</button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .booking-page { background: var(--bg-main); min-height: 100vh; padding: 40px 0 80px; }

        .booking-inner {
          display: grid; grid-template-columns: 300px 1fr;
          gap: 32px; align-items: start;
        }

        .booking-sidebar { display: flex; flex-direction: column; gap: 20px; }

        .booking-back-btn {
          display: flex; align-items: center; gap: 6px; background: none;
          border: 1.5px solid var(--border-light); padding: 9px 16px;
          border-radius: var(--radius-sm); font-size: 13px; font-weight: 700;
          color: var(--text-medium); cursor: pointer; transition: var(--transition-smooth);
          width: fit-content;
        }

        .booking-back-btn:hover { border-color: var(--primary-color); color: var(--primary-color); }

        .booking-svc-card {
          background: linear-gradient(135deg, var(--primary-color), #1a7ad4);
          border-radius: var(--radius-md); padding: 24px 20px;
          display: flex; align-items: center; gap: 16px; color: white;
        }

        .booking-svc-icon { font-size: 40px; }
        .booking-svc-name { font-size: 18px; font-weight: 800; margin: 0 0 6px; font-family: var(--font-headers); }
        .booking-svc-meta { display: flex; align-items: center; gap: 12px; }
        .booking-svc-price { font-size: 20px; font-weight: 900; }
        .booking-svc-dur { display: flex; align-items: center; gap: 5px; font-size: 13px; opacity: 0.8; }

        .booking-summary-card {
          background: white; border-radius: var(--radius-md); padding: 20px;
          border: 1.5px solid var(--border-light); display: flex; flex-direction: column; gap: 10px;
        }

        .booking-summary-card h4 { font-size: 14px; font-weight: 800; color: var(--text-dark); margin: 0; }
        .summary-line { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--text-medium); }
        .summary-total { font-size: 16px; font-weight: 900; color: var(--primary-color); border-top: 1px solid var(--border-light); padding-top: 10px; }

        .booking-steps { display: flex; flex-direction: column; gap: 8px; }
        .booking-step { display: flex; align-items: center; gap: 12px; font-size: 14px; font-weight: 600; color: var(--text-light); }
        .booking-step.active { color: var(--primary-color); }
        .booking-step.done { color: #16a34a; }
        .step-circle {
          width: 28px; height: 28px; border-radius: 50%;
          border: 2px solid currentColor;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 800; flex-shrink: 0;
          background: none; transition: var(--transition-smooth);
        }

        .booking-step.done .step-circle { background: #16a34a; border-color: #16a34a; color: white; }
        .booking-step.active .step-circle { background: var(--primary-color); border-color: var(--primary-color); color: white; }

        .booking-card {
          background: white; border-radius: var(--radius-lg);
          border: 1.5px solid var(--border-light);
          padding: 36px; box-shadow: var(--shadow-sm);
        }

        .booking-step-title { font-size: 22px; font-weight: 900; color: var(--text-dark); font-family: var(--font-headers); margin: 0 0 8px; }
        .booking-step-sub { font-size: 14px; color: var(--text-medium); margin: 0 0 28px; }

        .step-back-link {
          display: flex; align-items: center; gap: 5px; background: none; border: none;
          font-size: 13px; font-weight: 700; color: var(--primary-color);
          cursor: pointer; margin-bottom: 20px; padding: 0;
        }

        /* Calendar */
        .cal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
        .cal-month-label { font-size: 18px; font-weight: 800; color: var(--text-dark); }
        .cal-nav-btn { background: var(--bg-main); border: 1px solid var(--border-light); width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: var(--transition-smooth); }
        .cal-nav-btn:hover { background: var(--primary-color); color: white; border-color: var(--primary-color); }

        .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; margin-bottom: 8px; }
        .cal-days-header { margin-bottom: 4px; }
        .cal-day-label { text-align: center; font-size: 12px; font-weight: 700; color: var(--text-light); padding: 4px 0; }

        .cal-date-btn {
          aspect-ratio: 1; border-radius: 50%; border: none;
          background: none; font-size: 14px; font-weight: 600; cursor: pointer;
          color: var(--text-dark); transition: var(--transition-smooth);
          display: flex; align-items: center; justify-content: center;
        }

        .cal-date-btn:hover:not(:disabled) { background: var(--bg-main); color: var(--primary-color); }
        .cal-date-btn.cal-selected { background: var(--primary-color); color: white; }
        .cal-date-btn.cal-past { color: var(--text-light); cursor: not-allowed; }

        /* Time slots */
        .time-slots-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 24px 0; }

        .time-slot-btn {
          padding: 12px 8px; border-radius: var(--radius-sm);
          border: 1.5px solid var(--border-light); background: var(--bg-main);
          font-size: 13px; font-weight: 700; color: var(--text-dark);
          cursor: pointer; transition: var(--transition-smooth);
          display: flex; align-items: center; justify-content: center; gap: 6px;
        }

        .time-slot-btn:hover { border-color: var(--primary-color); color: var(--primary-color); background: rgba(10,88,164,0.05); }
        .time-slot-btn.selected { background: var(--primary-color); color: white; border-color: var(--primary-color); }

        /* Form */
        .booking-form { display: flex; flex-direction: column; gap: 20px; }
        .booking-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .booking-field { display: flex; flex-direction: column; gap: 6px; }
        .booking-field label { font-size: 13px; font-weight: 700; color: var(--text-dark); }

        .booking-input-wrap {
          display: flex; align-items: center; gap: 0;
          background: var(--bg-main); border: 1.5px solid var(--border-light);
          border-radius: var(--radius-sm); transition: var(--transition-smooth);
          padding-left: 12px;
        }

        .login-notice {
  text-align: center;
  margin: 20px 0 10px;
  color: var(--text-medium);
  font-size: 14px;
}

.login-notice span {
  color: var(--secondary-color);
  font-weight: 700;
  cursor: pointer;
  text-decoration: underline;
}

        .booking-input-wrap:focus-within { border-color: var(--primary-color); background: white; box-shadow: 0 0 0 3px rgba(10,88,164,0.1); }
        .booking-input-wrap svg { color: var(--text-light); flex-shrink: 0; }
        .booking-input-wrap input { flex: 1; border: none; background: transparent; padding: 12px; font-size: 14px; color: var(--text-dark); outline: none; }

        .booking-select { padding: 12px 14px; background: var(--bg-main); border: 1.5px solid var(--border-light); border-radius: var(--radius-sm); font-size: 14px; color: var(--text-dark); outline: none; transition: var(--transition-smooth); width: 100%; }
        .booking-select:focus { border-color: var(--primary-color); background: white; }

        .booking-textarea { padding: 12px 14px; background: var(--bg-main); border: 1.5px solid var(--border-light); border-radius: var(--radius-sm); font-size: 14px; color: var(--text-dark); outline: none; resize: vertical; width: 100%; font-family: inherit; transition: var(--transition-smooth); }
        .booking-textarea:focus { border-color: var(--primary-color); background: white; }

        .booking-next-btn {
          width: 100%; padding: 14px; background: var(--secondary-color); color: white;
          border: none; border-radius: var(--radius-sm); font-size: 16px; font-weight: 800;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: var(--transition-smooth); margin-top: 8px;
          box-shadow: 0 4px 14px rgba(247,147,30,0.35);
        }

        .booking-next-btn:hover:not(:disabled) { background: var(--secondary-hover); transform: translateY(-2px); }
        .booking-next-btn:disabled { background: var(--text-light); cursor: not-allowed; box-shadow: none; }

        /* Confirmed */
        .booking-confirmed { text-align: center; padding: 60px 36px; }
        .confirmed-icon { font-size: 72px; margin-bottom: 20px; }
        .confirmed-title { font-size: 32px; font-weight: 900; color: var(--text-dark); font-family: var(--font-headers); margin-bottom: 10px; }
        .confirmed-sub { font-size: 16px; color: var(--text-medium); margin-bottom: 32px; }
        .confirmed-details { background: var(--bg-main); border-radius: var(--radius-md); padding: 24px; margin-bottom: 24px; display: flex; flex-direction: column; gap: 12px; text-align: left; }
        .confirmed-row { display: flex; align-items: center; gap: 10px; font-size: 15px; font-weight: 600; color: var(--text-dark); }
        .confirmed-note { font-size: 14px; color: var(--text-medium); margin-bottom: 28px; }

        .auth-spinner { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        @media (max-width: 768px) {
          .booking-inner { grid-template-columns: 1fr; }
          .time-slots-grid { grid-template-columns: repeat(2, 1fr); }
          .booking-form-row { grid-template-columns: 1fr; }
          .booking-sidebar { display: none; }
        }
      `}</style>
    </div>
  );
}
