import React, { createRef, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

export default function AddPost() {
  const [error, setError] = useState("");
  const formRef = createRef();
  const titleRef = useRef();
  const bodyRef = useRef();
  const navigate = useNavigate();
  const submitHandle = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const body = bodyRef.current.value;
    console.log(title.length);
    if (body.length > 1000) {
      setError("In the Message maximum character limit of 1000");
    } else {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, body }),
        }
      );
      if (response) {
        console.log(response);
        setError("");
        formRef.current.reset();
        navigate("/posts");
        alert("Post added successfully");
      } else {
        alert("Failed to add post");
      }
    }
  };

  const user=useSelector(state=>state.user)

  useEffect(()=>{
      if(!user.isAuthenticated){
         navigate('/')
      }
},[user])

  return (
    <>
    <Navbar/>
    <div className="flex w-[100%] pt-[6rem] justify-center items-center py-[3rem] overflow-hidden ">
      <div className="max-w-[1350px] w-[100%] flex ">
        <div className="w-[100%] h-[100%] bg-[gray-100] flex justify-center items-center">
          <div className="bg-[white] xl:w-[60%] md:w-[80%] max-md:w-[100%]  p-[20px] box-border flex flex-col rounded-md shadow-xl">
            <h1 className="text-2xl font-bold text-green-600 mb-[2rem] text-center ">
              Add New Post
            </h1>
            <form
              onSubmit={submitHandle}
              ref={formRef}
              className="flex flex-col w-[100%] gap-y-5"
            >
              <input
                type="text"
                ref={titleRef}
                placeholder="Title"
                required
                className="outline-none border-[1px] px-2 py-3 tounded-md shadow-sm"
              />
              <div className="relative w-[100%]">
                <textarea
                  ref={bodyRef}
                  placeholder="Content"
                  rows="10"
                  required
                  className="outline-none pb-[2rem] w-[100%] border-[1px] px-2 py-3 tounded-md shadow-sm"
                />
                <div className="text-red-500 bottom-[-1rem] absolute text-sm text-center mt-[2rem]">
                  {error}
                </div>
              </div>
              <button
                type="submit"
                className="text-white font-bold bg-green-600 text-center py-3 rounded-full"
              >
                Add Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
