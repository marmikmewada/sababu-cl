// ContactInfo.jsx
import React, { useState } from "react";
import styles from "./RegistrationForm.module.css";

const ContactInfo = ({ nextStep, prevStep, handleChange, formData }) => {
  const [contacts, setContacts] = useState(formData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContacts({ ...contacts, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleChange({ contacts });
    nextStep();
  };

  return (
    <div className={styles.modalContent}>
      <h3>Contact Information</h3>
      <form onSubmit={handleSubmit}>
        <div className={`${styles.formRow} ${styles.twoEqualCol}`}>
          <div>
            <label className={styles.label}>Phone:</label>
            <input
              type="phone"
              name="phone"
              value={contacts.phone || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className={styles.label}>Email:</label>
            <input
              type="email"
              name="email"
              value={contacts.email || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={`${styles.formRow} ${styles.twoSmallLastCol}`}>
          <div>
            <label className={styles.label}>Address:</label>
            <input
              type="text"
              name="street"
              value={contacts.street || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className={styles.label}>Apt/Unit:</label>
            <input
              type="apt"
              name="apt"
              value={contacts.apt || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={`${styles.formRow} ${styles.threeColTwoSmall}`}>
          <div>
            <label className={styles.label}>City:</label>
            <input
              type="text"
              name="city"
              value={contacts.city || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className={styles.label}>State:</label>
            <input
              type="state"
              name="state"
              value={contacts.state || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className={styles.label}>Zip:</label>
            <input
              type="zip"
              name="zip"
              value={contacts.zip || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* Add other contact info fields here */}
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

export default ContactInfo;
