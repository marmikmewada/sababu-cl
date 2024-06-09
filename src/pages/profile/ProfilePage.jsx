import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AppNav from '../../components/AppNav';
import useStore from '../../zustand/store';

const UserProfile = () => {
  const { fetchUserProfile, profile, isLoadingProfile, logout, membershipStatus, applyForMembership } = useStore();
  const navigate = useNavigate();
  const [selectedMembershipType, setSelectedMembershipType] = useState('');
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  useEffect(() => {
    if (membershipStatus) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [membershipStatus]);

  useEffect(() => {
    if (membershipStatus === 'applied') {
      fetchUserProfile();
    }
  }, [membershipStatus, fetchUserProfile]);

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  const handleHome = () => {
    navigate('/');
  };

  const handleApplyForMembership = async () => {
    if (!selectedMembershipType) {
      setError('Please select a membership type');
      return;
    }

    try {
      const membershipData = { membershipType: selectedMembershipType };
      await applyForMembership(membershipData);
    } catch (error) {
      setError('Failed to apply for membership');
      console.error('Error applying for membership:', error);
    }
  };

  const handleDropdownChange = (event) => {
    setSelectedMembershipType(event.target.value);
    setError('');
  };

  const getPopupMessage = () => {
    switch (membershipStatus) {
      case 'none':
        return 'Apply for membership and be part of the good cause.';
      case 'applied':
        return 'Kindly contact admin@gmail.com to get your membership approved.';
      case 'about to expire':
        return 'Please contact admin@gmail.com to renew the membership before it expires.';
      case 'active':
        return 'Welcome to our community!';
      default:
        return '';
    }
  };

  if (isLoadingProfile) {
    return <div>Loading profile...</div>;
  }

  if (!profile) {
    return <div>No profile data available</div>;
  }

  if (membershipStatus === 'denied') {
    return <h1>Profile Locked</h1>;
  }

  const profileComponent = renderProfile(profile, membershipStatus);

  return (
    <div>
      <AppNav/>
      {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded mr-1" onClick={handleSignOut}>Sign Out</button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded mr-1" onClick={handleHome}>Home</button> */}

      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between items-center">
          <span>{getPopupMessage()}</span>
          <button onClick={() => setShowPopup(false)} className="text-white ml-4">Close</button>
        </div>
      )}
      {profileComponent}
      {/* <Link to="/app/user/edit">Edit Profile</Link> */}

      {membershipStatus === 'none' && (
        <div className="mt-4">
          <label htmlFor="membershipType" className="mr-2 font-bold">Select Membership Type:</label>
          <select id="membershipType" value={selectedMembershipType} onChange={handleDropdownChange} className="mr-2">
            <option value="">-- Select Membership Type --</option>
            <option value="single">Single</option>
            <option value="singlefamily">Single Family</option>
            <option value="family">Family</option>
            <option value="seniorcitizen">Senior Citizen</option>
          </select>
          <button onClick={handleApplyForMembership} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Apply for Membership
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      )}
    </div>
  );
};

