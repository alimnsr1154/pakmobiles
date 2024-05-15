/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Link } from 'react-router-dom'; // Import Link component
import './Signup.css';

export default class SignUp extends Component {
    render() {
        return (
            <form>
                <h3>Sign UP</h3>
                <div className="mb-3">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter full name"
                    />
                </div>
                <div className="mb-3">
                    <label>Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                    />  
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                <p className="signup-link text-center">Already have an account? <a href="/">Login</a></p>
                {/* <p className="signup-link text-center">Already have an account? <Link to="/login">Login</Link></p> */}
            </form>
        );
    }
}
