// PersonalInfo.jsx
import React, { useState } from "react";

import styles from "./RegistrationForm.module.css";

const PersonalInfo = ({ nextStep, handleChange, formData }) => {
  const [customers, setCustomers] = useState(formData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomers({ ...customers, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleChange({ customers });
    nextStep();
  };

  return (
    <div className={`${styles.modalContent} ${styles.registrationForm}`}>
      <h3>Personal Information</h3>
      <form onSubmit={handleSubmit}>
        <div className={`${styles.formRow} ${styles.threeColumns}`}>
          <div>
            <label className={styles.label}>Category:</label>
            <select
              className={styles.formControl}
              name="category"
              value={customers.category || ""}
              onChange={handleInputChange}
            >
              {" "}
              {/* Default option */}
              <option value="">Select an option</option>
              {/* Dropdown options */}
              <option value="1">Single</option>
              <option value="3">Single Family</option>
              <option value="2">Family</option>
              <option value="4">Retired</option>
            </select>
          </div>
        </div>
        <div className={`${styles.formRow} ${styles.threeColumns}`}>
          <div>
            <label className={styles.label}>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={customers.firstName || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className={styles.label}>Middle Name:</label>
            <input
              type="text"
              name="middleName"
              value={customers.middleName || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className={styles.label}>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={customers.lastName || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className={`${styles.formRow} ${styles.fourSmallCol}`}>
          <div>
            <label className={styles.label}>Date of Birth:</label>
            <input
              type="text"
              name="dob"
              value={customers.dob || ""}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className={styles.label}>Sex:</label>
            <select
              className={styles.formControl}
              name="sex"
              value={customers.sex || ""}
              onChange={handleInputChange}
            >
              {" "}
              {/* Default option */}
              <option value="">Select</option>
              {/* Dropdown options */}
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
        </div>

        <div className={`${styles.formRow} ${styles.threeColumns}`}>
          <div>
            <label className={styles.label}>Marital Status:</label>
            <input
              type="text"
              name="maritalStatus"
              value={customers.maritalStatus || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className={styles.label}>Origin:</label>
            <input
              type="text"
              name="hometown"
              value={customers.hometown || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className={styles.label}>Nationality:</label>
            <input
              type="text"
              name="nationality"
              value={customers.nationality || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Add other personal info fields here */}
        <div className={styles.nextButton}>
          <button
            type="submit"
            // onClick={nextStep}
            className={`${styles.formNavBtn} ${styles.firstNaBtn}`}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;
