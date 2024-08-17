import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
//import { useDispatch } from "react-redux";
import {client} from '../api/index';
import '../App.css';

export default function Contect() {
  const { id } = useParams();
  const [contact, setContact] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
//  const dispatch = useDispatch();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        setLoading(true);
        const response = await client.get(`/contacts/${id}`);
        setContact(response.data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await client.put(`/contacts/${id}`, contact); // Update contact
      console.log(response);
      // Optionally navigate or update state after successful update
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await client.delete(`/contacts/${id}`); // Delete contact
      console.log(response);
      navigate(-1); // Navigate back after deletion
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (<h4>Loading...</h4>);
  }

  return (
    <form onSubmit={handleSubmit} className="dash">
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <p>{contact.phoneNumber}</p>
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <p>{contact.email}</p>
      </div>

      <div className="form-group">
        <label htmlFor="photo">Photo:</label>
        {contact.photo && (
          <img
            src={contact.photo}
            alt='photo1'
            width="100px"
            height="100px"
          />
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className='btn-div'>
        <Link to={`/edit/${id}`}><button className="btn1">Edit</button></Link>
        <button className="btn1" onClick={handleDelete}>Delete</button>
        <button type="button" onClick={() => navigate(-1)} className="btn1">Back</button>
      </div>
    </form>
  );
}















// import React, { useState } from 'react';
// import { useNavigate, useParams,Link } from 'react-router-dom';
// import { useDispatch } from "react-redux";
// import { client } from '../api/index';
// import '../App.css';

// export default function Contect() {

//   const id = useParams();

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const Contect = await client.put(`/contacts/${id}`,{ res.cokies});
//       console.log(response);

//       //navigate(-1);
//     } catch (e) {
//       setError(e.message);
//     }
//     setLoading(false);
//   };

//   const handleDelete = async (e)=>{
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const response = await client.delete(`/contacts/${id}`,{ res.cokies});
//       console.log(response);
//       navigate(-1);
//     } catch (e) {
//       setError(e.message);
//     }
//     setLoading(false);
//   }

//   if (loading) {
//     return (<h4>Loading...</h4>);
//   }

//   return (
//     <form onSubmit={handleSubmit} className="dash">

//       <div className="form-group">
//         <label htmlFor="phoneNumber">Phone Number:</label><p>{Contect.phoneNumber}</p>
//       </div>

//       <div className="form-group">
//         <label htmlFor="email">Email:</label><p>{Contect.email}</p>
//       </div>

//       <div className="form-group">
//         <label htmlFor="photo">Photo:</label>
//         <img
//             src={Contect.photo}
//             alt='photo'
//             width="100px"
//             height="100px"
//         />
//       </div>

//       {error && <div className="error-message">{error}</div>}

//       <div className='btn-div'>
//         <Link to={`/edit`} ><button className="btn1">Edit</button></Link>

//         <button className="btn1" onClick={()=>{handleDelete()}}>Delete</button>

//         <button type="button" onClick={() => navigate(-1)} className="btn1">Back</button>
//       </div>
//     </form>
//   );
// }
