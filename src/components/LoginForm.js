import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginForm({ setIsLoggedIn }) { // Add setIsLoggedIn prop
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!credentials.username) newErrors.username = "Username is required";
    if (!credentials.password) newErrors.password = "Password is required";
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!validateForm()) return;
    try {
        // console.log("hi");
      const response = await axios.post("/api/users/login", credentials);
      localStorage.setItem("token", response.data.token); // Store the token
      setIsLoggedIn(true); // Update login state
      navigate(""); // Redirect to home page
    } catch (err) {
      setError("Failed to login. Please check your credentials.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
        />
        {loading ? <p>Loading...</p> : <button type="submit">Login</button>}
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default LoginForm;
