import { Suspense } from "react";
import { Add,PostDetails, Posts } from "./Component/Container";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginContainer from "./Component/LoginContainer";
import Product from "./Component/Product";
import Cart from "./Component/Cart";



// import Hero from "./Component/Hero";

const App = () => {
  
 return(
  <>
  <BrowserRouter>
  <Suspense fallback={
    <div className="w-[100vw] h-[100vh] flex justify-center items-center font-bold">

      <h1>Loading</h1>
    </div>
    }>
    <Routes>
      <Route path="/" element={<LoginContainer />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/post/:id" element={<PostDetails />} />
      <Route path="/add" element={<Add />} />
      <Route path="/product" element={<Product />} />
      <Route path="/cart" element={<Cart />} />

    
    
    </Routes>
 
  </Suspense>
 
  </BrowserRouter>
  {/* <FacebookLogin
 appId='1247040163120863'
 onResolve={(res)=>console.log(res)}
 onReject={(err)=>console.log(err)}
 render={renderProps => (
    <button onClick={renderProps.onClick}>This is my custom FB button</button>
  )}
 /> */}

  </>
 );
};

export default App;
