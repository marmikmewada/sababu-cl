// // EventCalendar.js
// import React, { useState } from "react";
// import moment from "moment";
// import "./EventCalendar.module.css";

// const EventCalendar = () => {
//   const [currentDate, setCurrentDate] = useState(moment());
//   const [events, setEvents] = useState([]);
//   const [showAddEventModal, setShowAddEventModal] = useState(false);
//   const [hoveredEvent, setHoveredEvent] = useState(null);
//   const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

//   const [newEventData, setNewEventData] = useState({
//     name: "",
//     subject: "",
//     tag: "",
//     venue: "",
//     organizer: "",
//     icon: "",
//     date: "",
//     time: "",
//   });

//   const renderHeader = () => {
//     return (
//       <div className="header">
//         <button onClick={prevMonth}>
//           <i className="fa-solid fa-chevron-left"></i>
//         </button>
//         <h1>{currentDate.format("MMMM YYYY")}</h1>
//         <button onClick={nextMonth}>
//           <i className="fa-solid fa-chevron-right"></i>
//         </button>
//       </div>
//     );
//   };

//   const renderDays = () => {
//     const weekdays = moment.weekdaysShort();
//     return weekdays.map((day, index) => (
//       <div key={index} className="day">
//         {day}
//       </div>
//     ));
//   };

//   const renderCells = () => {
//     const monthStart = moment(currentDate).startOf("month");
//     const monthEnd = moment(currentDate).endOf("month");
//     const startDay = moment(monthStart).startOf("week");
//     const endDay = moment(monthEnd).endOf("week");

//     const day = startDay.clone();
//     const calendarRows = [];

//     while (day.isBefore(endDay) || day.isSame(endDay)) {
//       const week = [];
//       for (let i = 0; i < 7; i++) {
//         const copyDay = moment(day);
//         week.push(
//           <div
//             key={copyDay.format("YYYY-MM-DD")}
//             className={`cell ${isCurrentMonth(copyDay) ? "" : "disabled"}`}
//             onClick={() => handleDayClick(copyDay)}
//           >
//             <span>{copyDay.format("D")}</span>
//             {renderEvents(copyDay)}
//           </div>
//         );
//         day.add(1, "day");
//       }
//       calendarRows.push(
//         <div key={day} className="week">
//           {week}
//         </div>
//       );
//     }

//     return calendarRows;
//   };

//   const isCurrentMonth = (day) => {
//     return day.isSame(currentDate, "month");
//   };

//   const prevMonth = () => {
//     setCurrentDate(moment(currentDate).subtract(1, "month"));
//   };

//   const nextMonth = () => {
//     setCurrentDate(moment(currentDate).add(1, "month"));
//   };

//   const handleDayClick = (day) => {
//     const formattedDay = day.format("YYYY-MM-DD");
//     const eventExists = events.find((event) => event.date === formattedDay);

//     if (eventExists) {
//       // Edit existing event
//       setNewEventData(eventExists);
//     } else {
//       // Add new event
//       setNewEventData({
//         name: "",
//         subject: "",
//         tag: "",
//         venue: "",
//         organizer: "",
//         icon: "",
//         date: formattedDay,
//         time: "",
//       });
//     }

//     setShowAddEventModal(true);
//   };

//   const handleAddEvent = () => {
//     const updatedEvents = events.filter(
//       (event) => event.date !== newEventData.date
//     );
//     setEvents([...updatedEvents, newEventData]);
//     setShowAddEventModal(false);
//   };

//   const handleMouseEnter = (event) => {
//     setHoveredEvent(event);

//     const { clientX, clientY } = event;
//     setModalPosition({ top: clientY, left: clientX });
//   };

//   const handleMouseLeave = () => {
//     setHoveredEvent(null);
//   };

//   const renderEvents = (day) => {
//     const formattedDay = day.format("YYYY-MM-DD");
//     const dayEvents = events.filter((event) => event.date === formattedDay);

//     return dayEvents.map((event, index) => (
//       <div
//         key={index}
//         className="event"
//         onClick={() => handleDayClick(day)}
//         onMouseEnter={() => handleMouseEnter(event)}
//         onMouseLeave={handleMouseLeave}
//       >
//         {event.name}
//       </div>
//     ));
//   };

//   return (
//     <div className="event-calendar">
//       {renderHeader()}
//       <div className="days">{renderDays()}</div>
//       <div className="calendar">{renderCells()}</div>

//       {showAddEventModal && (
//         <div className="add-event-modal">
//           <h2>{newEventData.name ? "Edit Event" : "Add Event"}</h2>
//           <label>Name:</label>
//           <input
//             type="text"
//             value={newEventData.name}
//             onChange={(e) =>
//               setNewEventData({ ...newEventData, name: e.target.value })
//             }
//           />
//           <label>Subject:</label>
//           <input
//             type="text"
//             value={newEventData.subject}
//             onChange={(e) =>
//               setNewEventData({ ...newEventData, subject: e.target.value })
//             }
//           />
//           <label>Tag:</label>
//           <input
//             type="text"
//             value={newEventData.tag}
//             onChange={(e) =>
//               setNewEventData({ ...newEventData, tag: e.target.value })
//             }
//           />
//           <label>Date:</label>
//           <input
//             type="text"
//             value={newEventData.date}
//             onChange={(e) =>
//               setNewEventData({ ...newEventData, date: e.target.value })
//             }
//           />
//           <label>Time:</label>
//           <input
//             type="text"
//             value={newEventData.time}
//             onChange={(e) =>
//               setNewEventData({ ...newEventData, time: e.target.value })
//             }
//           />
//           <label>Venue:</label>
//           <input
//             type="text"
//             value={newEventData.venue}
//             onChange={(e) =>
//               setNewEventData({ ...newEventData, venue: e.target.value })
//             }
//           />
//           <label>Organizer:</label>
//           <input
//             type="text"
//             value={newEventData.organizer}
//             onChange={(e) =>
//               setNewEventData({ ...newEventData, organizer: e.target.value })
//             }
//           />
//           <label>Icon:</label>
//           <input
//             type="text"
//             value={newEventData.icon}
//             onChange={(e) =>
//               setNewEventData({ ...newEventData, icon: e.target.value })
//             }
//           />
//           <button onClick={handleAddEvent}>
//             {newEventData.name ? "Save Changes" : "Add Event"}
//           </button>
//         </div>
//       )}

//       {/*  */}
//       {hoveredEvent && (
//         <div
//           className="event-details-modal"
//           style={{ top: modalPosition.top, left: modalPosition.left }}
//         >
//           <h2>Event Details</h2>
//           <p>
//             <strong>Name:</strong> {hoveredEvent.name}
//           </p>
//           <p>
//             <strong>Subject:</strong> {hoveredEvent.subject}
//           </p>
//           <p>
//             <strong>Tag:</strong> {hoveredEvent.tag}
//           </p>
//           <p>
//             <strong>Venue:</strong> {hoveredEvent.venue}
//           </p>
//           <p>
//             <strong>Organizer:</strong> {hoveredEvent.organizer}
//           </p>
//           <p>
//             <strong>Icon:</strong> {hoveredEvent.icon}
//           </p>
//           <p>
//             <strong>Date:</strong> {hoveredEvent.date}
//           </p>
//           <p>
//             <strong>Time:</strong> {hoveredEvent.time}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EventCalendar;
