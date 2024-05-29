// import React, { useState } from "react";

// import { useMembersContext } from "../../components/contexts/MembersContext";
// import { useNavigate } from "react-router-dom";
// import Loading from "../../components/Loading";
// import { useMembers } from "../../components/contexts/MemberContext";

// import styles from "./Household.module.css";
// import Button from "../../components/Button";
// import ProfileHighlights from "./ProfileHighlights";

// function Household() {
//   // const { profile } = useAuth();
//   const { isLoading, currentMember } = useMembers();

//   const [formData, setFormData] = useState(currentMember || {});
//   const [dependentModalOpen, setDependentModalOpen] = useState(false);
//   const [spouseModalOpen, setSpouseModalOpen] = useState(false);
//   const [emergencyContactModalOpen, setEmergencyContactModalOpen] =
//     useState(false);
//   const [nextOfKinModalOpen, setNextOfKinModalOpen] = useState(false);

//   const navigate = useNavigate();

//   // const handleDelete = () => {
//   //   // deleteCustomer(id);
//   //   navigate(-1);
//   // };

//   const openModal = (modalName) => {
//     switch (modalName) {
//       case "dependent":
//         setDependentModalOpen(true);
//         break;
//       case "spouse":
//         setSpouseModalOpen(true);
//         break;
//       case "reference":
//         setEmergencyContactModalOpen(true);
//         break;
//       case "nextOfKin":
//         setNextOfKinModalOpen(true);
//         break;
//       default:
//         break;
//     }
//   };

//   const closeModal = (modalName) => {
//     switch (modalName) {
//       case "dependent":
//         setDependentModalOpen(false);
//         break;
//       case "spouse":
//         setSpouseModalOpen(false);
//         break;
//       case "reference":
//         setEmergencyContactModalOpen(false);
//         break;
//       case "nextOfKin":
//         setNextOfKinModalOpen(false);
//         break;
//       default:
//         break;
//     }
//   };

//   // const handleChange = (data) => {
//   //   setFormData((formData) => ({ ...formData, ...data }));
//   // };

//   if (isLoading) return <Loading />;

//   return (
//     <div className={styles.household}>
//       {currentMember && (
//         <>
//           <div className={styles.profileHeader}>
//             <h2 className={`${"headingTertiary"}`}>My Household</h2>
//             <Button type="back" onClick={() => navigate(-1)}>
//               <i class="fa-solid fa-chevron-left"></i>
//             </Button>
//           </div>

//           <div className={styles.houseCategories}>
//             <div>
//               <ProfileHighlights />
//             </div>

//             <div className={styles.householdTables}>
//               <h3>Dependents</h3>
//               <DependentTable
//                 openModal={() => openModal("dependent")}
//                 closeModal={() => closeModal("dependent")}
//                 isModalOpen={dependentModalOpen}
//                 formData={formData}
//                 setFormData={setFormData}
//                 // editMember={editMember}
//                 // currentCustomer={currentCustomer}
//                 // createCustomer={createCustomer}
//               />
//             </div>
//             <div className={styles.householdTables}>
//               <h3>Spouse</h3>
//               <SpouseTable
//                 openModal={() => openModal("spouse")}
//                 closeModal={() => closeModal("spouse")}
//                 isModalOpen={spouseModalOpen}
//                 formData={formData}
//                 setFormData={setFormData}
//               />
//             </div>
//             <div className={styles.householdTables}>
//               <h3>Emergency Contact</h3>
//               <EmergencyContactTable
//                 openModal={() => openModal("reference")}
//                 closeModal={() => closeModal("reference")}
//                 isModalOpen={emergencyContactModalOpen}
//                 formData={formData}
//                 setFormData={setFormData}
//               />
//             </div>
//             <div className={styles.householdTables}>
//               <h3>Next of Kin</h3>
//               <NextOfKinTable
//                 openModal={() => openModal("nextOfKin")}
//                 closeModal={() => closeModal("nextOfKin")}
//                 isModalOpen={nextOfKinModalOpen}
//                 formData={formData}
//                 setFormData={setFormData}
//               />
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// // Modal.js
// const Modal = ({ isOpen, children }) => {
//   return (
//     <>
//       {isOpen && (
//         <div className={styles.modalOverlay}>
//           <div
//             className={styles.modalContent}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button className={styles.modalClose}></button>
//             <div className={styles.modalContent}>{children}</div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// const DependentTable = ({ openModal, closeModal, isModalOpen }) => {
//   const { currentMember, createDependent, editDependent, deleteDependent } =
//     useMembers();
//   const formattedData = formatData(currentMember);

