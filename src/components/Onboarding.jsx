import React from 'react'
import { useNavigate } from 'react-router-dom'


const Onboarding = () => {
    const navigate = useNavigate()
  return (
    <div className='flex flex-col items-center mt-2  h-[53vh] w-[40%] bg-white  shadow-[0_0_12px_rgba(0,0,0,0.1)] '>
        
         <h1 className=" font-bold text-[#4A008F] text-[30px] w-[80%] text-center mx-auto mt-[0.7em]">
          Welcome to HireConnect
        </h1>

        <p className="text-[16px] text-[#747196] text-center my-4 w-[80%] px-2 mx-auto font-medium">
          In order to get started, we would like you to sign up if you don’t have an account or sign in if you already have an account

        </p>

        <button onClick={() => navigate('/login')} className="w-[80%] mx-auto block h-[2.8em] transition-all ease-out duration-300 hover:scale-105 bg-[#2C275A] rounded-[2px] text-white font-bold font-inter mt-[1.9em] text-[16px]" >
          Get Started
        </button>

        
      
    </div>
  )
}

export default Onboarding