import React, { useState } from "react";
import "./AccountPage.css";

const AccountPage = ({ defaultTab = "account" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const renderContent = () => {
    switch (activeTab) {
      case "orders":
        return (
          <div className="account-section">
            <h2>My Orders</h2>
            <p>You have no orders yet.</p>
          </div>
        );

      case "addresses":
        return (
          <div className="account-section">
            <h2>My Addresses</h2>
            <p>No saved addresses found.</p>
          </div>
        );

      case "wallet":
        return (
          <div className="account-section">
            <h2>My Wallet</h2>
            <p>Your wallet balance is ₹0.</p>
          </div>
        );

      case "wishlist":
        return (
          <div className="account-section">
            <h2>My Wishlist</h2>
            <p>Your wishlist is empty.</p>
          </div>
        );

      case "bookings":
        return (
          <div className="account-section">
            <h2>My Bookings</h2>
            <p>No bookings available.</p>
          </div>
        );

      default:
        return (
          <div className="account-section">
            <h2>Account</h2>

            <p className="account-subtitle">
              View and edit your personal info below.
            </p>

            <div className="account-divider"></div>

            <div className="account-form-section">
              <h3>Personal info</h3>

              <p>Update your personal information.</p>

              <div className="account-form-grid">
                <div className="account-field">
                  <label>First name</label>
                  <input type="text" />
                </div>

                <div className="account-field">
                  <label>Last name</label>
                  <input type="text" />
                </div>

                <div className="account-field full-width">
                  <label>Phone</label>
                  <input type="text" />
                </div>
              </div>

              <div className="account-buttons">
                <button className="discard-btn">Discard</button>

                <button className="update-btn">
                  Update Info
                </button>
              </div>
            </div>

            <div className="account-divider"></div>

            <div className="login-info">
              <h3>Login info</h3>

              <p>
                View and update your login email and password.
              </p>

              <div className="login-detail">
                <span>Login email:</span>
                <p>abc@gmail.com</p>
              </div>

              <button className="text-link">
                Change Email
              </button>

              <div className="login-detail">
                <span>Password:</span>
                <p>********</p>
              </div>

              <button className="text-link">
                Change Password
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="account-page">
      <div className="account-tabs">
        <button
          className={activeTab === "account" ? "active" : ""}
          onClick={() => setActiveTab("account")}
        >
          My Account
        </button>

        <button
          className={activeTab === "orders" ? "active" : ""}
          onClick={() => setActiveTab("orders")}
        >
          My Orders
        </button>

        <button
          className={activeTab === "addresses" ? "active" : ""}
          onClick={() => setActiveTab("addresses")}
        >
          My Addresses
        </button>

        <button
          className={activeTab === "wallet" ? "active" : ""}
          onClick={() => setActiveTab("wallet")}
        >
          My Wallet
        </button>

        <button
          className={activeTab === "wishlist" ? "active" : ""}
          onClick={() => setActiveTab("wishlist")}
        >
          My Wishlist
        </button>

        <button
          className={activeTab === "bookings" ? "active" : ""}
          onClick={() => setActiveTab("bookings")}
        >
          My Bookings
        </button>
      </div>

      {renderContent()}
    </div>
  );
};

export default AccountPage;