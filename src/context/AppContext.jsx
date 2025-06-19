import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.BACKEND_URL;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // ⏳ Loading state

  // Check if user is authenticated
  const getAuthState = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`);
      if (data.success) {
        setIsLoggedIn(true);
        await getUserData(); // await here ensures loading completes after userData
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Get logged-in user data
  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`);
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    getAuthState();
    
  }, []);

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
    loading,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </AppContext.Provider>
  );
};
