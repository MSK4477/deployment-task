// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import axios from "axios";

const initialState = { name: "", age: "", image: "" };
function User() {
  const [formData, setFormData] = useState(initialState);
  const [userData, setUserData] = useState([]);
  const [displayFrom, setDislayForm] = useState(false);
  const navigate = useNavigate();
console.log
  const isForm = () => {
    setDislayForm(!displayFrom);
  };
  const closeForm = () =>{
    setDislayForm(!displayFrom);
  }
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
        const response = await fetch(
          "https://deploymenttask-node-js.onrender.com/api/user"
        );
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
    if (formData.name == "" || formData.age == "" || formData.image == "") {
      return alert("Please fill all required fields");
    } else {
      fetch("https://deploymenttask-node-js.onrender.com/api/user", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    setDislayForm(!displayFrom);
    setFormData(initialState);
  };
  const deleteUser = async (id) => {
  
    await axios.get(`https://deploymenttask-node-js.onrender.com/api/user/delete/${id}`)
  console.log(id)
    const newData = [...userData]
  newData.filter((user) => user.id !== id)
setUserData(newData)
console.log(userData)
  }


  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          margin:"0",
          padding:"0",
        }}
      >
        <button  style={{
          backgroundColor:"#646cff",
          color: "white",
        }}onClick={isForm}>Add New User</button>
      </div>
      {displayFrom && (
        <div className="app-container">
          <form onSubmit={sendReq} className="user-form">
          <i className="fa-solid fa-xmark " title="Cancel" style={{position:"absolute", top:"0", right:"0", fontSize:"25px", padding:"20px"}} onClick={closeForm}></i>
            <input
              type="text"
              name="name"
              placeholder="Enter the name"
              required
              value={formData.name}
              onChange={handleChange}
              className="form-input"
            />

            <input
              type="text"
              name="age"
              required
              placeholder="Enter the age"
              value={formData.age}
              onChange={handleChange}
              className="form-input"
            />
            <input
              type="text"
              name="image"
              required
              placeholder="Enter the img url"
              value={formData.image}
              onChange={handleChange}
              className="form-input"
            />
    
<button style={{backgroundColor:"#646cff", color:"white", padding:"20px", display:"block", margin:"0 auto"}} onClick={sendReq}>Add New User</button>
          </form>
        </div>
      )}
      <div >
    
      </div>



      <div className="userDetails">
        {userData.map((user) => (
          
          <div
            style={{
              border: "2px solid #ccc",
              margin: "10px",
              padding: "20px",
              borderRadius: "10px",
              borderStyle: "none",
              backgroundColor:"#75777d",
              boxShadow: "inset 0 0 5px rgba(0, 0, 0, 0.5)",
            }}
            key={user._id}
          >  

          <i className="fas fa-trash-alt" title="Delete" style={{color:"white", position:"relative", left:"160px"}} onClick={ () =>deleteUser(user.id)} ></i> <br />
          <i className="fas fa-edit" title="Edit" onClick={() =>navigate(`/edit/${user.id}`)} style={{color:"white", position:"relative", top:"40px", left:"160px"}}></i>

            <img
              style={{ width: "150px", height: "150", objectFit: "fill" }}
              src={user.image}
              alt={user.id}
            />
            <p style={{ textAlign: "center", color: "white" }}><span style={{color:"black"}}>Name:</span>  {user.name}</p>
            <p style={{ textAlign: "center", color: "white" }}><span style={{color:"black"}}>Age:</span> {user.age}</p>
         
          </div>
        ))}
      </div>
    </>
  );
}

export default User;
