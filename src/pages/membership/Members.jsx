import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMembers } from "../../components/contexts/MemberContext";
import Avatar from "react-avatar";

import Pagination from "../../components/Pagination";
import RegistrationForm from "../../components/forms/RegistrationForm";
import Loading from "../../components/Loading";

import styles from "./Members.module.css";
import Button from "../../components/Button";

function Members() {
  const { members, isLoading } = useMembers();
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 6;
  const pageNumberLimit = 5;

  const navigate = useNavigate();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const renderModal = () => {
    if (!showModal) return null;
    // Render your modal component with specific form fields for the selected category
    return (
      <Modal className={styles.modal}>
        <h2 className={styles.modalHeader}>Register Customer</h2>
        <RegistrationForm />
        <button onClick={closeModal} className={styles.modalCloseBtn}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </Modal>
    );
  };

  if (isLoading) return <Loading />;

  return (
    <div className={styles.household}>
      <div className={styles.profileHeader}>
        <h3 className={`${"headingTertiary"}`}>Members</h3>
        <Button type="back" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-chevron-left"></i>
        </Button>
      </div>
      <div className={styles.memberPageHeader}>
        <div className={styles.btnConntainer}>
          <button onClick={() => openModal()}>Add</button>
        </div>
      </div>
      {members.length > 0 ? (
        <div className={styles.household}>
          <Pagination
            items={members}
            itemsPerPage={itemsPerPage}
            pageNumberLimit={pageNumberLimit}
            renderFunction={RenderList}
          />
        </div>
      ) : (
        <p>No customers. Add the first one</p>
      )}
      {renderModal()}
    </div>
  );
}

function RenderList(members) {
  const sortedList = members?.sort((a, b) => b.id - a.id);
  return (
    <>
      <ul className={styles.allMembers}>
        {sortedList?.map((item, index) => (
          <Member key={index} member={item} />
        ))}
      </ul>
    </>
  );
}

export default Members;

function Member({ member }) {
  const { id } = member;

  let city, state; // Declare email variable outside the if block

  // Assuming data is the provided array
  if (Array.isArray(member.contacts) && member.contacts.length > 0) {
    // Destructure the email property and assign it to the variable
    const {
      email: extractedEmail,
      state: extractedState,
      city: extractedCity,
    } = member.contacts[0] || {};

    // Check if extractedEmail exists before using it
    if (extractedEmail && extractedCity && extractedState) {
      // email = extractedEmail; // Assign extractedEmail to email variable
      state = extractedState;
      city = extractedCity;
      // console.log(email); // Example usage
    } else {
      console.error(
        "Email is not available in the first element of the data array."
      );
    }
  } else {
    console.error("Data is empty or not in the expected format.");
  }

  return (
    <li>
      <Link key={member.id} className={styles.memberList} to={`${id}`}>
        <div className={styles.members}>
          <div className={styles.memberAavatar}>
            <Avatar
              fgColor={
                member.category === 1
                  ? "#612b75"
                  : member.category === 2
                  ? "#6e89a3"
                  : member.category === 4
                  ? "#b8860b"
                  : "#009fc7"
              }
              color={
                member.category === 1
                  ? "#d3c1da"
                  : member.category === 2
                  ? "#e2e7ed"
                  : member.category === 4
                  ? "#feeeb3"
                  : "#ccecf4"
              }
              size={60}
              round="5rem"
              name={`${member.first_name} ${
                member.middle_name ? member.middle_name : ""
              } ${member.last_name}}`}
            />
          </div>
          <div className={styles.memberCard}>
            <div className={styles.memberId}>
              Membership ID: <strong>{member.id}</strong>
            </div>
            <h3 className={`${"headingTertiary"}`}>
              {`${member.first_name} ${
                member.middle_name ? member.middle_name : ""
              } ${member.last_name}`}
            </h3>
            <div>
              <div>
                <span>{city ? city : ""}, </span>
                <span>{state ? state : ""}.</span>
              </div>
            </div>
            <div className={styles.memberDetails}>
              {member.category === 1 ? (
                <span className={styles.single}>
                  {member.category === 1 ? "Single" : ""}
                </span>
              ) : member.category === 4 ? (
                <span className={styles.retired}>
                  {member.category === 4 ? "Senior Citizen" : ""}
                </span>
              ) : member.category === 2 ? (
                <span className={styles.family}>
                  {member.category === 2 ? "Family" : ""}
                </span>
              ) : (
                <span className={styles.singleFamily}>
                  {member.category === 3 ? "Single Family" : ""}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}

// Modal.js
const Modal = ({ children, onClose }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
