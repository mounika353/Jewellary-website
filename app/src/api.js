import axios from 'axios';

const backendUrl = 'http://localhost:3001/api';

const GOLD_PRICES = {
  IN: { name: "India", symbol: "₹", price: 15320, unit: "per gram (24K)" },
  US: { name: "USA", symbol: "$", price: 139.50, unit: "per gram (24K)" },
  GB: { name: "UK", symbol: "£", price: 104.47, unit: "per gram (24K)" },
  AE: { name: "UAE", symbol: "AED", price: 521.75, unit: "per gram (24K)" },
  SG: { name: "Singapore", symbol: "SGD", price: 179.09, unit: "per gram (24K)" },
};

const COUPONS = [
  { code: "GOLD10", discount: 10, type: "percent", description: "10% off on all items" },
  { code: "FLAT500", discount: 500, type: "flat", description: "₹500 flat off" },
  { code: "NEWUSER", discount: 15, type: "percent", description: "15% off for new users" },
];

export const getSessionId = () => {
  return "session-" + Math.random().toString(36).substr(2, 9);
};

export const api = {
  get: async (endpoint) => {
    if (endpoint === '/products') {
      try {
        const response = await axios.get(`${backendUrl}/items`);
        return response.data;
      } catch (err) {
        console.error("API error", err);
        return [];
      }
    }
    if (endpoint === '/gold-rates') {
      const rates = Object.keys(GOLD_PRICES).map(key => ({
        country: GOLD_PRICES[key].name,
        currency: GOLD_PRICES[key].symbol,
        rate: GOLD_PRICES[key].price,
        unit: GOLD_PRICES[key].unit
      }));
      return {
        updatedAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST",
        rates
      };
    }
    if (endpoint === '/coupons') {
      return COUPONS;
    }
    return null;
  }
};