//   const [formData, setFormData] = useState({});
//   const [selectedIndex, setSelectedIndex] = useState(null);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [error, setError] = useState(null);

//   const { id } = formattedData;

//   const dependents = formattedData.dependents || [];
//   console.log(dependents);

//   const handleEdit = (dependent, index) => {
//     setFormData(dependent);
//     setSelectedIndex(index);
//     setIsEditMode(true);
//     openModal();
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       let updatedDependents = [...dependents];

//       if (isEditMode && selectedIndex !== null) {
//         updatedDependents[selectedIndex] = formData;
//       } else {
//         // If it's not in edit mode, just add the new form data
//         updatedDependents.push(formData);
//       }

//       // Ensure formData is correctly populated
//       // console.log("formData:", formData);

//       // Send the updated dependents array to the appropriate action
//       if (isEditMode) {
//         await editDependent(id, updatedDependents);
//       } else {
//         console.log(updatedDependents);
//         await createDependent(id, updatedDependents);
//       }

//       closeModal();
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   //
//   const handleDelete = (index) => {
//     // Check if dependents[index] exists and has the id property
//     if (dependents[index] && dependents[index].id) {
//       const dependentIdToDelete = dependents[index].id;
//       const updatedDependents = [...dependents];
//       updatedDependents.splice(index, 1);
//       deleteDependent(id, dependentIdToDelete);
//     } else {
//       console.error("Invalid dependent object or missing id property.");
//     }
//   };

//   // Rest of your component code...
//   return (
//     <div className={styles.tableContainer}>
//       <table className={styles.contentResizeTable}>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Sex</th>
//             <th>Birth Birth</th>
//             <th>Relation</th>
//             <th>Edit</th>
//             <th>Del</th>
//           </tr>
//         </thead>
//         <tbody>
//           {dependents ? (
//             dependents.map((dependent, index) => (
//               <tr key={index}>
//                 <td>{titleCase(dependent?.name) || ""}</td>
//                 <td>{titleCase(dependent?.gender) || ""}</td>
//                 <td>{dependent?.dob || ""}</td>
//                 <td>{titleCase(dependent?.relation) || ""}</td>
//                 <td>
//                   <button
//                     onClick={() => handleEdit(dependent, index)}
//                     className={styles.editBtn}
//                   >
//                     <i className="fa-solid fa-ellipsis"></i>
//                   </button>
//                 </td>
//                 <td>
//                   <button
//                     onClick={() => handleDelete(index, dependent)}
//                     className={styles.editBtn}
//                   >
//                     <i className="fa-solid fa-ellipsis"></i>
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td>No data available. Add a dependant</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/*  */}

//       <Modal isOpen={isModalOpen} className={styles.modal}>
//         <div className={styles.closeBtnContainer}>
//           <button onClick={closeModal} className={styles.modalCloseBtn}>
//             <i className="fa-solid fa-xmark"></i>
//           </button>
//         </div>
//         <form onSubmit={handleSubmit} className={styles.modalForm}>
//           <h3>Dependant Form</h3>
//           <div className={`${styles.inputControl} ${styles.twoColumns}`}>
//             <div>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name || ""}
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//                 placeholder="Name"
//               />
//             </div>
//             <div>
//               <input
//                 type="text"
//                 name="gender"
//                 value={formData.gender || ""}
//                 onChange={(e) =>
//                   setFormData({ ...formData, gender: e.target.value })
//                 }
//                 placeholder="Gender"
//               />
//             </div>
//           </div>
//           <div className={`${styles.inputControl} ${styles.threeColumns}`}>
//             <div>
//               <input
//                 type="text"
//                 name="dob"
//                 value={formData.dob || ""}
//                 onChange={(e) =>
//                   setFormData({ ...formData, dob: e.target.value })
//                 }
//                 placeholder="Date of birth"
//               />
//             </div>

