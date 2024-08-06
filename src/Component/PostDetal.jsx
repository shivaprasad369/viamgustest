import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar'

export default function PostDetal() {
    const [data,setDate]=useState()
    const [load,setLoad]=useState(false)
    const {id}=useParams()
    const fetchData = async () => {
        try {
            setLoad(true)
            const response = await fetch('https://jsonplaceholder.typicode.com/posts/'+id)
            const data = await response.json()
            setDate(data)
            setLoad(false)
        } catch (error) {
            setLoad(false)
            console.error(error);
        }
      
    }
    useEffect(() => {
        fetchData()
    }, [])
  return (
    <>
    <Navbar/>
    <div className='flex w-[100vw] pt-[5rem] justify-center items-center overflow-hidden'>
        <div className='max-w-[1350px] flex flex-col w-[100%] '>
            <div className='px-[5%] py-[3rem] flex flex-col justify-center items-center w-[100%]'>
                <h1 className='text-4xl font-bold text-center'>
                    Post Details
                </h1>
                {!load && 
                <div className='flex justify-center mt-[2rem] md:w-[80%] xl:w-[60%] max-md:w-[100%] rounded-md shadow-md px-[2rem] py-[3rem]   flex-col gap-4'>
                    {/* <img src='https://via.placeholder.com/500' alt='' /> */}
                    <h2 className='text-xl font-bold'>
                       id: {data?.id}
                    </h2>
                    <h2 className='text-xl font-bold'>
                      UserId: {data?.userId}
                    </h2>
                    <h2 className='text-xl font-bold'>
                       {data?.title}
                    </h2>
                   

                    <p>
                        {data?.body}
                        </p>

                </div>}
            </div>

        </div>
      
    </div>
    </>
  )
}
