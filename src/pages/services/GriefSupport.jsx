import React from "react";
import { NavLink } from "react-router-dom";

import Footer from "../../components/Footer";
import styles from "./GriefSupport.module.css";

function GriefSupport() {
  return (
    <div className={styles.griefSupportContainer}>
      <header>
        <li className={styles.linkStyle}>
          <NavLink to="/services">Back</NavLink>
        </li>
        <h2>Sababu - Funeral Cost Support</h2>
      </header>
      <div className={styles.griefSupport}>
        <div id="overview">
          <h2 className={`${"headingTertiary"}`}>Overview</h2>
          <p>
            Sababu offers support to its members by helping alleviate the
            financial burden of funeral costs. Members contribute when a death
            incident is reported, and the contribution varies based on
            membership type.
          </p>
        </div>
        <section id="single-membership">
          <h2 className={`${"headingTertiary"}`}>Single Membership</h2>
          <div>
            <p>
              For single members without dependents, the contribution is a flat
              fee of $50.
            </p>
            <img src="/images/sb-bbq.jpg" alt="Single Membership" />
          </div>
        </section>
        <section id="single-family-membership">
          <h2 className={`${"headingTertiary"}`}>Single Family Membership</h2>
          <div>
            <p>
              Single family members pay a base fee of $50, plus $10 for every
              child aged 1 to 26 years, and $25 for every adult family member in
              the household.
            </p>
            <img
              src="/images/sb-single-family.jpg"
              alt="Single Family Membership"
            />
          </div>
        </section>
        <section id="family-membership">
          <h2 className={`${"headingTertiary"}`}>Family Membership</h2>
          <div>
            <p>
              Family members, considered married within the household, pay a
              base fee of $100, plus $10 per child and $25 per adult family
              member in the household.
            </p>
            <img src="/images/sb-family.jpg" alt="Family Membership" />
          </div>
        </section>
        <section id="senior-citizen-membership">
          <h2 className={`${"headingTertiary"}`}>
            Senior Citizen(Retired) Membership
          </h2>
          <div>
            <p>
              Senior citizen members pay a base fee of $25, plus $10 per child
              and $25 per adult in their household.
            </p>
            <img src="/images/sb-seniors.jpg" alt="Senior Citizen Membership" />
          </div>
        </section>

        <section>
          <p>
            In essence, Sababu's commitment to alleviating the financial strain
            of funeral costs is exemplified through its structured contribution
            system, which takes into account the diverse needs and circumstances
            of its membership base. By offering a range of options tailored to
            different family compositions and life stages, Sababu aims to
            provide meaningful support during moments of bereavement, fostering
            a sense of community and solidarity among its members.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default GriefSupport;
