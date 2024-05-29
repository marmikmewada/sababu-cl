import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../zustand/store';

const UserProfile = () => {
  const { fetchUserProfile, profile, isLoadingProfile, logout, membershipStatus } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  const handleHome = () => {
    navigate('/');
  };

  if (isLoadingProfile) {
    return <div className="p-4 text-center">Loading profile...</div>;
  }

  if (!profile) {
    return <div className="p-4 text-center">No profile data available</div>;
  }

  if (membershipStatus === 'denied') {
    return <h1 className="p-4 text-center">Profile Locked</h1>;
  }

  const profileComponent = renderProfile(profile, membershipStatus);

  return (
    <div className="p-4">
      <button
        onClick={handleSignOut}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Sign Out
      </button>
      <button
        onClick={handleHome}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-4"
      >
        Home
      </button>
      {profileComponent}
    </div>
  );
};

const renderProfile = (profile, membershipStatus) => {
  return (
    <div className="mt-8">
      {membershipStatus === 'none' || membershipStatus === 'applied' ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Basic User Profile</h2>
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <p className="text-gray-700 font-bold">First Name:</p>
            <p className="text-gray-900 mb-4">{profile.profile?.firstName || ''}</p>

            <p className="text-gray-700 font-bold">Last Name:</p>
            <p className="text-gray-900 mb-4">{profile.profile?.lastName || ''}</p>

            <p className="text-gray-700 font-bold">Email:</p>
            <p className="text-gray-900 mb-4">{profile.profile?.email || ''}</p>

            <p className="text-gray-700 font-bold">Phone:</p>
            <p className="text-gray-900 mb-4">{profile.profile?.phone || ''}</p>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">User Profile</h2>
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <p className="text-gray-700 font-bold">First Name:</p>
            <p className="text-gray-900 mb-4">{profile.user?.firstName || ''}</p>

            <p className="text-gray-700 font-bold">Middle Name:</p>
            <p className="text-gray-900 mb-4">{profile.user?.middleName || ''}</p>

            <p className="text-gray-700 font-bold">Last Name:</p>
            <p className="text-gray-900 mb-4">{profile.user?.lastName || ''}</p>

            <p className="text-gray-700 font-bold">Email:</p>
            <p className="text-gray-900 mb-4">{profile.user?.email || ''}</p>

            <p className="text-gray-700 font-bold">Phone:</p>
            <p className="text-gray-900 mb-4">{profile.user?.phone || ''}</p>

            <p className="text-gray-700 font-bold">Gender:</p>
            <p className="text-gray-900 mb-4">{profile.user?.gender || ''}</p>

            <p className="text-gray-700 font-bold">Date of Birth:</p>
            <p className="text-gray-900 mb-4">
              {profile.user?.dob ? new Date(profile.user.dob).toLocaleDateString() : ''}
            </p>

            <p className="text-gray-700 font-bold">Image URL:</p>
            <p className="text-gray-900 mb-4">{profile.user?.imageUrl || ''}</p>

            <p className="text-gray-700 font-bold">Role:</p>
            <p className="text-gray-900 mb-4">{profile.user?.role || ''}</p>

            <h3 className="text-xl font-bold mt-4">Address</h3>
            <div className="bg-gray-100 shadow-md rounded p-4 mt-2">
              <p className="text-gray-700 font-bold">Street:</p>
              <p className="text-gray-900 mb-2">{profile.user?.address?.street || ''}</p>

              <p className="text-gray-700 font-bold">Apartment:</p>
              <p className="text-gray-900 mb-2">{profile.user?.address?.apt || ''}</p>

              <p className="text-gray-700 font-bold">City:</p>
              <p className="text-gray-900 mb-2">{profile.user?.address?.city || ''}</p>

              <p className="text-gray-700 font-bold">State:</p>
              <p className="text-gray-900 mb-2">{profile.user?.address?.state || ''}</p>

              <p className="text-gray-700 font-bold">ZIP:</p>
              <p className="text-gray-900 mb-2">{profile.user?.address?.zip || ''}</p>
            </div>

            <h2 className="text-2xl font-bold mt-8">Member Profile</h2>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <p className="text-gray-700 font-bold">Nationality:</p>
              <p className="text-gray-900 mb-4">{profile.member?.nationality || ''}</p>

              <p className="text-gray-700 font-bold">Hometown:</p>
              <p className="text-gray-900 mb-4">{profile.member?.hometown || ''}</p>

              <p className="text-gray-700 font-bold">Marital Status:</p>
              <p className="text-gray-900 mb-4">{profile.member?.maritalStatus || ''}</p>

              <p className="text-gray-700 font-bold">Origin:</p>
              <p className="text-gray-900 mb-4">{profile.member?.origin || ''}</p>

              <h3 className="text-xl font-bold mt-4">Employment</h3>
              <div className="bg-gray-100 shadow-md rounded p-4 mt-2">
                <p className="text-gray-700 font-bold">Company:</p>
                <p className="text-gray-900 mb-2">{profile.member?.employment?.company || ''}</p>

                <p className="text-gray-700 font-bold">Employment Status:</p>
                <p className="text-gray-900 mb-2">{profile.member?.employment?.employmentStatus || ''}</p>

                <p className="text-gray-700 font-bold">Job Title:</p>
                <p className="text-gray-900 mb-2">{profile.member?.employment?.jobTitle || ''}</p>

                <p className="text-gray-700 font-bold">Work Address:</p>
                <p className="text-gray-900 mb-2">{profile.member?.employment?.workAddress || ''}</p>

                <p className="text-gray-700 font-bold">Work Phone:</p>
                <p className="text-gray-900 mb-2">{profile.member?.employment?.workPhone || ''}</p>

                <p className="text-gray-700 font-bold">Work Email:</p>
                <p className="text-gray-900 mb-2">{profile.member?.employment?.workEmail || ''}</p>
              </div>

              <h3 className="text-xl font-bold mt-4">Emergency Contact</h3>
              {profile.member?.emergencyContact?.map((contact, index) => (
                <div key={index} className="bg-gray-100 shadow-md rounded p-4 mt-2">
                  <p className="text-gray-700 font-bold">Name:</p>
                  <p className="text-gray-900 mb-2">{contact.name || ''}</p>

                  <p className="text-gray-700 font-bold">Relationship:</p>
                  <p className="text-gray-900 mb-2">{contact.relation || ''}</p>

                  <p className="text-gray-700 font-bold">Phone:</p>
                  <p className="text-gray-900 mb-2">{contact.phone || ''}</p>

                  <p className="text-gray-700 font-bold">Email:</p>
                  <p className="text-gray-900 mb-2">{contact.email || ''}</p>

                  <h4 className="text-lg font-bold mt-2">Address</h4>
                  <p className="text-gray-700 font-bold">Street:</p>
                  <p className="text-gray-900 mb-2">{contact.address?.street || ''}</p>

                  <p                   className="text-gray-700 font-bold">Apartment:</p>
                  <p className="text-gray-900 mb-2">{contact.address?.apt || ''}</p>

                  <p className="text-gray-700 font-bold">City:</p>
                  <p className="text-gray-900 mb-2">{contact.address?.city || ''}</p>

                  <p className="text-gray-700 font-bold">State:</p>
                  <p className="text-gray-900 mb-2">{contact.address?.state || ''}</p>

                  <p className="text-gray-700 font-bold">ZIP:</p>
                  <p className="text-gray-900 mb-2">{contact.address?.zip || ''}</p>
                </div>
              ))}

              <h2 className="text-2xl font-bold mt-8">Household Profile</h2>
              <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <p className="text-gray-700 font-bold">Household ID:</p>
                <p className="text-gray-900 mb-4">{profile.household?._id || ''}</p>

                <h3 className="text-xl font-bold mt-4">Spouse</h3>
                <div className="bg-gray-100 shadow-md rounded p-4 mt-2">
                  <p className="text-gray-700 font-bold">First Name:</p>
                  <p className="text-gray-900 mb-2">{profile.household?.spouse?.firstName || ''}</p>

                  <p className="text-gray-700 font-bold">Last Name:</p>
                  <p className="text-gray-900 mb-2">{profile.household?.spouse?.lastName || ''}</p>

                  <p className="text-gray-700 font-bold">Email:</p>
                  <p className="text-gray-900 mb-2">{profile.household?.spouse?.email || ''}</p>

                  <p className="text-gray-700 font-bold">Birthdate:</p>
                  <p className="text-gray-900 mb-2">
                    {profile.household?.spouse?.birthdate
                      ? new Date(profile.household.spouse.birthdate).toLocaleDateString()
                      : ''}
                  </p>

                  <p className="text-gray-700 font-bold">Nationality:</p>
                  <p className="text-gray-900 mb-2">{profile.household?.spouse?.nationality || ''}</p>

                  <p className="text-gray-700 font-bold">Sex:</p>
                  <p className="text-gray-900 mb-2">{profile.household?.spouse?.sex || ''}</p>

                  <h4 className="text-lg font-bold mt-2">Address</h4>
                  <p className="text-gray-700 font-bold">Street:</p>
                  <p className="text-gray-900 mb-2">{profile.household?.spouse?.address?.street || ''}</p>

                  <p className="text-gray-700 font-bold">Apartment:</p>
                  <p className="text-gray-900 mb-2">{profile.household?.spouse?.address?.apt || ''}</p>

                  <p className="text-gray-700 font-bold">City:</p>
                  <p className="text-gray-900 mb-2">{profile.household?.spouse?.address?.city || ''}</p>

                  <p className="text-gray-700 font-bold">State:</p>
                  <p className="text-gray-900 mb-2">{profile.household?.spouse?.address?.state || ''}</p>

                  <p className="text-gray-700 font-bold">ZIP:</p>
                  <p className="text-gray-900 mb-2">{profile.household?.spouse?.address?.zip || ''}</p>
                </div>

                <h3 className="text-xl font-bold mt-4">Children</h3>
                {profile.household?.children?.map((child, index) => (
                  <div key={index} className="bg-gray-100 shadow-md rounded p-4 mt-2">
                    <p className="text-gray-700 font-bold">First Name:</p>
                    <p className="text-gray-900 mb-2">{child.firstName || ''}</p>

                    <p className="text-gray-700 font-bold">Last Name:</p>
                    <p className="text-gray-900 mb-2">{child.lastName || ''}</p>

                    <p className="text-gray-700 font-bold">Email:</p>
                    <p className="text-gray-900 mb-2">{child.email || ''}</p>

                    <p className="text-gray-700 font-bold">Birthdate:</p>
                    <p className="text-gray-900 mb-2">
                      {child.birthdate ? new Date(child.birthdate).toLocaleDateString() : ''}
                    </p>

                    <h4 className="text-lg font-bold mt-2">Address</h4>
                    <p className="text-gray-700 font-bold">Street:</p>
                    <p className="text-gray-900 mb-2">{child.address?.street || ''}</p>

                    <p className="text-gray-700 font-bold">Apartment:</p>
                    <p className="text-gray-900 mb-2">{child.address?.apt || ''}</p>

                    <p className="text-gray-700 font-bold">City:</p>
                    <p className="text-gray-900 mb-2">{child.address?.city || ''}</p>

                    <p className="text-gray-700 font-bold">State:</p>
                    <p className="text-gray-900 mb-2">{child.address?.state || ''}</p>

                    <p className="text-gray-700 font-bold">ZIP:</p>
                    <p className="text-gray-900 mb-2">{child.address?.zip || ''}</p>
                  </div>
                ))}

                <h3 className="text-xl font-bold mt-4">Adult Dependents</h3>
                {profile.household?.adultDependents?.map((dependent, index) => (
                  <div key={index} className="bg-gray-100 shadow-md rounded p-4 mt-2">
                    <p className="text-gray-700 font-bold">First Name:</p>
                    <p className="text-gray-900 mb-2">{dependent.firstName || ''}</p>

                    <p className="text-gray-700 font-bold">Last Name:</p>
                    <p className="text-gray-900 mb-2">{dependent.lastName || ''}</p>

                    <p className="text-gray-700 font-bold">Email:</p>
                    <p className="text-gray-900 mb-2">{dependent.email || ''}</p>

                    <p className="text-gray-700 font-bold">Birthdate:</p>
                    <p className="text-gray-900 mb-2">
                      {dependent.birthdate ? new Date(dependent.birthdate).toLocaleDateString() : ''}
                    </p>

                    <p className="text-gray-700 font-bold">Nationality:</p>
                    <p className="text-gray-900 mb-2">{dependent.nationality || ''}</p>

                    <p className="text-gray-700 font-bold">Sex:</p>
                    <p className="text-gray-900 mb-2">{dependent.sex || ''}</p>

                    <h4 className="text-lg font-bold mt-2">Address</h4>
                    <p className="text-gray-700 font-bold">Street:</p>
                    <p className="text-gray-900 mb-2">{dependent.address?.street || ''}</p>

                    <p className="text-gray-700 font-bold">Apartment:</p>
                    <p className="text-gray-900 mb-2">{dependent.address?.apt || ''}</p>

                    <p className="text-gray-700 font-bold">City:</p>
                    <p className="text-gray-900 mb-2">{dependent.address?.city || ''}</p>

                    <p className="text-gray-700 font-bold">State:</p>
                    <p className="text-gray-900 mb-2">{dependent.address?.state || ''}</p>

                    <p className="text-gray-700 font-bold">ZIP:</p>
                    <p className="text-gray-900 mb-2">{dependent.address?.zip || ''}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;