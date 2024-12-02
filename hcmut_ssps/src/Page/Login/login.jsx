import React, { useState } from "react";
import "./css/style.css";
import "./fonts/material-icon/css/material-design-iconic-font.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import logo from '../../assest/logo.png';
import loginPicture from "../../assest/login.png"
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Tên tài khoản và mật khẩu cố định để kiểm tra
  const validUsername = "admin";
  const validPassword = "123456";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === validUsername && password === validPassword) {
      setError("");
      setSuccess("Login successful!");
    } else {
      setSuccess("");
      setError("Invalid username or password!");
    }
    onLogin();
  };

  return (
    <div className="background">
      <div className="left-section">
        <img
          src={loginPicture}
          alt="Illustration"
          className="illustration"
        />
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
                <form method="POST" className="register-form" id="login-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="your_username">
                      <i className="zmdi zmdi-account material-icons-name"></i>
                    </label>
                    <input
                      type="text"
                      name="your_username"
                      id="your_username"
                      placeholder="Your Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
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
                  {error && <div className="invalid" style={{ color: "red" }}>{error}</div>}
                  {success && <div className="valid" style={{ color: "green" }}>{success}</div>}
                  <div className="form-group">
                    <input type="checkbox" name="remember-me" id="remember-me" className="agree-term" />
                    <label htmlFor="remember-me" className="label-agree-term">
                      <span><span></span></span>Remember me
                    </label>
                    <a href="/forgot-password" className="forgot-password-link">Forgot Password?</a>
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
  );
};

export default Login;
