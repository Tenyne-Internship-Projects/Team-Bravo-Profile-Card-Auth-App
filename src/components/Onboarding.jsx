import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <motion.div
        className="flex flex-col   max-w-md bg-white shadow-lg rounded-md p-6 sm:p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-bold text-[#4A008F] text-xl sm:text-4xl text-center w-full  mb-4">
          Welcome to HireConnect
        </h1>

        <p className="text-[15px] text-[#747196] text-center mb-6 font-medium">
         In order to get started, we would like you to sign up if you don’t have an account or sign in if you already have an account
        </p>

        <motion.button
          onClick={() => navigate('/login')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-[#2C275A] text-white font-bold py-2 rounded-md text-lg transition-all"
        >
          Get Started
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Onboarding;
