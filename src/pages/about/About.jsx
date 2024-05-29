import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMembersContext } from "../../components/contexts/MembersContext";

import AppNav from "../../components/AppNav";
import TextExpander from "../../components/TextExpander";
import TextDisplay from "../../components/TextDisplay";
import Footer from "../../components/Footer";
import SababuStat from "../../components/SababuStat";
import NewsLetter from "../../components/NewsLetter";

import styles from "./About.module.css";

const textDisplay = (
  <p className={styles.volunteerPitch}>
    We are always looking for ways to expand our reach and impact, and we are
    committed to making a difference in the lives of those in need in our
    community and beyond. Interested in getting in rejuvinating someone &apos;s
    live, we would love to hear from you!
  </p>
);

function About() {
  return (
    <main className={styles.aboutMain}>
      <AppNav />
      <AboutSababu />
      <SababuStat />
      <MissionVision />
      <BlockQoute />
      {/* <SababuTeam /> */}
      <TextDisplay className={styles.volunteerPitch}>{textDisplay}</TextDisplay>
      <NewsLetter />
      <Footer />
    </main>
  );
}

function AboutSababu() {
  return (
    <section className={`${"section sectionLayout"}`}>
      <p className={`${"intro"}`}>Our story</p>
      <div className={styles.aboutText}>
        <h1 className={`${"headingSecondary"}`}>About Us</h1>
        <TextExpander
          collapsedNumWords={100}
          expandTextButton="Show more"
          collapseTextButton="Show less"
          buttonStyle={styles.expanderBtn}
          className={styles.sababuStory}
        >
          <p>
            Sababu Fund Inc. was founded in March 2022 by seven exemplary
            figures, also refer to as the founding members, in the Sierra
            Leonean community in Northern Virginia, United States. Sababu Fund
            is a non-profit organization that provides moral and financial
            support for people that are grieving, depressed and underprivileged.
            The organization was formed to provide grief packages in support and
            services to families and members and assist in facilitating funeral
            proceedings for Sierra Leoneans that die in the United States of
            America.
          </p>
          <br />
          <p>
            In the early days, Sababu Fund focused on providing grief packages
            to families who had lost a loved one. These packages contained
            emotional support,essential food items, personal care, and
            educational resources, to help families cope with their loss. Over
            time, the organization grew, and the scope of its work expanded to
            include alleviating funeral costs, providing assistance to those who
            were vulnerable and less privileged, and supporting individuals and
            families in their time of need.
          </p>
          <br />
          <p>
            One of the core values of Sababu Fund is to provide support to those
            who are struggling with grief and loss. Our grief packages continue
            to be an important part of what we do, and we are proud to be
            providing comfort and support to those who need it most. In addition
            to this, we are also dedicated to alleviating funeral costs for
            families who are struggling to afford a funeral for their loved one.
          </p>
          <br />
          <p>
            Another important aspect of our work is providing assistance to
            those who are vulnerable and less privileged. We believe that
            everyone deserves the opportunity to thrive, and we work to provide
            access to resources and support to those who need it most. Our
            programs are designed to empower individuals and families and help
            them overcome their challenges and achieve their goals.
          </p>
          <br />
          <p>
            Sababu Fund is a growing non-profit organization that is making a
            real difference in the lives of those in need. We are proud of what
            we have accomplished, but we know there is still so much more that
            we can do. We are always looking for ways to expand our reach and
            impact, and we are committed to making a difference in the lives of
            those in our community and beyond. If you are interested in getting
            involved, we would love to hear from you!
          </p>
        </TextExpander>
      </div>
    </section>
  );
}

function BlockQoute() {
  return (
    <section className={`${"section sectionLayout"} ${styles.aboutQuote}`}>
      <blockquote className={`${styles.blockquote}`}>
        &quot;Service is the rent we pay for being. It is the very purpose of
        life and not something you do in your spare time.&quot;
        <p>Marion Wright Edelman</p>
      </blockquote>
    </section>
  );
}

function MissionVision() {
  return (
    <section className={`${"section sectionLayout"}`}>
      <p className={`${"intro"}`}>Mission and Vision</p>
      <div className={styles.missionVision}>
        <h1 id="mission" className={`${"headingSecondary"}`}>
          Supporting Members and Families.
        </h1>
        <div className={`${"grid gridTwoCol"} ${styles.content}`}>
          <div className={styles.mission}>
            <h2 className={`${"headingSecondary"}`}>
              <strong>Mission</strong>{" "}
            </h2>
            <p>
              To support members and families through challenging times with
              empathy and resources, fostering a sense of togetherness and
              resilience.
            </p>
          </div>
          <div id="vision" className={styles.vision}>
            <h2 className={`${"headingSecondary"}`}>
              <strong>Vision</strong>
            </h2>
            <p>
              To assume a leadership role in providing support and resources for
              all, ensuring that Sierra Leoneans in the diaspora can thrive and
              access essential social services.
            </p>
          </div>
        </div>
        <div id="impact" className={styles.impact}>
          <h2 className={`${"headingSecondary"}`}>
            Our Impact in the Community
          </h2>
          <p>
            At Sababu Fund, we firmly believe in the power of compassionate
            support to navigate the challenges of grief and strengthen community
            bonds. Our unwavering commitment lies in providing essential grief
            support and social services to our members in need. Through our
            programs, we strive to make a meaningful impact on the lives of
            countless individuals- our members, their families, and communities,
            fostering resilience and solidarity during difficult times.
          </p>
          <p>
            Together, we can make a real difference in the lives of those in
            need. Join the Sababu Fund community today and help us empower
            communities and change lives.
          </p>
        </div>
      </div>
    </section>
  );
}

function SababuTeam() {
  const { customers } = useMembersContext();
  const [employeesData, setEmployeesData] = useState([]);

  useEffect(() => {
    const { teams } = customers;

    if (teams && teams.length > 0) {
      const { employees } = teams[0];
      if (employees && employees.length > 0) {
        // Now you can use the `employees` array
        setEmployeesData(employees);
      } else {
        console.log("No employees found or employees array is empty");
      }
    } else {
      console.log("No teams found or teams array is empty");
    }
  }, [customers]);

  return (
    <section className={`${"section sectionLayout"}`}>
      <p className={`${"intro"}`}>Meet the team</p>
      <div className={styles.sababuTeam}>
        <h2 className={`${"headingSecondary"}`}>The Sababu Fund Team</h2>
        <ul>
          {employeesData?.map((member) => (
            <Team member={member} key={member.id} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function Team({ member }) {
  return (
    <li>
      <div className={styles.teamMember}>
        <div className={styles.memberImg}>
          <img
            src={member.memberImg}
            alt="'A man and woman walking out side walk"
          />
        </div>
        <div className={styles.teamMemberBio}>
          <h3 className={`${"headingTertiary"} ${styles.memberName}`}>
            {member.name}
          </h3>
          <div>
            <p className={styles.memberTitle}>{member.title}</p>
            <p className={styles.companyName}>Sababu Fund Inc.</p>
          </div>
          <div className={styles.teamMemberIcons}>
            <Link to="/">
              <i className="fa-brands fa-square-facebook"></i>
            </Link>
            <Link to="/">
              <i className="fa-brands fa-square-whatsapp"></i>
            </Link>
            <Link to="/">
              <i className="fa-brands fa-youtube"></i>
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}

export default About;
