import { useState } from "react";
import moment from "moment";
import styles from "./SababuCalendar.module.css";

function SababuCalendar() {
  return (
    <section className={`${"section sectionLayout"}`}>
      <Calendar />
    </section>
  );
}

function Calendar() {
  const [currentDate, setCurrentDate] = useState(moment());
  const [selectedDate, setSelectedDate] = useState(moment());
  const [events, setEvents] = useState([]);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    venue: "",
    description: "",
  });

  //
  function Header() {
    const dateFormat = "MMMM YYYY";
    return (
      <div className={styles.header}>
        <div className={styles.prev} onClick={prevMonth}>
          <i className="fa-solid fa-chevron-left"></i>
        </div>
        <div className={styles.currentDate}>
          {currentDate.format(dateFormat)}
        </div>
        <div className={styles.next} onClick={nextMonth}>
          {" "}
          <i className="fa-solid fa-chevron-right"></i>
        </div>
      </div>
    );
  }

  function Days() {
    const dayNames = moment.weekdaysShort();
    return dayNames.map((day) => (
      <div key={day} className={styles.day}>
        {day}
      </div>
    ));
  }

  function Cells() {
    const monthStart = moment(currentDate).startOf("month");
    const monthEnd = moment(currentDate).endOf("month");
    const startDate = moment(monthStart).startOf("week");
    const endDate = moment(monthEnd).endOf("week");

    const rows = [];
    let days = [];
    let day = startDate;

    while (day.isBefore(endDate)) {
      // const formattedDay = day.format("YYYY-MM-DD");
      // const eventExists = events.find((event) => event.date === formattedDay);

      for (let i = 0; i < 7; i++) {
        const cloneDay = day.clone();
        //
        days.push(
          <div
            key={day}
            className={`${styles.cell} ${
              !isCurrentMonth(day) ? styles.disabled : ""
            } ${day.isSame(currentDate, "day") ? styles.today : ""}`}
            onClick={() => handleSelectedDay(cloneDay)}
            onMouseEnter={() => handleMouseEnter(cloneDay)}
            onMouseLeave={handleMouseLeave}
          >
            <span>{day.format("D")}</span>
          </div>
        );
        day = day.add(1, "day");
      }

      rows.push(
        <div key={day} className={styles.week}>
          {days}
        </div>
      );
      days = [];
    }

    return rows;
  }

  function isCurrentMonth(day) {
    return day.isSame(currentDate, "month");
  }

  function prevMonth() {
    setCurrentDate(moment(currentDate).subtract(1, "month"));
  }

  function nextMonth() {
    setCurrentDate(moment(currentDate).add(1, "month"));
  }

  //Add event to calendar
  function handleSelectedDay(day) {
    // console.log("selected", selectedDate);

    console.log(day);
    setShowAddEventModal(true);
  }

  function handleCancelDayClick(day) {
    setShowAddEventModal(false);
  }

  // View event on calendar
  function handleMouseEnter(day) {
    setHoveredEvent(
      events.find((event) => moment(event.date).isSame(day, "day"))
    );
  }

  function handleMouseLeave() {
    setHoveredEvent(null);
  }

  return (
    <div className={styles.calendarContainer}>
      <h1>Sababu Calendar</h1>
      <div>{Header()}</div>
      <div className={styles.days}>{Days()}</div>
      <div className={styles.calendar}>{Cells()}</div>

      {hoveredEvent && (
        <div className={styles.eventDetailsModal}>
          <h2>Event Details</h2>
          <p>
            <strong>Title:</strong> {hoveredEvent.title}
          </p>
          <p>
            <strong>Date:</strong> {hoveredEvent.date}
          </p>
          <p>
            <strong>Time:</strong> {hoveredEvent.time}
          </p>
          <p>
            <strong>Venue:</strong> {hoveredEvent.venue}
          </p>
          <p>
            <strong>Description:</strong> {hoveredEvent.description}
          </p>
        </div>
      )}
      {showAddEventModal && (
        <div className={styles.addEventModal}>
          <h2>{newEvent.title ? "Edit Event" : "Add Event"}</h2>
          <label>Title:</label>
          <input
            type="text"
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
          />
          <label>Date:</label>
          <input
            type="text"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          />
          <label>Time:</label>
          <input
            type="text"
            value={newEvent.time}
            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
          />
          <label>Vemue:</label>
          <input
            type="text"
            value={newEvent.venue}
            onChange={(e) =>
              setNewEvent({ ...newEvent, venue: e.target.value })
            }
          />
          <label>Description:</label>
          <textarea
            value={newEvent.description}
            onChange={(e) =>
              setNewEvent({ ...newEvent, description: e.target.value })
            }
          />
          <div className={styles.addEventButtons}>
            <button>{newEvent.title ? "Save Changes" : "Add Event"}</button>
            <button onClick={handleCancelDayClick}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SababuCalendar;
