import React, { useState, useEffect } from "react";
import useStore from "../../zustand/store";
import { useNavigate } from "react-router-dom";
import AppNav from "../../components/AppNav";

const EditHousehold = () => {
  const navigate = useNavigate();
  const { updateHouseholdProfile, fetchUserProfile, isLoadingProfile } = useStore();

  const [editedHousehold, setEditedHousehold] = useState({
    spouse: {
      firstName: "",
      lastName: "",
      email: "",
      birthdate: "",
      sex: "",
      nationality: "",
      address: {
        street: "",
        apt: "",
        city: "",
        state: "",
        zip: "",
      },
    },
    children: [
      {
        firstName: "",
        lastName: "",
        email: "",
        birthdate: "",
        sex: "",
        nationality: "",
        address: {
          street: "",
          apt: "",
          city: "",
          state: "",
          zip: "",
        },
      },
    ],
    adultDependents: [
      {
        firstName: "",
        lastName: "",
        email: "",
        birthdate: "",
        sex: "",
        nationality: "",
        address: {
          street: "",
          apt: "",
          city: "",
          state: "",
          zip: "",
        },
      },
    ],
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data1 = await fetchUserProfile();
        if (data1.household) {
          const updatedHousehold = JSON.parse(JSON.stringify(data1.household));
          setEditedHousehold((prevHousehold) => ({
            ...prevHousehold,
            ...updatedHousehold,
            spouse: updatedHousehold.spouse || prevHousehold.spouse,
            children: updatedHousehold.children || prevHousehold.children,
            adultDependents: updatedHousehold.adultDependents || prevHousehold.adultDependents,
          }));
        }
      } catch (error) {
        console.error("Error loading household profile:", error);
      }
    };

    loadProfile();
  }, [fetchUserProfile]);

  const handleNestedChange = (event) => {
    const { name, value } = event.target;
    setEditedHousehold((prevHousehold) => {
      const updatedHousehold = JSON.parse(JSON.stringify(prevHousehold));
      const keys = name.split(".");
      let nestedObject = updatedHousehold;
      for (let i = 0; i < keys.length - 1; i++) {
        nestedObject = nestedObject[keys[i]];
      }
      nestedObject[keys[keys.length - 1]] = value || "";
      return updatedHousehold;
    });
  };

  const addChild = () => {
    setEditedHousehold((prevHousehold) => ({
      ...prevHousehold,
      children: [
        ...prevHousehold.children,
        {
          firstName: "",
          lastName: "",
          email: "",
          birthdate: "",
          sex: "",
          nationality: "",
          address: {
            street: "",
            apt: "",
            city: "",
            state: "",
            zip: "",
          },
        },
      ],
    }));
  };

  const removeChild = (index) => {
    setEditedHousehold((prevHousehold) => ({
      ...prevHousehold,
      children: prevHousehold.children.filter((_, i) => i !== index),
    }));
  };

  const addAdultDependent = () => {
    setEditedHousehold((prevHousehold) => ({
      ...prevHousehold,
      adultDependents: [
        ...prevHousehold.adultDependents,
        {
          firstName: "",
          lastName: "",
          email: "",
          birthdate: "",
          sex: "",
          nationality: "",
          address: {
            street: "",
            apt: "",
            city: "",
            state: "",
            zip: "",
          },
        },
      ],
    }));
  };

  const removeAdultDependent = (index) => {
    setEditedHousehold((prevHousehold) => ({
      ...prevHousehold,
      adultDependents: prevHousehold.adultDependents.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateHouseholdProfile(editedHousehold);
      navigate("/app/profile");
    } catch (error) {
      console.error("Error updating household profile:", error);
    }
  };

  if (isLoadingProfile) {
    return <div>Loading...</div>;
  }

  return (
   <div>
    <AppNav/>
    <form onSubmit={handleSubmit} className="container mx-auto p-6">
  <h3 className="text-xl font-bold mb-4">Spouse</h3>
  <label className="block mb-4">
    First Name:
    <input
      type="text"
      name="spouse.firstName"
      value={editedHousehold.spouse.firstName || ""}
      onChange={handleNestedChange}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </label>
  <label className="block mb-4">
    Last Name:
    <input
      type="text"
      name="spouse.lastName"
      value={editedHousehold.spouse.lastName || ""}
      onChange={handleNestedChange}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </label>
  <label className="block mb-4">
    Email:
    <input
      type="email"
      name="spouse.email"
      value={editedHousehold.spouse.email || ""}
      onChange={handleNestedChange}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </label>
  <label className="block mb-4">
    Birthdate:
    <input
      type="date"
      name="spouse.birthdate"
      value={editedHousehold.spouse.birthdate || ""}
      onChange={handleNestedChange}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </label>
  <label className="block mb-4">
    Sex:
    <input
      type="text"
      name="spouse.sex"
      value={editedHousehold.spouse.sex || ""}
      onChange={handleNestedChange}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </label>
  <label className="block mb-4">
    Nationality:
    <input
      type="text"
      name="spouse.nationality"
      value={editedHousehold.spouse.nationality || ""}
      onChange={handleNestedChange}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </label>

  <h4 className="text-lg font-bold mb-2">Address</h4>
  <label className="block mb-4">
    Street:
    <input
      type="text"
      name="spouse.address.street"
      value={editedHousehold.spouse.address.street || ""}
      onChange={handleNestedChange}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </label>
  <label className="block mb-4">
    Apt:
    <input
      type="text"
      name="spouse.address.apt"
      value={editedHousehold.spouse.address.apt || ""}
      onChange={handleNestedChange}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </label>
  <label className="block mb-4">
    City:
    <input
      type="text"
      name="spouse.address.city"
      value={editedHousehold.spouse.address.city || ""}
      onChange={handleNestedChange}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </label>
  <label className="block mb-4">
    State:
    <input
      type="text"
      name="spouse.address.state"
      value={editedHousehold.spouse.address.state || ""}
      onChange={handleNestedChange}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </label>
  <label className="block mb-4">
    Zip:
    <input
      type="text"
      name="spouse.address.zip"
      value={editedHousehold.spouse.address.zip || ""}
      onChange={handleNestedChange}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </label>

  <h3 className="text-xl font-bold mb-4">Children</h3>

  {Array.isArray(editedHousehold.children) &&
    editedHousehold.children.map((child, index) => (
        <div key={index} className="mb-4">
          
        <label className="block mb-2">
          First Name:
          <input
            type="text"
            name={`children.${index}.firstName`}
            value={child.firstName || ""}
            onChange={handleNestedChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
        <label className="block mb-2">
          Last Name:
          <input
            type="text"
            name={`children.${index}.lastName`}
            value={child.lastName || ""}
            onChange={handleNestedChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
        <label className="block mb-2">
          Email:
          <input
            type="email"
            name={`children.${index}.email`}
            value={child.email || ""}
            onChange={handleNestedChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
        <label className="block mb-2">
          Birthdate:
          <input
            type="date"
            name={`children.${index}.birthdate`}
            value={child.birthdate || ""}
            onChange={handleNestedChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
        <label className="block mb-2">
          Sex:
          <input
            type="text"
            name={`children.${index}.sex`}
            value={child.sex || ""}
            onChange={handleNestedChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
        <label className="block mb-2">
          Nationality:
          <input
            type="text"
            name={`children.${index}.nationality`}
            value={child.nationality || ""}
            onChange={handleNestedChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>

        <h4 className="text-lg font-bold mb-2">Address</h4>
        <label className="block mb-2">Street:</label>
        <input
          type="text"
          name={`children.${index}.address.street`}
          value={child.address.street || ""}
          onChange={handleNestedChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <label className="block mb-2">Apt:</label>
        <input
          type="text"
          name={`children.${index}.address.apt`}
          value={child.address.apt || ""}
          onChange={handleNestedChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <label className="block mb-2">City:</label>
        <input
          type="text"
          name={`children.${index}.address.city`}
          value={child.address.city || ""}
          onChange={handleNestedChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <label className="block mb-2">State:</label>
        <input
          type="text"
          name={`children.${index}.address.state`}
          value={child.address.state || ""}
          onChange={handleNestedChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <label className="block mb-2">Zip:</label>
        <input
          type="text"
          name={`children.${index}.address.zip`}
          value={child.address.zip || ""}
          onChange={handleNestedChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
         type="button"
         onClick={() => removeChild(index)}
         className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
       >
         Remove Child
       </button>
     </div>
   ))}
 <button
   type="button"
   onClick={addChild}
   className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
 >
   Add Child
 </button>

 <h3 className="text-xl font-bold mb-4">Adult Dependents</h3>
 {Array.isArray(editedHousehold.adultDependents) &&
   editedHousehold.adultDependents.map((dependent, index) => (
     <div key={index} className="mb-4">
       <label className="block mb-2">
         First Name:
         <input
           type="text"
           name={`adultDependents.${index}.firstName`}
           value={dependent.firstName || ""}
           onChange={handleNestedChange}
           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
         />
       </label>
       <label className="block mb-2">
         Last Name:
         <input
           type="text"
           name={`adultDependents.${index}.lastName`}
           value={dependent.lastName || ""}
           onChange={handleNestedChange}
           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
         />
       </label>
       <label className="block mb-2">
         Email:
         <input
           type="email"
           name={`adultDependents.${index}.email`}
           value={dependent.email || ""}
           onChange={handleNestedChange}
           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
         />
       </label>
       <label className="block mb-2">
         Birthdate:
         <input
           type="date"
           name={`adultDependents.${index}.birthdate`}
           value={dependent.birthdate || ""}
           onChange={handleNestedChange}
           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
         />
       </label>
       <label className="block mb-2">
         Sex:
         <input
           type="text"
           name={`adultDependents.${index}.sex`}
           value={dependent.sex || ""}
           onChange={handleNestedChange}
           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
         />
       </label>
       <label className="block mb-2">
         Nationality:
         <input
           type="text"
           name={`adultDependents.${index}.nationality`}
           value={dependent.nationality || ""}
           onChange={handleNestedChange}
           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
         />
       </label>

       <h4 className="text-lg font-bold mb-2">Address</h4>
       <label className="block mb-2">Street:</label>
       <input
         type="text"
         name={`adultDependents.${index}.address.street`}
         value={dependent.address.street || ""}
         onChange={handleNestedChange}
         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
       />
       <label className="block mb-2">Apt:</label>
       <input
         type="text"
         name={`adultDependents.${index}.address.apt`}
         value={dependent.address.apt || ""}
         onChange={handleNestedChange}
         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
       />
       <label className="block mb-2">City:</label>
       <input
         type="text"
         name={`adultDependents.${index}.address.city`}
         value={dependent.address.city || ""}
         onChange={handleNestedChange}
         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
       />
       <label className="block mb-2">State:</label>
       <input
         type="text"
         name={`adultDependents.${index}.address.state`}
         value={dependent.address.state || ""}
         onChange={handleNestedChange}
         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
       />
       <label className="block mb-2">Zip:</label>
       <input
         type="text"
         name={`adultDependents.${index}.address.zip`}
         value={dependent.address.zip || ""}
         onChange={handleNestedChange}
         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
       />
       <button
         type="button"
         onClick={() => removeAdultDependent(index)}
         className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
       >
         Remove Adult Dependent
       </button>
     </div>
   ))}
 <button
   type="button"
   onClick={addAdultDependent}
   className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
 >
   Add Adult Dependent
 </button>

 <button
   type="submit"
   className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
 >
   Save
 </button>
</form>;


   </div>
  );
};

export default EditHousehold;












// import React, { useState, useEffect } from "react";
// import useStore from "../../zustand/store";
// import { useNavigate } from "react-router-dom";

// const EditHousehold = () => {
//   const navigate = useNavigate();
//   const { updateHouseholdProfile, fetchHouseholdProfile, isLoadingProfile } = useStore();

//   const [editedHousehold, setEditedHousehold] = useState({
//     member: "",
//     spouse: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       birthdate: "",
//       sex: "",
//       nationality: "",
//       address: {
//         street: "",
//         apt: "",
//         city: "",
//         state: "",
//         zip: "",
//       },
//     },
//     children: [
//       {
//         firstName: "",
//         lastName: "",
//         email: "",
//         birthdate: "",
//         sex: "",
//         nationality: "",
//         address: {
//           street: "",
//           apt: "",
//           city: "",
//           state: "",
//           zip: "",
//         },
//       },
//     ],
//     adultDependents: [
//       {
//         firstName: "",
//         lastName: "",
//         email: "",
//         birthdate: "",
//         sex: "",
//         nationality: "",
//         address: {
//           street: "",
//           apt: "",
//           city: "",
//           state: "",
//           zip: "",
//         },
//       },
//     ],
//   });

//   console.log("edited household", editedHousehold);

//   useEffect(() => {
//     const loadProfile = async () => {
//       try {
//         const data1 = await fetchHouseholdProfile();

//         // Ensure data1.household exists and has the expected structure
//         if (data1.household) {
//           // Deep copy of the fetched household profile to avoid mutation
//           const updatedHousehold = JSON.parse(JSON.stringify(data1.household));

//           // Merge with existing state, ensuring all nested fields are initialized
//           setEditedHousehold((prevHousehold) => ({
//             ...prevHousehold,
//             ...updatedHousehold,
//             spouse: updatedHousehold.spouse || prevHousehold.spouse,
//             children: updatedHousehold.children || prevHousehold.children,
//             adultDependents: updatedHousehold.adultDependents || prevHousehold.adultDependents,
//             // Add other nested structures as needed
//           }));
//         }
//       } catch (error) {
//         console.error("Error loading household profile:", error);
//       }
//     };

//     loadProfile();
//   }, [fetchHouseholdProfile]);

//   const handleProfileChange = (event) => {
//     const { name, value } = event.target;
//     setEditedHousehold((prevHousehold) => ({
//       ...prevHousehold,
//       [name]: value,
//     }));
//   };

//   const handleNestedChange = (event) => {
//     const { name, value } = event.target;
//     setEditedHousehold((prevHousehold) => {
//       // Deep copy of previous household to avoid mutating state directly
//       const updatedHousehold = JSON.parse(JSON.stringify(prevHousehold));

//       // Splitting the name to access nested properties
//       const keys = name.split(".");
//       let nestedObject = updatedHousehold;
//       for (let i = 0; i < keys.length - 1; i++) {
//         nestedObject = nestedObject[keys[i]];
//       }
      
//       // Setting the value in the nested object
//       nestedObject[keys[keys.length - 1]] = value || "";

//       return updatedHousehold;
//     });
//   };

//   const addChild = () => {
//     setEditedHousehold((prevHousehold) => ({
//       ...prevHousehold,
//       children: [
//         ...prevHousehold.children,
//         {
//           firstName: "",
//           lastName: "",
//           email: "",
//           birthdate: "",
//           sex: "",
//           nationality: "",
//           address: {
//             street: "",
//             apt: "",
//             city: "",
//             state: "",
//             zip: "",
//           },
//         },
//       ],
//     }));
//   };

//   const removeChild = (index) => {
//     setEditedHousehold((prevHousehold) => ({
//       ...prevHousehold,
//       children: prevHousehold.children.filter((_, i) => i !== index),
//     }));
//   };

//   const addAdultDependent = () => {
//     setEditedHousehold((prevHousehold) => ({
//       ...prevHousehold,
//       adultDependents: [
//         ...prevHousehold.adultDependents,
//         {
//           firstName: "",
//           lastName: "",
//           email: "",
//           birthdate: "",
//           sex: "",
//           nationality: "",
//           address: {
//             street: "",
//             apt: "",
//             city: "",
//             state: "",
//             zip: "",
//           },
//         },
//       ],
//     }));
//   };

//   const removeAdultDependent = (index) => {
//     setEditedHousehold((prevHousehold) => ({
//       ...prevHousehold,
//       adultDependents: prevHousehold.adultDependents.filter((_, i) => i !== index),
//     }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       await updateHouseholdProfile(editedHousehold);
//       // Redirect or show success message
//       navigate("/app/household");
//     } catch (error) {
//       console.error("Error updating household profile:", error);
//     }
//   };

//   if (isLoadingProfile) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <h3>Spouse</h3>
//       <label>
//         First Name:
//         <input
//           type="text"
//           name="spouse.firstName"
//           value={editedHousehold.spouse.firstName || ""}
//           onChange={handleNestedChange}
//         />
//       </label>
//       <label>
//         Last Name:
//         <input
//           type="text"
//           name="spouse.lastName"
//           value={editedHousehold.spouse.lastName || ""}
//           onChange={handleNestedChange}
//         />
//       </label>
//       <label>
//         Email:
//         <input
//           type="email"
//           name="spouse.email"
//           value={editedHousehold.spouse.email || ""}
//           onChange={handleNestedChange}
//         />
//       </label>
//       <label>
//         Birthdate:
//         <input
//           type="date"
//           name="spouse.birthdate"
//           value={editedHousehold.spouse.birthdate || ""}
//           onChange={handleNestedChange}
//         />
//       </label>
//       <label>
//         Sex:
//         <input
//           type="text"
//           name="spouse.sex"
//           value={editedHousehold.spouse.sex || ""}
//           onChange={handleNestedChange}
//         />
//       </label>
//       <label>
//         Nationality:
//         <input
//           type="text"
//           name="spouse.nationality"
//           value={editedHousehold.spouse.nationality || ""}
//           onChange={handleNestedChange}
//         />
//       </label>
//       <h4>Address</h4>
//       <label>
//         Street:
//         <input
//           type="text"
//           name="spouse.address.street"
//           value={editedHousehold.spouse.address.street || ""}
//           onChange={handleNestedChange}
//         />
//       </label>
//       <label>
//         Apt:
//         <input
//           type="text"
//           name="spouse.address.apt"
//           value={editedHousehold.spouse.address.apt || ""}
//           onChange={handleNestedChange}
//         />
//       </label>
//       <label>
//         City:
//         <input
//           type="text"
//           name="spouse.address.city"
//           value={editedHousehold.spouse.address.city || ""}
//           onChange={handleNestedChange}
//         />
//       </label>
//       <label>
//         State:
//         <input
//           type="text"
//           name="spouse.address.state"
//           value={editedHousehold.spouse.address.state || ""}
//           onChange={handleNestedChange}
//         />
//       </label>
//       <label>
//         Zip:
//         <input
//           type="text"
//           name="spouse.address.zip"
//           value={editedHousehold.spouse.address.zip || ""}
//           onChange={handleNestedChange}
//         />
//       </label>

//       <h3>Children</h3>
//       {Array.isArray(editedHousehold.children) &&
//         editedHousehold.children.map((child, index) => (
//           <div key={index}>
//             <label>
//               First Name:
//               <input
//                 type="text"
//                 name={`children.${index}.firstName`}
//                 value={child.firstName || ""}
//                 onChange={handleNestedChange}
//               />
//             </label>
//             <label>
//               Last Name:
//               <input
//                 type="text"
//                 name={`children.${index}.lastName`}
//                 value={child.lastName || ""}
//                 onChange={handleNestedChange}
//               />
//             </label>
//             <label>
//               Email:
//               <input
//                 type="email"
//                 name={`children.${index}.email`}
//                 value={child.email || ""}
//                 onChange={handleNestedChange}
//               />
//             </label>
//             <label>
//               Birthdate:
//               <input
//                 type="date"
//                 name={`children.${index}.birthdate`}
//                 value={child.birthdate || ""}
//                 onChange={handleNestedChange}
//               />
//             </label>
//             <label>
//               Sex:
//               <input
//                 type="text"
//                 name={`children.${index}.sex`}
//                 value={child.sex || ""}
//                 onChange={handleNestedChange}
//               />
//             </label>
//             <label>
//               Nationality:
//               <input
//                 type="text"
//                 name={`children.${index}.nationality`}
//                 value={child.nationality || ""}
//                 onChange={handleNestedChange}
//               />
//             </label>
//             <h4>Address</h4>
//             <label>
//               Street:
//               <input
//                 type="text"
//                 name={`children.${index}.address.street`}
//                 value={child.address.street || ""}
//                 onChange={handleNestedChange}
//               />
//             </label>
//             <label>
//               Apt:
//               <input
//                 type="text"
//                 name={`children.${index}.address.apt`}
//                 value={child.address.apt || ""}
//                 onChange={handleNestedChange}
//               />
//             </label>
//             <label>
//               City:
//               <input
//                 type="text"
//                 name={`children.${index}.address.city`}
//                 value={child.address.city || ""}
//                 onChange={handleNestedChange}
//               />
//             </label>
//             <label>
//               State:
//               <input
//                 type="text"
//                 name={`children.${index}.address.state`}
//                 value={child.address.state || ""}
//                 onChange={handleNestedChange}
//               />
//             </label>
//             <label>
//               Zip:
//               <input
//                 type="text"
//                 name={`children.${index}.address.zip`}
//                 value={child.address.zip || ""}
//                 onChange={handleNestedChange}
//               />
//             </label>
//             <button type="button" onClick={() => removeChild(index)}>
//               Remove Child
//             </button>
//           </div>
//         ))}
//       <button type="button" onClick={addChild}>
//         Add Child
//       </button>

//       <h3>Adult Dependents</h3>
//       {Array.isArray(editedHousehold.adultDependents) &&
//         editedHousehold.adultDependents.map((dependent, index) => (
//           <div key={index}>
//             <label>
//               First Name:
//               <input
//                 type="text"
//                 name={`adultDependents.${index}.firstName`}
//                 value={dependent.firstName || ""}
//                 onChange={handleNestedChange}
//               />
//             </label>
//             <label>
//               Last Name:
//               <input
//                 type="text"
//                 name={`adultDependents.${index}.lastName`}
//                 value={dependent.lastName || ""}
//                 onChange={handleNestedChange}
//               />
//             </label>
//             <label>
//               Email:
//               <input
//                 type="email"
//                 name={`adultDependents.${index}.email`}
//                 value={dependent.email || ""}
//                 onChange={handleNestedChange}
//               />
//             </label>
//             <label>
//               Birthdate:
//               <input
//                 type="date"
//                 name={`adultDependents.${index}.birthdate`}
//                 value={dependent.birthdate || ""}
//                 onChange={handleNestedChange}
//               />
//             </label>
//             <label>
//               Sex:
//               <input
//                 type="text"
//                 name={`adultDependents.${index}.sex`}
//                 value={dependent.sex || ""}
//                 onChange={handleNestedChange}
//               />
//             </label>
//             <label>
//               Nationality:
//               <input
//                 type="text"
//                 name={`adultDependents.${index}.nationality`}
//                 value={dependent.nationality || ""}
//                 onChange={handleNestedChange}
//               />
//             </label>
//             <h4>Address</h4>
//             <label>
//               Street:
//               <input
//                 type="text"
//                 name={`adultDependents.${index}.address.street`}
//                 value={dependent.address.street || ""}
//                 onChange={handleNestedChange}
//               />
//             </label>
//             <label>
//               Apt:
//               <input
//                 type="text"
//                 name={`adultDependents.${index}.address.apt`}
//                 value={dependent.address.apt || ""}
//                 onChange={handleNestedChange}
//               />
//             </label>
//             <label>
//               City:
//               <input
//                 type="text"
//                 name={`adultDependents.${index}.address.city`}
//                 value={dependent.address.city || ""}
//                 onChange={handleNestedChange}
//               />
//             </label>
//             <label>
//               State:
//               <input
//                 type="text"
//                 name={`adultDependents.${index}.address.state`}
//                 value={dependent.address.state || ""}
//                 onChange={handleNestedChange}
//               />
//             </label>
//             <label>
//               Zip:
//               <input
//                 type="text"
//                 name={`adultDependents.${index}.address.zip`}
//                 value={dependent.address.zip || ""}
//                 onChange={handleNestedChange}
//               />
//             </label>
//             <button type="button" onClick={() => removeAdultDependent(index)}>
//               Remove Dependent
//             </button>
//           </div>
//         ))}
//       <button type="button" onClick={addAdultDependent}>
//         Add Adult Dependent
//       </button>

//       <button type="submit">Save Changes</button>
//     </form>
//   );
// };

// export default EditHousehold;
