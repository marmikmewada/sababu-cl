import { Outlet, Route, Routes } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import AppNav from "../../components/AppNav";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import NewsLetter from "../../components/NewsLetter";
import GriefSupport from "./GriefSupport";
import Outreach from "./Outreach";

import styles from "./Services.module.css";

function Services() {
  return (
    <main>
      <ServicesComponents />
    </main>
  );
}

function ServicesComponents() {
  return (
    <>
      <AppNav />
      <Routes>
        <Route path="/" element={<Components />} />
        <Route path="grief-support" element={<GriefSupport />} />
        <Route path="outreach" element={<Outreach />} />
      </Routes>
      <Outlet />
    </>
  );
}

function Components() {
  return (
    <div>
      <div>
        <Support />
        <Programs />
        <GetInvolve />
        <NewsLetter />
      </div>
      <Footer />
    </div>
  );
}

function Support() {
  return (
    <section className={styles.supportContainer}>
      <div className={styles.support}>
        <div className={styles.supportText}>
          <h2 className={`${"headingSecondary"}`}>
            Let&apos;s Make a Difference
          </h2>
          <p>
            Sababu&apos;s initiatives are at the heart of constructing a
            compassionate and empathetic network that serves as a pillar of
            support for individuals navigating the challenging journey of grief.
            By fostering a community-driven approach, Sababu strives to create
            an environment where individuals facing loss find solace,
            understanding, and companionship.
          </p>
        </div>
        <div className={styles.supportImg}>
          <img
            src="/images/sb-share-love.jpg"
            alt="Two hands sharing love"
            className={styles.supportImg}
          />
        </div>
      </div>
    </section>
  );
}

function Programs() {
  return (
    <section className={`${"section sectionLayout"} ${styles.programs}`}>
      <p className={`${"intro"}`}>Our programs</p>
      <h1 className={`${"headingSecondary"}`}>Our Programs</h1>
      <div className={`${"grid gridThreeCol"} ${styles.programType}`}>
        <div>
          <h3 className={`${"headingTertiary"}`}>Grief Support</h3>
          <p>
            Sababu offers grief support to members that includes alleviating
            funeral costs, counseling, and therapy services to guide individuals
            through the challenging journey of grief, fostering emotional
            healing and well-being. Sababu also manages the intricate logistics
            involved in repatriation of the member, ensuring a seamless and
            respectful process from the place of passing to Sierra Leone.
          </p>
          <HashLink to="grief-support#top" className="cta">
            Learn more
          </HashLink>
        </div>
        <div>
          <h3 className={`${"headingTertiary"}`}>Outreach</h3>
          <p>
            Sababu actively engages in community outreach initiatives to foster
            unity and solidarity among community members. Together we build a
            compassionate community network, to unite and provide a supportive
            environment where members can share experiences, find understanding,
            and connect with others who are navigating the complexities of
            grief.
          </p>
          <HashLink to="outreach#top" className="cta">
            Learn more
          </HashLink>
        </div>
        <div>
          <h3 className={`${"headingTertiary"}`}>Events</h3>
          <p>
            Sababu organizes and promotes a variety of social events to
            strengthen community ties and celebrate the diversity and spirit of
            the community. Through community social events, Sababu contributes
            to the overall well-being of the community, fostering a supportive
            environment where individuals can form meaningful connections and
            find comfort in shared experiences.
          </p>
          <HashLink to="/events#top" className="cta">
            Learn more
          </HashLink>
        </div>
      </div>
    </section>
  );
}

function GetInvolve() {
  return (
    <section className={`${styles.getInvolvedContainer}`}>
      <p className={`${"intro"}`}>Who we are</p>
      <div className={styles.getInvolved}>
        <h1 className={`${"headingSecondary"}`}>Get Involved </h1>
        <p>
          {" "}
          We're always looking for ways to expand our reach and impact, and
          we're committed to making a difference in the lives of those in our
          community and beyond. If you're interested in getting involved, we'd
          love to hear from you!
        </p>
        <div>
          <Button type="memberBtn">Donate</Button>
          <Button type="memberBtnOutline">Volunteer</Button>
        </div>
      </div>
    </section>
  );
}

export default Services;
