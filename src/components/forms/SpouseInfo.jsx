// SpouseInfo.jsx
import React, { useState } from "react";
import styles from "./RegistrationForm.module.css";

const SpouseInfo = ({ nextStep, prevStep, handleChange, formData }) => {
  const [spouse, setSpouse] = useState(formData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSpouse({ ...spouse, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleChange({ spouse });
    nextStep();
  };

  return (
    <div className={styles.modalContent}>
      <h3>Spouse Information(if married)</h3>
      <form onSubmit={handleSubmit}>
        <div className={`${styles.formRow} ${styles.twoEqualCol}`}>
          <div>
            <label className={styles.label}>First Name:</label>
            <input
              type="text"
              name="spouseFirstName"
              value={spouse.spouseFirstName || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className={styles.label}>Last Name:</label>
            <input
              type="text"
              name="spouseLastName"
              value={spouse.spouseLastName || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={`${styles.formRow} ${styles.threeColumns}`}>
          <div>
            <label className={styles.label}>Date of birth:</label>
            <input
              type="text"
              name="spouseDob"
              value={spouse.spouseDob || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className={styles.label}>Sex:</label>
            <select
              className={styles.formControl}
              name="spouseSex"
              value={spouse.spouseSex || ""}
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
          <div>
            <label className={styles.label}>Nationality:</label>
            <input
              type="text"
              name="spouseNationality"
              value={spouse.spouseNationality || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={`${styles.formRow} ${styles.twoEqualCol}`}>
          <div>
            <label className={styles.label}>Phone:</label>
            <input
              type="text"
              name="spousePhone"
              value={spouse.spousePhone || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className={styles.label}>Email:</label>
            <input
              type="email"
              name="spouseEmail"
              value={spouse.spouseEmail || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <p>Address if not living together</p>
        <div className={`${styles.formRow} ${styles.twoSmallLastCol}`}>
          <div>
            <label className={styles.label}>Street:</label>
            <input
              type="text"
              name="spouseStreet"
              value={spouse.spouseStreet || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className={styles.label}>Apt/Unit:</label>
            <input
              type="text"
              name="spouseApt"
              value={spouse.spouseApt || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={`${styles.formRow} ${styles.threeColTwoSmall}`}>
          <div>
            <label className={styles.label}>City:</label>
            <input
              type="text"
              name="spouseCity"
              value={spouse.spouseCity || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className={styles.label}>State:</label>
            <input
              type="text"
              name="spouseState"
              value={spouse.spouseState || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className={styles.label}>Zip:</label>
            <input
              type="text"
              name="spouseZip"
              value={spouse.spouseZip || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* Add other spouse info fields here */}
        <div className={styles.addNavBtnContainer}>
          <button
            type="button"
            className={styles.formNavBtn}
            onClick={prevStep}
          >
            Back
          </button>
          <button
            type="submit"
            // onClick={nextStep}
            className={styles.formNavBtn}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default SpouseInfo;
