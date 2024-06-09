import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate for navigation
import useStore from '../../zustand/store'; // Path to your Zustand store
import AppNav from '../../components/AppNav';

const EditUser = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  const { profile, updateUserProfile, fetchUserProfile } = useStore(state => ({
    profile: state.profile,
    updateUserProfile: state.updateUserProfile,
    fetchUserProfile: state.fetchUserProfile
  }));

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    street: '',
    city: '',
    state: '',
    zip: ''
  });

  const [updateSuccess, setUpdateSuccess] = useState(false); // State to manage update success

  useEffect(() => {
    if (profile) {
      setFormData(prevState => ({
        ...prevState,
        firstName: profile.user?.firstName || '',
        middleName: profile.user?.middleName || '',
        lastName: profile.user?.lastName || '',
        email: profile.user?.email || '',
        phone: profile.user?.phone || '',
        gender: profile.user?.gender || '',
        dob: profile.user?.dob ? profile.user.dob.slice(0, 10) : '',
        street: profile.user?.address?.street || '',
        city: profile.user?.address?.city || '',
        state: profile.user?.address?.state || '',
        zip: profile.user?.address?.zip || ''
      }));
    } else {
      // Fetch user profile if not already loaded
      fetchUserProfile();
    }
  }, [profile, fetchUserProfile]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Remove empty fields from formData before sending
      const updateFields = {
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        dob: formData.dob,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zip: formData.zip
        }
      };

      await updateUserProfile(updateFields);
      setUpdateSuccess(true); // Set update success to true
      setTimeout(() => {
        navigate('/app/profile'); // Redirect to profile page after successful update
      }, 3000); // Redirect after 3 seconds
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle error, show error message
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AppNav />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Edit User Profile</h2>
        <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
          {['firstName', 'middleName', 'lastName', 'email', 'phone', 'street', 'city', 'state', 'zip'].map((field) => (
            <div className="mb-4" key={field}>
              <label className="block text-gray-700 text-sm font-bold mb-2 capitalize" htmlFor={field}>
                {field.split(/(?=[A-Z])/).join(' ')}:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={field}
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
              />
            </div>
          ))}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
              Gender:
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">
              Date of Birth:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="dob"
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </form>
        <Link
          to="/app/profile"
          className="block mt-4 text-blue-500 hover:text-blue-700 font-bold"
        >
          Back to Profile
        </Link>
        {updateSuccess && (
          <div className="mt-4 bg-green-100 border-t border-b border-green-500 text-green-700 px-4 py-3" role="alert">
            <p className="font-bold">Success</p>
            <p className="text-sm">Profile updated successfully!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditUser;
