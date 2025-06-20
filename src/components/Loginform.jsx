import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Loginform = () => {
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);
  const [state, setstate] = useState('sign in');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword((prev) => !prev);

  const validateForm = () => {
    if (state === 'sign up' && name.trim().length < 2) {
      toast.warning('Full name must be at least 2 characters');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.warning('Enter a valid email address');
      return false;
    }
    if (password.length < 8) {
      toast.warning('Password must be at least 8 characters');
      return false;
    }
    if (state === 'sign up' && password !== confirmPassword) {
      toast.warning('Passwords do not match');
      return false;
    }
    return true;
  };

  const onSubmithandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      axios.defaults.withCredentials = true;

      if (state === 'sign up') {
        const { data } = await axios.post(`${backendUrl}/api/auth/register`, {
          name,
          email,
          password,
          confirmPassword,
        });

        if (data.success) {
          toast.success(data.message || 'Registration successful. Please check your email to verify your account.');
          setIsLoggedIn(true);
          await getUserData();
          navigate('/verify-email');
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/auth/login`, {
          email,
          password,
        });

        if (data.success) {
          toast.success('Login successful');
          setIsLoggedIn(true);
          await getUserData();
          navigate('/');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center py-10">
      <div className="flex flex-col items-center w-full sm:w-[80%] md:w-[60%] lg:w-[100%] bg-white rounded-lg shadow-md p-6">
        <h1 className="font-bold text-[#302B63] text-2xl sm:text-3xl text-center mb-2">
          {state === 'sign in' ? 'Welcome Back to KConnect' : 'Get Started with KConnect'}
        </h1>

        <p className="text-base text-[#252525] text-center mb-6 font-medium">
          Let's help you get started with the perfect solution
        </p>

        <form onSubmit={onSubmithandler} className="w-full flex flex-col gap-4">
          {state === 'sign up' && (
            <div className="flex flex-col">
              <label className="mb-1 text-[#302B63] text-[17px] font-medium">Full Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Full name"
                className="border-2 border-[#302B63] rounded-md px-3 py-2 placeholder:text-[#616161] placeholder:font-medium outline-none"
                required
              />
            </div>
          )}

          <div className="flex flex-col">
            <label className="mb-1 text-[#302B63] text-[17px] font-medium">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter your email"
              className="border-2 border-[#302B63] rounded-md px-3 py-2 placeholder:text-[#616161] placeholder:font-medium outline-none"
              required
            />
          </div>

          <div className="flex flex-col relative">
            <label className="mb-1 text-[#302B63] text-[17px] font-medium">Password</label>
            <input
              onChange={(e) => {
                const val = e.target.value;
                setPassword(val);
                if (val.length < 8) {
                  setPasswordStrength('weak');
                } else if (/[A-Z]/.test(val) && /\d/.test(val) && /[^A-Za-z0-9]/.test(val)) {
                  setPasswordStrength('strong');
                } else {
                  setPasswordStrength('medium');
                }
              }}
              value={password}
              type={showPassword ? 'text' : 'password'}
              placeholder="***********"
              className="border-2 border-[#302B63] rounded-md px-3 py-2 placeholder:text-[#616161] placeholder:font-medium outline-none"
              required
            />
            <span
              onClick={togglePassword}
              className="absolute right-3 top-[38px] cursor-pointer text-[#302B63]"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {password && (
              <small
                className={`text-sm mt-1 ${
                  passwordStrength === 'weak'
                    ? 'text-red-500'
                    : passwordStrength === 'medium'
                    ? 'text-yellow-600'
                    : 'text-green-600'
                }`}
              >
                {passwordStrength === 'weak'
                  ? 'Weak password'
                  : passwordStrength === 'medium'
                  ? 'Medium strength'
                  : 'Strong password'}
              </small>
            )}
          </div>

          {state === 'sign up' && (
            <div className="flex flex-col relative">
              <label className="mb-1 text-[#302B63] text-[17px] font-medium">Confirm Password</label>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                type={showPassword ? 'text' : 'password'}
                placeholder="Re-enter password"
                className="border-2 border-[#302B63] rounded-md px-3 py-2 placeholder:text-[#616161] placeholder:font-medium outline-none"
                required
              />
            </div>
          )}

          {state === 'sign in' && (
            <p
              onClick={() => navigate('/reset-password')}
              className="text-sm text-[#302B63] text-right cursor-pointer"
            >
              Forgot Password?
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#302B63] text-white font-bold py-2 rounded-md text-lg hover:scale-105 transition-transform"
          >
            {state === 'sign in' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-4 text-sm">
          {state === 'sign up' ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span
            className="text-blue-500 cursor-pointer underline"
            onClick={() => setstate(state === 'sign in' ? 'sign up' : 'sign in')}
          >
            {state === 'sign in' ? 'Sign up' : 'Login here'}
          </span>
        </p>
      </div>
    </main>
  );
};

export default Loginform;
