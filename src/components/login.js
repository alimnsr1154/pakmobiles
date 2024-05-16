/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import axios from 'axios';
import './login.css';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
//import { withRouter } from 'react-router-dom';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      };
  }
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
  
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      console.log('Login response:', response.data);
      if (response.data.message === 'Login successful') {
        console.log('Login successful');
        toast.success('Login successful');
        this.props.navigate('/dashboard'); // Use the navigate function from props
      } else {
        console.log('Login failed:', response.data.message);
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error('Error during login', err);
      toast.error('Error during login');
    }
  };  
  
  render() {
    const { email, password, isLoggedIn } = this.state;
    return (
        
      <div>
        <form onSubmit={this.handleSubmit}>
          <h3>Sign In</h3>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
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
              className="form-control"
              placeholder="Enter password"
              name="password"
              value={password}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="mb-3">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
            </div>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
          <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
          </p>
          <p className="signup-link text-center">Don't have an account? <a href="/">Sign up</a></p>
        </form>
        <ToastContainer />
      </div>
    );
  }
}
export default Login;
//export default withRouter(Login);