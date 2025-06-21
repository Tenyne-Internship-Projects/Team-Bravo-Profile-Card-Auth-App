import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/kconnect.png';
import thumbnail from '../assets/thumbnail.png';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const Register = () => {
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const [preview, setPreview] = useState(thumbnail);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

 const [form, setForm] = useState({
  fullname: '', 
  username: '',
  email: '',
  contact: '',
  country: '',
  state: '',
  about: '',
  skills: '',
  tools: '',
  github: '',
  portfolio: '',
});


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

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

    const requiredFields = ['fullname', 'email', 'contact', 'country', 'state', 'about'];
    for (const field of requiredFields) {
      if (!form[field]) {
        toast.error(`Please fill in the ${field} field`);
        return;
      }
    }

    try {
      setLoading(true);
      const formData = new FormData();
      for (const key in form) {
        formData.append(key, form[key]);
      }
      if (image) formData.append('image', image);

      const { data } = await axios.post(`${backendUrl}/api/auth/register`, formData);

      if (data.success) {
        toast.success('Profile registered successfully!');
        navigate('/profile');
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-blue-200 min-h-screen px-4 py-8">
      {/* Logo */}
      <div className="w-full p-2 sm:p-6 sm:px-24 absolute top-0">
        <img src={logo} alt="KConnect Logo" className="w-1/5 sm:w-1/6 cursor-pointer" />
      </div>

      {/* Card */}
      <div className="w-full max-w-xl bg-white rounded-md shadow-md p-6 mt-24">
        <h1 className="text-[#4A008F] text-2xl sm:text-3xl font-semibold text-center mb-4">
          Create Your Profile
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Image Upload */}
          <div className="flex flex-col items-center">
            <label htmlFor="image-upload" className="cursor-pointer">
              <img
                src={preview}
                alt="Preview"
                className="h-24 w-24 sm:h-28 sm:w-28 object-cover rounded-full"
              />
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <p className="text-sm text-[#302B63] mt-1">Click image to upload</p>
          </div>

          {/* Fullname */}
          <div>
            <label className="text-[#302B63] font-medium">Full name</label>
            <input
              type="text"
              name="fullname"
              value={form.fullname}
              onChange={handleChange}
              placeholder="Fullname"
              className="border-2 border-[#302B63] rounded-md px-3 py-2 w-full outline-none"
              required
            />
          </div>

          {/* Username */}
<div>
  <label className="text-[#302B63] font-medium">Username</label>
  <input
    type="text"
    name="username"
    value={form.username}
    onChange={handleChange}
    placeholder="Unique username"
    className="border-2 border-[#302B63] rounded-md px-3 py-2 w-full outline-none"
    required
  />
</div>


          {/* Email and Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[#302B63] font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="border-2 border-[#302B63] rounded-md px-3 py-2 w-full outline-none"
                required
              />
            </div>
            <div>
              <label className="text-[#302B63] font-medium">Contact</label>
              <input
                type="text"
                name="contact"
                value={form.contact}
                onChange={handleChange}
                placeholder="+234 810 000 0000"
                className="border-2 border-[#302B63] rounded-md px-3 py-2 w-full outline-none"
                required
              />
            </div>
          </div>

          {/* Country and State */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[#302B63] font-medium">Country</label>
              <input
                type="text"
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="e.g. Nigeria"
                className="border-2 border-[#302B63] rounded-md px-3 py-2 w-full outline-none"
                required
              />
            </div>
            <div>
              <label className="text-[#302B63] font-medium">State</label>
              <input
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="e.g. Lagos"
                className="border-2 border-[#302B63] rounded-md px-3 py-2 w-full outline-none"
                required
              />
            </div>
          </div>

          {/* About */}
          <div>
            <label className="text-[#302B63] font-medium">About Me</label>
            <textarea
              name="about"
              value={form.about}
              onChange={handleChange}
              placeholder="Tell us about yourself..."
              className="border-2 border-[#302B63] rounded-md px-3 py-2 w-full outline-none h-24"
              required
            />
          </div>

          {/* Skills, Tools, GitHub, Portfolio */}
          <input
            type="text"
            name="skills"
            value={form.skills}
            onChange={handleChange}
            placeholder="Skills (comma-separated)"
            className="border-2 border-[#302B63] rounded-md px-3 py-2 w-full outline-none"
          />
          <input
            type="text"
            name="tools"
            value={form.tools}
            onChange={handleChange}
            placeholder="Tools (comma-separated)"
            className="border-2 border-[#302B63] rounded-md px-3 py-2 w-full outline-none"
          />
          <input
            type="text"
            name="github"
            value={form.github}
            onChange={handleChange}
            placeholder="GitHub URL"
            className="border-2 border-[#302B63] rounded-md px-3 py-2 w-full outline-none"
          />
          <input
            type="text"
            name="portfolio"
            value={form.portfolio}
            onChange={handleChange}
            placeholder="Portfolio URL"
            className="border-2 border-[#302B63] rounded-md px-3 py-2 w-full outline-none"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#302B63] text-white font-bold py-2 rounded-md text-lg transition-transform ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
            }`}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
