import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/slice/userSlice';
import '../App.css'

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();// here it execute logoutUser Reducer

  return (
    <div className='dash'>
      <h1 className='headline1'>Welcome to the frontend page</h1>
      <h3 className='headline2'>Here you can create and account , log to account and also can edit their fields</h3>

      <div className='btn-div'>
        <button className='btn1' onClick={() => { dispatch(logoutUser()) }}>LogOut</button>
        <button className='btn1' onClick={() => { navigate('/login') }}>Login</button>
        <button className='btn1' onClick={() => { dispatch(logoutUser()); navigate('/register') }}>Signin</button>
      </div>
    </div>
  );
}