//             <div>
//               <input
//                 type="text"
//                 name="relation"
//                 value={formData.relation || ""}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     relation: e.target.value,
//                   })
//                 }
//                 placeholder="Relation"
//               />
//             </div>
//             <div>
//               <input
//                 type="text"
//                 name="live_together"
//                 value={formData.live_together || ""}
//                 onChange={(e) =>
//                   setFormData({ ...formData, live_together: e.target.value })
//                 }
//                 placeholder="Live together"
//               />
//             </div>
//           </div>
//           {/*  */}
//           <div className={`${styles.inputControl} ${styles.twoColumns} mt-4`}>
//             <div>
//               <input
//                 type="text"
//                 name="street"
//                 value={formData.street || ""}
//                 onChange={(e) =>
//                   setFormData({ ...formData, street: e.target.value })
//                 }
//                 placeholder="Street"
//               />
//             </div>
//             <div>
//               <input
//                 type="text"
//                 name="apt"
//                 value={formData.apt || ""}
//                 onChange={(e) =>
//                   setFormData({ ...formData, apt: e.target.value })
//                 }
//                 placeholder="apt"
//               />
//             </div>
//           </div>
//           <div className={`${styles.inputControl} ${styles.threeColumns}`}>
//             <div>
//               <input
//                 type="text"
//                 name="city"
//                 value={formData.city || ""}
//                 onChange={(e) =>
//                   setFormData({ ...formData, city: e.target.value })
//                 }
//                 placeholder="City"
//               />
//             </div>

//             <div>
//               <input
//                 type="text"
//                 name="state"
//                 value={formData.state || ""}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     state: e.target.value,
//                   })
//                 }
//                 placeholder="State"
//               />
//             </div>
//             <div>
//               <input
//                 type="text"
//                 name="zip"
//                 value={formData.zip || ""}
//                 onChange={(e) =>
//                   setFormData({ ...formData, zip: e.target.value })
//                 }
//                 placeholder="Zip"
//               />
//             </div>
//           </div>

//           {/* Add other input fields as needed */}
//           <button type="submit" className={styles.addBtn}>
//             {isEditMode ? "Save" : "Add"}
//           </button>
//         </form>
//       </Modal>

//       {/* Add button */}
//       <button
//         className={styles.addBtn}
//         onClick={() => {
//           setFormData({}); // Reset form data for adding new data
//           setIsEditMode(false); // Set add mode
//           openModal(); // Open the modal
//         }}
//       >
//         Add
//       </button>
//       {error && <p>Error: {error}</p>}
//     </div>
//   );
// };

// const SpouseTable = ({ openModal, closeModal, isModalOpen }) => {
//   const { createCustomer, editOwnAccount } = useMembersContext();
//   const { currentMember } = useMembers();
//   const formattedData = formatData(currentMember);

//   const spouse = formattedData.spouse || {};

//   const [formData, setFormData] = useState({});
//   const [isEditMode, setIsEditMode] = useState(false);

//   if (
//     !spouse ||
//     typeof spouse !== "object" ||
//     Object.keys(spouse).length === 0
//   ) {
//     return <p>No data available.</p>;
//   }

//   // Function to handle changes in form input fields
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Function to handle editing or creating a record
//   const handleSubmit = () => {
//     console.log(formData); // Log the form data for debugging

//     // Perform actions based on edit mode
//     if (isEditMode) {
//       // Handle editing mode
//       // Call the edit function with the updated data
//       // Edit function should be provided via props or context
//       console.log(formData);
//       editOwnAccount(formData); // Example function call
//     } else {
//       // Handle creating new record mode
//       // Call the create function with the new data
//       // Create function should be provided via props or context
//       console.log(formData);
//       createCustomer(formData); // Example function call
//     }

