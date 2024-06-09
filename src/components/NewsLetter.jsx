import { NavLink } from "react-router-dom";
import Button from "./Button";
import styles from "./NewsLetter.module.css";
import  useStore  from '../zustand/store'; // Import useStore from your store.js

function NewsLetter() {
  const createNewsletter = useStore((state) => state.createNewsletter); // Access createNewsletter from the store

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const email = event.target.email.value; // Get the email value from the form
    await createNewsletter(email); // Call the createNewsletter function with the email
  };

  return (
    <section className={`${"section sectionLayout"}`}>
      <div className={styles.newsLetterContent}>
        <p className={`${"intro"}`}>News letter</p>
        <h3 className={`${"headingTertiary"}`}>Subscribe to our News Letter</h3>
        <div className={`${"gridNewsLetter"} ${styles.newsLetter}`}>
          <form onSubmit={handleSubmit}> {/* Add the handleSubmit function to the form's onSubmit event */}
            <div className={`${"inputControl"}`}>
              <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required /> {/* Add required attribute to ensure an email is entered */}
              </div>
            </div>
            <div className={styles.btnSubscribe}>
              <Button type="memberBtn">Subscribe</Button>
            </div>
          </form>
          <div className={`${"listLinks"}`}>
            <h3 className={`${"headingTertiary"}`}>Quick Links</h3>
            <ul className={styles.navList}>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/services">Services</NavLink>
              </li>
              <li>
                <NavLink to="/events">Events</NavLink>
              </li>
              <li>
                <NavLink to="/blogs">Blogs</NavLink>
              </li>
              <li>
                <NavLink to="/contacts">Contact</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsLetter;










// import { NavLink } from "react-router-dom";
// import Button from "./Button";
// import styles from "./NewsLetter.module.css";

// function NewsLetter() {
//   return (
//     <section className={`${"section sectionLayout"}`}>
//       <div className={styles.newsLetterContent}>
//         <p className={`${"intro"}`}>News letter</p>
//         <h3 className={`${"headingTertiary"}`}>Subscribe to our News Letter</h3>
//         <div className={`${"gridNewsLetter"} ${styles.newsLetter}`}>
//           <form>
//             <div className={`${"inputControl"}`}>
//               <div>
//                 <label htmlFor="email">Email</label>
//                 <input type="email" id="email" name="email" />
//               </div>
//             </div>
//             <div className={styles.btnSubscribe}>
//               <Button type="memberBtn">Subscribe</Button>
//             </div>
//           </form>
//           <div className={`${"listLinks"}`}>
//             <h3 className={`${"headingTertiary"}`}>Quick Links</h3>
//             <ul className={styles.navList}>
//               <li>
//                 <NavLink to="/">Home</NavLink>
//               </li>
//               <li>
//                 <NavLink to="/about">About</NavLink>
//               </li>
//               <li>
//                 <NavLink to="/services">Services</NavLink>
//               </li>
//               <li>
//                 <NavLink to="/events">Events</NavLink>
//               </li>
//               <li>
//                 <NavLink to="/blogs">Blogs</NavLink>
//               </li>
//               <li>
//                 <NavLink to="/contacts">Contact</NavLink>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default NewsLetter;
