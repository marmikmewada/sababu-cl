import Button from "./Button";
import styles from "./ContactForm.module.css";

function ContactForm() {
  return (
    <section className={`${"section sectionLayout"}`}>
      <div className={styles.contactForm}>
        <form>
          <h3 className={`${"headingSecondary"} ${styles.contactFormHeader}`}>
            Get in Touch
          </h3>
          <div className={styles.formControl}>
            <div className={`${"formGrid columnTwo"} ${styles.inputControl}`}>
              <div>
                <input type="text" placeholder="Name" />
              </div>
              <div>
                <input type="phone" placeholder="Phone number" />
              </div>
            </div>
            <div>
              <div>
                <input type="email" placeholder="Email address" />
              </div>
            </div>
          </div>
          <div className={styles.formControl}>
            <div htmlFor="message">Message:</div>
            <textarea
              id="story"
              name="story"
              rows="5"
              cols="33"
              placeholder="Write a brief message.."
            ></textarea>
          </div>
          <div>
            <Button type="memberBtn">Submit</Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ContactForm;
