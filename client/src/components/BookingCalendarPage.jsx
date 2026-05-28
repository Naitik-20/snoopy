import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Clock, Check, Calendar, User, Mail, Phone, ArrowRight, ChevronDown } from 'lucide-react';

const SERVICE_INFO = {
  grooming: { 
    title: 'Full Grooming', 
    price: 499, 
    duration: '90 min', 
    icon: '✂️',
    description: 'Complete premium coat care for your pet. Includes standard deep conditioning bath, blow dry, hygienic breed-specific styling/haircut, nail trimming, ear cleaning, and refreshing pet-safe fragrance spray.'
  },
  consultation: { 
    title: 'On Call Veterinary Doctor Consultation', 
    price: 199, 
    duration: '30 min', 
    icon: '🩺',
    description: 'Direct online diagnostic and health consultation session with certified veterinary experts (BVSC). Get professional prescriptions, dietary guidance, vaccination scheduling, and overall pet wellness advice.'
  },
  spa: { 
    title: 'Pet Spa & Massage', 
    price: 349, 
    duration: '60 min', 
    icon: '🛁',
    description: 'Rejuvenating body massage and therapeutic spa session for stress relief. Includes anti-tick treatment, premium organic shampooing, paw massage with moisturizing balm, and final coat glossing spray.'
  },
  styling: { 
    title: 'Fashion Styling', 
    price: 699, 
    duration: '120 min', 
    icon: '🌟',
    description: 'Elevated styling session to make your pet look stellar. Includes bespoke haircuts, high-end finishing products, complimentary accessories (bow or designer bandana), and a small photo session.'
  },
};

const TIME_SLOTS = [
  '10:00 am', '10:30 am', '11:00 am', '11:30 am',
  '12:00 pm', '12:30 pm', '1:00 pm', '1:30 pm',
  '2:00 pm', '2:30 pm'
];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

