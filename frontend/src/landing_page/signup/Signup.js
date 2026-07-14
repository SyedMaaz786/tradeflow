import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";

function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password,
      );

      await updateProfile(userCredential.user, {
        displayName: user.fullName,
      });

      await sendEmailVerification(userCredential.user);

      setUser({
        fullName: "",
        email: "",
        password: "",
      });

      navigate("/login");
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <>
      <div className="container">
        <div className="row text-center mt-5">
          <h1>Open a TradeFlow Account</h1>
          <p className="text-muted mt-3">
            Start investing in stocks, mutual funds and more.
          </p>
        </div>

        <div className="row mt-5 align-items-center">
          <div className="col-lg-6 text-center">
            <img
              src="media/images/signup.png"
              alt="Signup"
              style={{ width: "80%" }}
            />
          </div>

          <div className="col-lg-6">
            <div className="card shadow-sm p-4">
              <h3 className="mb-4">Create your account</h3>

              <form onSubmit={handleSignup}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    className="form-control"
                    placeholder="Enter your name"
                    value={user.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={user.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={user.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                {error && (
                  <div className="alert alert-danger mb-3">{error}</div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </form>

              <p className="text-center mt-3 text-muted">
                No charges for opening an account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
