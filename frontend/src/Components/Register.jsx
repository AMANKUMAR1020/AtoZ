import React, { useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { client } from '../api/index';
import { loginUser } from '../redux/slice/userSlice';
//import { loginUser,setUser } from '../redux/slice/userSlice';
import '../App.css'

export default function Register(){

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const check = (value) => {
    if (value.length > 8) {setError("password must be less than 8");   return false;}
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username && check(password)) {

      try {
        setLoading(true);
        await client
            .post("/auth/signin",{username,password})
            .then((res) => {
              dispatch(loginUser(res.data));  console.log(res.data)
              //dispatch(setUser(res.data.user))
              redirect('/login')
            })

      } catch (e) {
        setError(e.message);
      }
      setLoading(false);
    }
  };

  if(loading){
    return <h4>Loading...</h4>
  }


  return (
        <form onSubmit={handleSubmit} className="dash">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => { setUsername(e.target.value) }}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
              className="form-input"
            />
          </div>
          <div className="error-message">{error}</div>

          <div className='btn-div'>
            <button type="submit" className="btn1">Register</button>
            <button onClick={() => { navigate(-1) }} className="btn1">Back</button>
          </div>
        </form>
  );
};













// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from "react-redux";
// // import client from '../api/index';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import { loginUser,setUser } from '../redux/slice/userSlice';

