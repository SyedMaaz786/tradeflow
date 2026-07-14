import React, { useEffect, useState } from "react";
import axios from "axios";
import { authHeader, API_URL } from "../authHeader";

const Summary = ({ user }) => {
  const [holdings, setHoldings] = useState([]);
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      axios.get(`${API_URL}/allHoldings`, authHeader()).then((res) => {
        setHoldings(res.data);
      });

      axios.get(`${API_URL}/wallet`, authHeader()).then((res) => {
        setWallet(res.data);
      });
    };

    fetchData();

    window.addEventListener("orderPlaced", fetchData);
    window.addEventListener("walletUpdated", fetchData);

    return () => {
      window.removeEventListener("orderPlaced", fetchData);
      window.removeEventListener("walletUpdated", fetchData);
    };
  }, []);

  let totalInvestment = 0;
  let currentValue = 0;

  holdings.forEach((stock) => {
    totalInvestment += stock.avg * stock.qty;
    currentValue += stock.price * stock.qty;
  });

  const pnl = currentValue - totalInvestment;
  const isProfit = pnl >= 0;
  const pnlPercent =
    totalInvestment > 0 ? ((pnl / totalInvestment) * 100).toFixed(2) : "0.00";

  const availableBalance = wallet ? wallet.balance : 0;

  return (
    <>
      <div className="username">
        <h6>Hi, {user ? user.name : "User"}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>{availableBalance.toFixed(2)}</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>0</span>{" "}
            </p>
            <p>
              Opening balance <span>100000.00</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({holdings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={isProfit ? "profit" : "loss"}>
              {pnl.toFixed(2)} <small>{pnlPercent}%</small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{currentValue.toFixed(2)}</span>{" "}
            </p>
            <p>
              Investment <span>{totalInvestment.toFixed(2)}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
