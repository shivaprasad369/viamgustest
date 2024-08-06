import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./Store/userSlice";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const logoutHandle = () => {
    console.log(user.isAuthenticated);
    dispatch(logout());
    navigate("/");
  };

  console.log(user);
  useEffect(() => {
    if (!user.isAuthenticated) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
    <div className="w-[100vw] flex  max-xl:mb-[-5rem] justify-center items-center z-40 overflow-hidden xl:fixed ">
      <div className="max-w-[1400px] w-[100%] flex justify-center items-center bg-green-500">
        <div className="flex lg:justify-between w-[100%] text-white items-center px-[2rem] py-4 pr-[3rem]  text-md font-bold tracking-wider">
          <div className="text-3xl max-lg:hidden">Logo</div>
          <div className="flex max-xl:flex-wrap xl:gap-10 max-xl:gap-5 max-xl:flex max-xl:items-center max-xl:w-[100%] max-xl:justify-center">
            <a href="posts">Posts</a>
            <a href="/product">Products</a>
            <a href="add">Add Post</a>

            <span onClick={logoutHandle} className="cursor-pointer">
              Logout
            </span>
            <a href="/cart">Cart</a>
          </div>
        </div>
      </div>
      
    </div>
    </>
  );
}
