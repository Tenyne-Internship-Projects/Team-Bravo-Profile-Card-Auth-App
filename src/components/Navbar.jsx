import React, { useContext } from 'react';
import logo from '../assets/kconnect.png';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Navbar = () => {
  const { userData, backendUrl, setUserData, setIsLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();
  const details = userData?.name || userData?.email;
  const sendVerificatuonOtp = async () => {
    try {
      axios.defaults.withCredentials = true;

      const {data}  = await axios.post(backendUrl + '/api/auth/send-verify-otp')

      if(data.success) {
        navigate('/email-verify')
        toast.success(data.message)
      } else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/logout`);

      if (data.success) {
        setIsLoggedIn(false);
        setUserData(null);
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
      <img
        onClick={() => navigate('/')}
        src={logo}
        alt="KConnect Logo"
        className='w-1/4 sm:w-1/5 cursor-pointer'
      />

      {details ? (
        <div className='w-8 h-8 flex justify-center items-center rounded-full bg-[#4A008F] text-white relative group cursor-pointer'>
          {details[0]?.toUpperCase()}
          <div className='absolute hidden group-hover:block top-full right-0 z-10 text-black rounded mt-2 shadow-md bg-white'>
            <ul className='list-none m-0 p-2 text-sm'>
              {!userData?.isAccountVerified && (
                <li onClick={sendVerificatuonOtp} className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>Verify email</li>
              )}
              <li onClick={logout} className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10'>
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate('/login')}
          className='text-[#4A008F] border-2 border-[#4A008F] px-9 py-2 rounded-md cursor-pointer hover:text-[1.3em] text-[20px] transition-all'
        >
          Sign in
        </button>
      )}
    </div>
  );
};

export default Navbar;