const renderProfile = (profile, membershipStatus) => {
  const profileFields = {
    "First Name": profile.user?.firstName,
    "Middle Name": profile.user?.middleName,
    "Last Name": profile.user?.lastName,
    "Email": profile.user?.email,
    "Phone": profile.user?.phone,
    "Gender": profile.user?.gender,
    "Date of Birth": profile.user?.dob ? new Date(profile.user.dob).toLocaleDateString() : '',
    "Street": profile.user?.address?.street,
    "City": profile.user?.address?.city,
    "State": profile.user?.address?.state,
    "ZIP": profile.user?.address?.zip
  };

  const renderFields = (fields) => {
    return Object.keys(fields).map((key) => (
      <p key={key}>{key}: {fields[key] || ''}</p>
    ));
  };

  if (membershipStatus === 'none' || membershipStatus === 'applied') {
    return (
      <div>
        {/* adding navbar to non and applied  */}
        <AppNav/>

        <h2>Basic User Profile</h2>
        {renderFields(profileFields)}
        <Link to="/app/user/edit">Edit Profile</Link>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="max-w-7xl w-full">
        <h2 className="text-4xl font-bold mb-12 text-blue-900 text-center">User Profile</h2>

        <div className="mb-12 bg-white shadow-lg rounded-lg p-8">
          {renderFields(profileFields)}
          <Link
            to="/app/user/edit"
            className="text-pink-600 hover:underline block text-center mt-6 text-lg"
          >
            Edit Profile
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="bg-white shadow-xl rounded-2xl p-8">
            <h3 className="text-3xl font-bold mb-6 text-blue-800">Member Profile</h3>
            <p className="text-lg mb-4">Nationality: {profile.member?.nationality || 'N/A'}</p>
            <p className="text-lg mb-4">Hometown: {profile.member?.hometown || 'N/A'}</p>
            <p className="text-lg mb-4">Marital Status: {profile.member?.maritalStatus || 'N/A'}</p>
            <p className="text-lg mb-4">Origin: {profile.member?.origin || 'N/A'}</p>

            <h4 className="text-2xl font-semibold mt-8 mb-6 text-blue-900">Employment</h4>
            <p className="text-lg mb-4">Company: {profile.member?.employment?.company || 'N/A'}</p>
            <p className="text-lg mb-4">Employment Status: {profile.member?.employment?.employmentStatus || 'N/A'}</p>
            <p className="text-lg mb-4">Job Title: {profile.member?.employment?.jobTitle || 'N/A'}</p>
            <p className="text-lg mb-4">Work Address: {profile.member?.employment?.workAddress || 'N/A'}</p>
            <p className="text-lg mb-4">Work Phone: {profile.member?.employment?.workPhone || 'N/A'}</p>
            <p className="text-lg mb-4">Work Email: {profile.member?.employment?.workEmail || 'N/A'}</p>
          </div>

          <div className="bg-white shadow-xl rounded-2xl p-8">
            <h3 className="text-3xl font-bold mb-6 text-blue-800">Documents</h3>
            <h4 className="text-2xl font-semibold mt-4 mb-4 text-blue-600">Passport</h4>
            <p className="text-lg mb-4">Passport Number: {profile.member?.documents?.passport?.number || 'N/A'}</p>
            <p className="text-lg mb-4">
              Expiration Date: {profile.member?.documents?.passport?.expirationDate ? new Date(profile.member.documents.passport.expirationDate).toLocaleDateString() : 'N/A'}
            </p>

            <h4 className="text-2xl font-semibold mt-8 mb-4 text-blue-600">Driver License</h4>
            <p className="text-lg mb-4">License Number: {profile.member?.documents?.driverLicense?.number || 'N/A'}</p>
            <p className="text-lg mb-4">
              Expiration Date: {profile.member?.documents?.driverLicense?.expirationDate ? new Date(profile.member.documents.driverLicense.expirationDate).toLocaleDateString() : 'N/A'}
            </p>
            <p className="text-lg mb-4">State: {profile.member?.documents?.driverLicense?.state || 'N/A'}</p>
          </div>

          <div className="bg-white shadow-xl rounded-2xl p-8">
            <h3 className="text-3xl font-bold mb-6 text-blue-800">Emergency Contact</h3>
            {profile.member?.emergencyContact?.map((contact, index) => (
              <div key={index} className="mb-6">
                 <h4 className="text-2xl font-semibold mt-6 mb-4 text-blue-600">Emergency Contact {index+1}</h4>
                <p className="text-lg mb-2">Name: {contact.name || 'N/A'}</p>
                <p className="text-lg mb-2">Relationship: {contact.relation || 'N/A'}</p>
                <p className="text-lg mb-2">Phone: {contact.phone || 'N/A'}</p>
                <p className="text-lg mb-2">Email: {contact.email || 'N/A'}</p>
                <h4 className="text-2xl font-semibold mt-6 mb-4 text-blue-600">Address</h4>
                <p className="text-lg mb-2">Street: {contact.address?.street || 'N/A'}</p>
                <p className="text-lg mb-2">Apartment: {contact.address?.apt || 'N/A'}</p>
                <p className="text-lg mb-2">City: {contact.address?.city || 'N/A'}</p>
                <p className="text-lg mb-2">State: {contact.address?.state || 'N/A'}</p>
                <p className="text-lg mb-2">ZIP: {contact.address?.zip || 'N/A'}</p>
              </div>
            ))}
            <Link to="/app/member/edit" className="text-pink-600 hover:underline block text-center mt-6 text-lg">
              Edit Member Details
            </Link>
          </div>

          <div className="bg-white shadow-xl rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-blue-800">Household Profile</h2>
            {/* <p className="text-lg mb-4">Household ID: {profile.household?._id || 'N/A'}</p> */}

            <h3 className="text-2xl font-bold mt-8 mb-6 text-blue-900">Spouse</h3>
            <p className="text-lg mb-4">First Name: {profile.household?.spouse?.firstName || 'N/A'}</p>
            <p className="text-lg mb-4">Last Name: {profile.household?.spouse?.lastName || 'N/A'}</p>
            <p className="text-lg mb-4">Email: {profile.household?.spouse?.email || 'N/A'}</p>
            <p className="text-lg mb-4">
              Birthdate: {profile.household?.spouse?.birthdate ? new Date(profile.household.spouse.birthdate).toLocaleDateString() : 'N/A'}
            </p>
            <p className="text-lg mb-4">Nationality: {profile.household?.spouse?.nationality || 'N/A'}</p>
            <p className="text-lg mb-4">Sex: {profile.household?.spouse?.sex || 'N/A'}</p>
            <h4 className="text-2xl font-semibold mt-8 mb-4 text-blue-600">Address</h4>
            <p className="text-lg mb-4">Street: {profile.household?.spouse?.address?.street || 'N/A'}</p>
            <p className="text-lg mb-4">Apartment: {profile.household?.spouse?.address?.apt || 'N/A'}</p>
            <p className="text-lg mb-4">City: {profile.household?.spouse?.address?.city || 'N/A'}</p>
            <p className="text-lg mb-4">State: {profile.household?.spouse?.address?.state || 'N/A'}</p>
            <p className="text-lg mb-4">ZIP: {profile.household?.spouse?.address?.zip || 'N/A'}</p>
          </div>

          <div className="bg-white shadow-xl rounded-2xl p-8">
            <h3 className="text-3xl font-bold mb-6 text-blue-800">Children</h3>
            {profile.household?.children?.map((child, index) => (
              <div key={index} className="mb-6">
                <h4 className="text-2xl font-semibold mt-6 mb-4 text-blue-600">Children {index+1}</h4>
                <p className="text-lg mb-2">First Name: {child.firstName || 'N/A'}</p>
                <p className="text-lg mb-2">Last Name: {child.lastName || 'N/A'}</p>
                <p className="text-lg mb-2">Email: {child.email || 'N/A'}</p>
                <p className="text-lg mb-2">
                  Birthdate: {child.birthdate ? new Date(child.birthdate).toLocaleDateString() : 'N/A'}
                </p>
                <h4 className="text-2xl font-semibold mt-6 mb-4 text-blue-600">Address</h4>
                <p className="text-lg mb-2">Street: {child.address?.street || 'N/A'}</p>
                <p className="text-lg mb-2">Apartment: {child.address?.apt || 'N/A'}</p>
                <p className="text-lg mb-2">City: {child.address?.city || 'N/A'}</p>
                <p className="text-lg mb-2">State: {child.address?.state || 'N/A'}</p>
                <p className="text-lg mb-2">ZIP: {child.address?.zip || 'N/A'}</p>
              </div>
            ))}
          </div>

          <div className="bg-white shadow-xl rounded-2xl p-8">
            <h3 className="text-3xl font-bold mb-6 text-blue-800">Adult Dependents</h3>
            {profile.household?.adultDependents?.map((dependent, index) => (
              <div key={index} className="mb-6">
                <h4 className="text-2xl font-semibold mt-6 mb-4 text-blue-600">Adult Dependent {index+1}</h4>
                <p className="text-lg mb-2">First Name: {dependent.firstName || 'N/A'}</p>
                <p className="text-lg mb-2">Last Name: {dependent.lastName || 'N/A'}</p>
                <p className="text-lg mb-2">Email: {dependent.email || 'N/A'}</p>
                <p className="text-lg mb-2">
                  Birthdate: {dependent.birthdate ? new Date(dependent.birthdate).toLocaleDateString() : 'N/A'}
                </p>
                <p className="text-lg mb-2">Nationality: {dependent.nationality || 'N/A'}</p>
                <p className="text-lg mb-2">Sex: {dependent.sex || 'N/A'}</p>
                <h4 className="text-2xl font-semibold mt-6 mb-4 text-blue-600">Address</h4>
                <p className="text-lg mb-2">Street: {dependent.address?.street || 'N/A'}</p>
                <p className="text-lg mb-2">Apartment: {dependent.address?.apt || 'N/A'}</p>
                <p className="text-lg mb-2">City: {dependent.address?.city || 'N/A'}</p>
                <p className="text-lg mb-2">State: {dependent.address?.state || 'N/A'}</p>
                <p className="text-lg mb-2">ZIP: {dependent.address?.zip || 'N/A'}</p>
              </div>
            ))}
            <Link to="/app/household/edit" className="text-pink-600 hover:underline block text-center mt-6 text-lg">
              Edit Household Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
  
  
};

export default UserProfile;
