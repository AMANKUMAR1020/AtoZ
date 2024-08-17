import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
//import { useDispatch, useSelector } from "react-redux";
import {client} from '../api/index';
// import { loginUser, setUser } from '../redux/slice/userSlice';
import '../App.css';

export default function CreateContact() {
  const { user } = useSelector((state) => state.user);
  
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // const username = user.username;
      // const formData = new FormData();
      // formData.append('user', username);
      // formData.append('phoneNumber', phoneNumber);
      // formData.append('email', email);
      // if (photo) {
      //   formData.append('photo', photo);
      // }
      
      const res = await client.post("/contacts", {user, phoneNumber, email,photo});
      console.log(res)
      // dispatch(loginUser(res.data));
      // dispatch(setUser(res.data.user));
      navigate(-1);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  if (loading) {
    return (<h4>Loading...</h4>);
  }

  return (
    <form onSubmit={handleSubmit} className="dash">
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="photo">Photo:</label>
        <input
          type="file"
          id="photo"
          onChange={(e) => setPhoto(e.target.files[0])} // Corrected to handle file input
          className="form-input"
        />
      </div>
      {error && <div className="error-message">{error}</div>}

      <div className='btn-div'>
        <button type="submit" className="btn1">Create</button>
        <button type="button" onClick={() => navigate(-1)} className="btn1">Back</button>
      </div>
    </form>
  );
}
















// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch,useSelector } from "react-redux";
// import client from '../api/index';
// import { loginUser,setUser } from '../redux/slice/userSlice';
// import '../App.css'

// export default function CreateContect(){

//   const { user } = useSelector((state) => state.user);
  
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setphoneNumber] = useState("");
//   const [photo, setPhoto] = useState();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const user = user.username
//         await client
//           .post("/contacts", {user, phoneNumber, email, photo})      
//         	.then((res) => {
//         		dispatch(loginUser(res.data));  console.log(res.data)
//         		dispatch(setUser(res.data.user))
//                 navigate(-1)
//         	})
//     } catch (e) {
// //      setError("username already exists");
//       setError(e.message);
//     }
//     setLoading(false);
//   }
// };

//   if(loading){return (<h4>Loading...</h4>)}


//   return (
//     <form onSubmit={handleSubmit} className="dash">
//     <div className="form-group">
//       <label htmlFor="name">phoneNumber:</label>
//       <input
//         type="text"
//         id="name"
//         value={name}
//         onChange={(e) => { setPhoneNumber(e.target.value) }}
//         className="form-input"
//       />
//     </div>
//     <div className="form-group">
//       <label htmlFor="email">Email:</label>
//       <input
//         type="email"
//         id="email"
//         value={email}
//         onChange={(e) => { setEmail(e.target.value) }}
//         className="form-input"
//       />
//     </div>
//     <div className="form-group">
//       <label htmlFor="username">photo:</label>
//       <input
//         type="file"
//         id="username"
//         value={username}
//         onClick={(e) => { setPhoto(e.target.value) }}
//         className="form-input"
//       />
//     </div>
//     <div className="error-message">{error}</div>

//     <div className='btn-div'>
//       <button type="submit" className="btn1">Create</button>
//       <button onClick={() => { navigate(-1) }} className="btn1">Back</button>
//     </div>
//   </form>);
// };
