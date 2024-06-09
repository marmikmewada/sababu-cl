import  useStore  from '../zustand/store'; // Adjust the import path as necessary
import Button from "./Button";
import styles from "./ContactForm.module.css";

function ContactForm() {
  const { createContact, isLoading } = useStore((state) => ({
    createContact: state.createContact,
    isLoading: state.isLoading
  }));
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.elements.name.value;
    const phone = form.elements.phone.value;
    const email = form.elements.email.value;
    const message = form.elements.message.value;

    try {
      await createContact(name, phone, email, message);
      form.reset(); // This line will clear the form fields
    } catch (error) {
      console.error('Error submitting contact form:', error);
    }
  };

  return (
    <section className={`${"section sectionLayout"}`}>
      <div className={styles.contactForm}>
        <form onSubmit={handleSubmit}>
          <h3 className={`${"headingSecondary"} ${styles.contactFormHeader}`}>
            Get in Touch
          </h3>
          <div className={styles.formControl}>
            <div className={`${"formGrid columnTwo"} ${styles.inputControl}`}>
              <div>
                <input type="text" placeholder="Name" name="name" required />
              </div>
              <div>
                <input type="tel" placeholder="Phone number" name="phone" required />
              </div>
            </div>
            <div>
              <div>
                <input type="email" placeholder="Email address" name="email" required />
              </div>
            </div>
          </div>
          <div className={styles.formControl}>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              cols="33"
              placeholder="Write a brief message.."
              required
            ></textarea>
          </div>
          <div>
            <Button type="memberBtn" disabled={isLoading}>Submit</Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ContactForm;










// import Button from "./Button";
// import styles from "./ContactForm.module.css";

// function ContactForm() {
//   return (
//     <section className={`${"section sectionLayout"}`}>
//       <div className={styles.contactForm}>
//         <form>
//           <h3 className={`${"headingSecondary"} ${styles.contactFormHeader}`}>
//             Get in Touch
//           </h3>
//           <div className={styles.formControl}>
//             <div className={`${"formGrid columnTwo"} ${styles.inputControl}`}>
//               <div>
//                 <input type="text" placeholder="Name" />
//               </div>
//               <div>
//                 <input type="phone" placeholder="Phone number" />
//               </div>
//             </div>
//             <div>
//               <div>
//                 <input type="email" placeholder="Email address" />
//               </div>
//             </div>
//           </div>
//           <div className={styles.formControl}>
//             <div htmlFor="message">Message:</div>
//             <textarea
//               id="story"
//               name="story"
//               rows="5"
//               cols="33"
//               placeholder="Write a brief message.."
//             ></textarea>
//           </div>
//           <div>
//             <Button type="memberBtn">Submit</Button>
//           </div>
//         </form>
//       </div>
//     </section>
//   );
// }

// export default ContactForm;
