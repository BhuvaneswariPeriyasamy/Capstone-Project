import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Register = () => {
  const navigate = useNavigate(); // Hook to access the navigate function

  const handleLoginRedirect = () => {
    navigate('/login'); // Navigate to the Login page when clicking Login
  };

  return (
    <div className="registration form">
      <header>Style Starts!</header>
      <form action="#">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" placeholder="Enter your first name" required />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" placeholder="Enter your last name" required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Create a password" required />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" placeholder="Confirm your password" required />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input type="text" id="address" placeholder="Enter your address" required />
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input type="text" id="city" placeholder="Enter your city" required />
        </div>

        <div className="form-group">
          <label htmlFor="state">State</label>
          <input type="text" id="state" placeholder="Enter your state" required />
        </div>

        <div className="form-group">
          <label htmlFor="postalCode">Postal Code</label>
          <input type="text" id="postalCode" placeholder="Enter your postal code" required />
        </div>

        <input type="submit" className="button" value="Signup" />
      </form>
      <div className="signup_new">
        <span className="signup_new">
          Already have an account? 
          <label htmlFor="check" onClick={handleLoginRedirect} > Login</label>
        </span>
      </div>
    </div>
  );
};

export default Register;
