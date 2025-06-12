import React, { useState } from 'react'


const Loginform = () => {
    const [state, setstate] = useState('sign in');
    
  return (
    <main>
        <div className='flex flex-col items-center mt-10  h-[75vh] w-[100%] bg-white  shadow-[0_0_12px_rgba(0,0,0,0.1)] '>
        
         <h1 className=" font-bold text-[#302B63] text-[30px] w-[100%] text-center mx-auto mt-[0.7em]">
          {state === 'sign in' ? 'Welcome Back to KConnect' : 'Get Started with KConnect'}
        </h1>

        <p className="text-[18px] text-[#252525] text-center my-3 w-[80%] px-2 mx-auto font-medium">
          {state === 'sign up' ? "Let's help you get started with the perfect solution" : "Let's help you get started with the perfect solution"}
        </p>

        <form action="" className='flex flex-col w-[75%] mx-auto'>
        <div className=' flex flex-col mb-4'>
            <label htmlFor="email" className='mb-1.2 text-[#302B63] font-[medium] text-[17px]'>Email</label>
            <input type="email" name="email" id="email" placeholder='Enter your email' className='border-2 border-[#302B63] pl-2.5 outline-none py-0.5 h-9 rounded-md placeholder:text-[#616161] placeholder:font-medium' required />
            
        </div>

        <div className='flex flex-col'>
            <label htmlFor="passwd" className='mb-1.2 text-[#302B63] font-[medium] text-[17px]'>Password</label>
            <input type="password" name="passwd" id="" placeholder='***********' className='border-2 border-[#302B63] pl-2.5 outline-none py-0.5 h-9 rounded-md placeholder:text-[#616161] placeholder:font-medium' required/>
        </div>
        {state === 'sign in' && (<p className='cursor-pointer text-[#302B63] mt-2'>
            Forgot Password?
        </p>)}
        


        <button className="w-[100%] mx-auto block h-[2.3em] transition-all ease-out duration-300 hover:scale-105 bg-[#302B63] rounded-md text-white font-bold font-inter mt-[0.8em] text-[20px] cursor-pointer" >
           {state === 'sign in' ? 'Sign In' : 'Sign Up'}
        </button>
       </form>


        {state === 'sign up'? (<p className='mt-2'>
        Already have an account?  {' '}
        <span className='text-blue-400 cursor-pointer underline' onClick={()=>setstate('sign in')}>
            Login here
        </span>
       </p>) 
       :
        ( <p className='mt-2'>
        Don't have an account?  {' '}
        <span className='text-blue-400 cursor-pointer underline' onClick={()=>setstate('sign up')}>
            Sign up
        </span>
       </p>
        )
        }
       

      
        
      
    </div>

    </main>






  )
}

export default Loginform