import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import vcet from "../images/logo.png";

function AdminLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { email, password };
    const errors = validate(formData);
    setError(errors);
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(`/api/admin/auth/login`, formData);
        alert("Logged in successfully");
        console.log(response.data);

        // Clear form fields
        setEmail('');
        setPassword('');
        setError({});

        // Navigate to another page
        navigate('/adminpage');
      } catch (error) {
        console.error("There was an error logging in!", error);
        alert("Error logging in");
      }
    } else {
      alert("Oops, something went wrong. Check email or password");
    }
  };

  function validate(data) {
    const errors = {};
    if (!/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(data.email)) {
      errors.email = "Invalid email ID";
    }
    if (!data.password || data.password.length < 8) {
      errors.password = "Password length must be at least 8 characters";
    } else if (!/^[a-zA-Z*#0-9]+$/.test(data.password)) {
      errors.password = "Invalid password";
    }
    return errors;
  }

  return (
    <div id="parent">
      <form className="forms" onSubmit={handleSubmit}>
        <div className="p1">
          <div>
            <img src={vcet} alt="logo" />
          </div>
          <div>
            <h1>VELAMMAL-MDU</h1>
          </div>
          <div id="fac">
            <p>Faculty Management System ADMIN LOGIN</p>
          </div>
          <div className="ip">
            <input
              type="text"
              id="mailid"
              placeholder="LOGIN ID"
              required
              name="email" // Changed from "login" to "email"
              value={ email }
              onChange={(e) => setEmail(e.target.value)}
            />
            {error.email && <p id="para">{error.email}</p>}
            <input
              type="password"
              id="password"
              placeholder="PASSWORD"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error.password && <p id="para">{error.password}</p>}
          </div>
          <div>
            <button type="submit">LOGIN</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AdminLoginForm;
