import  { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const Edit = () => {
  const initialState = { name: "", age: "", image: "" };
  const navigate = useNavigate();
  const {id} = useParams();

  const [formData, setFormData] = useState(initialState);
  const fetchData = async () => {
    try {
      const response = await fetch(`https://deploymenttask-node-js.onrender.com/api/user/${id}`);
      if (!response) {
       console.log("Failed to fetch user data");
      }
      const data = await response.json();
      setFormData(data.userData); 
        } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
   

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]); 
console.log(formData)
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const sendReq = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(`https://deploymenttask-node-js.onrender.com/api/user/edit/${id}`, formData,)
     
     if(response.data.message === "User data updated successfully"){
        navigate("/"); 
     }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <>
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
            Update User
          </button>
        </form>
      </div>
    </>
  );
};

export default Edit;
