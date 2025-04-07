import React, { useState, useEffect } from "react";
import axios from "axios";
import './test.css'
const Test = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (!token) {
      console.log("No token found, user is not logged in.");
      setLoading(false);
      return;
    }

    axios.get("https://api.escuelajs.co/api/v1/auth/profile", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      console.log("User data:", response.data);
      setUser(response.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching user data:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to fetch user data");
      setLoading(false);
      
      // Optional: Clear token if it's invalid
      if (err.response?.status === 401) {
        localStorage.removeItem("userToken");
      }
    });
  }, []);

  if (loading) {
    return <p>Loading user info...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="all_info">
      <h2>Welcome, {user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <img src={user.avatar} alt="User Avatar" width="100" />
    </div>
  );
};

export default Test;