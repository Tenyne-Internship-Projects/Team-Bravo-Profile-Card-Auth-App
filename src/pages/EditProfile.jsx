import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/kconnect.png';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const EditProfile = () => {
  const {
    userData,
    setUserData,
    getUserData,
    backendUrl,
  } = useContext(AppContext);
  const navigate = useNavigate();

  const [preview, setPreview] = useState(userData?.image || '');
  const [image, setImage] = useState(null);
  const [fullName, setFullName] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [about, setAbout] = useState('');
  const [skills, setSkills] = useState('');
  const [tools, setTools] = useState('');

  useEffect(() => {
    if (userData) {
      setFullName(userData.fullName || '');
      setCountry(userData.country || '');
      setState(userData.state || '');
      setAbout(userData.about || '');
      setSkills(userData.skills?.join(', ') || '');
      setTools(userData.tools?.join(', ') || '');
      setPreview(userData.image || '');
    }
  }, [userData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      toast.warning('Please upload a valid image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !country || !state || !about) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('country', country);
      formData.append('state', state);
      formData.append('about', about);
      formData.append('skills', skills); // Comma-separated string
      formData.append('tools', tools);
      if (image) formData.append('image', image);

      const { data } = await axios.put(`${backendUrl}/api/user/edit-profile`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (data.success) {
        toast.success('Profile updated!');
        await getUserData(); // Refresh context
        navigate('/profile'); // Redirect
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-blue-200 min-h-screen px-4">
      <div className="w-full p-2 sm:p-6 sm:px-24 absolute top-0">
        <img src={logo} alt="KConnect Logo" className="w-1/5 sm:w-1/6 cursor-pointer" />
      </div>

      <div className="mt-24 w-full max-w-lg bg-white shadow-md rounded-md p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-center text-[#302B63]">Edit Profile</h2>

        {/* Profile image */}
        <div className="flex flex-col items-center">
          <label htmlFor="image" className="cursor-pointer">
            <img
              src={preview || 'https://via.placeholder.com/150'}
              alt="Preview"
              className="h-24 w-24 rounded-full border-2 border-[#302B63] object-cover"
            />
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <p className="text-sm text-[#302B63] mt-1">Click image to change</p>
        </div>

        {/* Form fields */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            className="border-2 border-[#302B63] px-3 py-2 rounded-md outline-none"
            required
          />

          <div className="flex gap-3">
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
              className="flex-1 border-2 border-[#302B63] px-3 py-2 rounded-md outline-none"
              required
            />
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="State"
              className="flex-1 border-2 border-[#302B63] px-3 py-2 rounded-md outline-none"
              required
            />
          </div>

          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="About Me"
            className="border-2 border-[#302B63] px-3 py-2 rounded-md outline-none h-24 resize-none"
            required
          />

          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="Skills (comma-separated)"
            className="border-2 border-[#302B63] px-3 py-2 rounded-md outline-none"
          />

          <input
            type="text"
            value={tools}
            onChange={(e) => setTools(e.target.value)}
            placeholder="Tools (comma-separated)"
            className="border-2 border-[#302B63] px-3 py-2 rounded-md outline-none"
          />

          <button
            type="submit"
            className="bg-[#302B63] text-white py-2 rounded-md font-semibold hover:scale-105 transition-transform"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