//     closeModal(); // Close the modal after submission
//   };

//   // Function to handle editing an existing record
//   const handleEdit = (spouseData) => {
//     setFormData({ ...spouseData }); // Populate form data for editing
//     setIsEditMode(true); // Set edit mode
//     openModal(); // Open the modal
//   };

//   return (
//     <div>
//       <table className={styles.contentResizeTable}>
//         <thead>
//           <tr>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Sex</th>
//             <th>Phone</th>
//             <th>Edit</th>
//           </tr>
//         </thead>
//         {spouse.map((spouse) => (
//           <tbody key={spouse.id}>
//             <tr>
//               <td>{titleCase(spouse.first_name) || ""}</td>
//               <td>{titleCase(spouse?.last_name) || ""}</td>
//               <td>{titleCase(spouse?.gender) || ""}</td>
//               <td>{spouse.phone}</td>
//               <td>
//                 <button
//                   onClick={() => handleEdit(spouse)}
//                   className={styles.editBtn}
//                 >
//                   <i className="fa-solid fa-ellipsis"></i>
//                 </button>
//               </td>
//               {/* <td>
//                 <button
//                   onClick={() => handleDelete(spouse)}
//                   className={styles.editBtn}
//                 >
//                   <i className="fa-solid fa-ellipsis"></i>
//                 </button>
//               </td> */}
//             </tr>
//           </tbody>
//         ))}
//       </table>

//       {/*  */}
//       <Modal isOpen={isModalOpen} className={styles.modal}>
//         <div className={styles.closeBtnContainer}>
//           <button onClick={closeModal} className={styles.modalCloseBtn}>
//             <i className="fa-solid fa-xmark"></i>
//           </button>
//         </div>
//         <form onSubmit={handleSubmit} className={styles.modalForm}>
//           <h3>Spouse Form</h3>
//           <div className={`${styles.inputControl} ${styles.twoEqualColumns}`}>
//             <div>
//               <input
//                 type="text"
//                 name="first_name"
//                 value={formData.first_name || ""}
//                 onChange={handleInputChange}
//                 placeholder="First Name"
//               />
//             </div>
//             <div>
//               <input
//                 type="text"
//                 name="last_name"
//                 value={formData.last_name || ""}
//                 onChange={handleInputChange}
//                 placeholder="Last Name"
//               />
//             </div>
//           </div>
//           <div className={`${styles.inputControl} ${styles.threeColumns}`}>
//             <div>
//               <input
//                 type="text"
//                 name="dob"
//                 value={formData.dob || ""}
//                 onChange={handleInputChange}
//                 placeholder="Date of birth"
//               />
//             </div>
//             <div>
//               <input
//                 type="text"
//                 name="gender"
//                 value={formData.gender || ""}
//                 onChange={handleInputChange}
//                 placeholder="Gender"
//               />
//             </div>
//             <div>
//               <input
//                 type="text"
//                 name="nationality"
//                 value={formData.nationality || ""}
//                 onChange={handleInputChange}
//                 placeholder="Nationality"
//               />
//             </div>
//           </div>
//           <div className={`${styles.inputControl} ${styles.twoEqualColumns}`}>
//             <div>
//               <input
//                 type="text"
//                 name="phone"
//                 value={formData.phone || ""}
//                 onChange={handleInputChange}
//                 placeholder="Phone"
//               />
//             </div>
//             <div>
//               <input
//                 type="text"
//                 name="email"
//                 value={formData.email || ""}
//                 onChange={handleInputChange}
//                 placeholder="Email"
//               />
//             </div>
//           </div>
//           <p>Address</p>
//           <div className={`${styles.inputControl} ${styles.twoColumns}`}>
//             <div>
//               <input
//                 type="text"
//                 name="street"
//                 value={formData.street || ""}
//                 onChange={handleInputChange}
//                 placeholder="Street"
//               />
//             </div>
//             <div>
//               <input
//                 type="text"
//                 name="apt"
//                 value={formData.apt || ""}
//                 onChange={handleInputChange}
//                 placeholder="Apartment"
//               />
//             </div>
//           </div>
//           <div className={`${styles.inputControl} ${styles.threeColumns}`}>
//             <div>
//               <input
//                 type="text"
//                 name="city"
//                 value={formData.city || ""}
//                 onChange={handleInputChange}
//                 placeholder="City"
//               />
//             </div>

