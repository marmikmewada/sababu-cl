import React from "react";
import { HashLink } from "react-router-hash-link";

import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

import styles from "./Join.module.css";

function Join() {
  return (
    <div className={styles.joinContainer}>
      <div className={styles.headerSection}>
        <div className={styles.header}></div>
      </div>
      <div className={styles.innerContainer}>
        <HowItWorks />
      </div>
    </div>
  );
}

export default Join;

function HowItWorks() {
  const navigate = useNavigate();

  return (
    <section className={`${"section sectionLayout"} ${styles.howItWorks}`}>
      <div className={`${styles.membershipBtn}`}>
        <div>
          <Button type="back" onClick={() => navigate(-1)}>
            <i class="fa-solid fa-chevron-left"></i>
          </Button>
        </div>
        <div>
          <HashLink className="cta" to="/app/users/register">
            Join Now
          </HashLink>
        </div>
      </div>
      <div className={` ${styles.content}`}>
        <h1 className={`${"headingSecondary"}`}>How it works</h1>
        <div className={`${""} ${styles.steps}`}>
          <div className={styles.step}>
            <i className="fa-regular fa-registered"></i>
            <h3 className={`${"headingTertiary"}`}>Register</h3>
            <ul className={styles.stepList}>
              <li>Acquire membership application form from Sababu Fund.</li>
              <li>Complete form and submit to Sababu.</li>
              <li>
                Sababu team reviews and processes the application, and applicant
                receives notification of the decision.
              </li>
            </ul>
          </div>
          <div className={styles.step}>
            <i className="fa-regular fa-handshake"></i>
            <h3 className={`${"headingTertiary"}`}>Membership</h3>
            <ul className={styles.stepList}>
              <li>
                No regular monthly dues; contribute only in the event of a
                reported incident.
              </li>
              <li>
                Renew your membership within the designated renewal period.
              </li>
              <li>
                Participate in the organization&apos;s biannual meetings, held
                semi-annually.
              </li>
              <li>
                Get involved in Sababu&apos;s initiatives, projects, and offer
                your time and expertise.
              </li>
            </ul>
          </div>
          <div className={styles.step}>
            <i className="fa-regular fa-money-bill-1"></i>
            <h3 className={`${"headingTertiary"}`}>Contribute Dues</h3>
            <ul className={styles.stepList}>
              <li>
                Ensure that bereavement contributions are promptly paid,
                typically within one week of reporting an event.
              </li>
              <li>
                A dedicated team contacts members to collect these
                contributions.
              </li>
              <li>The amount contributed depends on the type of membership.</li>
              <li>
                Funds gathered from members are allocated to assist with funeral
                expenses and other survivor-related costs.
              </li>
            </ul>
          </div>
          <div className={styles.step}>
            <i className="fa-regular fa-heart"></i>
            <h3 className={`${"headingTertiary"}`}>Help Others</h3>
            <ul className={styles.stepList}>
              <li>
                volunteer and display your dedication to the organization by
                offering your assistance to fellow community members.
              </li>
              <li>
                Keep yourself informed about the organization&apos;s events,
                meetings, and any alterations in its policies.
              </li>
              <li>
                Familiarize yourself with fellow members, volunteers, and
                leaders, cultivating connections that bolster your sense of
                belonging and impact.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
