import React from "react";
import { useMembers } from "../../components/contexts/MemberContext";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button";

import styles from "./Setup.module.css";

function Setup() {
  const { currentMember } = useMembers();

  const navigate = useNavigate();

  console.log(currentMember);

  return (
    <div className={styles.setup}>
      <div>
        <div className={styles.profileHeader}>
          <h2 className={`${"headingTertiary"}`}>My Household</h2>
          <Button type="back" onClick={() => navigate(-1)}>
            <i class="fa-solid fa-chevron-left"></i>
          </Button>
        </div>

        <ul className={styles.setupList}>
          <li>
            <i className="fa-solid fa-user"></i>
            <div>Profile</div>
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </li>
          <li>
            <i className="fa-solid fa-key"></i>
            <div>Change password</div>
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </li>

          <li>
            <i className="fa-solid fa-info"></i>
            <div>Help</div>
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </li>
        </ul>
      </div>
      <div>
        <h3>Help</h3>
      </div>
    </div>
  );
}

export default Setup;
