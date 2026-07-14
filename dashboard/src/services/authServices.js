import { API_URL } from "../authHeader";

export async function getCurrentUser() {
  const token = localStorage.getItem("token");

  if (!token) return null;

  const response = await fetch(`${API_URL}/auth/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  return await response.json();
}
