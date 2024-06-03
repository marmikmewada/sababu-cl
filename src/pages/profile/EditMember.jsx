import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../zustand/store";

const EditMember = () => {
  const navigate = useNavigate();
  const {
    profile,
    updateUserProfile,
    updateMemberProfile,
    updateHouseholdProfile,
    fetchUserProfile,
  } = useStore((state) => ({
    profile: state.profile,
    updateUserProfile: state.updateUserProfile,
    updateMemberProfile: state.updateMemberProfile,
    updateHouseholdProfile: state.updateHouseholdProfile,
    fetchUserProfile: state.fetchUserProfile,
  }));

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    street: "",
    city: "",
    state: "",
    zip: "",
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
      passportNumber: "",
      passportExpirationDate: "",
      driverLicenseNumber: "",
      driverLicenseExpirationDate: "",
      driverLicenseState: "",
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
    apt: "",
    country: "",
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
    if (profile) {
      setFormData({
        firstName: profile.user?.firstName || "",
        middleName: profile.user?.middleName || "",
        lastName: profile.user?.lastName || "",
        email: profile.user?.email || "",
        phone: profile.user?.phone || "",
        gender: profile.user?.gender || "",
        dob: profile.user?.dob ? profile.user.dob.slice(0, 10) : "",
        street: profile.user?.address?.street || "",
        city: profile.user?.address?.city || "",
        state: profile.user?.address?.state || "",
        zip: profile.user?.address?.zip || "",
        maritalStatus: profile.member?.maritalStatus || "",
        hometown: profile.member?.hometown || "",
        nationality: profile.member?.nationality || "",
        origin: profile.member?.origin || "",
        employment: {
          company: profile.member?.employment?.company || "",
          jobTitle: profile.member?.employment?.jobTitle || "",
          workAddress: profile.member?.employment?.workAddress || "",
          workPhone: profile.member?.employment?.workPhone || "",
          workEmail: profile.member?.employment?.workEmail || "",
          employmentStatus: profile.member?.employment?.employmentStatus || "",
        },
        documents: {
          passportNumber: profile.member?.documents?.passport?.number || "",
          passportExpirationDate: profile.member?.documents?.passport
            ?.expirationDate
            ? profile.member.documents.passport.expirationDate.slice(0, 10)
            : "",
          driverLicenseNumber:
            profile.member?.documents?.driverLicense?.number || "",
          driverLicenseExpirationDate: profile.member?.documents?.driverLicense
            ?.expirationDate
            ? profile.member.documents.driverLicense.expirationDate.slice(0, 10)
            : "",
          driverLicenseState:
            profile.member?.documents?.driverLicense?.state || "",
        },
        emergencyContact: profile.member?.emergencyContact || [
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
        apt: profile.member?.address?.apt || "",
        country: profile.member?.address?.country || "",
        spouse: {
          firstName: profile.household?.spouse?.firstName || "",
          lastName: profile.household?.spouse?.lastName || "",
          email: profile.household?.spouse?.email || "",
          birthdate: profile.household?.spouse?.birthdate
            ? profile.household.spouse.birthdate.slice(0, 10)
            : "",
          sex: profile.household?.spouse?.sex || "",
          nationality: profile.household?.spouse?.nationality || "",
          address: {
            street: profile.household?.spouse?.address?.street || "",
            apt: profile.household?.spouse?.address?.apt || "",
            city: profile.household?.spouse?.address?.city || "",
            state: profile.household?.spouse?.address?.state || "",
            zip: profile.household?.spouse?.address?.zip || "",
          },
        },
        children: profile.household?.children || [
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
        adultDependents: profile.household?.adultDependents || [
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
    } else {
      fetchUserProfile();
    }
  }, [profile, fetchUserProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    if (keys.length === 2) {
      setFormData((prevState) => ({
        ...prevState,
        [keys[0]]: {
          ...prevState[keys[0]],
          [keys[1]]: value,
        },
      }));
    } else if (keys.length === 3) {
      setFormData((prevState) => ({
        ...prevState,
        [keys[0]]: {
          ...prevState[keys[0]],
          [keys[1]]: {
            ...prevState[keys[0]][keys[1]],
            [keys[2]]: value,
          },
        },
      }));
    } else if (keys.length === 4) {
      setFormData((prevState) => ({
        ...prevState,
        [keys[0]]: {
          ...prevState[keys[0]],
          [keys[1]]: {
            ...prevState[keys[0]][keys[1]],
            [keys[2]]: {
              ...prevState[keys[0]][keys[1]][keys[2]],
              [keys[3]]: value,
            },
          },
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleNestedChange = (e, index, key) => {
    const { name, value } = e.target;
    const nestedKey = name.split(".").pop();
    setFormData((prevState) => {
      const updatedArray = [...prevState[key]];
      updatedArray[index] = {
        ...updatedArray[index],
        [nestedKey]: value,
      };
      return {
        ...prevState,
        [key]: updatedArray,
      };
    });
  };

  const addArrayItem = (key) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: [
        ...prevState[key],
        key === "emergencyContact"
          ? {
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
            }
          : {
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

  const removeArrayItem = (index, key) => {
    setFormData((prevState) => {
      const updatedArray = [...prevState[key]];
      updatedArray.splice(index, 1);
      return {
        ...prevState,
        [key]: updatedArray,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
          zip: formData.zip,
        },
      };

      const memberUpdateFields = {
        maritalStatus: formData.maritalStatus,
        hometown: formData.hometown,
        nationality: formData.nationality,
        origin: formData.origin,
        employment: {
          company: formData.employment.company,
          jobTitle: formData.employment.jobTitle,
          workAddress: formData.employment.workAddress,
          workPhone: formData.employment.workPhone,
          workEmail: formData.employment.workEmail,
          employmentStatus: formData.employment.employmentStatus,
        },
        documents: {
          passport: {
            number: formData.documents.passportNumber,
            expirationDate: formData.documents.passportExpirationDate,
          },
          driverLicense: {
            number: formData.documents.driverLicenseNumber,
            expirationDate: formData.documents.driverLicenseExpirationDate,
            state: formData.documents.driverLicenseState,
          },
        },
        emergencyContact: formData.emergencyContact,
        address: {
          apt: formData.apt,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          zip: formData.zip,
        },
      };

      const householdUpdateFields = {
        spouse: formData.spouse,
        children: formData.children,
        adultDependents: formData.adultDependents,
      };
      // const householdUpdateFields = {
      //   spouse: {
      //     address: {
      //       street: formData.spouse.street,
      //       city: formData.spouse.city,
      //       state: formData.spouse.state,
      //       zip: formData.spouse.zip,
      //     },
      //   },
      //   children: formData.children.map((child) => ({
      //     address: {
      //       street: child.street,
      //       city: child.city,
      //       state: child.state,
      //       zip: child.zip,
      //     },
      //   })),
      //   adultDependents: formData.adultDependents.map((dependent) => ({
      //     address: {
      //       street: dependent.street,
      //       city: dependent.city,
      //       state: dependent.state,
      //       zip: dependent.zip,
      //     },
      //   })),
      // };
  

      await updateUserProfile(updateFields);
      await updateMemberProfile(memberUpdateFields);
      await updateHouseholdProfile(householdUpdateFields);

      navigate("/app/profile"); // Redirect to the profile page
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        {/* User fields */}
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Middle Name:
          <input
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Gender:
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Date of Birth:
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Street:
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          State:
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          ZIP Code:
          <input
            type="text"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
          />
        </label>

        {/* send  */}
        <br />
        {/* Member fields */}
        <label>
          Marital Status:
          <input
            type="text"
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Hometown:
          <input
            type="text"
            name="hometown"
            value={formData.hometown}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Nationality:
          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Origin:
          <input
            type="text"
            name="origin"
            value={formData.origin}
            onChange={handleChange}
          />
        </label>
        <br />
        {/* Employment fields */}
        <label>
          Company:
          <input
            type="text"
            name="employment.company"
            value={formData.employment.company}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Job Title:
          <input
            type="text"
            name="employment.jobTitle"
            value={formData.employment.jobTitle}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Work Address:
          <input
            type="text"
            name="employment.workAddress"
            value={formData.employment.workAddress}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Work Phone:
          <input
            type="tel"
            name="employment.workPhone"
            value={formData.employment.workPhone}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Work Email:
          <input
            type="email"
            name="employment.workEmail"
            value={formData.employment.workEmail}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Employment Status:
          <input
            type="text"
            name="employment.employmentStatus"
            value={formData.employment.employmentStatus}
            onChange={handleChange}
          />
        </label>
        <br />
        {/* Document fields */}
        <label>
          Passport Number:
          <input
            type="text"
            name="documents.passportNumber"
            value={formData.documents.passportNumber}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Passport Expiration Date:
          <input
            type="date"
            name="documents.passportExpirationDate"
            value={formData.documents.passportExpirationDate}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Driver's License Number:
          <input
            type="text"
            name="documents.driverLicenseNumber"
            value={formData.documents.driverLicenseNumber}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Driver's License Expiration Date:
          <input
            type="date"
            name="documents.driverLicenseExpirationDate"
            value={formData.documents.driverLicenseExpirationDate}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Driver's License State:
          <input
            type="text"
            name="documents.driverLicenseState"
            value={formData.documents.driverLicenseState}
            onChange={handleChange}
          />
        </label>
        <br />
        {/* Emergency contact */}
        {formData.emergencyContact.map((contact, index) => (
          <div key={index}>
            <h3>Emergency Contact {index + 1}</h3>
            <label>
              Relation:
              <input
                type="text"
                name={`emergencyContact.relation`}
                value={contact.relation}
                onChange={(e) =>
                  handleNestedChange(e, index, "emergencyContact")
                }
              />
            </label>
            <br />
            <label>
              Name:
              <input
                type="text"
                name={`emergencyContact.name`}
                value={contact.name}
                onChange={(e) =>
                  handleNestedChange(e, index, "emergencyContact")
                }
              />
            </label>
            <br />
            <label>
              Phone:
              <input
                type="tel"
                name={`emergencyContact.phone`}
                value={contact.phone}
                onChange={(e) =>
                  handleNestedChange(e, index, "emergencyContact")
                }
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                name={`emergencyContact.email`}
                value={contact.email}
                onChange={(e) =>
                  handleNestedChange(e, index, "emergencyContact")
                }
              />
            </label>
            <br />
            <label>
              Apartment:
              <input
                type="text"
                name={`emergencyContact.apt`}
                value={contact.apt}
                onChange={(e) =>
                  handleNestedChange(e, index, "emergencyContact")
                }
              />
            </label>
            <br />
            <label>
              Street:
              <input
                type="text"
                name={`emergencyContact.street`}
                value={contact.street}
                onChange={(e) =>
                  handleNestedChange(e, index, "emergencyContact")
                }
              />
            </label>
            <br />
            <label>
              City:
              <input
                type="text"
                name={`emergencyContact.city`}
                value={contact.city}
                onChange={(e) =>
                  handleNestedChange(e, index, "emergencyContact")
                }
              />
            </label>
            <br />
            <label>
              State:
              <input
                type="text"
                name={`emergencyContact.state`}
                value={contact.state}
                onChange={(e) =>
                  handleNestedChange(e, index, "emergencyContact")
                }
              />
            </label>
            <br />
            <label>
              Country:
              <input
                type="text"
                name={`emergencyContact.country`}
                value={contact.country}
                onChange={(e) =>
                  handleNestedChange(e, index, "emergencyContact")
                }
              />
            </label>
            <br />
            <label>
              ZIP Code:
              <input
                type="text"
                name={`emergencyContact.zip`}
                value={contact.zip}
                onChange={(e) =>
                  handleNestedChange(e, index, "emergencyContact")
                }
              />
            </label>
            <br />
            <button
              type="button"
              onClick={() => removeArrayItem(index, "emergencyContact")}
            >
              Remove Emergency Contact
            </button>
            <br />
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem("emergencyContact")}>
          Add Emergency Contact
        </button>
        <br />
        {/* Household fields */}
        <label>
          Apartment:
          <input
            type="text"
            name="apt"
            value={formData.apt}
            onChange={handleChange}
          />
        </label>
        {/* just a normal comment  */}
        <br />
        <label>
          Country:
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Street:
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          State:
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          ZIP Code:
          <input
            type="text"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
          />
        </label>
        <br />
        {/* Spouse fields */}
        <label>
          Spouse First Name:
          <input
            type="text"
            name="spouse.firstName"
            value={formData.spouse.firstName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Spouse Last Name:
          <input
            type="text"
            name="spouse.lastName"
            value={formData.spouse.lastName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Spouse Email:
          <input
            type="email"
            name="spouse.email"
            value={formData.spouse.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Spouse Birthdate:
          <input
            type="date"
            name="spouse.birthdate"
            value={formData.spouse.birthdate}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Spouse Sex:
          <input
            type="text"
            name="spouse.sex"
            value={formData.spouse.sex}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Spouse Nationality:
          <input
            type="text"
            name="spouse.nationality"
            value={formData.spouse.nationality}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Spouse Street:
          <input
            type="text"
            name="spouse.street"
            value={formData.spouse.street}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Spouse Apartment:
          <input
            type="text"
            name="spouse.apt"
            value={formData.spouse.apt}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Spouse City:
          <input
            type="text"
            name="spouse.city"
            value={formData.spouse.city}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Spouse State:
          <input
            type="text"
            name="spouse.state"
            value={formData.spouse.state}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Spouse ZIP Code:
          <input
            type="text"
            name="spouse.zip"
            value={formData.spouse.zip}
            onChange={handleChange}
          />
        </label>
        <br />
        {/* Children fields */}
        {formData.children.map((child, index) => (
          <div key={index}>
            <h3>Child {index + 1}</h3>
            <label>
              First Name:
              <input
                type="text"
                name={`children.firstName`}
                value={child.firstName}
                onChange={(e) => handleNestedChange(e, index, "children")}
              />
            </label>
            <br />
            <label>
              Last Name:
              <input
                type="text"
                name={`children.lastName`}
                value={child.lastName}
                onChange={(e) => handleNestedChange(e, index, "children")}
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                name={`children.email`}
                value={child.email}
                onChange={(e) => handleNestedChange(e, index, "children")}
              />
            </label>
            <br />
            <label>
              Birthdate:
              <input
                type="date"
                name={`children.birthdate`}
                value={child.birthdate}
                onChange={(e) => handleNestedChange(e, index, "children")}
              />
            </label>
            <br />
            <label>
              Sex:
              <input
                type="text"
                name={`children.sex`}
                value={child.sex}
                onChange={(e) => handleNestedChange(e, index, "children")}
              />
            </label>
            <br />
            <label>
              Nationality:
              <input
                type="text"
                name={`children.nationality`}
                value={child.nationality}
                onChange={(e) => handleNestedChange(e, index, "children")}
              />
            </label>
            <br />
            <label>
              Street:
              <input
                type="text"
                name={`children.street`}
                value={child.street}
                onChange={(e) => handleNestedChange(e, index, "children")}
              />
            </label>
            <br />
            <label>
              Apartment:
              <input
                type="text"
                name={`children.apt`}
                value={child.apt}
                onChange={(e) => handleNestedChange(e, index, "children")}
              />
            </label>
            <br />
            <label>
              City:
              <input
                type="text"
                name={`children.city`}
                value={child.city}
                onChange={(e) => handleNestedChange(e, index, "children")}
              />
            </label>
            <br />
            <label>
              State:
              <input
                type="text"
                name={`children.state`}
                value={child.state}
                onChange={(e) => handleNestedChange(e, index, "children")}
              />
            </label>
            <br />
            <label>
              ZIP Code:
              <input
                type="text"
                name={`children.zip`}
                value={child.zip}
                onChange={(e) => handleNestedChange(e, index, "children")}
              />
            </label>
            <br />
            <button
              type="button"
              onClick={() => removeArrayItem(index, "children")}
            >
              Remove Child
            </button>
            <br />
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem("children")}>
          Add Child
        </button>
        <br />
        {/* Adult Dependents fields */}
        {formData.adultDependents.map((adult, index) => (
          <div key={index}>
            <h3>Adult Dependent {index + 1}</h3>
            <label>
              First Name:
              <input
                type="text"
                name={`adultDependents.firstName`}
                value={adult.firstName}
                onChange={(e) =>
                  handleNestedChange(e, index, "adultDependents")
                }
              />
            </label>
            <br />
            <label>
              Last Name:
              <input
                type="text"
                name={`adultDependents.lastName`}
                value={adult.lastName}
                onChange={(e) =>
                  handleNestedChange(e, index, "adultDependents")
                }
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                name={`adultDependents.email`}
                value={adult.email}
                onChange={(e) =>
                  handleNestedChange(e, index, "adultDependents")
                }
              />
            </label>
            <br />
            <label>
              Birthdate:
              <input
                type="date"
                name={`adultDependents.birthdate`}
                value={adult.birthdate}
                onChange={(e) =>
                  handleNestedChange(e, index, "adultDependents")
                }
              />
            </label>
            <br />
            <label>
              Sex:
              <input
                type="text"
                name={`adultDependents.sex`}
                value={adult.sex}
                onChange={(e) =>
                  handleNestedChange(e, index, "adultDependents")
                }
              />
            </label>
            <br />
            <label>
              Nationality:
              <input
                type="text"
                name={`adultDependents.nationality`}
                value={adult.nationality}
                onChange={(e) =>
                  handleNestedChange(e, index, "adultDependents")
                }
              />
            </label>
            <br />
            <label>
              Street:
              <input
                type="text"
                name={`adultDependents.street`}
                value={adult.street}
                onChange={(e) =>
                  handleNestedChange(e, index, "adultDependents")
                }
              />
            </label>
            <br />
            <label>
              Apartment:
              <input
                type="text"
                name={`adultDependents.apt`}
                value={adult.apt}
                onChange={(e) =>
                  handleNestedChange(e, index, "adultDependents")
                }
              />
            </label>
            <br />
            <label>
              City:
              <input
                type="text"
                name={`adultDependents.city`}
                value={adult.city}
                onChange={(e) =>
                  handleNestedChange(e, index, "adultDependents")
                }
              />
            </label>
            <br />
            <label>
              State:
              <input
                type="text"
                name={`adultDependents.state`}
                value={adult.state}
                onChange={(e) =>
                  handleNestedChange(e, index, "adultDependents")
                }
              />
            </label>
            <br />
            <label>
              ZIP Code:
              <input
                type="text"
                name={`adultDependents.zip`}
                value={adult.zip}
                onChange={(e) =>
                  handleNestedChange(e, index, "adultDependents")
                }
              />
            </label>
            <br />
            <button
              type="button"
              onClick={() => removeArrayItem(index, "adultDependents")}
            >
              Remove Adult Dependent
            </button>
            <br />
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem("adultDependents")}>
          Add Adult Dependent
        </button>
        <br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditMember;

