// import React, { useEffect } from "react";
// import Pagination from "./Pagination";

// import styles from "./Events.module.css";
// import { useMembers } from "./contexts/MemberContext";
// import Loading from "./Loading";
// import Event from "./Event";
// import { useEvents } from "./contexts/EventsContext";

// function Events() {
//   const { getEvents, events } = useEvents();
//   const { isLoading } = useMembers();
//   const itemsPerPage = 4;
//   const pageNumberLimit = 5;

//   useEffect(() => {
//     getEvents();
//   }, [getEvents]);

//   console.log(events);

//   if (isLoading) return <Loading />;

//   return (
//     <section className={`${styles.secondEventTab}`}>
//       <div className={`${styles.eventHeader}`}></div>
//       <Pagination
//         items={events}
//         renderFunction={RenderEvents}
//         itemsPerPage={itemsPerPage}
//         pageNumberLimit={pageNumberLimit}
//       />
//     </section>
//   );
// }

// export default Events;

// function RenderEvents(events) {
//   return (
//     <div className={styles.eventContainer}>
//       <ul>
//         {events?.map((event) => (
//           <Event key={event.id} event={event} />
//         ))}
//       </ul>
//     </div>
//   );
// }

// // function Event({ event }) {
// //   return (
// //     <li>
// //       <div className={styles.eventDate}>
// //         <div className={styles.month}>{splitDate(event.event_date).month}</div>
// //         <div className={styles.day}>{splitDate(event.event_date).day}</div>

// //         <div className={styles.year}>{splitDate(event.event_date).year}</div>
// //       </div>
// //       <div className={styles.eventDetails}>
// //         <div>
// //           <div className={styles.tag}>{titleCase(event.event_type)}</div>
// //           <div className={styles.eventTitle}>{event.event}</div>
// //         </div>
// //         <div className={styles.timeAndVenue}>
// //           <div className={styles.dateAndTime}>
// //             <span>{splitDate(event.event_date).weekday} </span>
// //             <span>{splitDate(event.event_date).month} </span>
// //             <span>{splitDate(event.event_date).day}, </span>
// //             <span>{splitDate(event.event_date).year} </span>
// //             <span>{/* {event.start_time} - {event.end_time} */}</span>
// //           </div>
// //           <div className={styles.venue}>
// //             <span>{titleCase(event.venue)}</span>
// //             <span className={styles.address}>
// //               {titleCase(event.street)}, {titleCase(event.city)}, {event.state}.{" "}
// //               {event.zip}.
// //             </span>
// //           </div>
// //         </div>
// //         <div className={styles.organizer}>
// //           <span>Host: {event.organizer_name}</span>{" "}
// //           <button onClick={""}>Sign up</button>
// //         </div>
// //       </div>
// //     </li>
// //   );
// // }

// // function titleCase(str) {
// //   return str.toLowerCase().replace(/\b\w/g, function (char) {
// //     return char.toUpperCase();
// //   });
// // }

// // function splitDate(dateString) {
// //   const dateObject = new Date(dateString + "T12:00:00Z"); // Set time to noon (12:00 PM) in UTC
// //   const options = {
// //     year: "numeric",
// //     month: "short",
// //     day: "numeric",
// //     weekday: "short",
// //   };
// //   const formattedDate = dateObject.toLocaleDateString("en-US", options);
// //   const [weekday, month, day, year] = formattedDate.split(" ");
// //   return { year: parseInt(year), month, day: parseInt(day), weekday };
// // }
