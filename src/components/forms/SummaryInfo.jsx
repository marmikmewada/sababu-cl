// Summary.jsx
import React from "react";
import styles from "./RegistrationForm.module.css";
// import { useMembersContext } from "../contexts/MembersContext";
// import { useCustomersContext } from "../contexts/CustomersContext";
import { useNavigate } from "react-router-dom";
import { useMembers } from "../contexts/MemberContext";

const SummaryInfo = ({ prevStep, formData, onSubmit }) => {
  // const { insertData } = useCustomersContext();
  const { createMember, currentMember } = useMembers();
  const navigate = useNavigate();

  console.log(currentMember);

  const formDataFormatted = (formData) => {
    const {
      firstName,
      middleName,
      lastName,
      category,
      sex,
      dob,
      hometown,
      nationality,
    } = formData.customers;

    const members = {
      first_name: firstName,
      last_name: lastName,
      middle_name: middleName,
      gender: sex,
      dob,
      hometown,
      nationality,
      category,
    };

    const { phone, email, street, apt, city, state, zip } = formData.contacts;

    const contacts = { phone, email, street, apt, city, state, zip };

    const {
      spouseFirstName,
      spouseLastName,
      spousePhone,
      spouseEmail,
      spouseStreet,
      spouseApt,
      spouseCity,
      spouseState,
      spouseZip,
      spouseDob,
      spouseSex,
      spouseNationality,
    } = formData.spouse;

    const spouse = {
      first_name: spouseFirstName,
      last_name: spouseLastName,
      gender: spouseSex,
      dob: spouseDob,
      email: spouseEmail,
      phone: spousePhone,
      nationality: spouseNationality,
      street: spouseStreet,
      apt: spouseApt,
      city: spouseCity,
      state: spouseState,
      zip: spouseZip,
    };

    const formattedDependents = [];
    formData.dependents.forEach((dependent) => {
      const {
        dependentName,
        dependentSex,
        dependentDob,
        dependentRelation,
        liveTogether,
        dependentStreet,
        dependentApt,
        dependentCity,
        dependentState,
        dependentZip,
      } = dependent;

      formattedDependents.push({
        name: dependentName,
        relation: dependentRelation,
        gender: dependentSex,
        dob: dependentDob,
        live_together: liveTogether,
        street: dependentStreet,
        apt: dependentApt,
        city: dependentCity,
        state: dependentState,
        zip: dependentZip,
      });
    });

    const {
      emrName,
      emrPhone,
      emrEmail,
      emrRelation,
      emrSex,
      emrStreet,
      emrApt,
      emrCity,
      emrState,
      emrZip,
      liveTogether,
    } = formData.reference;

    const reference = {
      name: emrName,
      relation: emrRelation,
      phone: emrPhone,
      email: emrEmail,
      gender: emrSex,
      live_together: liveTogether,
      street: emrStreet,
      apt: emrApt,
      city: emrCity,
      state: emrState,
      zip: emrZip,
    };

    return {
      members,
      contacts,
      dependents: formattedDependents,
      spouse,
      reference,
    };
  };

  onSubmit = async (e) => {
    e.preventDefault();

    const newCustomer = formDataFormatted(formData);
    console.log(newCustomer);
    try {
      await createMember(newCustomer);
      navigate("/app/customers/members");
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div className={styles.modalContent}>
      <form onSubmit={onSubmit}>
        <h2>Summary </h2>
        <div>
          <h3>Personal Data</h3>
          <ul>
            <li>Member Category: {formData.customers.category}</li>
            <li>First Name: {formData.customers.firstName}</li>
            <li>Middle Name: {formData.customers.middleName}</li>
            <li>Last Name: {formData.customers.lastName}</li>
            <li>Sex: {formData.customers.sex}</li>
            <li>Date of Birth: {formData.customers.dob}</li>
            <li>Marital Status: {formData.customers.maritalStatus}</li>
            <li>Hometown: {formData.customers.hometown}</li>
            <li>Nationality: {formData.customers.nationality}</li>
            <li>Member Status: {formData.customers.memberStatus}</li>
          </ul>
          {/* Display other personal data fields here */}
        </div>
        <div>
          <h3>Contact Information</h3>
          <ul>
            <li>Phone: {formData.contacts?.phone}</li>
            <li>Email: {formData.contacts?.email}</li>
            <li>
              Address: {formData.contacts?.street} {formData.contacts?.apt},{" "}
            </li>
            <li>City: {formData.contacts?.city}</li>
            <li>
              State: {formData.contacts?.state}, {formData.contacts?.zip}.
            </li>
          </ul>
          {/* Display other contact fields here */}
        </div>
        <div>
          <h3>Spouse Information</h3>
          <ul>
            <li>
              Name: {formData.spouse?.spouseFirstName}{" "}
              {formData.spouse?.spouseLastName}
            </li>
            <li>Sex: {formData.spouse?.spouseSex} </li>
            <li>DOB: {formData.spouse?.spouseDob} </li>
            <li>Nationality: {formData.spouse?.spouseNationality} </li>
            <li>Phone: {formData.spouse?.spousePhone} </li>
            <li>Email: {formData.spouse?.spouseEmail} </li>
            <li>
              <p>Address</p>
              <ul>
                <li>
                  Street: {formData.spouse?.spouseStreet}{" "}
                  {formData.spouse?.spouseApt}
                </li>
                <li>City: {formData.spouse?.spouseCity}, </li>
                <li>
                  State and Zip: {formData.spouse?.spouseState}.{" "}
                  {formData.spouse?.spouseZip}{" "}
                </li>
              </ul>
            </li>
          </ul>
          {/* Display other spouse info fields here */}
        </div>
        <div>
          <h3>Dependents</h3>
          {formData.dependents?.map((dependent, index) => (
            <div key={index}>
              <ul>
                <li>
                  Dependent {index + 1}
                  <ul>
                    <li>
                      <span>Name: {dependent.dependentName}</span>
                    </li>
                    <li>
                      <span>Name: {dependent.dependentSex}</span>
                    </li>
                    <li>
                      <span>Date of Birth: {dependent.dependentDob}</span>
                    </li>
                    <li>
                      <span>Relation: {dependent.dependentRelation}</span>
                    </li>
                    <li>
                      <span>Live Together: {dependent.liveTogether}</span>
                    </li>
                    <li>
                      <p>Address</p>
                      <ul>
                        <li>Stree: {dependent.dependentStreet}</li>
                        <li>City: {dependent.dependentCity}</li>
                        <li>
                          State and Zip: {dependent.dependentState},{" "}
                          {dependent.dependentZip}
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
              {/* Display other dependent fields here */}
            </div>
          ))}
        </div>
        <div>
          <h3>Emergency Contact Information</h3>
          <ul>
            <li>Name: {formData.reference?.emrName} </li>
            <li>Sex: {formData.reference?.emrSex} </li>
            <li>Nationality: {formData.reference?.emrPhone} </li>
            <li>Address: {formData.reference?.emrEmail} </li>
            <li>Live together: {formData.reference?.liveTogether} </li>
            <li>
              <p>Address</p>
              <ul>
                <li>Street: {formData.reference?.emrStreet}</li>
                <li>City: {formData.reference?.emrCity}</li>
                <li>
                  State and Zip: {formData.reference?.emrState}{" "}
                  {formData.reference?.emrZip}
                </li>
              </ul>
            </li>
          </ul>
          {/* Display other spouse info fields here */}
        </div>
        <div className={styles.addNavBtnContainer}>
          <button
            type="button"
            onClick={prevStep}
            className={styles.formNavBtn}
          >
            Back
          </button>
          <button type="submit" className={styles.formNavBtn}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SummaryInfo;

// // Summary.jsx
// import React from "react";
// import styles from "./RegistrationForm.module.css";
// import { useMembersContext } from "../contexts/MembersContext";
// import { useCustomersContext } from "../contexts/CustomersContext";

// const SummaryInfo = ({ prevStep, formData, onSubmit }) => {
//   const { createCustomer } = useMembersContext();
//   const { customers, insertData } = useCustomersContext();

//   console.log(formData);

//   const formDataFormatted = (formData) => {
//     const {
//       firstName,
//       middleName,
//       lastName,
//       category,
//       sex,
//       dob,
//       maritalStatus,
//       hometown,
//       nationality,
//     } = formData.personalInfo;

//     const { phone, email } = formData.contactInfo;

//     return {
//       first_name: firstName,
//       middle_name: middleName,
//       last_name: lastName,
//       category,
//       sex,
//       dob,
//       marital_status: maritalStatus,
//       hometown,
//       nationality,
//       phone,
//       email,
//     };
//   };

//   onSubmit = async (e) => {
//     e.preventDefault();

//     const newCustomer = formDataFormatted(formData);

//     await insertData(newCustomer);
//   };

//   // const formatFormData = (formData) => {
//   //   const {
//   //     firstName,
//   //     middleName,
//   //     lastName,
//   //     sex,
//   //     dob,
//   //     maritalStatus,
//   //     category,
//   //     hometown,
//   //     nationality,
//   //   } = formData.personalInfo;

//   //   const { phone, email, street, apt, city, state, zip } =
//   //     formData.contactInfo;

//   //   const {
//   //     spouseFirstName,
//   //     spouseLastName,
//   //     spouseStreet,
//   //     spouseApt,
//   //     spouseCity,
//   //     spouseState,
//   //     spouseZip,
//   //     spouseDob,
//   //     spouseSex,
//   //     spouseNationality,
//   //   } = formData.spouseInfo;

//   //   const formattedDependents = [];
//   //   formData.dependents.forEach((dependent) => {
//   //     const {
//   //       dependentName,
//   //       dependentSex,
//   //       dependentDob,
//   //       dependentRelation,
//   //       liveTogether,
//   //     } = dependent;

//   //     formattedDependents.push({
//   //       dependentName,
//   //       dependentSex,
//   //       dependentDob,
//   //       dependentRelation,
//   //       liveTogether,
//   //     });
//   //   });

//   //   const { emrName, emrPhone, emrEmail, emrRelation, emrSex } =
//   //     formData.emrContactInfo;

//   //   return {
//   //     firstName,
//   //     middleName,
//   //     lastName,
//   //     sex,
//   //     dob,
//   //     maritalStatus,
//   //     category,
//   //     hometown,
//   //     nationality,
//   //     phone,
//   //     email,
//   //     contacts: {
//   //       street,
//   //       apt,
//   //       city,
//   //       state,
//   //       zip,
//   //     },
//   //     household: {
//   //       spouse: {
//   //         spouseFirstName,
//   //         spouseLastName,
//   //         address: {
//   //           spouseStreet,
//   //           spouseApt,
//   //           spouseCity,
//   //           spouseState,
//   //           spouseZip,
//   //         },
//   //         spouseDob,
//   //         spouseSex,
//   //         spouseNationality,
//   //       },
//   //       dependents: formattedDependents,
//   //     },
//   //     emergencyContact: {
//   //       emrName,
//   //       emrPhone,
//   //       emrEmail,
//   //       emrRelation,
//   //       emrSex,
//   //     },
//   //   };
//   // };

// Create a new customer
// onSubmit = async () => {
//   const newCustomer = formatFormData(formData);
//   await createCustomer(newCustomer);

//   console.log(newCustomer);
// };

//   return (
//     <div className={styles.modalContent}>
//       <h2>Summary</h2>
//       <div>
//         <h3>Personal Data</h3>
//         <ul>
//           <li>Member Category: {formData.personalInfo.category}</li>
//           <li>First Name: {formData.personalInfo.firstName}</li>
//           <li>Middle Name: {formData.personalInfo.middleName}</li>
//           <li>Last Name: {formData.personalInfo.lastName}</li>
//           <li>Sex: {formData.personalInfo.sex}</li>
//           <li>Date of Birth: {formData.personalInfo.dob}</li>
//           <li>Marital Status: {formData.personalInfo.maritalStatus}</li>
//           <li>Hometown: {formData.personalInfo.hometown}</li>
//           <li>Nationality: {formData.personalInfo.nationality}</li>
//         </ul>
//         {/* Display other personal data fields here */}
//       </div>
//       <div>
//         <h3>Contact Information</h3>
//         <ul>
//           <li>Phone: {formData.contactInfo?.phone}</li>
//           <li>Email: {formData.contactInfo?.email}</li>
//           <li>
//             Address: {formData.contactInfo?.street} {formData.contactInfo?.apt},{" "}
//           </li>
//           <li>City: {formData.contactInfo?.city}</li>
//           <li>
//             State: {formData.contactInfo?.state}, {formData.contactInfo?.zip}.
//           </li>
//         </ul>
//         {/* Display other contact fields here */}
//       </div>
//       <div>
//         <h3>Spouse Information</h3>
//         <ul>
//           <li>
//             Name: {formData.spouseInfo?.spouseFirstName}{" "}
//             {formData.spouseInfo?.spouseLastName}
//           </li>
//           <li>Sex: {formData.spouseInfo?.spouseSex} </li>
//           <li>DOB: {formData.spouseInfo?.spouseDob} </li>
//           <li>Nationality: {formData.spouseInfo?.spouseNationality} </li>
//           <li>
//             Street: {formData.spouseInfo?.spouseStreet}{" "}
//             {formData.spouseInfo?.spouseApt}
//           </li>
//           <li>
//             City: {formData.spouseInfo?.spouseCity},{" "}
//             {formData.spouseInfo?.spouseState}. {formData.spouseInfo?.spouseZip}{" "}
//           </li>
//         </ul>
//         {/* Display other spouse info fields here */}
//       </div>
//       <div>
//         <h3>Dependents</h3>
//         {formData.dependents?.map((dependent, index) => (
//           <div key={index}>
//             <ul>
//               <li>
//                 Dependent {index + 1}
//                 <ul>
//                   <li>
//                     <span>Name: {dependent.dependentName}</span>
//                   </li>
//                   <li>
//                     <span>Name: {dependent.dependentSex}</span>
//                   </li>
//                   <li>
//                     <span>Date of Birth: {dependent.dependentDob}</span>
//                   </li>
//                   <li>
//                     <span>Relation: {dependent.dependentRelation}</span>
//                   </li>
//                 </ul>
//               </li>
//             </ul>
//             {/* Display other dependent fields here */}
//           </div>
//         ))}
//       </div>
//       <div>
//         <h3>Emergency Contact Information</h3>
//         <ul>
//           <li>Name: {formData.emrContactInfo?.emrName} </li>
//           <li>Sex: {formData.emrContactInfo?.emrSex} </li>
//           <li>Nationality: {formData.emrContactInfo?.emrPhone} </li>
//           <li>Address: {formData.emrContactInfo?.emrEmail} </li>
//         </ul>
//         {/* Display other spouse info fields here */}
//       </div>
//       <div className={styles.addNavBtnContainer}>
//         <button type="button" className={styles.formNavBtn} onClick={prevStep}>
//           Back
//         </button>
//         <button type="submit" onClick={onSubmit} className={styles.formNavBtn}>
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SummaryInfo;
