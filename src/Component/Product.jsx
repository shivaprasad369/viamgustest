import React from 'react'
import productList from './Constant/Product'
import Navbar from './Navbar'
import { useDispatch } from 'react-redux'
import { addItem } from './Store/cartSlice';
export default function Product() {
   
    const dispatch=useDispatch();
    const handleSubmit=(id)=>{
        // onClick={()=>handleCart(datas,amt,datas[0].id) 
        const data=productList.filter((data)=>data.id===id)
        console.groupCollapsed(data)
        dispatch(addItem({id:data[0].id,name:data[0].name,quantity:data[0].quantity,price:data[0].price}))
        alert("added to cart")
    }
  return (
    <>
    <Navbar/>
    <div className='w-[100vw] h-[100%] flex justify-center items-center'>
        <div className='max-w-[1350px] w-[100%] flex justify-center '>
            <div className='w-[100%] px-[5%] py-[6rem] text-center'>
                <h1 className='text-3xl font-bold pb-[3rem] uppercase text-green-600'>
                    Product List
                </h1>
                <div className='grid xl:grid-cols-3 md:grid-cols-2 max-xl:grid-cols-1 gap-x-5 gap-y-10'>
                    {productList?.map((data,index)=>
                        <div key={data.id} className='border-[1px] px-3 py-7 pb-[2rem] shadow-xl flex flex-col gap-5 w-[100%] items-center border-gray-200'>
                        <img src={require('../Assets/tree.png')} alt="" className='w-[100%] object-cover h-[10rem]' />
                        <div className='border-b-[1px]  py-2 w-[100%]'/>
                        <h2 className='text-2xl font-bold'>{data?.name}</h2>
                        
                        <div className='flex justify-between w-[100%]'>
                        <h2 className='text-2xl font-bold'>₹{data?.price}</h2>
                            <button onClick={()=>handleSubmit(data.id)} className='w-fit px-5 py-3 rounded-full  bg-green-500 font-bold text-white'>
                            Add To Cart
                        </button>
                            </div>

                    </div>)}
    

                </div>

            </div>

        </div>
      
    </div>
    </>
  )
}