// export default function Register() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [admin, setAdmin] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const check = (value) => {
//     if (value.length < 4) {
//       setError("length must be more than 4");
//       return false;
//     } else if (value.length > 15) {
//       setError("length must be less than 15");
//       return false;
//     } else if (!/[A-Z]/.test(value)) {
//       setError("at least one letter must be uppercase");
//       return false;
//     } else if (!/[a-z]/.test(value)) {
//       setError("at least one letter must be lowercase");
//       return false;
//     } else if (!/\d/.test(value)) {
//       setError("at least one letter must be numeric");
//       return false;
//     } else if (!/[^A-Za-z0-9]/.test(value)) {
//       setError("at least one letter must be special");
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (check(username) && check(password)) {
//       setLoading(true);

//       try {
//         const res = await client.post("/users/login", {
//           name,
//           email,
//           username,
//           password,
//           admin
//         });
//         dispatch(loginUser(res.data));
//         dispatch(setUser(res.data.user));
//         navigate('/profile');
//       } catch (e) {
//         setError(e.message);
//       }
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <h4>Loading...</h4>;
//   }

//   return (
//     <Form onSubmit={handleSubmit}>
//       <Form.Group className="mb-3" controlId="formBasicName">
//         <Form.Label>Name:</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="name"
//           value={name}
//           onChange={(e) => {
//             setName(e.target.value);
//           }}
//         />
//       </Form.Group>

//       <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>Email:</Form.Label>
//         <Form.Control
//           type="email"
//           placeholder="email"
//           value={email}
//           onChange={(e) => {
//             setEmail(e.target.value);
//           }}
//         />
//       </Form.Group>

//       <Form.Group className="mb-3" controlId="formBasicUsername">
//         <Form.Label>Username:</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="username"
//           value={username}
//           onChange={(e) => {
//             setUsername(e.target.value);
//           }}
//         />
//       </Form.Group>

//       <Form.Group className="mb-3" controlId="formBasicPassword">
//         <Form.Label>Password:</Form.Label>
//         <Form.Control
//           type="password"
//           placeholder="password"
//           value={password}
//           onChange={(e) => {
//             setPassword(e.target.value);
//           }}
//         />
//       </Form.Group>

//       <Form.Group className="mb-3" controlId="formBasicCheckbox">
//         <Form.Check
//           type="checkbox"
//           label="Admin"
//           checked={admin}
//           onChange={() => {
//             setAdmin(!admin);
//           }}
//         />
//       </Form.Group>

//       <Form.Text className="text-muted">{error}</Form.Text>

//       <Button variant="primary" type="submit">
//         Submit
//       </Button>
//     </Form>
//   );
// }













// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from "react-redux";
// import client from '../api/index';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';

// export default function Register(){

//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [admin, setAdmin] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const navigate = useNavigate();
//   const dispatch = useDispatch();


//   const cheack = (value) => {
//     if (value.length < 4) {
//       setError("length must be more than 4");
//       return false;
//     } else if (value.length > 15) {
//       setError("length must be less than 15");
//       return false;
//     } else if (!/[A-Z]/.test(value)) {
//       setError("at least one letter must be uppercase");
//       return false;
//     } else if (!/[a-z]/.test(value)) {
//       setError("at least one letter must be lowercase");
//       return false;
//     } else if (!/\d/.test(value)) {
//       setError("at least one letter must be numeric");
//       return false;
//     } else if (!/[^A-Za-z0-9]/.test(value)) {
//       setError("at least one letter must be special");
//       return false;
//     }
//     return true;
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (cheack(username) && cheack(password)) {
//       setLoading(true);

//       try {
//         const res = await client.post("/users/login", {
//           name,
//           email,
//           username,
//           password,
//           admin
//         });
//         dispatch(loginUser(res.data));
//         dispatch(setUser(res.data.user));
//         navigate('/profile');
//       } catch (e) {
//         setError(e.message);
//       }
//       setLoading(false);
//     }
//   };

//     if(loading){
//       return <h4>Loading...</h4>
//     }


//   return (
//     <Form onSubmit={handleSubmit}>

//       <Form.Group className="mb-3"  controlId="formBasicEmail">
//         <Form.Label>Name:</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="name"
//           value={name}
//           onChange={(e)=>{setName(e.target.value)}}
//           />
//       </Form.Group>

//       <Form.Group className="mb-3"  controlId="formBasicEmail">
//         <Form.Label>Email:</Form.Label>
//         <Form.Control
//           type="email"
//           placeholder="email"
//           value={email}
//           onChange={(e)=>{setEmail(e.target.value)}}
//           />
//       </Form.Group>

//       <Form.Group className="mb-3"  controlId="formBasicEmail">
//         <Form.Label>Email:</Form.Label>
//         <Form.Control
//           type="email"
//           placeholder="email"
//           value={email}
//           onChange={(e)=>{setEmail(e.target.value)}}
//           />
//       </Form.Group>

//       <Form.Group className="mb-3"  controlId="formBasicEmail">
//         <Form.Label>Username</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Usersname"
//           value={username}
//           onChange={(e) => { setUsername(e.target.value) }}
//           />
//       </Form.Group>


//       <Form.Group className="mb-3" controlId="formBasicPassword">
//         <Form.Label>Password</Form.Label>
//         <Form.Control
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => { setPassword(e.target.value) }}
//           />          
//       </Form.Group>

//       <Form.Group className="mb-3" controlId="formBasicCheckbox">
//         <Form.Label>Admin:</Form.Label>
//         <Form.Check type="checkbox" label="Check me out" 
//           value={admin}
//           onClick={()=>{setAdmin( !admin )}}
//           />
//       </Form.Group>

//       <Form.Text className="text-muted">{error}</Form.Text>

//       <Button variant="primary" type="submit">
//         Submit
//       </Button>
      
//     </Form>
//   );
// };






















// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from "react-redux";
// import client from '../api/index';

// export default function Register(){

//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [admin, setAdmin] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const navigate = useNavigate();
//   const dispatch = useDispatch();


//   const cheack = (value) => {
//     if (value.length < 4) {
//       setError("length must be more than 4");
//       return false;
//     } else if (value.length > 15) {
//       setError("length must be less than 15");
//       return false;
//     } else if (!/[A-Z]/.test(value)) {
//       setError("at least one letter must be uppercase");
//       return false;
//     } else if (!/[a-z]/.test(value)) {
//       setError("at least one letter must be lowercase");
//       return false;
//     } else if (!/\d/.test(value)) {
//       setError("at least one letter must be numeric");
//       return false;
//     } else if (!/[^A-Za-z0-9]/.test(value)) {
//       setError("at least one letter must be special");
//       return false;
//     }
//     return true;
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (cheack(username) && cheack(password)) {
//       setLoading(true);

//       try {
//         const res = await client.post("/users/login", {
//           name,
//           email,
//           username,
//           password,
//           admin
//         });
//         dispatch(loginUser(res.data));
//         dispatch(setUser(res.data.user));
//         navigate('/profile');
//       } catch (e) {
//         setError(e.message);
//       }
//       setLoading(false);
//     }
//   };

//     if(loading){
//       return <h4>Loading...</h4>
//     }


//   return (
//     <form onSubmit={handleSubmit}>
      
//       <div>
//         <label htmlFor="name">Name:</label>
//         <input
//           type="text"
//           id="name"
//           value={name}
//           onChange={(e)=>{setName(e.target.value)}}
//         />
//       </div>
      
//       <div>
//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(e)=>{setEmail(e.target.value)}}
//         />
//       </div>

//       <div>
//         <label htmlFor="username">Username:</label>
//         <input
//           type="text"
//           id="username"
//           value={username}
//           onChange={(e)=>{setUsername(e.target.value)}}
//         />
//       </div>

//       <div>
//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           id="password"
//           value={password}
//           onChange={(e)=>{setPassword(e.target.value)}}
//         />
//       </div>
      
//       <div>
//         <label htmlFor="admin">Admin:</label>
//         <input
//           type="checkbox"
//           id="admin"
//           value={admin}
//           onClick={()=>{setAdmin( !admin )}}
//         />
//       </div>
      
//       <div>{error}</div>
//       <button type="submit">Login</button>
//     </form>
//   );
// };
