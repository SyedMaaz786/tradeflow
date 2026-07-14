export async function getCurrentUser() {
  const token = localStorage.getItem("token");

  if (!token) return null;

  const response = await fetch("http://localhost:3002/auth/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  return await response.json();
}
