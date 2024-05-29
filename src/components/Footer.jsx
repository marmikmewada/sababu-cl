import styles from "./Footer.module.css";
import { HashLink } from "react-router-hash-link";

function Footer() {
  return (
    <footer className={styles.footer}>
      <main className={`${"grid gridFourCol"}`}>
        <div className={styles.footerIcons}>
          <img src="/logo-nobackground-200.png" alt="Sababu Fund logo" />
          <p>
            A community organization providing relief and emotional support to
            members of the organization.
          </p>
          <div className={styles.icons}>
            <HashLink to="/">
              <i className="fa-brands fa-square-facebook"></i>
            </HashLink>
            <HashLink to="/">
              <i className="fa-brands fa-square-whatsapp"></i>
            </HashLink>
            <HashLink to="/">
              <i className="fa-brands fa-youtube"></i>
            </HashLink>
          </div>
        </div>
        <div className={styles.navigation}>
          <h3>Navigation</h3>
          <ul className={styles.navList}>
            <li>
              <HashLink to="/">Home</HashLink>
            </li>
            <li>
              <HashLink to="/about#top">About</HashLink>
            </li>
            <li>
              <HashLink to="/services#top">Services</HashLink>
            </li>
            <li>
              <HashLink to="/events#top">Events</HashLink>
            </li>
            <li>
              <HashLink to="/#blogs">Blogs</HashLink>
            </li>
            <li>
              <HashLink to="/contact#top">Contact</HashLink>
            </li>
          </ul>
        </div>
        <div className={styles.contact}>
          <h3>Contact Us</h3>
          <ul>
            <li>13796 Merrybrook Court #302 Herndon, VA. 20171.</li>
            <li>Phone: +1 (571)-471-6384</li>
            <li>Email: sababufund@gmail.com</li>
          </ul>
        </div>
        <div className={styles.support}>
          <h3>Support</h3>
          <p>
            You are interested in getting involved, we would love to hear from
            you!
          </p>
          <HashLink className="cta ctaBtn" to="/app/membership#top">
            Join us
          </HashLink>
        </div>
      </main>
      <div className={styles.copyRight}>
        <p>
          Sababu Fund Inc. &copy; 2023.{" "}
          <span className={styles.lastUpdate}>
            Last updated {new Date().toDateString()}.
          </span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
