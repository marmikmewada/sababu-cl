import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate for navigation
import useStore from '../../zustand/store'; // Path to your Zustand store

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
    <div>
      <h2>Edit User Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        </label>
        <br />
        <label>
          Middle Name:
          <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Phone:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
        </label>
        <br />
        <label>
          Gender:
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <br />
        <label>
          Date of Birth:
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
        </label>
        <br />
        <label>
          Street:
          <input type="text" name="street" value={formData.street} onChange={handleChange} />
        </label>
        <br />
        <label>
          City:
          <input type="text" name="city" value={formData.city} onChange={handleChange} />
        </label>
        <br />
        <label>
          State:
          <input type="text" name="state" value={formData.state} onChange={handleChange} />
        </label>
        <br />
        <label>
          Zip:
          <input type="text" name="zip" value={formData.zip} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <Link to="/app/profile">Back to Profile</Link> {/* Example link to navigate back */}
      
      {updateSuccess && (
        <div style={{ backgroundColor: 'lightgreen', padding: '10px', marginTop: '10px' }}>
          Profile updated successfully!
        </div>
      )}
    </div>
  );
};

export default EditUser;
