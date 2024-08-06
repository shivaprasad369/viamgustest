

import React, { useEffect } from 'react'

import Hero from "./Hero";
import Login from "./Login";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function LoginContainer() {
   const navigate=useNavigate();
   const user=useSelector(state=>state.user)
 console.log(user)
   useEffect(()=>{
       if(user.isAuthenticated){
          navigate('/posts')
       }
},[user])

  return (
    <div>
      <Hero/>
      <Login/>
    </div>
  )
}
