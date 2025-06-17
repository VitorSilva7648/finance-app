# 📈 Stock Prices App

A mobile application built with **React Native** to track real-time stock prices in a fast, simple, and user-friendly way.

## 🧩 Features

- 🔍 Search for stock symbols (e.g., AAPL, TSLA, PETR4.SA)
- 📊 View current stock prices and percentage changes
- ⏱️ Real-time updates (or configurable intervals)
- ⭐ Favorite stocks list
- 🌙 Light and dark theme support

## 📱 Technologies Used

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/) (optional)
- [Axios](https://axios-http.com/) for HTTP requests
- [React Navigation](https://reactnavigation.org/) for screen navigation
- Financial data API (e.g., [Alpha Vantage](https://www.alphavantage.co/), [Yahoo Finance API](https://www.yahoofinanceapi.com/), or similar)

## 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/stock-prices-app.git
   cd stock-prices-app
   
2. **Install dependencies:**
   ```bash
      npm install
      # or
      yarn install
   
3. **Configure your API key:**
   
   Create a *.env* file in the root directory of the project and add your stock data API key:
   
   API_KEY=your_api_key_here

5. **Run the app:**
   
   Start the development server:
   ```bash
   npx expo start
