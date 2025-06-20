import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/kconnect.png';
import fallbackDp from '../assets/ay.png';
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

  useEffect(() => {
    if (!userData) getUserData();
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

  const handleEdit = () => navigate('/edit-profile');

  const profile = {
    username: userData?.username || 'John Doe',
    state: userData?.state || 'Lagos',
    country: userData?.country || 'Nigeria',
    about: userData?.about || 'No bio provided.',
    image: userData?.image || fallbackDp,
    skills: userData?.skills || [],
    tools: userData?.tools || [],
    email: userData?.email || 'no-email@example.com',
    contact: userData?.contact || 'Not provided',
    github: userData?.github || '',
    portfolio: userData?.portfolio || '',
  };

  return (
    <div className="flex flex-col items-center justify-center bg-blue-200 min-h-screen px-4">
      <div className="w-full p-2 sm:p-6 sm:px-24 absolute top-0">
        <img src={logo} alt="KConnect Logo" className="w-1/5 sm:w-1/6 cursor-pointer" />
      </div>

      <div className="mt-24 w-full max-w-lg bg-white shadow-md rounded-md overflow-hidden">
        {/* Header */}
        <div className="bg-[#302B63] h-24 flex items-center justify-end px-6 gap-3">
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
            src={profile.image}
            alt="Profile"
            className="h-24 w-24 rounded-full border-4 border-white object-cover"
          />
        </div>

        {/* Info */}
        <div className="p-6 space-y-4">
          <div>
            <h1 className="text-2xl font-semibold text-[#302B63] capitalize">
              {profile.username}
            </h1>
            <p className="text-gray-600">
              {profile.state}, {profile.country}
            </p>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed">{profile.about}</p>

          <div>
            <h3 className="text-lg font-semibold text-[#302B63] mb-1">Skills</h3>
            <p className="text-gray-700">
              {profile.skills.length ? profile.skills.join(' • ') : 'Not added'}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#302B63] mb-1">Tools</h3>
            <p className="text-gray-700">
              {profile.tools.length ? profile.tools.join(' • ') : 'Not added'}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#302B63] mb-1">Contact</h3>
            <p className="text-gray-700">📧 {profile.email}</p>
            <p className="text-gray-700">📞 {profile.contact}</p>
          </div>

          {(profile.portfolio || profile.github) && (
            <div>
              <h3 className="text-lg font-semibold text-[#302B63] mb-1">Links</h3>
              {profile.portfolio && (
                <a
                  href={profile.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline block"
                >
                  🌐 Portfolio
                </a>
              )}
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline block"
                >
                  🧑‍💻 GitHub
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
