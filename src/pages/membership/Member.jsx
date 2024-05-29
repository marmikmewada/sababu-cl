import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMembers } from "../../components/contexts/MemberContext";

import Button from "../../components/Button";
import Loading from "../../components/Loading";
import supabase from "../../../supabase";

import styles from "./Member.module.css";

const Member = () => {
  const { id } = useParams();
  const { editMember } = useMembers();
  const [loading, setIsLoading] = useState(false);
  const [selectedMember, setSelectedMember] = useState({});
  const [formData, setFormData] = useState(selectedMember);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(id);
    async function getMember() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("members")
          .select(`*, contacts(*), dependents(*), reference(*), spouse(*)`)
          .eq("id", id);

        if (error) throw error;

        if (data && data.length > 0) {
          setSelectedMember(data[0]);
        } else {
          setSelectedMember({});
        }
      } catch (error) {
        console.error("Error fetching selected member: ", error.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      getMember();
    }
  }, [id]);

  useEffect(() => {
    // Update formData whenever selectedMember changes
    setFormData(selectedMember);
  }, [selectedMember]);

  const handleDelete = () => {
    // Implement delete functionality
  };

  if (loading || !selectedMember) {
    return <Loading />;
  }

  return (
    <div>
      <div className={styles.headerSection}>
        <h1 className={`${"headingTertiary"}`}>Member ID: {String(id)}</h1>
        <div className={styles.deleteMemberBtn}>
          <Button type="back" onClick={() => navigate(-1)}>
            <i class="fa-solid fa-chevron-left"></i>
          </Button>
          <Button type="delete" onClick={handleDelete}>
            <i class="fa-regular fa-trash-can"></i>
          </Button>
        </div>
      </div>

      <div className={styles.selectedCustomerContainer}>
        <PersonalInfo
          formData={formData}
          setFormData={setFormData}
          selectedId={id}
          editMember={editMember}
          // editSelectedCustomer={editMember}
        />
        <Address
          formData={formData}
          setFormData={setFormData}
          selectedId={id}
          // editCustomer={editCustomer}
        />
        <EmergencyContact
          formData={formData}
          setFormData={setFormData}
          selectedId={id}
          // editCustomer={editCustomer}
        />
        <Spouse
          formData={formData}
          setFormData={setFormData}
          selectedId={id}
          // editCustomer={editCustomer}
        />
        <Dependents
          formData={formData}
          setFormData={setFormData}
          selectedId={id}
          // editCustomer={editCustomer}
        />
      </div>
    </div>
  );
};

export default Member;

