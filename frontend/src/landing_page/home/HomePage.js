import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      {/* Hero */}
      <div
        className="container text-center"
        style={{ padding: "80px 20px 60px" }}
      >
        <h1 style={{ fontWeight: "600" }}>
          Practice trading with{" "}
          <span style={{ color: "#4caf50" }}>real market data</span>
        </h1>
        <p className="text-muted mt-3" style={{ fontSize: "1.1rem" }}>
          TradeFlow is a paper-trading platform — trade real NSE stocks at real
          live prices, using virtual money. No real money, no risk.
        </p>
        <div className="mt-4">
          <Link
            to="/signup"
            className="btn btn-lg text-white me-3"
            style={{ backgroundColor: "#4caf50" }}
          >
            Get started free
          </Link>
          <Link
            to="/login"
            className="btn btn-lg"
            style={{ border: "1px solid #1a73e8", color: "#1a73e8" }}
          >
            Login
          </Link>
        </div>
      </div>

      {/* Features - only things that actually work in the app */}
      <div className="container" style={{ padding: "40px 20px 80px" }}>
        <h2 className="text-center mb-5" style={{ fontWeight: "500" }}>
          What you can actually do here
        </h2>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="p-4 h-100 border rounded">
              <h5 style={{ color: "#4caf50" }}>Live Market Data</h5>
              <p className="text-muted">
                Real-time NSE stock prices and index data (NIFTY 50, SENSEX),
                pulled live for every trade you place.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-4 h-100 border rounded">
              <h5 style={{ color: "#1a73e8" }}>Virtual Wallet</h5>
              <p className="text-muted">
                Every account starts with ₹1,00,000 in virtual funds. Add or
                withdraw funds, and every buy/sell updates your real balance
                instantly.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-4 h-100 border rounded">
              <h5 style={{ color: "#e53935" }}>Buy & Sell Orders</h5>
              <p className="text-muted">
                Place real buy and sell orders against live prices, with balance
                and quantity checks — you can't oversell or overspend.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-4 h-100 border rounded">
              <h5 style={{ color: "#4caf50" }}>Holdings & P&L Tracking</h5>
              <p className="text-muted">
                Track your holdings, average cost, current value, and
                profit/loss — all calculated live from your actual trades.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-4 h-100 border rounded">
              <h5 style={{ color: "#1a73e8" }}>Order History</h5>
              <p className="text-muted">
                Every order you place is logged with status and timestamp, so
                you can review your full trading activity.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-4 h-100 border rounded">
              <h5 style={{ color: "#e53935" }}>Secure Accounts</h5>
              <p className="text-muted">
                Signup requires email verification before you can trade, and
                your data is isolated per account — no one sees your portfolio
                but you.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Tech Stack */}
      <div className="container" style={{ padding: "20px 20px 80px" }}>
        <h2 className="text-center mb-5" style={{ fontWeight: "500" }}>
          Tech Stack
        </h2>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="p-4 h-100 border rounded">
              <h6 style={{ color: "#1a73e8" }}>Frontend</h6>
              <p className="text-muted mb-0">
                React, React Router, Bootstrap, Material UI, Chart.js
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-4 h-100 border rounded">
              <h6 style={{ color: "#4caf50" }}>Backend</h6>
              <p className="text-muted mb-0">
                Node.js, Express, MongoDB with Mongoose
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-4 h-100 border rounded">
              <h6 style={{ color: "#e53935" }}>Auth & Data</h6>
              <p className="text-muted mb-0">
                Firebase Authentication, Yahoo Finance API for live market data
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Screenshots */}
      <div className="container" style={{ padding: "20px 20px 80px" }}>
        <h2 className="text-center mb-5" style={{ fontWeight: "500" }}>
          A Look Inside
        </h2>

        <div className="row g-4">
          <div className="col-md-6">
            <img
              src="/media/images/screenshots/dashboard-summary.png"
              alt="Dashboard"
              className="img-fluid rounded border"
            />
            <p className="text-muted text-center mt-2">Dashboard overview</p>
          </div>
          <div className="col-md-6">
            <img
              src="/media/images/screenshots/buy-window.png"
              alt="Buy order window"
              className="img-fluid rounded border"
            />
            <p className="text-muted text-center mt-2">Placing a buy order</p>
          </div>

          <div className="col-md-6">
            <img
              src="/media/images/screenshots/holdings.png"
              alt="Holdings"
              className="img-fluid rounded border"
            />
            <p className="text-muted text-center mt-2">
              Holdings with live P&L
            </p>
          </div>

          <div className="col-md-6">
            <img
              src="/media/images/screenshots/orders.png"
              alt="Orders"
              className="img-fluid rounded border"
            />
            <p className="text-muted text-center mt-2">Order history</p>
          </div>

          <div className="col-md-6">
            <img
              src="/media/images/screenshots/funds.png"
              alt="Funds"
              className="img-fluid rounded border"
            />
            <p className="text-muted text-center mt-2">
              Wallet & funds management
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
