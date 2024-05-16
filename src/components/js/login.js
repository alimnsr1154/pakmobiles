// src/components/js/Login.js
import React, { Component, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/login.css';
import { UserContext } from '../../contexts/UserContext';

const LogInWithNavigate = (props) => {
  const navigate = useNavigate();
  const { setEmail } = useContext(UserContext);
  return <Login navigate={navigate} setEmail={setEmail} {...props} />;
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: "",
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    if (!email || !password) {
      this.setState({ errorMessage: "All fields are required." });
      return;
    }

    try {
      await axios.post("/login", { email, password });
      this.props.setEmail(email);
      this.props.navigate("/Dashboard");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        this.setState({ errorMessage: err.response.data });
      } else {
        this.setState({ errorMessage: "Log in failed. Please try again." });
      }
      console.error("Error during login", err);
    }
  };

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <form className="login-container" onSubmit={this.handleSubmit}>
          <h3>Log In</h3>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="login-input"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="login-input"
              placeholder="Enter password"
              name="password"
              value={password}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="login-error">
            {this.state.errorMessage && (
              <div className="error-message">{this.state.errorMessage}</div>
            )}
          </div>
          <div className="mb-3"></div>
          <div className="d-grid">
            <button type="submit" className="login-button">
              Submit
            </button>
          </div>
          <p className="signup-link text-center">
            Don't have an account? <a href="/">Sign up</a>
          </p>
        </form>
      </div>
    );
  }
}

export default LogInWithNavigate;
