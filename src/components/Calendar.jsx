// EventCalendar.js
import React, { useState } from "react";
import moment from "moment";
import styles from "./Calendar.module.css";
import { useMembersContext } from "./contexts/MembersContext";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(moment());
  const { customers } = useMembersContext();
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    venue: "",
    description: "",
  });

  const [hoveredEvent, setHoveredEvent] = useState(null);
  const events = customers.events;

  const renderHeader = () => {
    const dateFormat = "MMMM YYYY";
    return (
      <div className={styles.header}>
        <button className={styles.prev} onClick={prevMonth}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div className={styles.currentDate}>
          {currentDate.format(dateFormat)}
        </div>
        <button className={styles.next} onClick={nextMonth}>
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const dayNames = moment.weekdaysShort();
    return dayNames.map((day) => (
      <div key={day} className={styles.day}>
        {day}
      </div>
    ));
  };

  const renderCells = () => {
    const monthStart = moment(currentDate).startOf("month");
    const monthEnd = moment(currentDate).endOf("month");
    const startDate = moment(monthStart).startOf("week");
    const endDate = moment(monthEnd).endOf("week");

    const rows = [];
    let days = [];
    let day = startDate;

    while (day.isBefore(endDate)) {
      const formattedDay = day.format("YYYY-MM-DD");
      // console.log("Formatted Date:", formattedDay.format("YYYY-MM-DD"));

      const eventsArray = events && Array.isArray(events) ? events : [];
      const sababuEvents =
        eventsArray.length > 0 && eventsArray[0].sababu
          ? eventsArray[0].sababu
          : [];

      for (let i = 0; i < 7; i++) {
        const cloneDay = day.clone();

        const matchingEvents = sababuEvents.filter((event) => {
          const eventDate = moment(event.date, "YYYY-MM-DD");
          return eventDate.isSame(formattedDay, "day");
        });

        days.push(
          <div
            key={day}
            className={`${styles.cell} ${
              !isCurrentMonth(day) ? styles.disabled : ""
            } ${day.isSame(moment(), "day") ? styles.today : ""}`}
            onClick={() => handleDayClick(cloneDay)}
            onMouseEnter={() => handleMouseEnter(cloneDay)}
            onMouseLeave={handleMouseLeave}
          >
            <span>{day.format("D")}</span>
            {matchingEvents?.map((event) => console.log(event.tag))}
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
  };

  const isCurrentMonth = (day) => {
    return day.isSame(currentDate, "month");
  };

  const prevMonth = () => {
    setCurrentDate(moment(currentDate).subtract(1, "month"));
  };

  const nextMonth = () => {
    setCurrentDate(moment(currentDate).add(1, "month"));
  };
  function handleDayClick(day) {
    // const formattedDay = day.format("YYYY-MM-DD");

    setShowAddEventModal(true);

    // Show modal or implement other functionality as needed
  }

  const handleAddEvent = () => {
    setShowAddEventModal(false);
  };

  function handleCancelEvent() {
    setShowAddEventModal(false);
  }

  const handleMouseEnter = (day) => {
    // const formattedDay = day.format("YYYY-MM-DD");
    // setHoveredEvent(event || null);
  };

  const handleMouseLeave = () => {
    setHoveredEvent(null);
  };

  const [showAddEventModal, setShowAddEventModal] = useState(false);

  return (
    <div className={`${"section sectionLayout"} ${styles.eventCalendar}`}>
      {renderHeader()}
      <div className={styles.days}>{renderDays()}</div>
      <div className={styles.calendar}>{renderCells()}</div>

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
          <label>Venue:</label>
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
          <div className={styles.modalButtons}>
            <button onClick={handleAddEvent}>
              {newEvent.title ? "Save Changes" : "Add Event"}
            </button>
            <button onClick={handleCancelEvent}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;
