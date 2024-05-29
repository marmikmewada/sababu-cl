import React from "react";

import styles from "./Gallery.module.css";
import { useMembersContext } from "./contexts/MembersContext";

function Gallery() {
  const { customers } = useMembersContext();
  const events = customers.events;

  return (
    <section className={`${"section sectionLayout"} ${styles.thirdEventTab}`}>
      <div className={`${"headingTertiary"} ${styles.eventHeader}`}>
        Gallery
      </div>
      <div>
        {events?.map((items, i) => {
          return (
            <ul
              className={`${"grid gridFourCol"} ${styles.eventGallery}`}
              key={items}
            >
              {items.sababu?.map((event) => (
                <li className={styles.eventGalleryItem} key={event.id}>
                  <img src={event.img} alt="" />
                  <div className={styles.gallery}>
                    <h4>
                      <strong>{event.subject} </strong>
                    </h4>
                    <div className={styles.galleryDetails}>
                      <div className={styles.galleryType}>Meeting</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          );
        })}
      </div>
    </section>
  );
}

export default Gallery;
