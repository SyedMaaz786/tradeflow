const express = require("express");
const YahooFinance = require("yahoo-finance2").default;

const yahooFinance = new YahooFinance();

const router = express.Router();

// indexes like NIFTY/SENSEX use their own symbols and should NOT get .NS appended
router.get("/index/:symbol", async (req, res) => {
  try {
    const quote = await yahooFinance.quote(req.params.symbol);

    if (!quote) {
      return res.status(404).json({
        message: `No data found for ${req.params.symbol}`,
      });
    }

    res.json({
      name: quote.shortName,
      currentPrice: quote.regularMarketPrice,
      changePercent: quote.regularMarketChangePercent,
    });
  } catch (err) {
    console.error("Yahoo Finance Error (index):");
    console.error(err);

    res.status(500).json({
      error: err.message,
      message: "Unable to fetch index data",
    });
  }
});

router.get("/:symbol", async (req, res) => {
  try {
    const symbol = `${req.params.symbol}.NS`;

    const quote = await yahooFinance.quote(symbol);

    if (!quote) {
      return res.status(404).json({
        message: `No data found for ${symbol}`,
      });
    }

    res.json({
      name: quote.shortName,
      symbol: quote.symbol,
      currentPrice: quote.regularMarketPrice,
      previousClose: quote.regularMarketPreviousClose,
      open: quote.regularMarketOpen,
      dayHigh: quote.regularMarketDayHigh,
      dayLow: quote.regularMarketDayLow,
      volume: quote.regularMarketVolume,
      high52: quote.fiftyTwoWeekHigh,
      low52: quote.fiftyTwoWeekLow,
      changePercent: quote.regularMarketChangePercent,
    });
  } catch (err) {
    console.error("Yahoo Finance Error:");
    console.error(err);

    res.status(500).json({
      error: err.message,
      message: "Unable to fetch stock data",
    });
  }
});

module.exports = router;
