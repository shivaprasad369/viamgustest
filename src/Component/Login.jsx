import { jwtDecode } from "jwt-decode";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./Store/userSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState();
  const [error,setError]=useState('')
  const emailRef=useRef();
  const passwordRef=useRef();
  const navigate=useNavigate()
  const dispatch = useDispatch();
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  const sublitHandle=(e)=>{
    e.preventDefault()
    console.log(data)
    if (validateEmail(emailRef.current.value)) {
      setError('')
    } else {
      setError('Email is not valid')
    }
    if(error!=='' && emailRef.current.value=='abc@gmail.com' && passwordRef.current.value=='Abc@1234')
    {
      dispatch(
        login({ name: emailRef.current.value, name: emailRef.current.value, varify: true })
      );
     navigate('/post')
    }
  }
  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id:
        "889671418595-prc761jqd5kvqa902q64n1f1nt8st6vo.apps.googleusercontent.com",
      callback: handleAuthResponse,
    });
    window.google.accounts.id.renderButton(
      document.getElementById("btn"),

      {
        theme: "outline",
        size: "large",
      }
    );
  }, []);
  function handleAuthResponse(response) {
 
    const res = jwtDecode(response.credential);
    setData(() => ({name:res.name, email:res.email, varify:res.email_verified}));
    navigate('/posts')
    dispatch(
      login({ name: res.name, email: res.email, varify: res.email_verified })
    );
   
  }
  return (
    <div className="w-[100vw] flex justify-center items-center z-20 overflow-hidden xl:mt-[-200px] ">
      <div className="max-w-[1400px] w-[100%] flex justify-center items-center ">
        <div className=" border-0 w-[577px] bg-white h-[100%] rounded-[6px] flex flex-col items-center py-[1rem] ">
          <div className="w-[100%] py-1 shadow-md flex items-center justify-center">
            <img
              src={require("../Assets/Amazon_logo.svg.png")}
              className="w-[99px]"
              alt=""
            />
          </div>
          <div className="w-[70%] py-2 flex flex-col gap-5 items-center">
            <h1 className="text-[#20B716] text-[29px] font-semibold">Login</h1>
            <img
              src={require("../Assets/tree.png")}
              alt=""
              className="w-[385px]"
            />
            <form
              onSubmit={sublitHandle}
              className="w-[100%] flex flex-col gap-6 "
            >
              <div className="relative">
                <input
                ref={emailRef}
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="text-[#20B716] w-[100%] outline-none px-1 py-1 border-b-[2px] "
                />
                <div className="text-red-600 font-semibold absolute text-sm">{error}</div>
              </div>
              <div className="relative">
                <input
                ref={passwordRef}
                  type="password"
                  name="pasword"
                  placeholder="Password"
                  className="text-[#20B716] w-[100%] outline-none px-1 py-1 border-b-[2px] "
                />
                <div className="text-red-600 font-semibold absolute text-sm"></div>
              </div>
              <input
                type="submit"
                value={"Sign In"}
                className="py-2  bg-[#20B716] text-white font-semibold text-lg rounded-full"
              />
            </form>
            <div className="flex justify-between w-[100%] items-center">
              <a href="#" className="text-[#000000] text-sm">
                Forgot Password?
              </a>
              <a href="#" className="text-[#D9185F] font-semibold text-sm">
                New User? Sign Up
              </a>
            </div>
            <h4 className="font-semibold">or</h4>
            <div className="flex gap-5">
              <div id="btn" ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
