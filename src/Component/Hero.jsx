import React from 'react'

export default function Hero() {
  return (
    <div className='w-[100vw] flex z-10 justify-center items-center overflow-hidden '>
        <div className='max-w-[1400px] w-[100%] flex '>
            <img src={require('../Assets/Banner.png')} alt="" className='w-[100%]  max-xl:hidden object-cover' />

        </div>
      
    </div>
  )
}