//             <div>
//               <input
//                 type="text"
//                 name="state"
//                 value={formData.state || ""}
//                 onChange={handleInputChange}
//                 placeholder="State"
//               />
//             </div>
//             <div>
//               <input
//                 type="text"
//                 name="zip"
//                 value={formData.zip || ""}
//                 onChange={handleInputChange}
//                 placeholder="Zip code"
//               />
//             </div>
//           </div>
//           {/* Add other input fields as needed */}
//           <button type="submit" className={styles.addBtn}>
//             {isEditMode ? "Save" : "Add"}
//           </button>
//         </form>
//       </Modal>
//       {!spouse.length > 0 ? (
//         <button className={styles.addBtn} onClick={openModal}>
//           Add
//         </button>
//       ) : (
//         ""
//       )}
//     </div>
//   );
// };

// const EmergencyContactTable = ({ openModal, closeModal, isModalOpen }) => {
//   const { editOwnAccount } = useMembersContext();

//   const { currentMember } = useMembers();
//   const formattedData = formatData(currentMember);
//   const reference = formattedData.reference || [];

//   // State to manage form data
//   const [formData, setFormData] = useState(reference || {});
//   const [isEditMode, setIsEditMode] = useState(!!reference);

//   if (
//     !reference ||
//     typeof reference !== "object" ||
//     Object.keys(reference).length === 0
//   ) {
//     return <p>No data available.</p>;
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Perform any necessary form validation here
//     // Call appropriate function to update context with new data
//     if (isEditMode) {
//       // Edit existing emergency contact
//       editOwnAccount(currentMember.id, {
//         ...currentMember,
//         reference: formData,
//       });
//     }
//     setIsEditMode(true); // Set to edit mode after adding/editing
//   };

//   // Function to handle editing an emergency contact
//   const handleEdit = (reference) => {
//     setFormData(reference); // Populate form data for editing
//     setIsEditMode(true); // Set edit mode
//     openModal(); // Open the modal
//   };

//   return (
//     <div>
//       <table className={styles.contentResizeTable}>
//         <thead>
//           <tr>
//             <th>First Name</th>
//             <th>Relation</th>
//             <th>Sex</th>
//             <th>Phone</th>
//             <th>Edit</th>
//           </tr>
//         </thead>
//         {reference.map((reference) => (
//           <tbody key={reference.id}>
//             <tr>
//               <td>{titleCase(reference?.name) || ""}</td>
//               <td>{titleCase(reference?.relation) || ""}</td>
//               <td>{titleCase(reference?.gender) || ""}</td>
//               <td>{reference?.phone || ""}</td>
//               <td>
//                 {" "}
//                 <button
//                   onClick={() => handleEdit(reference)}
//                   className={styles.editBtn}
//                 >
//                   <i className="fa-solid fa-ellipsis"></i>
//                 </button>
//               </td>
//             </tr>
//           </tbody>
//         ))}
//       </table>
//       <Modal isOpen={isModalOpen} className={styles.modal}>
//         <div className={styles.closeBtnContainer}>
//           <button onClick={closeModal} className={styles.modalCloseBtn}>
//             <i className="fa-solid fa-xmark"></i>
//           </button>
//         </div>
//         <form onSubmit={handleSubmit} className={styles.modalForm}>
//           <h3>Emergency Contact Form</h3>
//           <div className={`${styles.inputControl} ${styles.twoColumns}`}>
//             <div>
//               <input
//                 type="text"
//                 value={formData.name || ""}
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//                 placeholder="Name"
//               />
//             </div>
//             <div>
//               <input
//                 type="text"
//                 value={formData.gender || ""}
//                 onChange={(e) =>
//                   setFormData({ ...formData, gender: e.target.value })
//                 }
//                 placeholder="Gender"
//               />
//             </div>
//           </div>
//           <div className={`${styles.inputControl} ${styles.threeColumns}`}>
//             <div>
//               <input
//                 type="text"
//                 value={formData.relation || ""}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     relation: e.target.value,
//                   })
//                 }
//                 placeholder="Relation"
//               />
//             </div>
//             <div>
//               <input
//                 type="text"
//                 value={formData.phone || ""}
//                 onChange={(e) =>
//                   setFormData({ ...formData, phone: e.target.value })
//                 }
//                 placeholder="Phone"
//               />
//             </div>
//             <div>
//               <input
//                 type="text"
//                 value={formData.email || ""}
//                 onChange={(e) =>
//                   setFormData({ ...formData, email: e.target.value })
//                 }
//                 placeholder="Email address"
//               />
//             </div>
//           </div>
//           {/* Add other input fields as needed */}
//           <button type="submit" className={styles.addBtn}>
//             {isEditMode ? "Save" : "Add"}
//           </button>
//         </form>
//       </Modal>

