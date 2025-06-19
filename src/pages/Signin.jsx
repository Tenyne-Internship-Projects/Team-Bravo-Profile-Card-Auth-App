import React from 'react'
import logo from '../assets/kconnect.png'
import Loginform from '../components/Loginform'
import { useNavigate } from 'react-router-dom'



const Signin = () => {
    
    const navigate = useNavigate()
  return (
    <div  className='flex flex-col items-center justify-center bg-blue-200 min-h-screen'>
        <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0  '>
               <img src={logo  }alt="" className='w-28% sm:w-32% cursor-pointer' onClick={() => navigate('/')}/>
           </div>

        <Loginform />
      
    </div>
  )
}

export default Signin