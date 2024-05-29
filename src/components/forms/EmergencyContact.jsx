// EmergencyContact.jsx
import React, { useState } from "react";

import styles from "./RegistrationForm.module.css";

const EmergencyContact = ({ nextStep, prevStep, handleChange, formData }) => {
  const [reference, setReference] = useState(formData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReference({ ...reference, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleChange({ reference });
    nextStep();
  };

  return (
    <div className={styles.modalContect}>
      <h3>Emergency Contact Information</h3>
      <form onSubmit={handleSubmit}>
        <div className={`${styles.formRow} ${styles.threeColTwoSmall}`}>
          <div>
            <label className={styles.label}>Name:</label>
            <input
              type="text"
              name="emrName"
              value={reference.emrName || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className={styles.label}>Relationship:</label>
            <select
              className={styles.formControl}
              name="emrRelation"
              value={reference.emrRelation || ""}
              onChange={handleInputChange}
            >
              {/* Default option */}
              <option value="">Select</option>
              <option value="mother">Mother</option>
              <option value="father">Father</option>
              <option value="spouse">Spouse</option>
              <option value="son">Son</option>
              <option value="daughter">Daughter</option>
              <option value="brother">Brother</option>
              <option value="sister">Sister</option>
              <option value="cousin">Cousin</option>
              <option value="nephew">Newphew</option>
              <option value="niece">Niece</option>
              <option value="uncle">Uncle</option>
              <option value="aunt">Aunt</option>
              <option value="grandMother">Grand Mother</option>
              <option value="grandFather">Grand Father</option>
              <option value="motherInlaw">Mother Inlaw</option>
              <option value="fatherInlaw">Father Inlaw</option>
            </select>
          </div>
          <div>
            <label className={styles.label}>Live with you?:</label>
            <select
              className={styles.formControl}
              name="liveTogether"
              value={reference.liveTogether || ""}
              onChange={handleInputChange}
            >
              {/* Default option */}
              <option value="">Select</option>
              <option value="Y">Yes</option>
              <option value="N">No</option>
            </select>
          </div>
        </div>

        {reference.liveTogether === "N" && (
          <div>
            <p className="pt-4">Enter address</p>
            <div
              className={`${styles.formRow} ${styles.twoUnequalCol} ${styles.dependentForm}`}
            >
              <div>
                <label className={styles.label}>Street:</label>
                <input
                  type="text"
                  name="emrStreet"
                  value={reference.emrStreet || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className={styles.label}>Apartment:</label>
                <input
                  type="text"
                  name="emrApt"
                  value={reference.emrApt || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {/*  */}
            <div
              className={`${styles.formRow} ${styles.threeCol} ${styles.dependentForm}`}
            >
              <div>
                <label className={styles.label}>City:</label>
                <input
                  type="text"
                  name="emrCity"
                  value={reference.emrCity || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className={styles.label}>State:</label>
                <input
                  className={styles.formControl}
                  name="emrState"
                  value={reference.emrState || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className={styles.label}>Zip code:</label>
                <input
                  type="text"
                  name="emrZip"
                  value={reference.emrZip || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        )}

        <div className={`${styles.formRow} ${styles.threeColumns}`}>
          <div>
            <label className={styles.label}>Sex:</label>
            <select
              className={styles.formControl}
              name="emrSex"
              value={reference.emrSex || ""}
              onChange={handleInputChange}
            >
              {/* Default option */}
              <option value="">Select</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
          <div>
            <label className={styles.label}>Phone:</label>
            <input
              type="phone"
              name="emrPhone"
              value={reference.emrPhone || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className={styles.label}>Email:</label>
            <input
              type="email"
              name="emrEmail"
              value={reference.emrEmail || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* Add other emergency contact info fields here */}
        <div className={styles.addNavBtnContainer}>
          <button
            type="button"
            className={styles.formNavBtn}
            onClick={prevStep}
          >
            Back
          </button>
          <button type="submit" className={styles.formNavBtn}>
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmergencyContact;
