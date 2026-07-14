import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { authHeader, API_URL } from "../authHeader";

const Funds = () => {
  const [wallet, setWallet] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchWallet = () => {
      axios
        .get(`${API_URL}/wallet`, authHeader())
        .then((res) => {
          setWallet(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchWallet();

    window.addEventListener("orderPlaced", fetchWallet);
    window.addEventListener("walletUpdated", fetchWallet);

    return () => {
      window.removeEventListener("orderPlaced", fetchWallet);
      window.removeEventListener("walletUpdated", fetchWallet);
    };
  }, []);

  const balance = wallet ? wallet.balance : 0;

  const handleAddFunds = () => {
    const amount = window.prompt("Enter amount to add:");

    if (amount === null) return;

    axios
      .post(`${API_URL}/wallet/deposit`, { amount }, authHeader())
      .then((res) => {
        setWallet(res.data);
        setMessage("Funds added successfully");
        window.dispatchEvent(new Event("walletUpdated"));
      })
      .catch((err) => {
        if (err.response) {
          setMessage(err.response.data);
        } else {
          setMessage("Something went wrong");
        }
      });
  };

  const handleWithdraw = () => {
    const amount = window.prompt("Enter amount to withdraw:");

    if (amount === null) return;

    axios
      .post(`${API_URL}/wallet/withdraw`, { amount }, authHeader())
      .then((res) => {
        setWallet(res.data);
        setMessage("Withdrawal successful");
        window.dispatchEvent(new Event("walletUpdated"));
      })
      .catch((err) => {
        if (err.response) {
          setMessage(err.response.data);
        } else {
          setMessage("Something went wrong");
        }
      });
  };

  return (
    <div className="funds-page">
      <div className="funds-header">
        <p>Instant, zero-cost fund transfers with UPI</p>
        <div className="funds-buttons">
          <Link className="btn btn-green" onClick={handleAddFunds}>
            Add funds
          </Link>
          <Link className="btn btn-blue" onClick={handleWithdraw}>
            Withdraw
          </Link>
        </div>
      </div>

      {message && <p className="funds-message">{message}</p>}

      <div className="funds-card">
        <h3 className="title">Equity</h3>

        <div className="funds-row highlight">
          <p>Available margin</p>
          <p className="imp colored">{balance.toFixed(2)}</p>
        </div>
        <div className="funds-row">
          <p>Used margin</p>
          <p>0.00</p>
        </div>
        <div className="funds-row">
          <p>Available cash</p>
          <p>{balance.toFixed(2)}</p>
        </div>

        <hr />

        <div className="funds-row">
          <p>Opening Balance</p>
          <p>100000.00</p>
        </div>
        <div className="funds-row">
          <p>Payin</p>
          <p>100000.00</p>
        </div>
        <div className="funds-row">
          <p>SPAN</p>
          <p>0.00</p>
        </div>
        <div className="funds-row">
          <p>Delivery margin</p>
          <p>0.00</p>
        </div>
        <div className="funds-row">
          <p>Exposure</p>
          <p>0.00</p>
        </div>
        <div className="funds-row">
          <p>Options premium</p>
          <p>0.00</p>
        </div>

        <hr />

        <div className="funds-row">
          <p>Collateral (Liquid funds)</p>
          <p>0.00</p>
        </div>
        <div className="funds-row">
          <p>Collateral (Equity)</p>
          <p>0.00</p>
        </div>
        <div className="funds-row">
          <p>Total Collateral</p>
          <p>0.00</p>
        </div>
      </div>
    </div>
  );
};

export default Funds;
