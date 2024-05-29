import React, { useState } from "react";

import styles from "./RegistrationForm.module.css";

const options = [
  { data: "", label: "Select" },
  { data: "mother", label: "Mother" },
  { data: "father", label: "Father" },
  { data: "son", label: "Son" },
  { data: "daughter", label: "Daughter" },
  { data: "brother", label: "Brother" },
  { data: "sister", label: "Sister" },
  { data: "nephew", label: "Nephew" },
  { data: "niece", label: "Niece" },
  { data: "cousin", label: "Cousin" },
  { data: "uncle", label: "Uncle" },
  { data: "aunt", label: "Aunt" },
  { data: "grandMother", label: "Grand Mother" },
  { data: "grandFather", label: "Grand Father" },
  { data: "motherInlaw", label: "Mother-Inlaw" },
  { data: "fatherInnlaw", label: "Father-Inlaw" },
  { data: "brotherInnlaw", label: "Brother-Inlaw" },
  { data: "sisterInnlaw", label: "Sister-Inlaw" },
];

const DependentsInfo = ({ nextStep, prevStep, handleChange, formData }) => {
  const [dependents, setDependents] = useState(formData);

  // const [additionalInputValue, setAdditionalInputValue] = useState("");

  const handleInputChange = (index, fieldName, value) => {
    const newDependents = [...dependents];
    newDependents[index][fieldName] = value;
    setDependents(newDependents);
  };

  const handleAddDependent = () => {
    setDependents([
      ...dependents,
      {
        dependentName: "",
        dependentSex: "",
        dependentDob: "",
        liveTogether: "",
      },
    ]);
  };

  const handleRemoveDependent = (index) => {
    const newDependents = [...dependents];
    newDependents.splice(index, 1);
    setDependents(newDependents);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleChange({ dependents });

    // console.log(dependents);
    nextStep();
  };

  return (
    <div className={`${styles.modalContent} ${styles.registrationForm}`}>
      <h3>Dependents Information</h3>
      <form onSubmit={handleSubmit}>
        {dependents.map((dependent, index) => (
          <div key={index}>
            <div
              className={`${styles.formRow} ${styles.twoUnequalCol} ${styles.dependentForm}`}
            >
              <div>
                <label className={styles.label}>Dependent Name:</label>
                <input
                  type="text"
                  value={dependent.dependentName || ""}
                  onChange={(e) =>
                    handleInputChange(index, "dependentName", e.target.value)
                  }
                />
              </div>
              <div>
                <label htmlFor="dependentApt" className={styles.label}>
                  Relationship:
                </label>
                <select
                  id="dependentApt"
                  className={styles.formControl}
                  name="dependentRelation"
                  value={dependent.dependentRelation || ""}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "dependentRelation",
                      e.target.value
                    )
                  }
                >
                  {options.map((option, index) => (
                    <option key={index} value={option.data}>
                      {option.label}
                    </option>
                  ))}{" "}
                </select>
              </div>
            </div>
            {/*  */}
            <div
              className={`${styles.formRow} ${styles.threeColumns} ${styles.dependentForm}`}
            >
              <div>
                <label className={styles.label}>Date of Birth:</label>
                <input
                  type="text"
                  value={dependent.dependentDob || ""}
                  onChange={(e) =>
                    handleInputChange(index, "dependentDob", e.target.value)
                  }
                />
              </div>

              <div>
                <label className={styles.label}>Sex:</label>
                <select
                  className={styles.formControl}
                  name="dependentSex"
                  value={dependent.dependentSex || ""}
                  onChange={(e) =>
                    handleInputChange(index, "dependentSex", e.target.value)
                  }
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
                <label className={styles.label}>Live with you?:</label>
                <select
                  className={styles.formControl}
                  name="liveTogether"
                  value={dependent.liveTogether || ""}
                  onChange={(e) =>
                    handleInputChange(index, "liveTogether", e.target.value)
                  }
                >
                  {" "}
                  {/* Default option */}
                  <option value="">Select</option>
                  {/* Dropdown options */}
                  <option value="Y">Yes</option>
                  <option value="N">No</option>
                </select>
              </div>
            </div>
            {dependent.liveTogether === "N" && (
              <div>
                <p className="pt-4">Enter address</p>
                <div
                  className={`${styles.formRow} ${styles.twoUnequalCol} ${styles.dependentForm}`}
                >
                  <div>
                    <label className={styles.label}>Street:</label>
                    <input
                      type="text"
                      value={dependent.dependentStreet || ""}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "dependentStreet",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="dependentApt" className={styles.label}>
                      Apartment:
                    </label>
                    <input
                      id="dependentApt"
                      className={styles.formControl}
                      name="dependentApt"
                      value={dependent.dependentApt || ""}
                      onChange={(e) =>
                        handleInputChange(index, "dependentApt", e.target.value)
                      }
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
                      value={dependent.dependentCity || ""}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "dependentCity",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div>
                    <label className={styles.label}>State:</label>
                    <input
                      className={styles.formControl}
                      name="dependentState"
                      value={dependent.dependentState || ""}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "dependentState",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div>
                    <label className={styles.label}>Zip code:</label>
                    <input
                      type="text"
                      value={dependent.dependentZip || ""}
                      onChange={(e) =>
                        handleInputChange(index, "dependentZip", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            )}
            {/* Add other dependent info fields here */}
            <button
              type="button"
              onClick={() => handleRemoveDependent(index)}
              className={styles.formRemoveDependentBtn}
            >
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddDependent}
          className={styles.formAddDependentBtn}
        >
          Add
        </button>
        {/* Add other spouse info fields here */}
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

export default DependentsInfo;
