import React from "react";

function Footer() {
  return (
    <footer style={{ backgroundColor: "rgb(250, 250, 250)" }}>
      <div className="container border-top mt-5 py-4 text-center">
        <img
          src="media/images/tradeflow_logo.png"
          style={{ width: "36px" }}
          alt="TradeFlow"
        />
        <p className="text-muted mt-2 mb-0" style={{ fontSize: "0.85rem" }}>
          TradeFlow — a paper-trading portfolio project. Not a real brokerage,
          no real money involved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
