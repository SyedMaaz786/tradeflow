import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import { API_URL } from "../authHeader";

function Home() {
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState("");

  const checkUser = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "http://localhost:3000/login";
      return;
    }

    fetch(`${API_URL}/auth/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json().then((data) => {
          if (res.status === 403) {
            setAuthError(data.message);
            return null;
          }

          if (!res.ok) {
            localStorage.removeItem("token");
            window.location.href = "http://localhost:3000/login";
            return null;
          }

          // if we get here it means the email is verified now
          // clear any old error so the dashboard renders instead
          setAuthError("");
          return data;
        });
      })
      .then((data) => {
        if (data) {
          setUser(data);
        }
      })
      .catch((err) => {
        console.log("[DEBUG] fetch threw an error:", err);
      });
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");

    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
      window.history.replaceState({}, "", "/");
    }

    checkUser();
  }, []);

  useEffect(() => {
    // while we're stuck on the verify-email screen, keep checking
    // every 4 seconds in case the user verified in another tab
    if (!authError || user) return;

    const interval = setInterval(() => {
      checkUser();
    }, 4000);

    return () => clearInterval(interval);
  }, [authError, user]);

  if (authError) {
    return (
      <h2 style={{ padding: "30px" }}>
        {authError} - check your inbox for the verification link. This page will
        take you to the dashboard automatically once verified.
      </h2>
    );
  }

  if (!user) {
    return <h2 style={{ padding: "30px" }}>Loading...</h2>;
  }

  return (
    <>
      <TopBar user={user} />
      <Dashboard user={user} />
    </>
  );
}

export default Home;
