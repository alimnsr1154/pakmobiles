import React, { Component } from "react";
import axios from 'axios';
import '../css/Signup.css';
export default class SignUp extends Component {

    handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            name: event.target.elements.name.value,
            email: event.target.elements.email.value,
            password: event.target.elements.password.value,
        };

        try {
            const response = await axios.post('http://localhost:5000/signup', formData);
            console.log('Sign-up successful', response.data);
            //navigate to login page here: singup ---->> login
            
        } catch (err) {
            console.error('Error during sign-up', err);
        }
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign UP</h3>
                <div className="mb-3">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter full name"
                        name="name"
                    />
                </div>
                <div className="mb-3">
                    <label>Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        name="email"
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        name="password"
                    />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                <p className="signup-link text-center">Already have an account? <a href="/login">Login</a></p>
            </form>
        );
    }
}
