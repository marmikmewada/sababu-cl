
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
      // Optionally, you can handle success or navigate to another page
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
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded mr-1" onClick={handleSignOut}>Sign Out</button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded mr-1" onClick={handleHome}>Home</button>

      
      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between items-center">
          <span>{getPopupMessage()}</span>
          <button onClick={() => setShowPopup(false)} className="text-white ml-4">Close</button>
        </div>
      )}
      {profileComponent}
      <Link to="/app/user/edit">Edit Profile</Link>

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
  console.log(membershipStatus);
  console.log(profile.profile?.firstName, "pfp");
  console.log(profile, "ppp");

  if (membershipStatus === 'none') {
    return (
      <div>
        <h2>Basic User Profile</h2>
        <p>First Name: {profile.user?.firstName || ''}</p>
        <p>Last Name: {profile.user?.lastName || ''}</p>
        <p>Email: {profile.user?.email || ''}</p>
        <p>Phone: {profile.user?.phone || ''}</p>
        {/* add link tag which takes user to "/app/user/edit" page  */}
      </div>
    );
  }
  
  if (membershipStatus === 'applied') {
    console.log(profile, "apppp");
    return (
      <div>
        <h2>Basic User Profile</h2>
        <p>First Name: {profile.user?.firstName || ''}</p>
        <p>Last Name: {profile.user?.lastName || ''}</p>
        <p>Email: {profile.user?.email || ''}</p>
        <p>Phone: {profile.user?.phone || ''}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>First Name: {profile.user?.firstName || ''}</p>
      <p>Middle Name: {profile.user?.middleName || ''}</p>
      <p>Last Name: {profile.user?.lastName || ''}</p>
      <p>Email: {profile.user?.email || ''}</p>
      <p>Phone: {profile.user?.phone || ''}</p>
      <p>Gender: {profile.user?.gender || ''}</p>
      <p>Date of Birth: {profile.user?.dob ? new Date(profile.user.dob).toLocaleDateString() : ''}</p>
      <p>Image URL: {profile.user?.imageUrl || ''}</p>
      <p>Role: {profile.user?.role || ''}</p>
      <h2>Address</h2>
      <p>Street: {profile.user?.address?.street || ''}</p>
      <p>Apartment: {profile.user?.address?.apt || ''}</p>
      <p>City: {profile.user?.address?.city || ''}</p>
      <p>State: {profile.user?.address?.state || ''}</p>
      <p>ZIP: {profile.user?.address?.zip || ''}</p>

      <h2>Member Profile</h2>
      <p>Nationality: {profile.member?.nationality || ''}</p>
      <p>Hometown: {profile.member?.hometown || ''}</p>
      <p>Marital Status: {profile.member?.maritalStatus || ''}</p>
      <p>Origin: {profile.member?.origin || ''}</p>

      <h3>Employment</h3>
      <p>Company: {profile.member?.employment?.company || ''}</p>
      <p>Employment Status: {profile.member?.employment?.employmentStatus || ''}</p>
      <p>Job Title: {profile.member?.employment?.jobTitle || ''}</p>
      <p>Work Address: {profile.member?.employment?.workAddress || ''}</p>
      <p>Work Phone: {profile.member?.employment?.workPhone || ''}</p>
      <p>Work Email: {profile.member?.employment?.workEmail || ''}</p>

      <h3>Emergency Contact</h3>
      {profile.member?.emergencyContact?.map((contact, index) => (
        <div key={index}>
          <p>Name: {contact.name || ''}</p>
          <p>Relationship: {contact.relation || ''}</p>
          <p>Phone: {contact.phone || ''}</p>
          <p>Email: {contact.email || ''}</p>
          <h4>Address</h4>
          <p>Street: {contact.address?.street || ''}</p>
          <p>Apartment: {contact.address?.apt || ''}</p>
          <p>City: {contact.address?.city || ''}</p>
          <p>State: {contact.address?.state || ''}</p>
          <p>ZIP: {contact.address?.zip || ''}</p>
        </div>
      ))}

      <h2>Household Profile</h2>
      <p>Household ID: {profile.household?._id || ''}</p>

      <h3>Spouse</h3>
      <p>First Name: {profile.household?.spouse?.firstName || ''}</p>
      <p>Last Name: {profile.household?.spouse?.lastName || ''}</p>
      <p>Email: {profile.household?.spouse?.email || ''}</p>
      <p>Birthdate: {profile.household?.spouse?.birthdate ? new Date(profile.household.spouse.birthdate).toLocaleDateString() : ''}</p>
      <p>Nationality: {profile.household?.spouse?.nationality || ''}</p>
      <p>Sex: {profile.household?.spouse?.sex || ''}</p>
      <h4>Address</h4>
      <p>Street: {profile.household?.spouse?.address?.street || ''}</p>
      <p>Apartment: {profile.household?.spouse?.address?.apt || ''}</p>
      <p>City: {profile.household?.spouse?.address?.city || ''}</p>
      <p>State: {profile.household?.spouse?.address?.state || ''}</p>
      <p>ZIP: {profile.household?.spouse?.address?.zip || ''}</p>

      <h3>Children</h3>
      {profile.household?.children?.map((child, index) => (
        <div key={index}>
          <p>First Name: {child.firstName || ''}</p>
          <p>Last Name: {child.lastName || ''}</p>
          <p>Email: {child.email || ''}</p>
          <p>Birthdate: {child.birthdate ? new Date(child.birthdate).toLocaleDateString() : ''}</p>
          <h4>Address</h4>
          <p>Street: {child.address?.street || ''}</p>
          <p>Apartment: {child.address?.apt || ''}</p>
          <p>City: {child.address?.city || ''}</p>
          <p>State: {child.address?.state || ''}</p>
          <p>ZIP: {child.address?.zip || ''}</p>
        </div>
      ))}

      <h3>Adult Dependents</h3>
      {profile.household?.adultDependents?.map((dependent, index) => (
        <div key={index}>
          <p>First Name: {dependent.firstName || ''}</p>
          <p>Last Name: {dependent.lastName || ''}</p>
          <p>Email: {dependent.email || ''}</p>
          <p>Birthdate: {dependent.birthdate ? new Date(dependent.birthdate).toLocaleDateString() : ''}</p>
          <p>Nationality: {dependent.nationality || ''}</p>
          <p>Sex: {dependent.sex || ''}</p>
          <h4>Address</h4>
          <p>Street: {dependent.address?.street || ''}</p>
          <p>Apartment: {dependent.address?.apt || ''}</p>
          <p>City: {dependent.address?.city || ''}</p>
          <p>State: {dependent.address?.state || ''}</p>
          <p>ZIP: {dependent.address?.zip || ''}</p>
        </div>
      ))}
    </div>
  );
};

export default UserProfile;




