import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Sample Country-State data
const countryStateData = {
  Nigeria: ['Lagos', 'Abuja', 'Oyo', 'Kano', 'Rivers'],
  Ghana: ['Accra', 'Kumasi', 'Tamale'],
  Kenya: ['Nairobi', 'Mombasa', 'Kisumu'],
};

const schema = yup.object().shape({
  fullName: yup.string().required('Full name is required').min(2),
  country: yup.string().required('Country is required'),
  state: yup.string().required('State is required'),
  about: yup.string().required('About Me is required').min(10),
  image: yup
    .mixed()
    .required('Image is required')
    .test('fileType', 'Only image files are allowed', (value) => {
      return value && value.type.startsWith('image/');
    }),
});

const CompleteRegister = () => {
  const { backendUrl, getUserData } = useContext(AppContext);
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [states, setStates] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const selectedCountry = watch('country');

  useEffect(() => {
    if (selectedCountry && countryStateData[selectedCountry]) {
      setStates(countryStateData[selectedCountry]);
      setValue('state', '');
    }
  }, [selectedCountry]);

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setValue('image', file, { shouldValidate: true });
      setPreview(URL.createObjectURL(file));
    } else {
      toast.warning('Please upload a valid image');
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('image', data.image);
      formData.append('fullName', data.fullName);
      formData.append('country', data.country);
      formData.append('state', data.state);
      formData.append('about', data.about);

      const res = await axios.post(`${backendUrl}/api/auth/complete-registration`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success('Profile completed successfully');
        await getUserData();
        navigate('/');
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10 bg-blue-50">
      <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[40%] bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-[#302B63] mb-4">Complete Your Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Image Upload + Thumbnail */}
          <div className="flex flex-col">
            <label className="text-[#302B63] font-medium">Upload Image</label>
            {preview && (
              <div className="mt-3 flex items-center gap-3">
                <div className="w-16 h-16 rounded-full overflow-hidden border border-[#302B63]">
                  <img src={preview} alt="Thumbnail" className="w-full h-full object-cover" />
                </div>
                <span className="text-sm text-[#302B63] font-medium">Image Preview</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={onImageChange}
              className="border border-[#302B63] rounded-md px-3 py-2 outline-none"
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
           
          </div>

          {/* Full Name */}
          <div className="flex flex-col">
            <label className="text-[#302B63] font-medium">Full Name</label>
            <input
              type="text"
              {...register('fullName')}
              className="border border-[#302B63] rounded-md px-3 py-2 outline-none"
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
          </div>

          {/* Country Dropdown */}
          <div className="flex flex-col">
            <label className="text-[#302B63] font-medium">Country</label>
            <select
              {...register('country')}
              className="border border-[#302B63] rounded-md px-3 py-2 outline-none"
            >
              <option value="">Select Country</option>
              {Object.keys(countryStateData).map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
          </div>

          {/* State Dropdown */}
          <div className="flex flex-col">
            <label className="text-[#302B63] font-medium">State</label>
            <select
              {...register('state')}
              className="border border-[#302B63] rounded-md px-3 py-2 outline-none"
              disabled={!selectedCountry}
            >
              <option value="">Select State</option>
              {states.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
            {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
          </div>

          {/* About Me */}
          <div className="flex flex-col">
            <label className="text-[#302B63] font-medium">About Me</label>
            <textarea
              {...register('about')}
              rows={4}
              className="border border-[#302B63] rounded-md px-3 py-2 outline-none"
              placeholder="Tell us something about yourself..."
            />
            {errors.about && <p className="text-red-500 text-sm">{errors.about.message}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#302B63] text-white py-2 rounded-md font-semibold hover:scale-105 transition-all"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </main>
  );
};

export default CompleteRegister;
