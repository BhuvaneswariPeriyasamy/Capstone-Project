import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
  const handleSocialLogin = (platform) => {
    console.log(`Logging in with ${platform}`);
  };

>>>>>>> 1825b09ce5bdbffb16e38b96fed74b7dac5836c1
>>>>>>> 20b6e49b5aabff1a9be2b7a92f182021c4585590
  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e, field) => {
    const { value } = e.target;

    if (field === 'email') {
      setEmail(value);
      setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
    } else if (field === 'password') {
      setPassword(value);
      setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        window.location.href = '/';
        navigate('/');
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, submit: 'Invalid email or password' }));
      }
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, submit: 'Error: ' + error.message }));
    }
  };

  return (
    <div className="login form">
      <header>Unlock Elegance!</header>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => handleChange(e, 'email')}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => handleChange(e, 'password')}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

<<<<<<< HEAD
      
=======
<<<<<<< HEAD
      
=======
        <a href="#" className="forgot-password">Forgot password?</a>
>>>>>>> 1825b09ce5bdbffb16e38b96fed74b7dac5836c1
>>>>>>> 20b6e49b5aabff1a9be2b7a92f182021c4585590
        
        {errors.submit && (
          <div className="error-alert">
            {errors.submit}
          </div>
        )}

        <input type="submit" className="button" value="Login" />
      </form>

      <div className="or-divider">OR</div>

<<<<<<< HEAD
      
=======
<<<<<<< HEAD
      
=======
      <div className="social-login">
        <button onClick={() => handleSocialLogin('Google')} className="social-button google-button">
          Login with Google
        </button>
        <button onClick={() => handleSocialLogin('Facebook')} className="social-button facebook-button">
          Login with Facebook
        </button>
      </div>
>>>>>>> 1825b09ce5bdbffb16e38b96fed74b7dac5836c1
>>>>>>> 20b6e49b5aabff1a9be2b7a92f182021c4585590

      <div className="signup_new">
        <span className="signup_new">
          Don't have an account?  
          <label htmlFor="check" onClick={handleRegisterRedirect} > Register</label>
        </span>
      </div>
    </div>
  );
};

export default Login;