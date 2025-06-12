import React from 'react'
import logo from '../assets/kconnect.png'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
        <img src={logo }alt="" className='w-28% sm:w-32% ' />
        
        <button 
            onClick={() =>navigate('/login')}
            className='text-[#4A008F] border-2 border-[#4A008F]  px-9 py-2 rounded-md cursor-pointer hover:text-[1.3em] text-[20px] transition-all'>Sign In
        </button>
        
    </div>
  )
}

export default Navbar