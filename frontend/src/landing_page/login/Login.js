import React, { useState } from "react";
import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password,
      );

      const token = await userCredential.user.getIdToken();

      localStorage.setItem("token", token);

      window.location.href = `http://localhost:3001?token=${token}`;
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  const handleForgotPassword = async () => {
    setError("");
    setResetMessage("");

    if (!user.email) {
      setError("Enter your email above first, then click Forgot password");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, user.email);
      setResetMessage("Password reset link sent to your email");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card p-4 shadow">
        <h2 className="mb-4">Login</h2>

        <div className="mb-3">
          <label>Email</label>

          <input
            type="email"
            name="email"
            className="form-control"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>

          <input
            type="password"
            name="password"
            className="form-control"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {resetMessage && (
          <div className="alert alert-success">{resetMessage}</div>
        )}

        <button
          type="button"
          className="btn btn-primary w-100"
          disabled={loading}
          onClick={handleLogin}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p
          className="text-muted mt-3"
          style={{ cursor: "pointer" }}
          onClick={handleForgotPassword}
        >
          Forgot password?
        </p>
      </div>
    </div>
  );
}

export default Login;
