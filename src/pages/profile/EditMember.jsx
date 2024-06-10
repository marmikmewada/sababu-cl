import React, { useState, useEffect } from "react";
import useStore from "../../zustand/store";
import { useNavigate } from "react-router-dom";
import AppNav from "../../components/AppNav";
import { Link } from "react-router-dom";

const EditMember = () => {
  const navigate = useNavigate();
  const { updateMemberProfile, fetchUserProfile, isLoadingProfile } = useStore();

  const [editedMember, setEditedMember] = useState({
    maritalStatus: "",
    hometown: "",
    nationality: "",
    origin: "",
    employment: {
      company: "",
      jobTitle: "",
      workAddress: "",
      workPhone: "",
      workEmail: "",
      employmentStatus: "",
    },
    documents: {
      passport: {
        number: "",
        expirationDate: "",
      },
      driverLicense: {
        number: "",
        expirationDate: "",
        state: "",
      },
    },
    emergencyContact: [
      {
        relation: "",
        name: "",
        phone: "",
        email: "",
        address: {
          apt: "",
          street: "",
          city: "",
          state: "",
          country: "",
          zip: "",
        },
      },
    ],
  });

  console.log("edited member", editedMember);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data1 = await fetchUserProfile();

        // Ensure data1.member exists and has the expected structure
        if (data1.member) {
          // Deep copy of the fetched member profile to avoid mutation
          const updatedMember = JSON.parse(JSON.stringify(data1.member));

          // Merge with existing state, ensuring all nested fields are initialized
          setEditedMember((prevMember) => ({
            ...prevMember,
            ...updatedMember,
            employment: updatedMember.employment || prevMember.employment,
            documents: updatedMember.documents || prevMember.documents,
            emergencyContact:
              updatedMember.emergencyContact || prevMember.emergencyContact,
            // Add other nested structures as needed
          }));
        }
      } catch (error) {
        console.error("Error loading member profile:", error);
      }
    };

    loadProfile();
  }, [fetchUserProfile]);

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setEditedMember((prevMember) => ({
      ...prevMember,
      [name]: value,
    }));
  };

  const handleNestedChange = (event) => {
    const { name, value } = event.target;
    setEditedMember((prevMember) => {
      // Deep copy of previous member to avoid mutating state directly
      const updatedMember = JSON.parse(JSON.stringify(prevMember));

      // Splitting the name to access nested properties
      const keys = name.split(".");
      let nestedObject = updatedMember;
      for (let i = 0; i < keys.length - 1; i++) {
        nestedObject = nestedObject[keys[i]];
      }
      
      // Setting the value in the nested object
      nestedObject[keys[keys.length - 1]] = value || "";

      return updatedMember;
    });
  };

  const addEmergencyContact = () => {
    setEditedMember((prevMember) => ({
      ...prevMember,
      emergencyContact: [
        ...prevMember.emergencyContact,
        {
          relation: "",
          name: "",
          phone: "",
          email: "",
          address: {
            apt: "",
            street: "",
            city: "",
            state: "",
            country: "",
            zip: "",
          },
        },
      ],
    }));
  };

  const removeEmergencyContact = (index) => {
    setEditedMember((prevMember) => ({
      ...prevMember,
      emergencyContact: prevMember.emergencyContact.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateMemberProfile(editedMember);
      // Redirect or show success message
      navigate("/app/profile");
    } catch (error) {
      console.error("Error updating member profile:", error);
    }
  };

  if (isLoadingProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AppNav/>
    <form onSubmit={handleSubmit} className="container mx-auto p-6">
    <label className="block mb-4">
      Marital Status:
      <input
        type="text"
        name="maritalStatus"
        value={editedMember.maritalStatus || ""}
        onChange={handleProfileChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </label>
    <label className="block mb-4">
      Hometown:
      <input
        type="text"
        name="hometown"
        value={editedMember.hometown || ""}
        onChange={handleProfileChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </label>
    <label className="block mb-4">
      Nationality:
      <input
        type="text"
        name="nationality"
        value={editedMember.nationality || ""}
        onChange={handleProfileChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </label>
    <label className="block mb-4">
      Origin:
      <input
        type="text"
        name="origin"
        value={editedMember.origin || ""}
        onChange={handleProfileChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </label>
  
    <h3 className="text-xl font-bold mb-4">Employment</h3>
    <label className="block mb-4">
      Company:
      <input
        type="text"
        name="employment.company"
        value={editedMember.employment.company || ""}
        onChange={handleNestedChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </label>
    <label className="block mb-4">
      Job Title:
      <input
        type="text"
        name="employment.jobTitle"
        value={editedMember.employment.jobTitle || ""}
        onChange={handleNestedChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </label>
    <label className="block mb-4">
      Work Address:
      <input
        type="text"
        name="employment.workAddress"
        value={editedMember.employment.workAddress || ""}
        onChange={handleNestedChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </label>
    <label className="block mb-4">
      Work Phone:
      <input
        type="text"
        name="employment.workPhone"
        value={editedMember.employment.workPhone || ""}
        onChange={handleNestedChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </label>
    <label className="block mb-4">
      Work Email:
      <input
        type="email"
        name="employment.workEmail"
        value={editedMember.employment.workEmail || ""}
        onChange={handleNestedChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </label>
    <label className="block mb-4">
      Employment Status:
      <input
        type="text"
        name="employment.employmentStatus"
        value={editedMember.employment.employmentStatus || ""}
        onChange={handleNestedChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </label>
  
    <h3 className="text-xl font-bold mb-4">Documents</h3>
    <div className="mb-4">
      <h4 className="text-lg font-bold mb-2">Passport</h4>
      <label className="block mb-2">
        Number:
        <input
          type="text"
          name="documents.passport.number"
          value={editedMember.documents.passport.number || ""}
          onChange={handleNestedChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </label>
      <label className="block mb-2">
        Expiration Date:
        <input
          type="date"
          name="documents.passport.expirationDate"
          value={editedMember.documents.passport.expirationDate || ""}
          onChange={handleNestedChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </label>
    </div>
    <div className="mb-4">
      <h4 className="text-lg font-bold mb-2">Driver License</h4>
      <label className="block mb-2">
        Number:
        <input
          type="text"
          name="documents.driverLicense.number"
          value={editedMember.documents.driverLicense.number || ""}
          onChange={handleNestedChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </label>
      <label className="block mb-2">
        Expiration Date:
        <input
          type="date"
          name="documents.driverLicense.expirationDate"
          value={editedMember.documents.driverLicense.expirationDate || ""}
          onChange={handleNestedChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </label>
      <label className="block mb-2">
        State:
        <input
          type="text"
          name="documents.driverLicense.state"
          value={editedMember.documents.driverLicense.state || ""}
          onChange={handleNestedChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </label>
    </div>
  
    <h3 className="text-xl font-bold mb-4">Emergency Contacts</h3>
    {Array.isArray(editedMember.emergencyContact) &&
      editedMember.emergencyContact.map((contact, index) => (
        <div key={index} className="mb-4">
          <label className="block mb-2">
            Relation:
            <input
              type="text"
              name={`emergencyContact.${index}.relation`}
              value={contact.relation || ""}
              onChange={handleNestedChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
          <label className="block mb-2">
            Name:
            <input
              type="text"
              name={`emergencyContact.${index}.name`}
              value={contact.name || ""}
              onChange={handleNestedChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
          <label className="block mb-2">
            Phone:
            <input
              type="text"
              name={`emergencyContact.${index}.phone`}
              value={contact.phone || ""}
              onChange={handleNestedChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
          <label className="block mb-2">
            Email:
            <input
              type="text"
              name={`emergencyContact.${index}.email`}
              value={contact.email || ""}
              onChange={handleNestedChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
          <div className="mb-2">
            <label className="block mb-2">Address:</label>
            <input
              type="text"
              name={`emergencyContact.${index}.address.apt`}
              value={contact.address.apt || ""}
              onChange={handleNestedChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Apt"
            />
            <input
              type="text"
              name={`emergencyContact.${index}.address.street`}
              value={contact.address.street || ""}
              onChange={handleNestedChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Street"
            />
            <input
              type="text"
              name={`emergencyContact.${index}.address.city`}
              value={contact.address.city || ""}
              onChange={handleNestedChange}
              className="shadow appearance-none border rounded w-full             py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="City"
            />
            <input
              type="text"
              name={`emergencyContact.${index}.address.state`}
              value={contact.address.state || ""}
              onChange={handleNestedChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="State"
            />
            <input
              type="text"
              name={`emergencyContact.${index}.address.country`}
              value={contact.address.country || ""}
              onChange={handleNestedChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Country"
            />
            <input
              type="text"
              name={`emergencyContact.${index}.address.zip`}
              value={contact.address.zip || ""}
              onChange={handleNestedChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Zip"
            />
          </div>
          <button
            type="button"
            onClick={() => removeEmergencyContact(index)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Remove Contact
          </button>
        </div>
      ))}
    <button
      type="button"
      onClick={addEmergencyContact}
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Add Emergency Contact
    </button>
  
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline"
    >
      Save Changes
    </button>
  </form>
  <Link
          to="/app/profile"
          className="block mt-4 text-blue-500 hover:text-blue-700 font-bold"
        >
          Back to Profile
        </Link>
  </div>
    
    );
  };
  
  export default EditMember;
  








  

// import React, { useState, useEffect } from 'react';
// import useStore from '../../zustand/store';

// const EditMember = () => {
//   const { updateMemberProfile, profile, isLoadingProfile, fetchUserProfile } = useStore();

//   const [editedProfile, setEditedProfile] = useState(null);

//   useEffect(() => {
//     const loadUserProfile = async () => {
//       try {
//         await fetchUserProfile();
//       } catch (error) {
//         console.error('Error fetching user profile:', error);
//       }
//     };

//     loadUserProfile();
//   }, [fetchUserProfile]);

//   useEffect(() => {
//     if (!isLoadingProfile && profile && profile.member) {
//       const { member } = profile;
//       setEditedProfile({
//         ...member,
//         employment: member.employment || {
//           company: '',
//           jobTitle: '',
//           workAddress: '',
//           workPhone: '',
//           workEmail: '',
//           employmentStatus: '',
//         },
//         documents: member.documents || {
//           passport: {
//             number: '',
//             expirationDate: '',
//           },
//           driverLicense: {
//             number: '',
//             expirationDate: '',
//             state: '',
//           },
//         },
//         emergencyContact: member.emergencyContact || [], // Ensure this is always an array
//       });
//     }
//   }, [profile, isLoadingProfile]);

//   const handleProfileChange = (event) => {
//     const { name, value } = event.target;

//     setEditedProfile((prevProfile) => ({
//       ...prevProfile,
//       [name]: value,
//     }));
//   };

//   const handleNestedChange = (event) => {
//     const { name, value } = event.target;
//     const [parent, childKey, grandChildKey] = name.split('.');

//     if (grandChildKey) {
//       setEditedProfile((prevProfile) => ({
//         ...prevProfile,
//         [parent]: {
//           ...prevProfile[parent],
//           [childKey]: {
//             ...prevProfile[parent][childKey],
//             [grandChildKey]: value,
//           },
//         },
//       }));
//     } else {
//       setEditedProfile((prevProfile) => ({
//         ...prevProfile,
//         [parent]: {
//           ...prevProfile[parent],
//           [childKey]: value,
//         },
//       }));
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       await updateMemberProfile(editedProfile);
//       // Redirect or show success message
//     } catch (error) {
//       console.error('Error updating member profile:', error);
//     }
//   };

//   if (isLoadingProfile) {
//     return <div>Loading...</div>;
//   }

//   if (!editedProfile) {
//     return null;
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Marital Status:
//         <input
//           type="text"
//           name="maritalStatus"
//           value={editedProfile.maritalStatus || ''}
//           onChange={handleProfileChange}
//         />
//       </label>
//       <label>
//         Hometown:
//         <input
//           type="text"
//           name="hometown"
//           value={editedProfile.hometown || ''}
//           onChange={handleProfileChange}
//         />
//       </label>
//       <label>
//         Nationality:
//         <input
//           type="text"
//           name="nationality"
//           value={editedProfile.nationality || ''}
//           onChange={handleProfileChange}
//         />
//       </label>
//       <label>
//         Origin:
//         <input
//           type="text"
//           name="origin"
//           value={editedProfile.origin || ''}
//           onChange={handleProfileChange}
//         />
//       </label>

//       <h3>Employment</h3>
//       <label>
//         Company:
//         <input
//           type="text"
//           name="employment.company"
//           value={editedProfile.employment.company || ''}
//           onChange={handleNestedChange}
//         />
//       </label>
//       <label>
//         Job Title:
//         <input
//           type="text"
//           name="employment.jobTitle"
//           value={editedProfile.employment.jobTitle || ''}
//           onChange={handleNestedChange}
//         />
//       </label>
//       <label>
//         Work Address:
//         <input
//           type="text"
//           name="employment.workAddress"
//           value={editedProfile.employment.workAddress || ''}
//           onChange={handleNestedChange}
//           />
//         </label>
//         <label>
//           Work Phone:
//           <input
//             type="text"
//             name="employment.workPhone"
//             value={editedProfile.employment.workPhone || ''}
//             onChange={handleNestedChange}
//           />
//         </label>
//         <label>
//           Work Email:
//           <input
//             type="email"
//             name="employment.workEmail"
//             value={editedProfile.employment.workEmail || ''}
//             onChange={handleNestedChange}
//           />
//         </label>
//         <label>
//           Employment Status:
//           <input
//             type="text"
//             name="employment.employmentStatus"
//             value={editedProfile.employment.employmentStatus || ''}
//             onChange={handleNestedChange}
//           />
//         </label>

//         <h3>Documents</h3>
//         <h4>Passport</h4>
//         <label>
//           Number:
//           <input
//             type="text"
//             name="documents.passport.number"
//             value={editedProfile.documents.passport.number || ''}
//             onChange={handleNestedChange}
//           />
//         </label>
//         <label>
//           Expiration Date:
//           <input
//             type="date"
//             name="documents.passport.expirationDate"
//             value={editedProfile.documents.passport.expirationDate || ''}
//             onChange={handleNestedChange}
//           />
//         </label>

//         <h4>Driver License</h4>
//         <label>
//           Number:
//           <input
//             type="text"
//             name="documents.driverLicense.number"
//             value={editedProfile.documents.driverLicense.number || ''}
//             onChange={handleNestedChange}
//           />
//         </label>
//         <label>
//           Expiration Date:
//           <input
//             type="date"
//             name="documents.driverLicense.expirationDate"
//             value={editedProfile.documents.driverLicense.expirationDate || ''}
//             onChange={handleNestedChange}
//           />
//         </label>
//         <label>
//           State:
//           <input
//             type="text"
//             name="documents.driverLicense.state"
//             value={editedProfile.documents.driverLicense.state || ''}
//             onChange={handleNestedChange}
//           />
//         </label>

//         <h3>Emergency Contacts</h3>
//         {editedProfile.emergencyContact.map((contact, index) => (
//           <div key={index}>
//             <label>
//               Relation:
//               <input
//                 type="text"
//                 name={`emergencyContact.${index}.relation`}
//                 value={contact.relation || ''}
//                 onChange={handleNestedChange}
//               />
//             </label>
//             <label>
//               Name:
//               <input
//                 type="text"
//                 name={`emergencyContact.${index}.name`}
//                 value={contact.name || ''}
//                 onChange={handleNestedChange}
//               />
//             </label>
//             <label>
//               Phone:
//               <input
//                 type="text"
//                 name={`emergencyContact.${index}.phone`}
//                 value={contact.phone || ''}
//                 onChange={handleNestedChange}
//               />
//             </label>
//             <label>
//               Email:
//               <input
//                 type="text"
//                 name={`emergencyContact.${index}.email`}
//                 value={contact.email || ''}
//                 onChange={handleNestedChange}
//               />
//             </label>
//             <div>
//               <label>Apt:</label>
//               <input
//                 type="text"
//                 name={`emergencyContact.${index}.address.apt`}
//                 value={contact.address.apt || ''}
//                 onChange={handleNestedChange}
//               />
//               <label>Street:</label>
//               <input
//                 type="text"
//                 name={`emergencyContact.${index}.address.street`}
//                 value={contact.address.street || ''}
//                 onChange={handleNestedChange}
//               />
//               <label>City:</label>
//               <input
//                 type="text"
//                 name={`emergencyContact.${index}.address.city`}
//                 value={contact.address.city || ''}
//                 onChange={handleNestedChange}
//               />
//               <label>State:</label>
//               <input
//                 type="text"
//                 name={`emergencyContact.${index}.address.state`}
//                 value={contact.address.state || ''}
//                 onChange={handleNestedChange}
//               />
//               <label>Country:</label>
//               <input
//                 type="text"
//                 name={`emergencyContact.${index}.address.country`}
//                 value={contact.address.country || ''}
//                 onChange={handleNestedChange}
//               />
//               <label>Zip:</label>
//               <input
//                 type="text"
//                 name={`emergencyContact.${index}.address.zip`}
//                 value={contact.address.zip || ''}
//                 onChange={handleNestedChange}
//               />
//             </div>
//           </div>
//         ))}

//         <button type="button" onClick={() => setEditedProfile((prevProfile) => ({
//           ...prevProfile,
//           emergencyContact: [
//             ...prevProfile.emergencyContact,
//             {
//               relation: '',
//               name: '',
//               phone: '',
//               email: '',
//               address: {
//                 apt: '',
//                 street: '',
//                 city: '',
//                 state: '',
//                 country: '',
//                 zip: '',
//               },
//             },
//           ],
//         }))}>
//           Add Emergency Contact
//         </button>

//         <button type="submit">Submit</button>
//       </form>
//     );
//   };

//   export default EditMember;
