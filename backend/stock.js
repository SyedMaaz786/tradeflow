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

// simple in-memory cache so one Yahoo hiccup (e.g. 429 on the crumb endpoint)
// doesn't take the whole quote down — serves last known good data instead
const quoteCache = new Map(); // symbol -> { data, ts }
const CACHE_TTL_MS = 60_000; // 1 minute

router.get("/:symbol", async (req, res) => {
  const symbol = `${req.params.symbol}.NS`;
  const cached = quoteCache.get(symbol);

  // fresh cache hit — skip Yahoo entirely
  if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
    return res.json(cached.data);
  }

  try {
    const quote = await yahooFinance.quote(symbol);

    if (!quote) {
      return res.status(404).json({
        message: `No data found for ${symbol}`,
      });
    }

    const data = {
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
    };

    quoteCache.set(symbol, { data, ts: Date.now() });
    res.json(data);
  } catch (err) {
    console.error("Yahoo Finance Error:");
    console.error(err);

    // Yahoo failed — serve the last known good price if we have one,
    // flagged as stale, instead of a hard error
    if (cached) {
      return res.json({ ...cached.data, stale: true });
    }

    res.status(500).json({
      error: err.message,
      message: "Unable to fetch stock data",
    });
  }
});

module.exports = router;
