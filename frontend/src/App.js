import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Register from './Components/Register';
import Profile from './Components/Profile';
import CreateContect from './Components/CreateContect';
import EditContect from './Components/EditContect';
import Contect from './Components/Contect';
//import Auth from './Components/Auth';

export default function App() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      <Route path="profile" element={<Profile />}>
        <Route path="contect/:id" element={<Contect/>}>
          <Route path="edit" element={<EditContect />}/>
        </Route>
      </Route>
      
      <Route path="profile/create" element={<CreateContect />}/>
    
    </Routes>
  );
}













// import './App.css'
// import {Routes, Route} from 'react-router-dom'
// import Dashboard from './Components/Dashboard'
// import Login from './Components/Login'
// import Register from './Components/Register'
// import Profile from './Components/Profile'
// import EditProfile from './Components/EditProfile'
// import Auth from './Components/Auth'

// export default function App() {
//   return (
//     <Routes>
//       <Route index element={<Dashboard/>}/>
//         <Route path="login" element={<Login />} />
//         <Route path="register" element={<Register />}/>

//       {/* myprofile */}
//         <Route path="/auth" element={<Auth/>}>
//           <Route path="/profile" element={<Profile />}/>
//           <Route path="/edit" element={<EditProfile />}/>
//         </Route>
//     </Routes>
//   )
// }
