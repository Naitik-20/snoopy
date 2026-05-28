import { useState } from "react";
import {
  ArrowLeft,
  Tag,
  Gift,
  Lock,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    country: "India",
    address: "",
    city: "",
    region: "",
    zip: "",
  });


  const [showPromo, setShowPromo] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);

  const cartItems = [
    {
      id: 1,
      name: "JerHigh Banana Collagen Beauty Dog Treats",
      image:
        "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e",
      price: 260,
      mrp: 275,
      quantity: 1,
    },
    {
      id: 2,
      name: "Worex Suspension 15 Ml",
      image:
        "https://images.unsplash.com/photo-1583337130417-3346a1be7dee",
      price: 105,
      mrp: 110,
      quantity: 1,
    },
  ];

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const delivery = 75;
  const total = subtotal + delivery;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Puducherry",
];

  return (
    <div className="checkout-page">

      {/* HEADER */}
      <div className="checkout-topbar">
        <div className="checkout-topbar-inner container">

          <div className="checkout-logo-wrap">

            <h2>Checkout</h2>
          </div>

          <Link to="/" className="checkout-continue-link">
            Continue Browsing
          </Link>

        </div>
      </div>

      {/* MAIN */}
      <div className="checkout-layout container">

        {/* LEFT */}
        <div className="checkout-left">

          {/* LOGIN STATUS */}
          <div className="checkout-login-box">
            <span>
              Logged in as abc@gmail.com
            </span>

            <button>Log out</button>
          </div>

          {/* TITLE */}
          <h2 className="checkout-section-title">
            Delivery Details
          </h2>

          {checkoutStep===1 && (
           <> 
          {/* FORM */}
          <div className="checkout-form-grid">

            <div className="checkout-input-group">
              <label>First name *</label>

              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="checkout-input-group">
              <label>Last name *</label>

              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="checkout-input-group">
            <label>Phone *</label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="checkout-input-group">
            <label>Country / Region *</label>

            <div className="checkout-select-wrap">

              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
              >
                <option>India</option>
              </select>

              <ChevronDown size={18} />

            </div>
          </div>

          <div className="checkout-input-group">
            <label>Address *</label>

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="checkout-input-group">
            <label>City *</label>

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className="checkout-input-group">
            <label>Region *</label>

            <div className="checkout-select-wrap">

              <select
  name="region"
  value={formData.region}
  onChange={handleChange}
>
  <option value="">
    Select Region
  </option>

  {indianStates.map((state) => (
    <option key={state} value={state}>
      {state}
    </option>
  ))}
</select>

              <ChevronDown size={18} />

            </div>
          </div>

          <div className="checkout-input-group">
            <label>Zip / Postal code *</label>

            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
            />
          </div>

          {/* BUTTON */}
          <button className="checkout-save-btn"
          onClick={() => setCheckoutStep(2)}
          >
            Save & Continue
          </button>
         </>
        )}


        {checkoutStep > 1 && (
  <div className="delivery-summary">

    <div className="summary-header">

      <h3>Delivery details</h3>

      <button
        onClick={() => setCheckoutStep(1)}
      >
        Change
      </button>

    </div>

    <p>
      {formData.firstName} {formData.lastName}
    </p>

    <p>{formData.phone}</p>

    <p>
      {formData.address}, {formData.city}
    </p>

  </div>
)}

          {/* DELIVERY */}
          {checkoutStep >=2 && (
          <div className="checkout-next-section">
            <h3>Delivery Method</h3>
            <button className="checkout-save-btn" onClick={() => setCheckoutStep(3)} >
            Continue
            </button>
          </div>
          
          )}

          {/* PAYMENT */}
          {checkoutStep >=3 &&(
          <div className="checkout-next-section">
            <h3>Payment</h3>
          </div>
          )}

        </div>

        {/* RIGHT */}
        <div className="checkout-right">

          <div className="checkout-summary-card">

            <div className="checkout-summary-header">

              <h2>
                Order Summary
                <span>
                  ({cartItems.length} items)
                </span>
              </h2>

            </div>

            {/* ITEMS */}
            <div className="checkout-items">

              {cartItems.map((item) => (
                <div
                  className="checkout-item"
                  key={item.id}
                >

                  <div className="checkout-item-left">

                    <div className="checkout-item-image-wrap">
                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <span>
                        {item.quantity}
                      </span>
                    </div>

                    <div>
                      <h4>{item.name}</h4>
                    </div>

                  </div>

                  <div className="checkout-item-price">

                    {item.mrp > item.price && (
                      <p className="checkout-old-price">
                        ₹{item.mrp}
                      </p>
                    )}

                    <h5>
                      ₹{item.price}
                    </h5>

                  </div>

                </div>
              ))}

            </div>

            <div className="checkout-promo-box">

  {/* PROMO CODE */}

  <div className="promo-section">

    <button
      className="promo-toggle"
      onClick={() => setShowPromo(!showPromo)}
    >
      <div>
        <Tag size={17} />
        <span>Enter a promo code</span>
      </div>
    </button>

    {showPromo && (
      <div className="promo-input-wrap">

        <input
          type="text"
          placeholder="e.g., SAVE50"
        />

        <button>
          Apply
        </button>

      </div>
    )}

  </div>

  {/* GIFT CARD */}

  <div className="promo-section">

    <button
      className="promo-toggle"
      onClick={() => setShowGift(!showGift)}
    >
      <div>
        <Gift size={17} />
        <span>Redeem a gift card</span>
      </div>
    </button>

    {showGift && (
      <div className="promo-input-wrap">

        <input
          type="text"
          placeholder="Enter your code"
        />

        <button>
          Apply
        </button>

      </div>
    )}

  </div>

</div>
            {/* TOTALS */}
            <div className="checkout-totals">

              <div className="checkout-total-row">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="checkout-total-row">
                <span>Delivery</span>
                <span>₹{delivery}</span>
              </div>

              <div className="checkout-total-row final">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

            </div>

            {/* SECURE */}
            <div className="checkout-secure">
              <Lock size={15} />
              Secure Checkout
            </div>

          </div>

        </div>

      </div>

      <style>{`
        .checkout-page {
          background: var(--bg-main);
          min-height: 100vh;
          color: var(--text-dark);
        }

        .container {
          width: min(1280px, 92%);
          margin: auto;
        }

        /* TOPBAR */

        .checkout-topbar {
          background: white;
          border-bottom: 1px solid var(--border-light);
          position: sticky;
          top: 0;
          z-index: 40;
        }

        .checkout-topbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 0;
        }

        .checkout-logo-wrap {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .checkout-logo {
          width: 55px;
          height: 55px;
          object-fit: contain;
        }

        .checkout-logo-wrap h2 {
          font-size: 34px;
          text-transform: uppercase;
          font-family: var(--font-headers);
        }

        .checkout-continue-link {
          color: var(--primary-color);
          font-weight: 700;
          text-decoration: underline;
        }

        /* MAIN */

        .checkout-layout {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 42px;
          padding: 40px 0 70px;
        }

        /* LEFT */

        .checkout-left {
          background: white;
          padding: 36px;
          border-radius: 24px;
          border: 1px solid var(--border-light);
          box-shadow: var(--shadow-sm);
        }

        .checkout-login-box {
          background: #fff7ed;
          border-radius: 14px;
          padding: 16px 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 34px;
        }

        .checkout-login-box button {
          background: transparent;
          border: none;
          text-decoration: underline;
          cursor: pointer;
          font-weight: 600;
        }

        .checkout-section-title {
          font-size: 38px;
          margin-bottom: 32px;
          font-family: var(--font-headers);
          color: var(--secondary-color);
        }

        .checkout-form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 22px;
        }

        .checkout-input-group {
          margin-bottom: 24px;
        }

        .checkout-input-group label {
          display: block;
          margin-bottom: 10px;
          font-weight: 700;
          font-size: 14px;
        }

        .checkout-input-group input,
        .checkout-select-wrap select {
          width: 100%;
          border: 1.5px solid var(--border-light);
          border-radius: 14px;
          padding: 16px;
          background: white;
          font-size: 15px;
        }

        .checkout-input-group input:focus,
        .checkout-select-wrap select:focus {
          outline: none;
          border-color: var(--secondary-color);
        }

        .checkout-select-wrap {
          position: relative;
        }

        .checkout-select-wrap svg {
          position: absolute;
          top: 50%;
          right: 16px;
          transform: translateY(-50%);
          pointer-events: none;
          color: var(--text-medium);
        }

        .checkout-select-wrap select {
          appearance: none;
        }

        .checkout-save-btn {
          width: 100%;
          border: none;
          background: var(--secondary-color);
          color: white;
          border-radius: 16px;
          padding: 18px;
          font-size: 16px;
          font-weight: 800;
          cursor: pointer;
          margin-top: 10px;
          transition: 0.2s;
        }

        .checkout-save-btn:hover {
          background: var(--secondary-hover);
          transform: translateY(-2px);
        }

        .checkout-next-section {
          padding-top: 38px;
          margin-top: 38px;
          border-top: 1px solid var(--border-light);
        }

        .checkout-next-section h3 {
          font-size: 30px;
          color: var(--text-dark);
          font-family: var(--font-headers);
        }

        /* RIGHT */

        .checkout-right {
          position: sticky;
          top: 110px;
          height: fit-content;
        }

        .checkout-summary-card {
          background: white;
          border-radius: 24px;
          padding: 32px;
          border: 1px solid var(--border-light);
          box-shadow: var(--shadow-sm);
        }

        .checkout-summary-header {
          margin-bottom: 30px;
        }

        .checkout-summary-header h2 {
          font-size: 32px;
          font-family: var(--font-headers);
        }

        .checkout-summary-header span {
          font-size: 18px;
          color: var(--text-medium);
        }

        .checkout-items {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-bottom: 30px;
        }

        .checkout-item {
          display: flex;
          justify-content: space-between;
          gap: 20px;
        }

        .checkout-item-left {
          display: flex;
          gap: 16px;
          flex: 1;
        }

        .checkout-item-image-wrap {
          position: relative;
          width: 72px;
          height: 72px;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid var(--border-light);
          flex-shrink: 0;
        }

        .checkout-item-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .checkout-item-image-wrap span {
          position: absolute;
          top: -8px;
          right: -8px;
          width: 24px;
          height: 24px;
          background: var(--text-dark);
          color: white;
          border-radius: 50%;
          font-size: 12px;
          display: grid;
          place-items: center;
        }

        .checkout-item h4 {
          font-size: 15px;
          line-height: 1.6;
        }

        .checkout-old-price {
          text-decoration: line-through;
          color: var(--text-light);
          font-size: 14px;
        }

        .checkout-item-price h5 {
          font-size: 22px;
          color: var(--primary-color);
        }

        .delivery-summary {
  padding-bottom: 30px;
  border-bottom: 1px solid var(--border-light);
}

.summary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.summary-header h3 {
  font-size: 28px;
  font-family: var(--font-headers);
}

.summary-header button {
  background: transparent;
  border: none;
  text-decoration: underline;
  cursor: pointer;
  font-weight: 600;
}

.delivery-summary p {
  color: var(--text-medium);
  line-height: 1.8;
}

        .checkout-promo-box {
  border: 1px solid var(--border-light);
  border-radius: 18px;
  padding: 22px;
  margin-bottom: 30px;
}

.promo-section + .promo-section {
  margin-top: 18px;
}

.promo-toggle {
  width: 100%;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 0;
}

.promo-toggle div {
  display: flex;
  align-items: center;
  gap: 10px;
}

.promo-toggle span {
  font-size: 16px;
  text-decoration: underline;
  color: var(--text-dark);
}

.promo-input-wrap {
  display: flex;
  gap: 14px;
  margin-top: 18px;
}

.promo-input-wrap input {
  flex: 1;
  border: 1.5px solid var(--border-light);
  border-radius: 12px;
  padding: 14px;
  font-size: 15px;
}

.promo-input-wrap input:focus {
  outline: none;
  border-color: var(--secondary-color);
}

.promo-input-wrap button {
  border: none;
  background: #9ca3af;
  color: white;
  border-radius: 12px;
  padding: 0 24px;
  font-weight: 700;
  cursor: pointer;
}

        .checkout-totals {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .checkout-total-row {
          display: flex;
          justify-content: space-between;
          font-size: 16px;
        }

        .checkout-total-row.final {
          font-size: 28px;
          font-weight: 900;
          color: var(--text-dark);
          padding-top: 16px;
          border-top: 1px solid var(--border-light);
        }

        .checkout-secure {
          margin-top: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: var(--secondary-color);
          font-weight: 700;
        }

        /* RESPONSIVE */

        @media (max-width: 1024px) {
          .checkout-layout {
            grid-template-columns: 1fr;
          }

          .checkout-right {
            position: static;
          }
        }

        @media (max-width: 640px) {

           .promo-input-wrap {
             flex-direction: column;
            }

            .promo-input-wrap button {
              padding: 14px;
            }

          .checkout-topbar-inner {
            flex-direction: column;
            gap: 14px;
          }

          .checkout-form-grid {
            grid-template-columns: 1fr;
          }

          .checkout-left,
          .checkout-summary-card {
            padding: 22px;
          }

          .checkout-logo-wrap h2 {
            font-size: 24px;
          }

          .checkout-section-title,
          .checkout-summary-header h2 {
            font-size: 28px;
          }
        }
      `}</style>
    </div>
  );
}