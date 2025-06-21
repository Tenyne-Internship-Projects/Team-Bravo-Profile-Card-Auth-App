import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import logo from '../assets/kconnect.png';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Emailverify = () => {
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const { backendUrl, isLoggedIn, userData, getUserData } = useContext(AppContext);
  const inputRefs = useRef([]);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(60); // countdown for 60 seconds

  // Countdown effect
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Dynamic masking
  const maskEmail = (email) => {
    if (!email) return '';
    const [user, domain] = email.split('@');
    const visible = user.slice(0, 2);
    return `${visible}***@${domain}`;
  };

  const handleInput = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]$/.test(value)) {
      e.target.value = '';
      return;
    }
    if (value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('').slice(0, 6);
    pasteArray.forEach((char, index) => {
      if (/^[0-9]$/.test(char) && inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const clearInputs = () => {
    inputRefs.current.forEach((input) => {
      if (input) input.value = '';
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join('');

      const { data } = await axios.post(`${backendUrl}/api/auth/verify-otp`, { otp });

      if (data.success) {
        toast.success(data.message);
        clearInputs();
        await getUserData();
        navigate('/register');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Verification failed. Try again.');
    }
  };

  const handleResendOTP = async () => {
    try {
      setResendLoading(true);
      const { data } = await axios.post(`${backendUrl}/api/auth/resend-otp`);
      if (data.success) {
        toast.success(data.message || 'OTP resent successfully.');
        setTimer(60);
      } else {
        toast.error(data.message || 'Failed to resend OTP.');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error resending OTP.');
    } finally {
      setResendLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn && userData?.isAccountVerified) {
      navigate('/');
    }
  }, [isLoggedIn, userData, navigate]);

  return (
    <div className="flex flex-col items-center justify-center bg-blue-200 min-h-screen px-4">
      <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
        <img src={logo} alt="KConnect Logo" className="w-1/3 sm:w-1/5 cursor-pointer" />
      </div>

      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-center mt-20 sm:mt-24 bg-white p-6 rounded-lg shadow-md w-full sm:w-[80%] md:w-[50%] lg:w-[40%]"
      >
        <h1 className="font-bold text-[#302B63] text-[24px] sm:text-[30px] text-center mb-3">
          Check your email
        </h1>

        <p className="text-[16px] sm:text-[18px] text-[#747196] text-center mb-4">
          Enter the 6-digit code sent to your email <br />
          <span className="font-medium">
            {userData?.email ? maskEmail(userData.email) : 'your email'}
          </span>
        </p>

        <div
          className="flex justify-between gap-2 sm:gap-3 mb-4"
          onPaste={handlePaste}
        >
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                type="text"
                maxLength="1"
                key={index}
                required
                pattern="\d*"
                inputMode="numeric"
                className="w-10 h-10 sm:w-12 sm:h-12 bg-[#302B63] text-white text-center text-xl rounded-md"
                ref={(el) => (inputRefs.current[index] = el)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
        </div>

        <button
          type="submit"
          className="w-full bg-[#302B63] text-white py-2 rounded-md font-semibold hover:scale-105 transition-all"
        >
          Verify Email
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm text-[#747196]">
            Didn't receive code?{' '}
            <button
              type="button"
              onClick={handleResendOTP}
              className="text-[#302B63] font-medium underline disabled:opacity-50"
              disabled={timer > 0 || resendLoading}
            >
              {resendLoading
                ? 'Resending...'
                : timer > 0
                ? `Resend in ${timer}s`
                : 'Resend OTP'}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Emailverify;
