# TradeFlow

TradeFlow is a full-stack stock trading simulation platform inspired by Zerodha. It allows users to authenticate securely, view live stock prices, buy and sell stocks, manage holdings, monitor portfolio performance, and track transactions through an interactive dashboard.

---

## Features

- User Authentication (Firebase Authentication)
- Secure Backend APIs
- Buy Stocks
- Sell Stocks
- Holdings Management
- Orders History
- Portfolio Dashboard
- Funds Management
- Live Stock Prices (Yahoo Finance API)
- Responsive UI
- MongoDB Database Integration

---

## Tech Stack

### Frontend

- React.js
- Material UI
- CSS

### Dashboard

- React.js
- Material UI
- Context API

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Firebase Admin SDK
- Yahoo Finance API

### Database

- MongoDB Atlas

### Authentication

- Firebase Authentication

---

## Project Structure

```
tradeflow/
│
├── frontend/
├── dashboard/
├── backend/
├── README.md
└── .gitignore
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/tradeflow.git
```

Move inside project

```bash
cd tradeflow
```

Install backend

```bash
cd backend
npm install
```

Install frontend

```bash
cd ../frontend
npm install
```

Install dashboard

```bash
cd ../dashboard
npm install
```

---

## Environment Variables

### Backend

```
PORT=
MONGO_URL=
JWT_SECRET=
```

### Frontend

```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
```

### Dashboard

```
REACT_APP_BACKEND_URL=
```

---

## Running Locally

Backend

```bash
cd backend
npm start
```

Frontend

```bash
cd frontend
npm start
```

Dashboard

```bash
cd dashboard
npm start
```

---

## Future Improvements

- Watchlist Persistence
- Candlestick Charts
- Portfolio Analytics
- Real-time Notifications
- Stock Search
- Profit & Loss Graphs

---

## Author

Syed Maaz
