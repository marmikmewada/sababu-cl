import AppNav from "../../components/AppNav";
import ContactForm from "../../components/ContactForm";
import Footer from "../../components/Footer";
// import GoogleMap from "../../components/GoogleMap";
import NewsLetter from "../../components/NewsLetter";
import TextDisplay from "../../components/TextDisplay";

import styles from "./Contact.module.css";

const textDisplay = (
  <p className={styles.volunteerPitch}>
    We are always looking for ways to expand our reach and impact, and we are
    committed to making a difference in the lives of those in need in our
    community and beyond. Interested in getting in rejuvinating someone &apos;s
    live, we would love to hear from you!
  </p>
);

function Contact() {
  return (
    <div className={styles.contacts}>
      <AppNav />
      <div className={`${"section sectionLayout"} ${styles.contactInfo}`}>
        <TextDisplay>{textDisplay}</TextDisplay>
      </div>
      <div className={styles.contactOptions}>
        <ContactDetails />
        <ContactForm />
      </div>
      {/* <section className={styles.googleMap}>
        <GoogleMap />
      </section> */}
      <NewsLetter />
      <Footer />
    </div>
  );
}

function ContactDetails() {
  return (
    <section className={`${"section sectionLayout"}`}>
      <div className={styles.contactUs}>
        <div className={styles.contactDetails}>
          <div className={styles.address}>
            <i className="fa-solid fa-location-dot"></i>
            <div>
              <p>43244 Winsbury West Pl </p>
              <span>Sterling VA.20166</span>
            </div>
          </div>
          <div className={styles.phone}>
            <i className="fa-solid fa-phone"></i>
            <div>
              <p>+1 (571) - 471 - 6384</p>
              <span>Mon - Fri: 9am - 6pm</span>
            </div>
          </div>
          <div className={styles.email}>
            <i className="fa-regular fa-envelope"></i>
            <div>
              <p>sababufund@gmail.com</p>
              <span>Send us those questions anytime.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
