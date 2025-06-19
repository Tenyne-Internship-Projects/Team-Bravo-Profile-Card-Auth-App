import React, { useState } from 'react'
import logo from '../assets/kconnect.png'
import Loginform from '../components/Loginform'
import { useNavigate } from 'react-router-dom'



const Signin = () => {
    const [state, setstate] = useState('sign up')
    const navigate = useNavigate()
  return (
    <div  className='flex flex-col items-center justify-center bg-blue-200 min-h-screen'>
        <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0  '>
               <img src={logo  }alt="" className='w-28% sm:w-32% cursor-pointer' onClick={() => navigate('/')}/>
               
                    {/* <button 
                   
                   className='text-[#4A008F] border-2 border-[#4A008F]  px-9 py-2 rounded-md cursor-pointer hover:text-[1.3em] text-[20px] transition-all'>Hi 
                    Developer
                   </button>  */}
               
           </div>

        <Loginform />
      
    </div>
  )
}

export default Signin