//       <button
//         className={styles.addBtn}
//         onClick={() => {
//           setFormData({}); // Reset form data for adding new data
//           setIsEditMode(false); // Set add mode
//           openModal(); // Open the modal
//         }}
//       >
//         Add
//       </button>
//     </div>
//   );
// };

// const NextOfKinTable = ({ nextOfKin, openModal, closeModal, isModalOpen }) => {
//   if (
//     !nextOfKin ||
//     typeof nextOfKin !== "object" ||
//     Object.keys(nextOfKin).length === 0
//   ) {
//     return <p>No data available.</p>;
//   }

//   return (
//     <div>
//       <table className={styles.contentResizeTable}>
//         <thead>
//           <tr>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Sex</th>
//             <th>Phone</th>
//           </tr>
//         </thead>
//         {nextOfKin && (
//           <tbody>
//             <tr>
//               <td>{titleCase(nextOfKin?.nextofKinName) || ""}</td>
//               <td>{titleCase(nextOfKin?.nextofKinRelation) || ""}</td>
//               <td>{titleCase(nextOfKin?.nextofKinSex) || ""}</td>
//               <td>{nextOfKin?.nextofKinPhone || ""}</td>
//             </tr>
//           </tbody>
//         )}
//       </table>
//       <Modal isOpen={isModalOpen}>
//         <button onClick={closeModal}>Close</button>
//         <h1>Display next of kin modal</h1>
//       </Modal>
//       <div className={styles.addBtnContainer}>
//         <button className={styles.addBtn} onClick={openModal}>
//           Add
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Household;

// //
// function titleCase(input) {
//   // Check if the input is a camelCase word
//   if (input?.includes(" ")) {
//     // If the input contains spaces, split by spaces and process each word
//     return input
//       .split(" ")
//       .map(
//         (word) => word?.charAt(0).toUpperCase() + word?.slice(1).toLowerCase()
//       )
//       .join(" ");
//   } else {
//     // If the input is a single word, simply title case it
//     return input?.charAt(0).toUpperCase() + input?.slice(1).toLowerCase();
//   }
// }

// ////Destructure the currentMember object
// function formatData(apiData) {
//   const formattedData = {
//     id: apiData.id,
//     first_name: apiData.first_name,
//     last_name: apiData.last_name,
//     middle_name: apiData.middle_name,
//     gender: apiData.gender,
//     category: apiData.category,
//     contacts: apiData.contacts,
//     created_at: apiData.created_at,
//     dependents: apiData.dependents,
//     dob: apiData.dob,
//     hometown: apiData.hometown,
//     membership: apiData.membership,
//     nationality: apiData.nationality,
//     reference: apiData.reference,
//     spouse: apiData.spouse,
//     // Add other properties as needed
//   };

//   return formattedData;
// }
