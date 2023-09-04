// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "./App.css";

const initialState = { name: "", age: "", image: "" };

function User() {
  const [formData, setFormData] = useState(initialState);
  const [userData, setUserData] = useState([]);
  const [displayFrom, setDislayForm] = useState(false);

  const isForm = () => {
    setDislayForm(!displayFrom);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/user");
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUserData(data.userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [userData]);

  const sendReq = async (e) => {
    e.preventDefault();

    fetch("http://localhost:4000/api/user", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setDislayForm(!displayFrom);
    setFormData(initialState);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <button onClick={isForm}>Add New User</button>
      </div>
      {displayFrom && (
        <div className="app-container">
          <form onSubmit={sendReq} className="student-form">
            <input
              type="text"
              name="name"
              placeholder="Enter the name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
            />

            <input
              type="text"
              name="age"
              placeholder="Enter the age"
              value={formData.age}
              onChange={handleChange}
              className="form-input"
            />
            <input
              type="text"
              name="image"
              placeholder="Enter the img url"
              value={formData.image}
              onChange={handleChange}
              className="form-input"
            />
            <button onClick={sendReq} className="form-button">
              Add New user
            </button>
          </form>
        </div>
      )}
      <div className="userDetails">
        {userData.map((user) => (
          <div
            style={{
              border: "2px solid #ccc",
              margin: "10px",
              padding: "20px",
              borderRadius: "10px",
              borderStyle: "none",
              boxShadow: "inset 0 0 5px rgba(0, 0, 0, 0.5)",
            }}
            key={user.id}
          >
            <img
              style={{ width: "150px", height: "150", objectFit: "cover" }}
              src={user.image}
              alt={user.id}
            />
            <p style={{ textAlign: "center", color: "blue" }}>{user.name}</p>
            <p style={{ textAlign: "center", color: "blue" }}>{user.age}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default User;
