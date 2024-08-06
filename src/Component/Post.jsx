import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


export default function Post() {
  const [post, setPost] = useState([]);
  const [load, setLoad] = useState(false);
  const [start, setStart] = useState(0);
  const [len, setLen] = useState(0);
  
  const navigate=useNavigate();
  const user=useSelector(state=>state.user)

  useEffect(()=>{
      if(!user.isAuthenticated){
         navigate('/')
      }
},[user])

  useEffect(() => {
    const getLength = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts`
      );
      if (response) {
        const data = await response.json();
        console.log(data.length);
        setLen(data.length);
      }
    };
    const responseHandle = async () => {
      setLoad(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=10`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const data = await response.json();
        setPost(data);
        setLoad(false);
      }

      // console.log(data)
    };

    responseHandle();
    getLength();
  }, [start, len]);
  const handlePrev = () => {
    if (start > 0) {
      setStart((start) => start - 10);
     
    }
  };
  const handleNext = () => {
    // console.log('handleNext called');
    setStart((start) => start + 10);
  };

  return (
    <>
      <Navbar />
      <div className="w-[100vw] pt-[5rem] flex items-center justify-center overflow-hidden">
        <div className="max-w-[1350px] px-[5%] flex flex-col items-center py-[3rem] w-[100%] ">
          <h1 className="text-3xl font-bold text-center mb-[2rem] uppercase"> Posts</h1>
          
          
          <div className="grid xl:grid-cols-3 md:grid-cols-2 max-md:grid-col-1 gap-10">
            {load ? (
              <div>Loading...</div>
            ) : (
              post.map((post) => (
                <a href={`post/${post.id}`}>
                  <div
                    key={post.id}
                    className="w-[100%]  gap-3 flex flex-col  h-fit rounded-md shadow-md p-[1rem]"
                  >
                    <div className="flex flex-col  font-semibold ">
                      <h1 className="text-lg font-bold ">Title:</h1>
                      {post.title.slice(0, 30)}
                      {post.title.length > 30 && "..."}
                    </div>
                    <div className="flex  flex-col">
                      <div className="flex gap-2">
                        <h1 className="text-md font-bold">Detail:</h1>
                      </div>
                      {post.body.slice(0, 150)}
                      {post.body.length > 150 && "..."}
                    </div>
                  </div>
                </a>
              ))
            )}
          </div>
          <div className="mt-[2rem] flex gap-10 font-semibold">
            <button
              onClick={handlePrev}
              className={`px-3 py-2 bg-green-600  w-[5rem] text-white ${
                start === 0 && " cursor-not-allowed opacity-50"
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className={`px-3 py-2 bg-green-600 w-[5rem] text-white ${
                start > len - 20
                  ? "cursor-not-allowed hidden opacity-50"
                  : "opacity-1 block"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