export default function BookingCalendarPage({ onLoginClick }) {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isConsultationPage = location.pathname.includes('/consultation') || location.pathname.includes('/online-consultation');
  const service = SERVICE_INFO[serviceId] || SERVICE_INFO.consultation;

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(today.getDate() + 1); // Select tomorrow by default to avoid confusion
  const [selectedTime, setSelectedTime] = useState('10:00 am'); // Select first slot by default
  const [step, setStep] = useState(1); // 1: DateTime Picker & Sidebar, 2: Form Details & Sidebar, 3: Success Screen
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
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

  const isPast = (day) => {
    return new Date(year, month, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      alert('Please fill out all required fields marked with *');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 1500);
  };

  const getWeekdayName = (dayNum) => {
    if (!dayNum) return '';
    const dateObj = new Date(year, month, dayNum);
    const options = { weekday: 'long' };
    return dateObj.toLocaleDateString('en-US', options);
  };

  const selectedDate = selectedDay ? `${selectedDay} ${MONTHS[month]} ${year}` : '';

  return (
    <div className="booking-page">
      <div className="booking-container container">
        
        {/* Step-back to services button */}
        {step < 3 && !isConsultationPage && (
          <button className="booking-back-btn" onClick={() => step === 2 ? setStep(1) : navigate('/services')}>
            <ChevronLeft size={16} /> {step === 2 ? 'Back to Date & Time' : 'Back to Services'}
          </button>
        )}

        {/* Page Header */}
        <header className="booking-header">
          <h1 className="booking-title">Schedule your service</h1>
          <p className="booking-subtitle">Check out our availability and book the date and time that works for you</p>
        </header>

        {step < 3 ? (
          <div className="booking-grid">
            
            {/* Left/Middle Content Area */}
            <div className="booking-main-content">
              {step === 1 ? (
                <div className="booking-datetime-picker">
                  
                  {/* Column 1: Calendar Card */}
                  <div className="booking-col-calendar">
                    <div className="booking-section-header">
                      <h2 className="booking-section-title">Select a Date and Time</h2>
                      <span className="booking-timezone-label">India Standard Time (IST)</span>
                    </div>
                    
                    <div className="calendar-card">
                      {/* Month Navigation */}
                      <div className="cal-header">
                        <button className="cal-nav-btn" onClick={prevMonth} type="button">
                          <ChevronLeft size={18} />
                        </button>
                        <span className="cal-month-label">{MONTHS[month]} {year}</span>
                        <button className="cal-nav-btn" onClick={nextMonth} type="button">
                          <ChevronRight size={18} />
                        </button>
                      </div>

                      {/* Day Headers */}
                      <div className="cal-grid cal-days-header">
                        {DAYS.map(d => (
                          <div key={d} className="cal-day-label">{d}</div>
                        ))}
                      </div>

                      {/* Days Grid */}
                      <div className="cal-grid">
                        {[...Array(firstDay)].map((_, i) => (
                          <div key={`empty-${i}`} className="cal-empty-slot" />
                        ))}
                        {[...Array(daysInMonth)].map((_, i) => {
                          const day = i + 1;
                          const past = isPast(day);
                          const isSelected = selectedDay === day;
                          const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
                          
                          return (
                            <button
                              key={day}
                              type="button"
                              className={`cal-date-btn ${past ? 'cal-past' : ''} ${isSelected ? 'cal-selected' : ''} ${isToday ? 'cal-today' : ''}`}
                              onClick={() => !past && setSelectedDay(day)}
                              disabled={past}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Time Slots Card */}
                  <div className="booking-col-time">
                    <h3 className="booking-availability-title">
                      Availability for {selectedDay ? `${getWeekdayName(selectedDay)}, ${selectedDay} ${MONTHS[month].slice(0, 3)}` : 'Select a date'}
                    </h3>
                    
                    {selectedDay ? (
                      <div className="time-slots-wrapper">
                        <div className="time-slots-grid">
                          {TIME_SLOTS.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              className={`time-slot-btn ${selectedTime === slot ? 'selected' : ''}`}
                              onClick={() => setSelectedTime(slot)}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                        <div className="show-sessions-row">
                          <button type="button" className="show-sessions-btn">Show all sessions</button>
                        </div>
                      </div>
                    ) : (
                      <div className="no-date-selected-message">
                        Select a date on the calendar to view available timing slots.
                      </div>
                    )}
                  </div>

                </div>
              ) : (
                /* Step 2: Customer Details Form */
                <div className="booking-details-form-container">
                  <h2 className="booking-section-title" style={{ marginBottom: '24px' }}>📝 Enter Your Details</h2>
                  
                  <form id="booking-form" className="booking-form" onSubmit={handleBookingSubmit}>
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
                          <input required placeholder="Your contact number" value={form.phone}
                            onChange={e => setForm({...form, phone: e.target.value})}/>
                        </div>
                      </div>
                      <div className="booking-field">
                        <label>Pet Name</label>
                        <div className="booking-input-wrap">
                          <span style={{ marginLeft: '12px', marginRight: '4px', fontSize: '15px' }}>🐾</span>
                          <input placeholder="Your pet's name" value={form.petName}
                            onChange={e => setForm({...form, petName: e.target.value})}/>
                        </div>
                      </div>
                    </div>

                    <div className="booking-form-row">
                      <div className="booking-field">
                        <label>Pet Type</label>
                        <select value={form.petType} onChange={e => setForm({...form, petType: e.target.value})} className="booking-select">
                          {['Dog','Cat','Bird','Rabbit','Other'].map(t => <option key={t}>{t}</option>)}
                        </select>
                      </div>
                      <div className="booking-field">
                        <label>Selected Appointment Time</label>
                        <div className="booking-readonly-input">
                          <Calendar size={14} style={{ marginRight: '6px' }} /> {selectedDate} at {selectedTime}
                        </div>
                      </div>
                    </div>

                    <div className="booking-field">
                      <label>Additional Notes / Instructions</label>
                      <textarea placeholder="Any special instructions for the care taker, health concerns, etc."
                        value={form.notes} onChange={e => setForm({...form, notes: e.target.value})}
                        className="booking-textarea" rows={4}/>
                    </div>

                    <div className="login-notice" style={{ marginTop: '16px', textAlign: 'center', fontSize: '14px', color: '#a48c75' }}>
                      Have an account? <span onClick={onLoginClick} style={{ color: '#f7931e', fontWeight: '750', cursor: 'pointer', textDecoration: 'underline' }}>Log in</span>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Column 3: Service Details Right Sidebar */}
            <aside className="booking-sidebar-card">
              <h3 className="sidebar-section-title">Service Details</h3>
              <hr className="sidebar-divider" />
              
              <h4 className="sidebar-service-title">{service.title}</h4>
              
              {/* Accordion Details */}
              <div className="sidebar-accordion">
                <button 
                  type="button" 
                  className="accordion-trigger" 
                  onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                >
                  <span>More details</span>
                  <ChevronDown size={16} className={`accordion-icon ${isAccordionOpen ? 'open' : ''}`} />
                </button>
                {isAccordionOpen && (
                  <div className="accordion-content">
                    <p className="accordion-description-text">
                      {service.description}
                    </p>
                    <div className="sidebar-dur-row">
                      <Clock size={14} />
                      <span>Duration: {service.duration}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="sidebar-price-row">
                <span className="price-label">Consultation Fee</span>
                <span className="price-value">₹{service.price}</span>
              </div>

              {step === 1 ? (
                <button
                  type="button"
                  className="sidebar-action-btn"
                  disabled={!selectedDay || !selectedTime}
                  onClick={() => setStep(2)}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  form="booking-form"
                  className="sidebar-action-btn"
                  disabled={loading}
                >
                  {loading ? <span className="auth-spinner"/> : 'Confirm Booking'}
                </button>
              )}
            </aside>

          </div>
        ) : (
          /* Step 3: Success Screen */
          <div className="booking-confirmed-card">
            <div className="confirmed-icon">🎉</div>
            <h2 className="confirmed-title">Booking Confirmed!</h2>
            <p className="confirmed-sub">Your appointment has been booked successfully.</p>
            <div className="confirmed-details">
              <div className="confirmed-row"><Calendar size={16}/> <strong>Date:</strong> {selectedDate}</div>
              <div className="confirmed-row"><Clock size={16}/> <strong>Time Slot:</strong> {selectedTime}</div>
              <div className="confirmed-row"><span>{service.icon}</span> <strong>Service:</strong> {service.title}</div>
              <div className="confirmed-row">💰 <strong>Consultation Fee:</strong> ₹{service.price} (Pay at clinic)</div>
            </div>
            <p className="confirmed-note">We'll send a confirmation email shortly to <strong>{form.email}</strong>. See you soon! 🐾</p>
            <button className="back-to-home-btn" onClick={() => navigate('/')}>Back to Home</button>
          </div>
        )}

        {step < 3 && (
          <section className="why-consult-section">
            <h2 className="why-consult-title">
              Why consult with <span className="highlight-text">Dr. Snoopy</span>?
            </h2>
            
            <div className="why-consult-stepper">
              <div className="why-step-item">
                <div className="why-step-img-container">
                  <img src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=150&h=150&q=80" alt="Book appointment" className="why-step-img" />
                </div>
                <p className="why-step-desc">Book your appointment easily through our <strong>online portal</strong></p>
              </div>
              
              <div className="why-step-connector"></div>
              
              <div className="why-step-item">
                <div className="why-step-img-container">
                  <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=150&h=150&q=80" alt="Clear diagnosis" className="why-step-img" />
                </div>
                <p className="why-step-desc">Get a clear diagnosis and <strong>customized treatment plan</strong></p>
              </div>
              
              <div className="why-step-connector"></div>
              
              <div className="why-step-item">
                <div className="why-step-img-container">
                  <img src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=150&h=150&q=80" alt="Consultation" className="why-step-img" />
                </div>
                <p className="why-step-desc">Meet your doctor for a personalized health <strong>consultation</strong></p>
              </div>
              
              <div className="why-step-connector"></div>
              
              <div className="why-step-item">
                <div className="why-step-img-container">
                  <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=150&h=150&q=80" alt="Expert guidance" className="why-step-img" />
                </div>
                <p className="why-step-desc">Discuss symptoms and receive expert medical <strong>guidance instantly</strong></p>
              </div>
              
              <div className="why-step-connector"></div>
              
              <div className="why-step-item">
                <div className="why-step-img-container">
                  <img src="https://images.unsplash.com/photo-1535268647977-a403b6907eac?auto=format&fit=crop&w=150&h=150&q=80" alt="Recovery support" className="why-step-img" />
                </div>
                <p className="why-step-desc">Begin your recovery with continuous <strong>care and support</strong></p>
              </div>
            </div>
          </section>
        )}

      </div>

      <style>{`
        .booking-page { 
          background: #fffdfb; 
          min-height: 100vh; 
          padding: 40px 0 80px; 
          font-family: 'Inter', sans-serif;
        }

        .booking-back-btn {
          display: flex; 
          align-items: center; 
          gap: 6px; 
          background: none;
          border: 1.5px solid #ebd3bd; 
          padding: 8px 16px;
          border-radius: 99px; 
          font-size: 13px; 
          font-weight: 700;
          color: #f7931e; 
          cursor: pointer; 
          transition: all 0.25s ease;
          width: fit-content;
          margin-bottom: 20px;
        }

        .booking-back-btn:hover { 
          background-color: #fff7ed;
          border-color: #f7931e; 
        }

        /* Page Header */
        .booking-header {
          margin-bottom: 40px;
        }

        .booking-title {
          font-size: 40px;
          font-weight: 900;
          color: #f7931e;
          font-family: 'Outfit', 'Inter', sans-serif;
          margin: 0 0 8px;
          letter-spacing: -0.5px;
        }

        .booking-subtitle {
          font-size: 16px;
          color: #a48c75;
          margin: 0;
        }

        /* Layout Grid */
        .booking-grid {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 40px;
          align-items: start;
        }

        .booking-main-content {
          background: transparent;
        }

        /* Date Time Picker Layout */
        .booking-datetime-picker {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 40px;
        }

        .booking-section-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          border-bottom: 1.5px solid #ebd3bd;
          padding-bottom: 12px;
          margin-bottom: 24px;
        }

        .booking-section-title {
          font-size: 20px;
          font-weight: 800;
          color: #0a58a4;
          margin: 0;
          font-family: 'Outfit', sans-serif;
        }

        .booking-timezone-label {
          font-size: 13px;
          color: #a48c75;
          font-weight: 500;
        }

        /* Calendar Styling */
        .calendar-card {
          background: #ffffff;
          border: 1.5px solid #f3e6da;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(247, 147, 30, 0.03);
        }

        .cal-header { 
          display: flex; 
          align-items: center; 
          justify-content: space-between; 
          margin-bottom: 24px; 
        }

        .cal-month-label { 
          font-size: 17px; 
          font-weight: 800; 
          color: #2d3748; 
          font-family: 'Outfit', sans-serif;
        }

        .cal-nav-btn { 
          background: #fff8f0; 
          border: 1px solid #ebd3bd; 
          width: 38px; 
          height: 38px; 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          cursor: pointer; 
          color: #f7931e;
          transition: all 0.2s ease; 
        }

        .cal-nav-btn:hover { 
          background: #f7931e; 
          color: white; 
          border-color: #f7931e; 
        }

        .cal-grid { 
          display: grid; 
          grid-template-columns: repeat(7, 1fr); 
          gap: 8px; 
          margin-bottom: 10px; 
        }

        .cal-days-header { 
          margin-bottom: 12px; 
        }

        .cal-day-label { 
          text-align: center; 
          font-size: 13px; 
          font-weight: 700; 
          color: #a0aec0; 
          padding: 4px 0; 
        }

        .cal-date-btn {
          aspect-ratio: 1; 
          border-radius: 8px; 
          border: none;
          background: none; 
          font-size: 14px; 
          font-weight: 700; 
          cursor: pointer;
          color: #2d3748; 
          transition: all 0.2s ease;
          display: flex; 
          flex-direction: column;
          align-items: center; 
          justify-content: center;
        }

        .cal-date-btn:hover:not(:disabled) { 
          background: #fff3e5; 
          color: #f7931e; 
        }

        .cal-date-btn.cal-selected { 
          background: #f7931e; 
          color: white; 
          position: relative;
          box-shadow: 0 4px 12px rgba(247, 147, 30, 0.3);
        }

        .cal-date-btn.cal-selected::after {
          content: '';
          position: absolute;
          bottom: 5px;
          width: 4px;
          height: 4px;
          background-color: white;
          border-radius: 50%;
        }

        .cal-date-btn.cal-today:not(.cal-selected) {
          border: 1.5px solid #ebd3bd;
          color: #f7931e;
        }

        .cal-date-btn.cal-past { 
          color: #cbd5e0; 
          cursor: not-allowed; 
        }

        .cal-empty-slot {
          aspect-ratio: 1;
        }

        /* Time Slots Column */
        .booking-col-time {
          display: flex;
          flex-direction: column;
        }

        .booking-availability-title {
          font-size: 16px;
          font-weight: 800;
          color: #f7931e;
          border-bottom: 1.5px solid #ebd3bd;
          padding-bottom: 12px;
          margin: 0 0 24px;
          min-height: 38px;
        }

        .time-slots-wrapper {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .time-slots-grid { 
          display: grid; 
          grid-template-columns: repeat(3, 1fr); 
          gap: 10px; 
        }

        .time-slot-btn {
          padding: 12px 6px; 
          border-radius: 8px;
          border: 1.5px solid #ebd3bd; 
          background: white;
          font-size: 13px; 
          font-weight: 700; 
          color: #f7931e;
          cursor: pointer; 
          transition: all 0.25s ease;
          display: flex; 
          align-items: center; 
          justify-content: center;
        }

        .time-slot-btn:hover { 
          border-color: #f7931e; 
          background: #fffbf7; 
        }

        .time-slot-btn.selected { 
          background: #f7931e; 
          color: white; 
          border-color: #f7931e;
          box-shadow: 0 4px 10px rgba(247, 147, 30, 0.2);
        }

        .show-sessions-row {
          margin-top: 10px;
          display: flex;
          justify-content: center;
        }

        .show-sessions-btn {
          background: none;
          border: none;
          color: #f7931e;
          font-size: 14px;
          font-weight: 700;
          text-decoration: underline;
          cursor: pointer;
          transition: color 0.2s;
        }

        .show-sessions-btn:hover {
          color: #d87d15;
        }

        .no-date-selected-message {
          background: #fffbf7;
          border: 1.5px dashed #ebd3bd;
          border-radius: 12px;
          padding: 32px;
          text-align: center;
          color: #a48c75;
          font-size: 14px;
          line-height: 1.6;
        }

        /* Right Sidebar Service Details */
        .booking-sidebar-card {
          background: white; 
          border: 1.5px solid #f3e6da; 
          border-radius: 16px; 
          padding: 24px; 
          box-shadow: 0 4px 20px rgba(247, 147, 30, 0.03);
          position: sticky;
          top: 24px;
        }

        .sidebar-section-title { 
          font-size: 16px; 
          font-weight: 800; 
          color: #0a58a4; 
          margin: 0 0 12px; 
        }

        .sidebar-divider {
          border: 0;
          height: 1.5px;
          background-color: #ebd3bd;
          margin-bottom: 16px;
        }

        .sidebar-service-title {
          font-size: 17px;
          font-weight: 850;
          color: #f7931e;
          line-height: 1.35;
          margin: 0 0 16px;
          font-family: 'Outfit', sans-serif;
        }

        /* Accordion Details Styling */
        .sidebar-accordion {
          border: 1.5px solid #f3e6da;
          border-radius: 8px;
          margin-bottom: 20px;
          overflow: hidden;
        }

        .accordion-trigger {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          background: #fffcf8;
          border: none;
          font-size: 13.5px;
          font-weight: 700;
          color: #4a5568;
          cursor: pointer;
          text-align: left;
          transition: background-color 0.2s;
        }

        .accordion-trigger:hover {
          background-color: #fff8f0;
        }

        .accordion-icon {
          transition: transform 0.2s ease;
          color: #a48c75;
        }

        .accordion-icon.open {
          transform: rotate(180deg);
        }

        .accordion-content {
          padding: 12px 16px;
          background: #ffffff;
          border-top: 1.5px solid #f3e6da;
          font-size: 13px;
          color: #4a5568;
          line-height: 1.55;
        }

        .accordion-description-text {
          margin: 0 0 10px;
        }

        .sidebar-dur-row {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #718096;
          font-weight: 600;
          font-size: 12px;
        }

        .sidebar-price-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: 16px 0;
          border-top: 1.5px solid #f3e6da;
          margin-bottom: 20px;
        }

        .price-label {
          font-size: 14px;
          font-weight: 700;
          color: #4a5568;
        }

        .price-value {
          font-size: 24px;
          font-weight: 900;
          color: #f7931e;
          font-family: 'Outfit', sans-serif;
        }

        .sidebar-action-btn {
          width: 100%;
          padding: 14px;
          background: #f7931e;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px rgba(247,147,30,0.25);
        }

        .sidebar-action-btn:hover:not(:disabled) {
          background-color: #e57d09;
          transform: translateY(-1px);
        }

        .sidebar-action-btn:disabled {
          background: #cbd5e0;
          cursor: not-allowed;
          box-shadow: none;
        }

        /* Booking Details Form */
        .booking-details-form-container {
          background: white;
          border: 1.5px solid #f3e6da;
          border-radius: 16px;
          padding: 36px;
          box-shadow: 0 4px 20px rgba(247, 147, 30, 0.02);
        }

        .form-back-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          color: #0a58a4;
          font-size: 13.5px;
          font-weight: 700;
          cursor: pointer;
          padding: 0;
          margin-bottom: 24px;
          transition: color 0.2s;
        }

        .form-back-btn:hover {
          color: #f7931e;
        }

        .booking-form { 
          display: flex; 
          flex-direction: column; 
          gap: 20px; 
        }

        .booking-form-row { 
          display: grid; 
          grid-template-columns: 1fr 1fr; 
          gap: 20px; 
        }

        .booking-field { 
          display: flex; 
          flex-direction: column; 
          gap: 6px; 
        }

        .booking-field label { 
          font-size: 13px; 
          font-weight: 700; 
          color: #4a5568; 
        }

        .booking-input-wrap {
          display: flex; 
          align-items: center; 
          background: #fffcf9; 
          border: 1.5px solid #ebd3bd;
          border-radius: 8px; 
          transition: all 0.25s ease;
          padding-left: 12px;
        }

        .booking-input-wrap:focus-within { 
          border-color: #f7931e; 
          background: white; 
          box-shadow: 0 0 0 3px rgba(247, 147, 30, 0.08); 
        }

        .booking-input-wrap svg { 
          color: #a48c75; 
          flex-shrink: 0; 
        }

        .booking-input-wrap input { 
          flex: 1; 
          border: none; 
          background: transparent; 
          padding: 12px; 
          font-size: 14px; 
          color: #2d3748; 
          outline: none; 
        }

        .booking-readonly-input {
          display: flex;
          align-items: center;
          background: #edf2f7;
          border: 1.5px solid #e2e8f0;
          border-radius: 8px;
          padding: 12px 14px;
          font-size: 13.5px;
          font-weight: 600;
          color: #4a5568;
        }

        .booking-select { 
          padding: 12px 14px; 
          background: #fffcf9; 
          border: 1.5px solid #ebd3bd; 
          border-radius: 8px; 
          font-size: 14px; 
          color: #2d3748; 
          outline: none; 
          transition: all 0.25s ease; 
          width: 100%; 
        }

        .booking-select:focus { 
          border-color: #f7931e; 
          background: white; 
        }

        .booking-textarea { 
          padding: 12px 14px; 
          background: #fffcf9; 
          border: 1.5px solid #ebd3bd; 
          border-radius: 8px; 
          font-size: 14px; 
          color: #2d3748; 
          outline: none; 
          resize: vertical; 
          width: 100%; 
          font-family: inherit; 
          transition: all 0.25s ease; 
        }

        .booking-textarea:focus { 
          border-color: #f7931e; 
          background: white; 
        }

        /* Success screen styling */
        .booking-confirmed-card { 
          background: white; 
          border: 1.5px solid #f3e6da; 
          border-radius: 20px;
          text-align: center; 
          padding: 60px 40px; 
          max-width: 600px;
          margin: 0 auto;
          box-shadow: 0 4px 24px rgba(247, 147, 30, 0.05);
        }

        .confirmed-icon { 
          font-size: 72px; 
          margin-bottom: 24px; 
        }

        .confirmed-title { 
          font-size: 30px; 
          font-weight: 900; 
          color: #0a58a4; 
          font-family: 'Outfit', sans-serif; 
          margin-bottom: 12px; 
        }

        .confirmed-sub { 
          font-size: 16px; 
          color: #718096; 
          margin-bottom: 36px; 
        }

        .confirmed-details { 
          background: #fffcf9; 
          border: 1.5px solid #f3e6da;
          border-radius: 12px; 
          padding: 24px; 
          margin-bottom: 28px; 
          display: flex; 
          flex-direction: column; 
          gap: 12px; 
          text-align: left; 
        }

        .confirmed-row { 
          display: flex; 
          align-items: center; 
          gap: 10px; 
          font-size: 15px; 
          color: #2d3748; 
        }

        .confirmed-row strong {
          color: #4a5568;
        }

        .confirmed-note { 
          font-size: 14.5px; 
          color: #718096; 
          margin-bottom: 32px; 
          line-height: 1.5;
        }

        .back-to-home-btn {
          padding: 14px 32px;
          background: #f7931e;
          color: white;
          border: none;
          border-radius: 99px;
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px rgba(247,147,30,0.25);
        }

        .back-to-home-btn:hover {
          background-color: #e57d09;
          transform: translateY(-2px);
        }

        .auth-spinner { 
          width: 20px; 
          height: 20px; 
          border: 2px solid rgba(255,255,255,0.3); 
          border-top-color: white; 
          border-radius: 50%; 
          display: inline-block;
          animation: spin 0.7s linear infinite; 
        }

        @keyframes spin { 
          to { transform: rotate(360deg); } 
        }

        /* Why Consult Section */
        .why-consult-section {
          margin-top: 64px;
          padding-top: 48px;
          border-top: 1.5px solid #ebd3bd;
          text-align: center;
        }

        .why-consult-title {
          font-size: 32px;
          font-weight: 900;
          color: #0a58a4;
          font-family: 'Outfit', sans-serif;
          margin-bottom: 48px;
          letter-spacing: -0.5px;
        }

        .why-consult-title .highlight-text {
          color: #f7931e;
        }

        .why-consult-stepper {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          max-width: 1000px;
          margin: 0 auto;
          gap: 8px;
        }

        .why-step-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 180px;
        }

        .why-step-img-container {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 2px solid #f7931e;
          padding: 4px;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 4px 14px rgba(247, 147, 30, 0.06);
        }

        .why-step-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .why-step-item:hover .why-step-img-container {
          transform: scale(1.06);
          border-color: #0a58a4;
          box-shadow: 0 6px 18px rgba(10, 88, 164, 0.12);
        }

        .why-step-desc {
          font-size: 13.5px;
          color: #718096;
          line-height: 1.5;
          margin-top: 16px;
          font-weight: 500;
        }

        .why-step-desc strong {
          color: #2d3748;
          font-weight: 700;
        }

        .why-step-connector {
          height: 1.5px;
          border-top: 2.5px dotted #ebd3bd;
          flex-grow: 1;
          margin-top: 60px;
          max-width: 80px;
        }

        /* Responsive styling */
        @media (max-width: 1024px) {
          .booking-grid {
            grid-template-columns: 1fr;
          }
          .booking-sidebar-card {
            position: static;
            width: 100%;
          }
        }

        @media (max-width: 768px) {
          .booking-datetime-picker {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .booking-form-row {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .time-slots-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .why-consult-stepper {
            flex-direction: column;
            align-items: center;
            gap: 32px;
          }
          .why-step-connector {
            display: none;
          }
          .why-step-item {
            max-width: 260px;
          }
        }
      `}</style>
    </div>
  );
}
