import React, { useState } from "react";
import "./css/style.css";
import "./fonts/material-icon/css/material-design-iconic-font.css";
import loginPicture from "../../../assest/login.png";
import logo from '../../../assest/logo.png'
import { useNavigate } from "react-router-dom";
import User from "../../../hcmut_ssps_complex_data.json";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and Password cannot be empty.");
      return;
    }
    const user = User.accounts.find(
      (account) => account.email === email && account.password === password
    );

    if (user) {
      setError(""); 
      localStorage.setItem("userInfo", JSON.stringify(user));
      localStorage.setItem("role", user.role);
      if (user.role === "admin") {
        navigate("/admin/admin-info", { state: { userInfo: user } });
      } else if (user.role === "student") {
        navigate("/student/account-info", { state: { userInfo: user } });
      } else {
        setError("Unauthorized role!");
      }
    } else {
      setError("Invalid email or password!");
    }
  };

  return (
    <div className="login">
      <div className="background">
        <div className="left-section">
          <img src={loginPicture} alt="Illustration" className="illustration" />
        </div>
        <div className="right-section">
          <section className="sign-in">
            <div className="container">
              <div className="signin-content">
                <div className="signin-form">
                  <h2 className="form-title">
                    Welcome to <br />
                    <strong>Printing service HCMUT</strong>
                  </h2>
                  <div className="logo-title">
                    <img src={logo} alt="logo" />
                  </div>
                  <form
                    method="POST"
                    className="register-form"
                    id="login-form"
                    onSubmit={handleSubmit}
                  >
                    <div className="form-group">
                      <label htmlFor="your_email">
                        <i className="zmdi zmdi-account material-icons-name"></i>
                      </label>
                      <input
                        type="text"
                        name="your_email"
                        id="your_email"
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="your_pass">
                        <i className="zmdi zmdi-lock"></i>
                      </label>
                      <input
                        type="password"
                        name="your_pass"
                        id="your_pass"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    {error && (
                      <div className="invalid" style={{ color: "red" }}>
                        {error}
                      </div>
                    )}
                    <div className="form-group">
                      <input
                        type="checkbox"
                        name="remember-me"
                        id="remember-me"
                        className="agree-term"
                      />
                      <label
                        htmlFor="remember-me"
                        className="label-agree-term"
                      >
                        <span>
                          <span></span>
                        </span>
                        Remember me
                      </label>
                      <a
                        href="/forgot-password"
                        className="forgot-password-link"
                      >
                        Forgot Password?
                      </a>
                    </div>
                    <div className="form-group form-button">
                      <input
                        type="submit"
                        name="signin"
                        id="signin"
                        className="form-submit"
                        value="Login"
                        style={{ width: "278px", marginLeft: "20px" }}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Login;
