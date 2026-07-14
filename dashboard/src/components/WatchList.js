import React, { useState, useEffect, useContext } from "react";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import {
  Tooltip,
  Grow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";

import { watchlist } from "../data/data";
import { DoughnutChart } from "./DoughnoutChart";
import { API_URL } from "../authHeader";

const labels = watchlist.map((subArray) => subArray.name);

const WatchList = () => {
  const [stocks, setStocks] = useState(watchlist);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchLivePrices = async () => {
      const updated = [];

      for (const stock of watchlist) {
        try {
          const res = await axios.get(
            `${API_URL}/stock/${encodeURIComponent(stock.name)}`,
          );
          const isDown = res.data.changePercent < 0;

          updated.push({
            ...stock,
            price: res.data.currentPrice,
            percent: `${res.data.changePercent.toFixed(2)}%`,
            isDown,
          });
        } catch (err) {
          updated.push(stock);
        }

        // small gap between requests so Yahoo Finance doesn't rate-limit us
        await new Promise((resolve) => setTimeout(resolve, 300));
      }

      setStocks(updated);
    };

    fetchLivePrices();
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Portfolio Allocation",
        data: stocks.map((stock) => stock.price),
        backgroundColor: [
          "#4184F3",
          "#00BCD4",
          "#4CAF50",
          "#FF9800",
          "#9C27B0",
          "#F44336",
          "#795548",
          "#607D8B",
          "#FFC107",
        ],
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };
  const filteredStocks = stocks.filter((stock) =>
    stock.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          className="search"
          placeholder="Search eg: INFY, RELIANCE, TCS"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="counts">
          {filteredStocks.length} / {stocks.length}
        </span>
      </div>

      <ul className="list">
        {filteredStocks.map((stock, index) => (
          <WatchListItem stock={stock} key={index} />
        ))}
      </ul>

      <DoughnutChart data={data} />
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);

  const handleMouseEnter = (e) => {
    setShowWatchlistActions(true);
  };

  const handleMouseLeave = (e) => {
    setShowWatchlistActions(false);
  };

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="item-info">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="down" />
          )}
          <span className="price">{stock.price}</span>
        </div>
      </div>
      {showWatchlistActions && (
        <div className="actions-row">
          <WatchListActions uid={stock.name} price={stock.price} />
        </div>
      )}
    </li>
  );
};

const WatchListActions = ({ uid, price }) => {
  const generalContext = useContext(GeneralContext);
  const [openMenu, setOpenMenu] = useState(false);
  const [openAnalytics, setOpenAnalytics] = useState(false);
  const [stockData, setStockData] = useState(null);

  const handleBuyClick = () => {
    generalContext.openBuyWindow(uid, price);
  };

  const handleSellClick = () => {
    generalContext.openSellWindow(uid, price);
  };

  const handleAnalyticsClick = async () => {
    try {
      const response = await axios.get(`${API_URL}/stock/${uid}`);

      setStockData(response.data);
      setOpenAnalytics(true);
    } catch (err) {
      console.error(err);
      alert("Unable to fetch stock data");
    }
  };

  return (
    <span className="actions">
      <span>
        <Tooltip
          title="Buy (B)"
          placement="top"
          arrow
          TransitionComponent={Grow}
          onClick={handleBuyClick}
        >
          <button className="buy">Buy</button>
        </Tooltip>
        <Tooltip
          title="Sell (S)"
          placement="top"
          arrow
          TransitionComponent={Grow}
          onClick={handleSellClick}
        >
          <button className="sell">Sell</button>
        </Tooltip>
        <Tooltip
          title="Analytics (A)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action" onClick={handleAnalyticsClick}>
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>
        <div className="more-wrapper">
          <Tooltip title="More">
            <button
              className="action"
              onClick={(e) => {
                e.stopPropagation();
                setOpenMenu(!openMenu);
              }}
            >
              <MoreHoriz className="icon" />
            </button>
          </Tooltip>

          {openMenu && (
            <div className="more-menu">
              <div
                className="menu-item"
                onClick={() => {
                  window.open(
                    `https://in.tradingview.com/symbols/NSE-${uid}/`,
                    "_blank",
                  );
                  setOpenMenu(false);
                }}
              >
                Open Chart
              </div>
            </div>
          )}
        </div>
        <Dialog
          open={openAnalytics}
          onClose={() => setOpenAnalytics(false)}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>{uid} Analytics</DialogTitle>

          <DialogContent dividers>
            {stockData ? (
              <>
                <p>
                  <strong>Current Price:</strong> ₹{stockData.currentPrice}
                </p>

                <p>
                  <strong>Today's Change:</strong>{" "}
                  {stockData.changePercent.toFixed(2)}%
                </p>

                <p>
                  <strong>Open:</strong> ₹{stockData.open}
                </p>

                <p>
                  <strong>Day High:</strong> ₹{stockData.dayHigh}
                </p>

                <p>
                  <strong>Day Low:</strong> ₹{stockData.dayLow}
                </p>

                <p>
                  <strong>Previous Close:</strong> ₹{stockData.previousClose}
                </p>

                <p>
                  <strong>52 Week High:</strong> ₹{stockData.high52}
                </p>

                <p>
                  <strong>52 Week Low:</strong> ₹{stockData.low52}
                </p>

                <p>
                  <strong>Volume:</strong> {stockData.volume.toLocaleString()}
                </p>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpenAnalytics(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </span>
    </span>
  );
};
