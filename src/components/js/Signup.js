import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Signup.css";

// Wrapper functional component to use the navigate hook
const SignUpWithNavigate = (props) => {
  const navigate = useNavigate();
  return <SignUp navigate={navigate} {...props} />;
};

class SignUp extends Component {
  state = {
    errorMessage: "",
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    // Form validation
    if (!name || !email || !password) {
      this.setState({ errorMessage: "All fields are required." });
      return;
    }

    const formData = {
      name,
      email,
      password,
    };

    try {
      await axios.post("/signup", formData);
      this.props.navigate("/");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        this.setState({ errorMessage: err.response.data });
      } else {
        this.setState({ errorMessage: "Sign up failed. Please try again." });
      }
      console.error("Error during sign-up", err);
    }
  };

  render() {
    return (
        <form onSubmit={this.handleSubmit} className="signup-container">
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="signup-input"
            placeholder="Enter full name"
            name="name"
          />
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="signup-input"
            placeholder="Enter email"
            name="email"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="signup-input"
            placeholder="Enter password"
            name="password"
          />
        </div>
        <div class="signup-error">
          {this.state.errorMessage && (
            <div className="error-message">{this.state.errorMessage}</div>
          )}
        </div>
        <div className="d-grid">
          <button type="submit" className="signup-button">
            Submit
          </button>
        </div>
        <p className="signup-link text-center">
          Already have an account? <a href="/">Login</a>
        </p>
      </form>
    );
  }
}

export default SignUpWithNavigate;
