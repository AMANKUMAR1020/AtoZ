import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function Auth() {
  const {token} = useSelector((state) => state.user);

 console.log(token);

  const result = ()=>{
    if (token) {
      console.log('invalid login');
      return <Navigate to="/login" />;
    }else{
      console.log('valid login  :)');
      return <Navigate to="/auth/profile" />;
    }
  }

  return result;
}














// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Outlet, redirect } from 'react-router-dom';

// export default function Auth() {

//   const {token} = useSelector((state) => state.token);

//   console.log(token)

//   if(token){
//     console.log('invalid login');
//     redirect('/login')
//   }

//   return (<>
//   <Outlet/>
//   </>);
// }
 