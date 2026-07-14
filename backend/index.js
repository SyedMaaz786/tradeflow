require("dotenv").config();
require("./firebaseAdmin");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const verifyToken = require("./middleware/auth");
const rateLimit = require("express-rate-limit");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const stockRoute = require("./stock");
const { WalletModel } = require("./model/WalletModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://tradeflow-frontend-g9gu.onrender.com",
      "https://tradeflowtradeflow-dashboard.onrender.com",
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use("/stock", stockRoute);

// max 20 orders per minute per IP - stops someone spamming the order endpoint
const orderLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: "Too many orders placed, please slow down",
});
app.use("/stock", stockRoute);

app.get("/addHoldings", verifyToken, async (req, res) => {
  let tempHoldings = [
    {
      name: "BHARTIARTL",
      qty: 2,
      avg: 538.05,
      price: 541.15,
      net: "+0.58%",
      day: "+2.99%",
    },
    {
      name: "HDFCBANK",
      qty: 2,
      avg: 1383.4,
      price: 1522.35,
      net: "+10.04%",
      day: "+0.11%",
    },
    {
      name: "HINDUNILVR",
      qty: 1,
      avg: 2335.85,
      price: 2417.4,
      net: "+3.49%",
      day: "+0.21%",
    },
    {
      name: "INFY",
      qty: 1,
      avg: 1350.5,
      price: 1555.45,
      net: "+15.18%",
      day: "-1.60%",
      isLoss: true,
    },
    {
      name: "ITC",
      qty: 5,
      avg: 202.0,
      price: 207.9,
      net: "+2.92%",
      day: "+0.80%",
    },
    {
      name: "KPITTECH",
      qty: 5,
      avg: 250.3,
      price: 266.45,
      net: "+6.45%",
      day: "+3.54%",
    },
    {
      name: "M&M",
      qty: 2,
      avg: 809.9,
      price: 779.8,
      net: "-3.72%",
      day: "-0.01%",
      isLoss: true,
    },
    {
      name: "RELIANCE",
      qty: 1,
      avg: 2193.7,
      price: 2112.4,
      net: "-3.71%",
      day: "+1.44%",
    },
    {
      name: "SBIN",
      qty: 4,
      avg: 324.35,
      price: 430.2,
      net: "+32.63%",
      day: "-0.34%",
      isLoss: true,
    },
    {
      name: "SGBMAY29",
      qty: 2,
      avg: 4727.0,
      price: 4719.0,
      net: "-0.17%",
      day: "+0.15%",
    },
    {
      name: "TATAPOWER",
      qty: 5,
      avg: 104.2,
      price: 124.15,
      net: "+19.15%",
      day: "-0.24%",
      isLoss: true,
    },
    {
      name: "TCS",
      qty: 1,
      avg: 3041.7,
      price: 3194.8,
      net: "+5.03%",
      day: "-0.25%",
      isLoss: true,
    },
    {
      name: "WIPRO",
      qty: 4,
      avg: 489.3,
      price: 577.75,
      net: "+18.08%",
      day: "+0.32%",
    },
  ];
  tempHoldings.forEach((item) => {
    let newHolding = new HoldingsModel({
      userId: req.user.uid,
      name: item.name,
      qty: item.qty,
      avg: item.avg,
      price: item.price,
      net: item.day,
      day: item.day,
    });
    newHolding.save();
  });
  res.send("Done!");
});

app.get("/addPositions", verifyToken, async (req, res) => {
  let tempPositions = [
    {
      product: "CNC",
      name: "EVEREADY",
      qty: 2,
      avg: 316.27,
      price: 312.35,
      net: "+0.58%",
      day: "-1.24%",
      isLoss: true,
    },
    {
      product: "CNC",
      name: "JUBLFOOD",
      qty: 1,
      avg: 3124.75,
      price: 3082.65,
      net: "+10.04%",
      day: "-1.35%",
      isLoss: true,
    },
  ];

  tempPositions.forEach((item) => {
    let newPosition = new PositionsModel({
      userId: req.user.uid,
      product: item.product,
      name: item.name,
      qty: item.qty,
      avg: item.avg,
      price: item.price,
      net: item.net,
      day: item.day,
      isLoss: item.isLoss,
    });

    newPosition.save();
  });
  res.send("Done!");
});

// only send back the holdings that belong to the logged in user
app.get("/allHoldings", verifyToken, async (req, res) => {
  let allHoldings = await HoldingsModel.find({ userId: req.user.uid });
  res.json(allHoldings);
});

// only send back the positions that belong to the logged in user
app.get("/allPositions", verifyToken, async (req, res) => {
  let allPositions = await PositionsModel.find({ userId: req.user.uid });
  res.json(allPositions);
});

