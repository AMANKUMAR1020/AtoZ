import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { client } from '../api/index';
import { loginUser } from '../redux/slice/userSlice';
//import { loginUser,setUser } from '../redux/slice/userSlice';
import "../App.css"

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const Check = (value) => {

    if (value.length > 8) {setError("password must be less than 8");
    return false;}
    
    return true;
  }


const handleSubmit = async (e) => {
    e.preventDefault();

    if (username && Check(password)) {
      try {
        setLoading(true);
          await client
            .post("/auth/login",{username,password})
            .then((res) => {
              dispatch(loginUser(res.data));  console.log(res.data)
              //dispatch(setUser(res.data.user))
              navigate('/profile')
            })

        } catch (e) {
          setError(e.message);
          setError('User is not available');
        }
        setLoading(false);
      }
    }

    if (loading) {return <h4>Loading...</h4>;}

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
            <button type="submit" className="btn1">Login</button>
            <button onClick={() => { navigate(-1) }} className="btn1">Back</button>
          </div>
        </form>
  );
};











// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from "react-redux";
// //import client from '../api/index';
// import { setData } from '../redux/slice/dbSlice';
// import { loginUser,setUser } from '../redux/slice/userSlice';

// export default function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const {db} = useSelector((state)=>state.db)

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const Check = (value) => {
//     if (value.length < 4) {
//       setError("length must be more than 4");
//       return false;
//     } else if (value.length > 15) {
//       setError("length must be less than 15");
//       return false;
//     } else if (!value.match(/[A-Z]/)) {
//       setError("at least one letter must be uppercase");
//       return false;
//     } else if (!value.match(/[a-z]/)) {
//       setError("at least one letter must be lowercase");
//       return false;
//     } else if (!value.match(/[0-9]/)) {
//       setError("at least one letter must be numeric");
//       return false;
//     } else if (!value.match(/[!@#$%^&*()_+\-=$$\]{};':"\\|,.<>\/?]/)) {
//       setError("at least one letter must be special");
//       return false;
//     }
//     return true;
//   }

// //   # this is used for fetching data from real database
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (Check(username) && Check(password)) {
// //       setLoading(true);

// //       try {
// //         const res = await client.post("/users/login", {
// //           username,
// //           password,
// //         });
// //         dispatch(loginUser(res.data));
// //         console.log(res.data);
// //         dispatch(setUser(res.data.user));
// //         navigate('/profile');
// //       } catch (e) {
// //         setError(e.message);
// //       }
// //       setLoading(false);
// //     }
// // };
// // #

// //this is using dummy data
// const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (username && password) {
//       setLoading(true);
//       try {
//         dispatch(setData())//"Connect_to_database"
        
//         const user = db.filter((data)=>
//             {return data.password === password 
//                 && data.username === username })
        
//         dispatch(loginUser(user));
//         dispatch(setUser(user));
//         navigate('/profile');
//       } catch (e) {
//         setError(e.message);
//       }
//       setLoading(false);
//     }
// };

//   if (loading) {
//     return <h4>Loading...</h4>;
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="username">Username:</label>
//         <input
//           type="text"
//           id="username"
//           value={username}
//           onChange={(e) => { setUsername(e.target.value) }}
//         />
//       </div>
//       <div>
//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           id="password"
//           value={password}
//           onChange={(e) => { setPassword(e.target.value) }}
//         />
//       </div>
//       <div>{error}</div>
//       <button type="submit">Login</button>
//     </form>
//   );
// };















// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from "react-redux";
// import client from '../api/index';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import { loginUser, setUser } from '../redux/slice/userSlice';

// export default function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
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
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (check(username) && check(password)) {
//       setLoading(true);

//       try {
//         const res = await client.post("/users/login", {
//           username,
//           password,
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
//       <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>Username</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => { setUsername(e.target.value) }}
//         />
//       </Form.Group>

//       <Form.Group className="mb-3" controlId="formBasicPassword">
//         <Form.Label>Password</Form.Label>
//         <Form.Control
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => { setPassword(e.target.value) }}
//         />
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
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';

// export default function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
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
//           username,
//           password,
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
//       <Form onSubmit={handleSubmit}>

//         <Form.Group className="mb-3"  controlId="formBasicEmail">
//           <Form.Label>Username</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Usersname"
//             value={username}
//             onChange={(e) => { setUsername(e.target.value) }}
//             />
//         </Form.Group>
        
        
//         <Form.Group className="mb-3" controlId="formBasicPassword">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => { setPassword(e.target.value) }}
//             />          
//         </Form.Group>
        
//         {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
//           <Form.Check type="checkbox" label="Check me out" />
//         </Form.Group>*/}

//         <Form.Text className="text-muted">{error}</Form.Text>
        
//         <Button variant="primary" type="submit">
//           Submit
//         </Button>
//       </Form>
//   );
// };




















// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from "react-redux";
// import client from '../api/index';

// export default function Login(){

//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const navigate = useNavigate();
//   const dispatch = useDispatch();


//   const cheackUsername = (value)=>{
//       if(value.lenght < 4 ){
//         setError("lenght must be more than 4"); return false;
//       }else if(value.lenght > 15 ){
//         setError("lenght must be less than 15"); return false;
//       }else if( !value.isUppercase() ){
//         setError("atleast one lettet must be uppercase");  return false;
//       }else if( !value.islowerCase() ){
//         setError("atleast one lettet must be lowercase");  return false;
//       }else if( !value.isNumeric() ){
//         setError("atleast one lettet must be numeric");  return false;
//       }else if( !value.isSpecial() ){
//         setError("atleast one lettet must be special");  return false;
//       }
//       return true;
//     }

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if(cheackUsername(username) && cheackPassword(password)){
//       setLoading(true);

//       try{
//         await client.post("/users/login", {
//           username,
//           password,
//         }).then((res) => {
//             dispatch(loginUser(res.data));
//             console.log(res.data)
//             dispatch(setUser(res.data.user))
//             navigate('/profile')
//         })
//       }catch((e)=>{
//         setError(e.message);
//       })
//       setLoading(false);
//     }
//   };

//     if(loading){
//       return <h4>Loading...</h4>
//     }


//   return (
//     <form onSubmit={handleSubmit}>
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
//       <div>{error}</div>
//       <button type="submit">Login</button>
//     </form>
//   );
// };














// import React, { useState } from 'react';
  // import { useNavigate } from 'react-router-dom';
  // import { useDispatch } from "react-redux";
  // import client from '../api/index';
  
  // export default function Login() {
  //   const [username, setUsername] = useState('');
  //   const [password, setPassword] = useState('');
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
  //           username,
  //           password,
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
  //     <form onSubmit={handleSubmit}>
  //       <div>
  //         <label htmlFor="username">Username:</label>
  //         <input
  //           type="text"
  //           id="username"
  //           value={username}
  //           onChange={(e) => { setUsername(e.target.value) }}
  //         />
  //       </div>
  //       <div>
  //         <label htmlFor="password">Password:</label>
  //         <input
  //           type="password"
  //           id="password"
  //           value={password}
  //           onChange={(e) => { setPassword(e.target.value) }}
  //         />
  //       </div>
  //       <div>{error}</div>
  //       <button type="submit">Login</button>
  //     </form>
  //   );
  // };
















//   import React, { useState } from 'react';
//   import { useNavigate } from 'react-router-dom';
//   import { useDispatch } from "react-redux";
//   import client from '../api/index';
  
//   export default function Login(){
    
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
  
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
  
    
//     const cheackUsername = (value)=>{
//         if(value.lenght < 4 ){
//           setError("lenght must be more than 4"); return false;
//         }else if(value.lenght > 15 ){
//           setError("lenght must be less than 15"); return false;
//         }else if( !value.isUppercase() ){
//           setError("atleast one lettet must be uppercase");  return false;
//         }else if( !value.islowerCase() ){
//           setError("atleast one lettet must be lowercase");  return false;
//         }else if( !value.isNumeric() ){
//           setError("atleast one lettet must be numeric");  return false;
//         }else if( !value.isSpecial() ){
//           setError("atleast one lettet must be special");  return false;
//         }
//         return true;
//       }
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
      
//       if(cheackUsername(username) && cheackPassword(password)){
//         setLoading(true);
        
//         try{
//           await client.post("/users/login", {
//             username,
//             password,
//           }).then((res) => {
//               dispatch(loginUser(res.data));
//               console.log(res.data)
//               dispatch(setUser(res.data.user))
//               navigate('/profile')
//           })
//         }catch((e)=>{
//           setError(e.message);
//         })
//         setLoading(false);
//       }
//     };
    
//       if(loading){
//         return <h4>Loading...</h4>
//       }
    
  
//     return (
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="username">Username:</label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={(e)=>{setUsername(e.target.value)}}
//           />
          
//         </div>
//         <div>
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e)=>{setPassword(e.target.value)}}
//           />
//         </div>
//         <div>{error}</div>
//         <button type="submit">Login</button>
//       </form>
//     );
//   };
