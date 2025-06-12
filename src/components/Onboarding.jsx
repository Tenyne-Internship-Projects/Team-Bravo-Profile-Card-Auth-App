import React from 'react'
import { useNavigate } from 'react-router-dom'


const Onboarding = () => {
    const onboard = useNavigate()
  return (
    <div className='flex flex-col items-center mt-2  h-[53vh] w-[40%] bg-white  shadow-[0_0_12px_rgba(0,0,0,0.1)] '>
        
         <h1 className=" font-medium text-[#4A008F] text-[30px] w-[80%] text-center mx-auto mt-[0.7em]">
          Build Your Dream Team with Ease
        </h1>

        <p className="text-[18px] text-[#252525] text-center my-3 w-[80%] px-2 mx-auto font-medium">
          Let's help you get started with the perfect solution.
        </p>

        <button onClick={()=>onboard('/register')} className="w-[80%] mx-auto block h-[2.8em] transition-all ease-out duration-300 hover:scale-105 bg-[#4A008F] rounded-[2px] text-white font-bold font-inter mt-[1.5em]" >
          Get Started
        </button>
      
    </div>
  )
}

export default Onboarding