import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/kconnect.png';
import dp from '../assets/ay.png'; // fallback profile image
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProfileCard = () => {
  const {
    userData,
    setUserData,
    getUserData,
    setIsLoggedIn,
    backendUrl,
  } = useContext(AppContext);

  const navigate = useNavigate();

  // Mock data for testing if userData is not available
  const mockUserProfile = {
    fullName: 'John Doe',
    state: 'Lagos',
    country: 'Nigeria',
    about:
      'I’m a passionate full stack developer with 5+ years of experience building scalable web applications. I love working with React, Node.js, and exploring new tools.',
    image: 'https://i.pravatar.cc/150?img=32',
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
    tools: ['VSCode', 'Postman', 'GitHub', 'Figma'],
    email: 'john.doe@example.com',
    phone: '+234 812 345 6789',
  };

  const profile = userData || mockUserProfile;

  useEffect(() => {
    if (!userData) {
      getUserData();
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(`${backendUrl}/api/auth/logout`, { withCredentials: true });
      setIsLoggedIn(false);
      setUserData(null);
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Logout failed');
    }
  };

  const handleEdit = () => {
    navigate('/edit-profile');
  };

  return (
    <div className="flex flex-col items-center justify-center bg-blue-200 min-h-screen px-4">
      {/* Logo */}
      <div className="w-full p-2 sm:p-6 sm:px-24 absolute top-0">
        <img src={logo} alt="KConnect Logo" className="w-1/5 sm:w-1/6 cursor-pointer" />
      </div>

      {/* Card */}
      <div className="mt-24 w-full max-w-lg bg-white shadow-md rounded-md overflow-hidden">
        {/* Header */}
        <div className="bg-[#302B63] h-24 flex items-center justify-end px-6 gap-4">
          <button
            onClick={handleEdit}
            className="text-white text-sm bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
          >
            Edit
          </button>
          <button
            onClick={handleLogout}
            className="text-white text-sm bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Profile Image */}
        <div className="flex justify-start px-6 -mt-12">
          <img
            src={ dp}
            alt="Profile"
            className="h-24 w-24 rounded-full border-4 border-white object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="p-6 space-y-4">
          <div>
            <h1 className="text-2xl font-semibold text-[#302B63]">
              {profile.fullName || 'Full Name'}
            </h1>
            <p className="text-gray-600">
              {profile.state || 'State'}, {profile.country || 'Country'}
            </p>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed">
            {profile.about || 'No bio provided.'}
          </p>

          <div>
            <h3 className="text-lg font-semibold text-[#302B63] mb-1">Skills</h3>
            <p className="text-gray-700">{profile.skills?.join(' • ') || 'Not added'}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#302B63] mb-1">Tools</h3>
            <p className="text-gray-700">{profile.tools?.join(' • ') || 'Not added'}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#302B63] mb-1">Contact Information</h3>
            <p className="text-gray-700">{profile.email || 'No email'}</p>
            <p className="text-gray-700">{profile.phone || 'No phone number'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
