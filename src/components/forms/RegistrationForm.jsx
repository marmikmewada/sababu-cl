// RegistrationForm.jsx
import React, { useState } from "react";
import PersonalInfo from "./PersonalInfo";
import ContactInfo from "./ContactInfo";
import SpouseInfo from "./SpouseInfo";
import DependentsInfo from "./DependentsInfo";
import EmergencyContact from "./EmergencyContact";
import SummaryInfo from "./SummaryInfo";
import { useAuth } from "../contexts/UserContext";

const RegistrationForm = () => {
  const { profile } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    customers: {
      id: profile?.user_id,
      firstName: profile?.first_name,
      middleName: "",
      lastName: profile?.last_name,
      sex: "",
      dob: "",
      maritalStatus: "",
      category: "",
      hometown: "",
      nationality: "",
      member_status: "",
    },
    contacts: {
      phone: "",
      email: profile?.email,
      street: "",
      apt: "",
      city: "",
      state: "",
      zip: "",
    },
    dependents: [],
    spouse: {},
    reference: {},
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (data) => {
    setFormData((formData) => ({ ...formData, ...data }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  switch (step) {
    case 1:
      return (
        <PersonalInfo
          nextStep={nextStep}
          handleChange={handleChange}
          formData={formData.customers}
        />
      );
    case 2:
      return (
        <ContactInfo
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          formData={formData.contacts}
        />
      );
    case 3:
      return (
        <SpouseInfo
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          formData={formData.spouse}
        />
      );
    case 4:
      return (
        <DependentsInfo
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          formData={formData.dependents}
        />
      );
    case 5:
      return (
        <EmergencyContact
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          formData={formData.reference}
        />
      );
    case 6:
      return (
        <SummaryInfo
          formData={formData}
          prevStep={prevStep}
          onSubmit={handleSubmit}
        />
      );
    default:
      return null;
  }
};

export default RegistrationForm;

// customers: {
//   firstName: "Amos",
//   middleName: "",
//   lastName: "Turay",
//   sex: "M",
//   dob: "12/3/1972",
//   maritalStatus: "Married",
//   category: "family",
//   hometown: "Herndon",
//   nationality: "American",
//   member_status: "New",
// },
// contacts: {
//   phone: "5775774545",
//   email: "testing@gmail.com",
//   street: "2401 Little Current Drive",
//   apt: "302",
//   city: "Herndon",
//   state: "VA",
//   zip: "20171",
// },
// spouse: {
//   spouseFirstName: "Aminata",
//   spouseLastName: "Jaward",
//   spousePhone: "4564567820",
//   spouseEmail: "testing2@gmail.com",
//   spouseSex: "F",
//   spouseDob: "4/4/1988",
//   spouseStreet: "13796 Merrybrook CT",
//   spouseApt: "302",
//   spouseCity: "Herndon",
//   spouseState: "VA",
//   spouseZip: "20171",
//   spouseNationality: "America",
// },
// dependents: [
//   {
//     dependentName: "Mustapha Turay",
//     dependentSex: "M",
//     dependentDob: "8/18/2007",
//     dependentRelation: "son",
//     liveTogether: "Yes",
//     dependentStreet: "13796 Merrybook Court",
//     dependentApt: "302",
//     dependentCity: "Herndon",
//     dependentState: "VA",
//     dependentZip: "20171",
//   },
//   {
//     dependentName: "Mohamed Turay",
//     dependentSex: "M",
//     dependentDob: "8/18/2007",
//     dependentRelation: "son",
//     liveTogether: "Yes",
//     dependentStreet: "13796 Merrybook Court",
//     dependentApt: "302",
//     dependentCity: "Herndon",
//     dependentState: "VA",
//     dependentZip: "20171",
//   },
// ],
// reference: {
//   emrName: "Mohamed Turay",
//   emrPhone: "4564567820",
//   emrEmail: "testing2@gmail.com",
//   emrSex: "M",
//   emrRelation: "son",
//   emrStreet: "13796 Merrybook Court",
//   emrApt: "302",
//   emrCity: "Herndon",
//   emrState: "VAa",
//   emrZip: "20171",
// },
// household: [],