// only send back the orders that belong to the logged in user
app.get("/allOrders", verifyToken, async (req, res) => {
  let allOrders = await OrdersModel.find({ userId: req.user.uid });
  res.json(allOrders);
});

app.post("/newOrder", verifyToken, orderLimiter, async (req, res) => {
  const orderQty = Number(req.body.qty);
  const orderPrice = Number(req.body.price);
  const stockName = req.body.name;
  const mode = req.body.mode;

  // basic checks - reject garbage before touching the database
  if (!stockName || typeof stockName !== "string") {
    return res.status(400).send("Stock name is required");
  }

  if (!Number.isFinite(orderQty) || orderQty <= 0) {
    return res.status(400).send("Quantity must be a positive number");
  }

  if (!Number.isFinite(orderPrice) || orderPrice <= 0) {
    return res.status(400).send("Price must be a positive number");
  }

  if (mode !== "BUY" && mode !== "SELL") {
    return res.status(400).send("Mode must be BUY or SELL");
  }

  const orderValue = orderQty * orderPrice;

  if (mode === "BUY") {
    const wallet = await WalletModel.findOneAndUpdate(
      { userId: req.user.uid, balance: { $gte: orderValue } },
      { $inc: { balance: -orderValue } },
      { new: true },
    );

    if (!wallet) {
      return res.status(400).send("Insufficient balance");
    }

    const existingHolding = await HoldingsModel.findOne({
      userId: req.user.uid,
      name: stockName,
    });

    if (existingHolding) {
      // weighted average cost, same formula real brokers use:
      // newAvg = (oldQty * oldAvg + newQty * newPrice) / (oldQty + newQty)
      const totalQty = existingHolding.qty + orderQty;
      const newAvg =
        (existingHolding.qty * existingHolding.avg + orderQty * orderPrice) /
        totalQty;

      existingHolding.qty = totalQty;
      existingHolding.avg = newAvg;
      existingHolding.price = orderPrice;
      await existingHolding.save();
    } else {
      const newHolding = new HoldingsModel({
        userId: req.user.uid,
        name: stockName,
        qty: orderQty,
        avg: orderPrice,
        price: orderPrice,
        net: "0%",
        day: "0%",
      });

      await newHolding.save();
    }
  }

  if (mode === "SELL") {
    const holding = await HoldingsModel.findOneAndUpdate(
      { userId: req.user.uid, name: stockName, qty: { $gte: orderQty } },
      { $inc: { qty: -orderQty } },
      { new: true },
    );

    if (!holding) {
      return res.status(400).send("Insufficient quantity");
    }

    if (holding.qty === 0) {
      await HoldingsModel.deleteOne({ _id: holding._id });
    }

    await WalletModel.findOneAndUpdate(
      { userId: req.user.uid },
      { $inc: { balance: orderValue } },
    );
  }

  let newOrder = new OrdersModel({
    userId: req.user.uid,
    name: stockName,
    qty: orderQty,
    price: orderPrice,
    mode: mode,
    status: "EXECUTED",
  });

  await newOrder.save();

  res.send("Order saved!");
});

app.get("/auth/user", verifyToken, async (req, res) => {
  let wallet = await WalletModel.findOne({ userId: req.user.uid });

  if (!wallet) {
    wallet = new WalletModel({
      userId: req.user.uid,
      balance: 100000,
    });
    await wallet.save();
  }

  res.json({
    uid: req.user.uid,
    name: req.user.name,
    email: req.user.email,
  });
});

app.get("/wallet", verifyToken, async (req, res) => {
  let wallet = await WalletModel.findOne({ userId: req.user.uid });

  if (!wallet) {
    return res.status(404).send("Wallet not found");
  }

  res.json(wallet);
});

app.post("/wallet/deposit", verifyToken, async (req, res) => {
  const amount = Number(req.body.amount);

  if (!Number.isFinite(amount) || amount <= 0) {
    return res.status(400).send("Enter a valid amount");
  }

  const wallet = await WalletModel.findOneAndUpdate(
    { userId: req.user.uid },
    { $inc: { balance: amount } },
    { new: true },
  );

  if (!wallet) {
    return res.status(404).send("Wallet not found");
  }

  res.json(wallet);
});

app.post("/wallet/withdraw", verifyToken, async (req, res) => {
  const amount = Number(req.body.amount);

  if (!Number.isFinite(amount) || amount <= 0) {
    return res.status(400).send("Enter a valid amount");
  }

  // only withdraws if balance is actually enough - same atomic pattern as orders
  const wallet = await WalletModel.findOneAndUpdate(
    { userId: req.user.uid, balance: { $gte: amount } },
    { $inc: { balance: -amount } },
    { new: true },
  );

  if (!wallet) {
    return res.status(400).send("Insufficient balance to withdraw");
  }

  res.json(wallet);
});

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Database Connection Failed");
    console.error(err);
  }
}

startServer();
