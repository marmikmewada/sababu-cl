import React from "react";
import { HashLink } from "react-router-hash-link";
import { NavLink } from "react-router-dom";

import Footer from "../../components/Footer";
import styles from "./Outreach.module.css";

function Outreach() {
  return (
    <div className={styles.outreach}>
      <header>
        <h2 className={`${"headingSecondary"}`}>
          Sababu Community Outreach Initiatives
        </h2>
      </header>
      <nav className={styles.outreachNav}>
        <ul>
          <li>
            <NavLink to="/services">Back</NavLink>
          </li>
          <li>
            <HashLink to="#overview">Overview</HashLink>
          </li>
          <li>
            <HashLink to="#initiatives">Initiatives</HashLink>
          </li>
          <li>
            <HashLink to="#partnerships">Partnerships</HashLink>
          </li>
        </ul>
      </nav>
      <section id="overview">
        <h2 className={`${"headingTertiary"}`}>Overview</h2>
        <p>
          In a world often marked by individualism and disconnectedness, Sababu
          stands out as a beacon of hope, actively engaging in community
          outreach initiatives aimed at fostering unity and solidarity among its
          members. At the heart of Sababu's mission lies a deep commitment to
          building a compassionate community network—one that not only provides
          support during times of grief but also serves as a platform for shared
          experiences, understanding, and connection.
        </p>
        <img
          className={styles.outreachImg}
          src="/images/sb-agm-members1-2023.jpg"
          alt=""
        />
      </section>
      <section id="initiatives">
        <h2 className={`${"headingTertiary"}`}>Community Initiatives</h2>
        <p>
          Through a variety of outreach initiatives, Sababu works tirelessly to
          unite community members and foster a sense of belonging. Whether
          through support groups, online forums, or local events, Sababu
          provides platforms for individuals to connect, share, and heal
          together. These initiatives not only offer practical support and
          guidance but also serve as powerful reminders that no one is alone in
          their journey through grief.
        </p>
      </section>
      <section id="partnerships">
        <h2 className={`${"headingTertiary"}`}>Community Partnerships</h2>
        <p>
          Moreover, Sababu's commitment to community extends beyond just its
          members. Through partnerships with local organizations, schools, and
          businesses, Sababu seeks to promote a culture of empathy and support
          within the broader community. By raising awareness about the
          importance of grief support and destigmatizing conversations around
          loss, Sababu hopes to create a more compassionate society where
          everyone feels seen, heard, and valued.
        </p>
      </section>
      <Footer />
    </div>
  );
}

export default Outreach;
