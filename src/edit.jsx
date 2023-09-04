// // Edit.jsx

// // eslint-disable-next-line no-unused-vars
// import React, { useEffect, useState } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";

// const Edit = () => {
//   const initialState = { name: "", age: "", image: "" };
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const userId = searchParams.get("id");

//   const [formData, setFormData] = useState(initialState);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`http://localhost:4000/api/user/${userId}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch user data");
//         }
//         const data = await response.json();
//         setFormData(data.data); // Assuming the user data is in a "data" field
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchData();
//   }, [userId]); // Include userId in the dependency array

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const sendReq = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`http://localhost:4000/api/user/${userId}`, {
//         method: "PUT",
//         body: JSON.stringify(formData),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update user");
//       }

//       navigate("/"); // Navigate back to the home page after updating
//     } catch (error) {
//       console.error("Error updating user:", error);
//     }
//   };

//   return (
//     <>
//       <div className="app-container">
//         <form onSubmit={sendReq} className="student-form">
//           <input
//             type="text"
//             name="name"
//             placeholder="Enter the name"
//             value={formData.name}
//             onChange={handleChange}
//             className="form-input"
//           />

//           <input
//             type="text"
//             name="age"
//             placeholder="Enter the age"
//             value={formData.age}
//             onChange={handleChange}
//             className="form-input"
//           />
//           <input
//             type="text"
//             name="image"
//             placeholder="Enter the img url"
//             value={formData.image}
//             onChange={handleChange}
//             className="form-input"
//           />
//           <button onClick={sendReq} className="form-button">
//             Update User
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Edit;
