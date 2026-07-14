// small helper so every axios call can send the logged in user's token
// backend uses this token to know which user is asking for data

export const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://tradeflow-backend-uizs.onrender.com";

export function authHeader() {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}