const PersonalInfo = ({ formData, setFormData, selectedId, editMember }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isModified, setIsModified] = useState(false);

  // console.log(formData);
  //
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setIsModified(true);
  };

  //
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setIsModified(false);
  };

  //
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isModified) {
      const {
        id,
        first_name,
        middle_name,
        last_name,
        dob,
        gender,
        hometown,
        nationality,
      } = formData;

      const member = {
        id,
        first_name,
        middle_name,
        last_name,
        dob,
        gender,
        hometown,
        nationality,
      };

      const updatedData = { ...formData, member };
      console.log(updatedData);

      editMember(selectedId, updatedData);
      // Handle form submission, e.g., update the data on the server
      console.log("Form submitted with data:", formData);
      // After submitting, exit edit mode
    }
    setIsEditing(false);
  };

  return (
    <div className={styles.selectedMember}>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <h2>Personal Information</h2>
          <div className={styles.formControlRow}>
            <div className={styles.fourColumn}>
              <div>
                <label htmlFor="category">Member Type:</label>

                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData?.category || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className={styles.threeColumn}>
              <div>
                <label htmlFor="first_name">First Name:</label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData?.first_name || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="middle_name">Middle Name:</label>
                <input
                  type="text"
                  id="middle_name"
                  name="middle_name"
                  value={formData?.middle_name || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="last_name">Last Name:</label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData?.last_name || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className={styles.fourColumn}>
              <div>
                <label htmlFor="gender">Gender:</label>
                <input
                  type="text"
                  id="gender"
                  name="gender"
                  value={formData?.gender || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="dob">Date of birth:</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData?.dob || ""}
                  onChange={handleInputChange}
                />
              </div>
              {/* <div>
                <label htmlFor="marital_status">Marital Status:</label>
                <input
                  type="text"
                  id="marital_status"
                  name="marital_status"
                  value={formData?.marital_status || ""}
                  onChange={handleInputChange}
                />
              </div> */}
            </div>

            <div className={styles.twoColumn}>
              <div>
                <label htmlFor="hometown">Home town:</label>
                <input
                  type="text"
                  id="hometown"
                  name="hometown"
                  value={formData?.hometown || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="name">Nationality:</label>
                <input
                  type="text"
                  id="nationality"
                  name="nationality"
                  value={formData?.nationality || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className={styles.btnContainer}>
              <Button type="memberBtnOutline" onClick={handleEditToggle}>
                Cancel
              </Button>
              <Button
                type="memberBtn"
                onClick={handleSubmit}
                disabled={!isModified}
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <div>
          <h2 className="pb-3">Personal Information</h2>
          <div className={styles.selectedMemberDetails}>
            <div className={styles.sectionCol}>
              <div>
                <p>
                  Category:
                  <span>
                    {formData.category === 1
                      ? "Single"
                      : formData.category === 4
                      ? "Senior Citizen"
                      : formData.category === 2
                      ? "Family"
                      : formData.category === 3
                      ? "Single Family"
                      : "" || ""}
                  </span>
                </p>
              </div>
              <div>
                <p>
                  First Name: <span>{formData.first_name || ""}</span>
                </p>
                <p>
                  Middle Name: <span>{formData.middle_name || ""}</span>
                </p>
                <p>
                  Last Name: <span>{formData.last_name || ""}</span>
                </p>
              </div>
            </div>
            <div className={styles.sectionCol}>
              <div>
                <p>
                  Date of Birth: <span>{formData?.dob || ""}</span>
                </p>
                <p>
                  Gender: <span>{formData?.gender || ""}</span>
                </p>
              </div>
              <div>
                <p>
                  Home Town: <span>{formData?.hometown || ""}</span>
                </p>
                <p>
                  Nationality: <span>{formData?.nationality || ""}</span>
                </p>
              </div>
            </div>
          </div>
          <div className={styles.btnContainer}>
            <Button type="memberBtnOutline" onClick={handleEditToggle}>
              Edit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

//
const Address = ({ formData, setFormData, selectedId, editCustomer }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isModified, setIsModified] = useState(false);

  //
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedContacts = [...formData.contacts]; // Create a copy of the contacts array
    updatedContacts[index] = { ...updatedContacts[index], [name]: value }; // Update the specific contact object

    setFormData((prevFormData) => ({
      ...prevFormData,
      contacts: updatedContacts, // Update the contacts array in the formData state
    }));
    setIsModified(true);
  };

  //
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setIsModified(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isModified) {
      // Handle form submission, e.g., update the data on the server
      console.log("Form submitted with data:", formData);
      // After submitting, exit edit mode
      editCustomer(Number(selectedId), formData);
      setIsEditing(false);
    }
  };

  return (
    <div className={styles.selectedMember}>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <h2>Address and Contacts</h2>
          {formData.contacts.map((contact, index) => (
            <div key={index} className={styles.formControlRow}>
              <div className={`${styles.twoColumn} `}>
                <div>
                  <label htmlFor="phone">Phone:</label>
                  <input
                    type="phone"
                    id="phone"
                    name="phone"
                    value={contact.phone || ""}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </div>
                <div>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={contact.email || ""}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </div>
              </div>
              <div className={styles.twoColumnOneSmall}>
                <div>
                  <label htmlFor="street">Street:</label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    value={contact.street || ""}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </div>
                <div>
                  <label htmlFor="apt">Apartment:</label>
                  <input
                    type="text"
                    id="apt"
                    name="apt"
                    value={contact?.apt || ""}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </div>
              </div>
              <div className={styles.threeColumnLastOneSmall}>
                <div>
                  <label htmlFor="city">City:</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={contact?.city || ""}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </div>
                <div>
                  <label htmlFor="state">State:</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={contact?.state || ""}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </div>
                <div>
                  <label htmlFor="zip">Zip:</label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    value={contact?.zip || ""}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </div>
              </div>
            </div>
          ))}
          <div className={styles.btnContainer}>
            <Button type="memberBtnOutline" onClick={handleEditToggle}>
              Cancel
            </Button>
            <Button
              type="memberBtn"
              onClick={handleSubmit}
              disabled={!isModified}
            >
              Save
            </Button>
          </div>
        </form>
      ) : (
        <div>
          <h2 className="pb-3">Address and Contact</h2>
          {Array.isArray(formData.contacts) && formData.contacts.length > 0 ? (
            formData.contacts.map((contact, index) => (
              <div key={index}>
                <div className={styles.sectionCol}>
                  <div>
                    <p>
                      Phone: <span>{contact?.phone || ""}</span>
                    </p>
                    <p>
                      Email: <span>{contact?.email || ""}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Street: <span>{contact?.street || ""}</span>{" "}
                    </p>
                    <p>
                      Apartment: <span>{contact?.apt || ""}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      City: <span>{contact?.city || ""}</span>
                    </p>
                    <p>
                      State: <span>{contact?.state || ""}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Zip Code: <span>{contact?.zip || ""}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No contact</p>
          )}
          <div className={styles.btnContainer}>
            <Button type="memberBtnOutline" onClick={handleEditToggle}>
              Edit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

//
const EmergencyContact = ({
  formData,
  setFormData,
  selectedId,
  editCustomer,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isModified, setIsModified] = useState(false);

  //
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedReference = [...formData.reference]; // Create a copy of the contacts array
    updatedReference[index] = { ...updatedReference[index], [name]: value }; // Update the specific contact object

    setFormData((prevFormData) => ({
      ...prevFormData,
      reference: updatedReference, // Update the contacts array in the formData state
    }));
    setIsModified(true);
  };

  //
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setIsModified(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isModified) {
      // Handle form submission, e.g., update the data on the server
      console.log("Form submitted with data:", formData);
      // After submitting, exit edit mode
      editCustomer(Number(selectedId), formData);
      setIsEditing(false);
    }
  };

  return (
    <div className={styles.selectedMember}>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <h2>Emergency Reference</h2>
          {Array.isArray(formData.reference) &&
          formData.reference.length > 0 ? (
            formData.reference.map((ref, index) => (
              <div key={index} className={styles.formControlRow}>
                <div className={styles.twoColumnOneSmall}>
                  <div>
                    <label htmlFor="name">Emergency Contatct:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={ref.name || ""}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">Phone:</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={ref.phone}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </div>
                </div>
                <div className={styles.threeColumnLastOneSmall}>
                  <div>
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={ref.email}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </div>
                  <div>
                    <label htmlFor="relation">Relationship:</label>
                    <input
                      type="text"
                      id="relation"
                      name="relation"
                      value={ref.relation}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </div>
                  <div>
                    <label htmlFor="gender">Gender:</label>
                    <input
                      type="text"
                      id="gender"
                      name="gender"
                      value={ref.gender}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </div>
                  <div>
                    <label className={styles.label}>Live with you?:</label>
                    <select
                      className={styles.formControl}
                      name="liveTogether"
                      value={ref.liveTogether || ""}
                      onChange={(e) => handleInputChange(e, index)}
                    >
                      {/* Default option */}
                      <option value="">Select</option>
                      <option value="Y">Yes</option>
                      <option value="N">No</option>
                    </select>
                  </div>
                </div>
                {ref.liveTogether === "N" && (
                  <div>
                    <h4>Address</h4>
                    <div className={styles.twoColumnOneSmall}>
                      <div>
                        <label htmlFor="street">Street:</label>
                        <input
                          type="text"
                          id="street"
                          name="street"
                          value={ref?.street || ""}
                          onChange={(e) => handleInputChange(e, index)}
                        />
                      </div>
                      <div>
                        <label htmlFor="apt">Apartment:</label>
                        <input
                          type="text"
                          id="apt"
                          name="apt"
                          value={ref?.apt || ""}
                          onChange={(e) => handleInputChange(e, index)}
                        />
                      </div>
                    </div>

                    <div className={styles.threeColumn}>
                      <div>
                        <label htmlFor="city">City:</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={ref?.city || ""}
                          onChange={(e) => handleInputChange(e, index)}
                        />
                      </div>
                      <div>
                        <label htmlFor="state">State:</label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={ref?.state || ""}
                          onChange={(e) => handleInputChange(e, index)}
                        />
                      </div>
                      <div>
                        <label htmlFor="zip">Zip:</label>
                        <input
                          type="text"
                          id="zip"
                          name="zip"
                          value={ref?.zip || ""}
                          onChange={(e) => handleInputChange(e, index)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No emergency contact available</p>
          )}
          <div className={styles.btnContainer}>
            <Button type="memberBtnOutline" onClick={handleEditToggle}>
              Cancel
            </Button>
            <Button
              type="memberBtn"
              onClick={handleSubmit}
              disabled={!isModified}
            >
              Save
            </Button>
          </div>
        </form>
      ) : (
        <div>
          <h2 className="pb-3">Emergency Contact Details</h2>
          {Array.isArray(formData.reference) &&
          formData.reference.length > 0 ? (
            formData.reference.map((ref, index) => (
              <div key={index}>
                <div className={styles.sectionCol}>
                  <div>
                    <p>
                      Name: <span>{ref?.name || ""}</span>{" "}
                    </p>
                    <p>
                      Relationship: <span>{ref?.relation || ""}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Gender: <span>{ref?.gender || ""}</span>
                    </p>
                    <p>
                      Phone: <span>{ref?.phone || ""}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Email: <span>{ref?.email || ""}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Live together: <span>{ref?.live_together || ""}</span>
                    </p>
                  </div>
                </div>
                {ref.live_together === "N" && (
                  <div className={styles.sectionCol}>
                    <div>
                      <p>
                        Street: <span>{ref?.street || ""}</span>{" "}
                      </p>
                      <p>
                        Apartment: <span>{ref?.apt || ""}</span>
                      </p>
                    </div>
                    <div>
                      <p>
                        City: <span>{ref?.city || ""}</span>
                      </p>
                      <p>
                        State: <span>{ref?.state || ""}</span>
                      </p>
                    </div>
                    <div>
                      <p>
                        Zip Code: <span>{ref?.zip || ""}</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No emergency reference information</p>
          )}
          <div className={styles.btnContainer}>
            <Button type="memberBtnOutline" onClick={handleEditToggle}>
              Edit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

//
const Spouse = ({ formData, setFormData, selectedId, editCustomer }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isModified, setIsModified] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  //
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSpouse = [...formData.spouse]; // Create a copy of the contacts array
    updatedSpouse[index] = { ...updatedSpouse[index], [name]: value }; // Update the specific contact object

    setFormData((prevFormData) => ({
      ...prevFormData,
      spouse: updatedSpouse, // Update the contacts array in the formData state
    }));
    setIsModified(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isModified) {
      // Handle form submission, e.g., update the data on the server
      console.log("Form submitted with data:", formData);
      // After submitting, exit edit mode
      editCustomer(Number(selectedId), formData);
      setIsEditing(false);
    }
  };

  return (
    <div className={styles.selectedMember}>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          {Array.isArray(formData.spouse) &&
          formData.spouse.some((spouse) => spouse.first_name !== null) ? (
            formData.spouse.map((spouse, index) => (
              <div key={index} className={styles.formControlRow}>
                <div className={styles.twoColumn}>
                  <div>
                    <label htmlFor="first_name">First Name:</label>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      value={spouse.first_name || ""}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </div>
                  <div>
                    <label htmlFor="last_name">Last Name:</label>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      value={spouse?.last_name || ""}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </div>
                </div>

                <div className={styles.threeColumn}>
                  <div>
                    <label htmlFor="gender">Gender:</label>
                    <input
                      type="text"
                      id="gender"
                      name="gender"
                      value={spouse?.gender || ""}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </div>
                  <div>
                    <label htmlFor="dob">Date of Birth:</label>
                    <input
                      type="text"
                      id="dob"
                      name="dob"
                      value={spouse.dob || ""}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </div>
                  <div>
                    <label htmlFor="nationality">Nationality:</label>
                    <input
                      type="text"
                      id="nationality"
                      name="nationality"
                      value={spouse?.nationality || ""}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </div>
                </div>

                <div>
                  <h4>Address</h4>
                  <div className={styles.twoColumnOneSmall}>
                    <div>
                      <label htmlFor="street">Street:</label>
                      <input
                        type="text"
                        id="street"
                        name="street"
                        value={spouse?.street || ""}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </div>
                    <div>
                      <label htmlFor="apt">Apartment:</label>
                      <input
                        type="text"
                        id="apt"
                        name="apt"
                        value={spouse?.apt || ""}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </div>
                  </div>

                  <div className={styles.threeColumn}>
                    <div>
                      <label htmlFor="city">City:</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={spouse?.city || ""}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </div>
                    <div>
                      <label htmlFor="state">State:</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={spouse?.state || ""}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </div>
                    <div>
                      <label htmlFor="zip">Zip:</label>
                      <input
                        type="text"
                        id="zip"
                        name="zip"
                        value={spouse?.zip || ""}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No spouse detials to edit</p>
          )}
          <div className={styles.btnContainer}>
            <Button type="memberBtnOutline" onClick={handleEditToggle}>
              Cancel
            </Button>
            <Button
              type="memberBtn"
              onClick={handleSubmit}
              disabled={!isModified}
            >
              Save
            </Button>
          </div>
        </form>
      ) : (
        <div>
          <h2 className="pb-3">Spouse Information</h2>
          {Array.isArray(formData.spouse) &&
          formData.spouse.some((spouse) => spouse.first_name !== null) ? (
            formData.spouse.map((spouse, index) => (
              <div className={styles.selectedMemberDetails} key={index}>
                <div className={styles.sectionCol}>
                  <div>
                    <p>
                      First Name: <span>{spouse?.first_name || ""}</span>{" "}
                    </p>
                    <p>
                      Last Name: <span>{spouse?.last_name || ""}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Gender: <span>{spouse?.gender || ""}</span>
                    </p>
                    <p>
                      Date of Birth: <span>{spouse?.dob || ""}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Nationality: <span>{spouse?.nationality || ""}</span>
                    </p>
                  </div>
                </div>
                <div className={styles.sectionCol}>
                  <div>
                    <p>
                      Street: <span>{spouse?.street || ""}</span>{" "}
                    </p>
                    <p>
                      Apartment: <span>{spouse?.apt || ""}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      City: <span>{spouse?.city || ""}</span>
                    </p>
                    <p>
                      State: <span>{spouse?.state || ""}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Zip Code: <span>{spouse?.zip || ""}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No spouse information</p>
          )}
          <div className={styles.btnContainer}>
            <Button type="memberBtnOutline" onClick={handleEditToggle}>
              Edit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

//
const Dependents = ({ formData, setFormData, selectedId, editCustomer }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [editedDependents, setEditedDependents] = useState([]);

  const handleInputChange = (index, field, value) => {
    const updatedDependents = [...editedDependents];
    updatedDependents[index][field] = value;
    setEditedDependents(updatedDependents);
    setIsModified(true);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditedDependents(
      formData.dependents.map((dependent) => ({ ...dependent }))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the formData state with the modified dependents data
    setFormData({
      ...formData,
      dependents: editedDependents,
    });
    // Call the editCustomer function with the updated formData
    editCustomer(selectedId, formData);
    setIsEditing(false);
  };

  return (
    <div className={styles.selectedMember}>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          {editedDependents ? (
            editedDependents.map((dependent, index) => (
              <div key={index} className={`${styles.formControlRow} mb-5`}>
                <div className={`${styles.twoColumnOneSmall}`}>
                  <label>
                    Dependent Name:
                    <input
                      type="text"
                      value={dependent?.name || ""}
                      onChange={(e) =>
                        handleInputChange(index, "name", e.target.value)
                      }
                    />
                  </label>

                  <label>
                    Gender:
                    <input
                      type="text"
                      value={dependent?.gender || ""}
                      onChange={(e) =>
                        handleInputChange(index, "gender", e.target.value)
                      }
                    />
                  </label>
                </div>
                <div className={styles.threeColumn}>
                  <label>
                    Date of Birth:
                    <input
                      type="text"
                      value={dependent?.dob || ""}
                      onChange={(e) =>
                        handleInputChange(index, "dob", e.target.value)
                      }
                    />
                  </label>
                  <label>
                    Relationship:
                    <input
                      type="text"
                      value={dependent?.relation || ""}
                      onChange={(e) =>
                        handleInputChange(index, "relation", e.target.value)
                      }
                    />
                  </label>
                  <label>
                    Live Together ?:
                    <select
                      className={styles.formControl}
                      name="liveTogether"
                      value={dependent.liveTogether || ""}
                      onChange={(e) =>
                        handleInputChange(index, "liveTogether", e.target.value)
                      }
                    >
                      {/* Default option */}
                      <option value="">Select</option>
                      <option value="Y">Yes</option>
                      <option value="N">No</option>
                    </select>
                  </label>
                </div>
                {dependent.liveTogether === "N" && (
                  <div>
                    <h4>Address</h4>
                    <div className={styles.twoColumnOneSmall}>
                      <div>
                        <label htmlFor="street">Street:</label>
                        <input
                          type="text"
                          id="street"
                          name="street"
                          value={dependent?.street || ""}
                          onChange={(e) =>
                            handleInputChange(index, "relation", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label htmlFor="apt">Apartment:</label>
                        <input
                          type="text"
                          id="apt"
                          name="apt"
                          value={dependent?.apt || ""}
                          onChange={(e) =>
                            handleInputChange(index, "relation", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className={styles.threeColumn}>
                      <div>
                        <label htmlFor="city">City:</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={dependent?.city || ""}
                          onChange={(e) =>
                            handleInputChange(index, "relation", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label htmlFor="state">State:</label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={dependent?.state || ""}
                          onChange={(e) =>
                            handleInputChange(index, "relation", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label htmlFor="zip">Zip:</label>
                        <input
                          type="text"
                          id="zip"
                          name="zip"
                          value={dependent?.zip || ""}
                          onChange={(e) =>
                            handleInputChange(index, "relation", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No depenedent data</p>
          )}

          <div className={styles.btnContainer}>
            <Button type="memberBtnOutline" onClick={handleEditToggle}>
              Cancel
            </Button>
            <Button
              type="memberBtn"
              onClick={handleSubmit}
              disabled={!isModified}
            >
              Save
            </Button>
          </div>
        </form>
      ) : (
        <div>
          <h2 className="pb-3">Dependants information</h2>
          <div>
            <ol className={styles.selectedDependentDetails}>
              {Array.isArray(formData.dependents) &&
              formData.dependents.length > 0 ? (
                formData.dependents.map((dependent, index) => (
                  <li key={index} className="pb-5">
                    <div className={`${styles.sectionCol} ${styles.dependent}`}>
                      <div>
                        <p>
                          Name: <span>{dependent.name || ""} </span>{" "}
                        </p>
                        <p>
                          Gender: <span>{dependent.gender || ""}</span>
                        </p>
                        <p>
                          Date of Birth: <span>{dependent.dob || ""}</span>
                        </p>
                        <p>
                          Relationship: <span>{dependent.relation || ""}</span>
                        </p>
                        <p>
                          Stay Together ?:{" "}
                          <span>{dependent.live_together || ""}</span>
                        </p>
                      </div>

                      {dependent.live_together === "N" && (
                        <div className={styles.sectionCol}>
                          <div>
                            <p>
                              Street: <span>{dependent?.street || ""}</span>{" "}
                            </p>
                            <p>
                              Apartment: <span>{dependent?.apt || ""}</span>
                            </p>
                          </div>
                          <div>
                            <p>
                              City: <span>{dependent?.city || ""}</span>
                            </p>
                            <p>
                              State: <span>{dependent?.state || ""}</span>
                            </p>
                          </div>
                          <div>
                            <p>
                              Zip Code: <span>{dependent?.zip || ""}</span>
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </li>
                ))
              ) : (
                <li>No dependent information available.</li>
              )}
            </ol>
          </div>
          <div className={styles.btnContainer}>
            <Button type="memberBtnOutline" onClick={handleEditToggle}>
              Edit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

//
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

// function getObjectWithMatchingId(array, selectedId) {
//   // Iterate over the array
//   for (let i = 0; i < array.length; i++) {
//     // Check if the current object's id matches the selectedId
//     if (array[i].id === selectedId) {
//       // Return the object with the matching id
//       return array[i];
//     }
//   }
//   // If no matching id is found, return null or handle it as needed
//   return null;
// }
