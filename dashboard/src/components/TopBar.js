import React, { useEffect, useState } from "react";
import axios from "axios";

import Menu from "./Menu";
import { API_URL } from "../authHeader";

const TopBar = ({ user }) => {
  const [nifty, setNifty] = useState(null);
  const [sensex, setSensex] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/stock/index/%5ENSEI`)
      .then((res) => setNifty(res.data))
      .catch((err) => console.log(err));

    axios
      .get(`${API_URL}/stock/index/%5EBSESN`)
      .then((res) => setSensex(res.data))
      .catch((err) => console.log(err));
  }, []);

  const niftyClass = nifty && nifty.changePercent >= 0 ? "profit" : "loss";
  const sensexClass = sensex && sensex.changePercent >= 0 ? "profit" : "loss";

  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points">
            {nifty ? nifty.currentPrice.toFixed(2) : "..."}
          </p>
          <p className={`percent ${niftyClass}`}>
            {nifty ? `${nifty.changePercent.toFixed(2)}%` : ""}
          </p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points">
            {sensex ? sensex.currentPrice.toFixed(2) : "..."}
          </p>
          <p className={`percent ${sensexClass}`}>
            {sensex ? `${sensex.changePercent.toFixed(2)}%` : ""}
          </p>
        </div>
      </div>

      <Menu user={user} />
    </div>
  );
};

export default TopBar;
