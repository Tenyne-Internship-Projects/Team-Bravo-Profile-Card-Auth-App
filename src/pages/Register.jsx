import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/kconnect.png';
import thumbnail from '../assets/thumbnail.png';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const Register = () => {
  const { backendUrl } = useContext(AppContext);
  const [preview, setPreview] = useState(thumbnail);
  const [image, setImage] = useState(null);
  const [fullName, setFullName] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onImageChange = (e) => {
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

    if (!image || !fullName || !country || !state || !about) {
      toast.error('Please fill all fields and upload an image');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', image);
      formData.append('fullName', fullName);
      formData.append('country', country);
      formData.append('state', state);
      formData.append('about', about);

      await axios.post(`${backendUrl}/api/auth/register`, formData);

      toast.success('Profile submitted successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-blue-200 min-h-screen px-4">
      <div className="w-full p-2 sm:p-6 sm:px-24 absolute top-0">
        <img src={logo} alt="KConnect Logo" className="w-1/5 sm:w-1/6 cursor-pointer" />
      </div>

      <div className="flex flex-col items-center mt-17 w-full max-w-lg bg-white shadow-md rounded-md p-6">
        <h1 className="font-medium text-[#4A008F] text-2xl sm:text-3xl text-center mb-4">
          Complete Profile
        </h1>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          {/* Image Upload */}
          <div className="flex flex-col items-center">
            <label htmlFor="image-upload" className="cursor-pointer">
              <img
                src={preview}
                alt="Upload Preview"
                className="h-24 w-24 rounded-full  "
              />
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onImageChange}
            />
            <p className="text-sm text-[#302B63] mt-2">Click image to upload</p>
          </div>

          {/* Full Name */}
          <div>
            <label className="text-[#302B63] font-medium">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter Your Full Name"
              className="border-2 border-[#302B63] rounded-md px-3 py-2 w-full outline-none"
              required
            />
          </div>

          {/* Country and State */}
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <div className="flex-1">
              <label className="text-[#302B63] font-medium">Country</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="e.g Nigeria"
                className="border-2 border-[#302B63] rounded-md px-3 py-2 w-full outline-none"
                required
              />
            </div>

            <div className="flex-1">
              <label className="text-[#302B63] font-medium">State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="e.g Lagos"
                className="border-2 border-[#302B63] rounded-md px-3 py-2 w-full outline-none"
                required
              />
            </div>
          </div>

          {/* About Me */}
          <div>
            <label className="text-[#302B63] font-medium">About Me</label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Tell us about yourself..."
              className="border-2 border-[#302B63] rounded-md px-3 py-2 w-full outline-none h-24"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#302B63] text-white font-bold py-2 rounded-md text-lg transition-transform ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
            }`}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
