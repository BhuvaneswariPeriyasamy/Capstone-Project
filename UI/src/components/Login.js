import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Login = () => {
  const navigate = useNavigate(); // Hook to access the navigate function

  const handleRegisterRedirect = () => {
    navigate('/register'); // Navigate to the Register page when clicking Register
  };

  const handleSocialLogin = (platform) => {
    // Add functionality to handle social login here
    console.log(`Logging in with ${platform}`);
    // Here you would typically integrate with the respective social media login API
  };

  return (
    <div className="login form">
      <header>Unlock Elegance!</header>
      <form action="#">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" required />
        </div>

        <a href="#" className="forgot-password">Forgot password?</a>

        <input type="submit" className="button" value="Login" />
      </form>

      <div className="or-divider">OR</div> {/* Divider for social options */}
      
      <div className="social-login">
        <button onClick={() => handleSocialLogin('Google')} className="social-button google-button">
          Login with Google
        </button>
        <button onClick={() => handleSocialLogin('Facebook')} className="social-button facebook-button">
          Login with Facebook
        </button>
      </div>

      <div className="signup_new">
        <span className="signup_new">
          Don't have an account?  
          <label htmlFor="check" onClick={handleRegisterRedirect}> Register</label>
        </span>
      </div>
    </div>
  );
};

export default Login;
