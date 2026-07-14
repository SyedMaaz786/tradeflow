import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import GeneralContext from "./GeneralContext";
import { authHeader, API_URL } from "../authHeader";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, price }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(price || 0.0);
  const [error, setError] = useState("");

  // Added this line
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    axios
      .post(
        `${API_URL}/newOrder`,
        {
          name: uid,
          qty: stockQuantity,
          price: stockPrice,
          mode: "BUY",
        },
        authHeader(),
      )
      .then(() => {
        // let other components know an order just happened
        window.dispatchEvent(new Event("orderPlaced"));
        generalContext.closeBuyWindow();
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data);
        } else {
          setError("Something went wrong");
        }
      });
  };

  const handleCancelClick = () => {
    // Changed this line
    generalContext.closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      <div className="buttons">
        <span>
          Margin required ₹
          {(Number(stockQuantity) * Number(stockPrice)).toFixed(2)}
        </span>
        <div>
          <Link className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
