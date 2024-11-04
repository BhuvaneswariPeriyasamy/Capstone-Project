import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    province: "",
    postalcode: "",
  });
  const [errors, setErrors] = useState({});

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    // Remove error message for this field if any
    setErrors({ ...errors, [id]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstname.trim()) {
      newErrors.firstname = "First name is required";
    } else if (!/^[A-Za-z]+$/.test(formData.firstname)) {
      newErrors.firstname = "First name should contain only letters";
    }

    if (!formData.lastname.trim()) {
      newErrors.lastname = "Last name is required";
    } else if (!/^[A-Za-z]+$/.test(formData.lastname)) {
      newErrors.lastname = "Last name should contain only letters";
    }

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!formData.confirmPassword.trim())
      newErrors.confirmPassword = "Confirm password is required";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.province.trim()) newErrors.province = "Province is required";
    if (!formData.postalcode.trim())
      newErrors.postalcode = "Postal code is required";
    else if (!/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(formData.postalcode))
      newErrors.postalcode = "Invalid postal code format";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:5000/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data.message);
      if (response.ok) navigate("/login");
      else setErrors({ submit: data.message });
    } catch (error) {
      setErrors({ submit: "Error: " + error.message });
    }
  };

  return (
    <div className="registration form">
      <header>Style Starts!</header>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            placeholder="Enter your first name"
            value={formData.firstname}
            onChange={handleChange}
          />
          {errors.firstname && (
            <p className="error" style={{ color: "red" }}>
              {errors.firstname}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            placeholder="Enter your last name"
            value={formData.lastname}
            onChange={handleChange}
          />
          {errors.lastname && (
            <p className="error" style={{ color: "red" }}>
              {errors.lastname}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="error" style={{ color: "red" }}>
              {errors.email}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="error" style={{ color: "red" }}>
              {errors.password}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="error" style={{ color: "red" }}>
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && (
            <p className="error" style={{ color: "red" }}>
              {errors.address}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Enter your city"
            value={formData.city}
            onChange={handleChange}
          />
          {errors.city && (
            <p className="error" style={{ color: "red" }}>
              {errors.city}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="province">Province</label>
          <input
            type="text"
            id="province"
            placeholder="Enter your province"
            value={formData.province}
            onChange={handleChange}
          />
          {errors.province && (
            <p className="error" style={{ color: "red" }}>
              {errors.province}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="postalcode">Postal Code</label>
          <input
            type="text"
            id="postalcode"
            placeholder="Enter your postal code"
            value={formData.postalcode}
            onChange={handleChange}
          />
          {errors.postalcode && (
            <p className="error" style={{ color: "red" }}>
              {errors.postalcode}
            </p>
          )}
        </div>

        {errors.submit && (
          <p className="error-message" style={{ color: "red" }}>
            {errors.submit}
          </p>
        )}
        <input type="submit" className="button" value="Signup" />
      </form>
      <div className="signup_new">
        <span className="signup_new">
          Already have an account?
          <label htmlFor="check" onClick={handleLoginRedirect}>
            {" "}
            Login
          </label>
        </span>
      </div>
    </div>
  );
};

export default Register;
