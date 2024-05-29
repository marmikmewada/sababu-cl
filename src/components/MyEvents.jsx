import React, { useState } from "react";
import { useEvents } from "./contexts/EventsContext";
import Button from "./Button";

import styles from "../pages/profile/ProfilePage.module.css";

//
const MyEvents = () => {
  const { myEvents } = useEvents();
  const [showModal, setShowModal] = useState(false);

  const handleEditEvent = (event) => {
    console.log(event);
    setShowModal(true);
  };

  //
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // console.log(formData);
  const renderModal = () => {
    if (!showModal) return null;
    // Render your modal component with specific form fields for the selected category
    return (
      <Modal className={styles.eventModal}>
        <h3 className={`${"headingTertiary"} ${styles.modalHeader}`}>
          Add Event
        </h3>
        <EventForm
          closeModal={closeModal}
          showModal={showModal}
          setShowModal={setShowModal}
        />
        <button onClick={closeModal} className={styles.modalCloseBtn}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </Modal>
    );
  };

  //
  return (
    <div className={styles.myEvents}>
      <div className={styles.eventHeader}>
        <div>
          <h2>Events</h2>{" "}
          <Button type="memberBtnOutline" onClick={() => openModal()}>
            Add
          </Button>
        </div>
        <span>My Events</span>
      </div>
      <div className={styles.events}>
        <div className={styles.eventStats}>
          All:<span> (2)</span> | Published:<span> (0)</span>
        </div>
        <ul className={styles.myEventsList}>
          <li className={styles.eventListItem}>
            <div className={styles.itemHeader}>
              <div>Event</div>
              <div>Venue</div>
              <div>Date</div>
              <div>Start</div>
              <div>End</div>
              <div>Status</div>
              <div>Apt</div>
              <div>Action</div>
            </div>
          </li>
          {myEvents ? (
            myEvents.map((event) => (
              <MyEventItem
                event={event}
                key={event.id}
                handleEditEvent={handleEditEvent}
              />
            ))
          ) : (
            <p>You do not have events to display. Create the first one</p>
          )}
        </ul>
        <div className={styles.eventShowing}>
          <span>Showing: 1 - 2 / 2</span>
        </div>
      </div>
      {renderModal()}
    </div>
  );
};

export default MyEvents;

const MyEventItem = ({ event, handleEditEvent }) => {
  const { deleteEventById } = useEvents();
  const [isEditingEvent, setIsEditingEvent] = useState(false);

  const { id } = event;

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(id);
    await deleteEventById(id);
  };

  const handleEditClick = (event) => {
    console.log(event);
    handleEditEvent(event);
  };

  return (
    <>
      <li key={event.id} className={styles.eventListItem}>
        <div className={styles.itemRow}>
          <div>{event.event}</div>
          <div>{event.venue}</div>
          <div>{event.start_date}</div>
          <div>{event.start_time}</div>
          <div>{event.end_time}</div>
          <div>{event.published ? "Yes" : "No"}</div>
          <div>
            {event.signups.length}/{event.capacity}
          </div>
          <div className={styles.eventAction}>
            <button onClick={() => handleEditClick(event)}>
              <i className="fa-solid fa-pencil"></i>
            </button>
            <button onClick={handleClick}>
              <i className="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
        {isEditingEvent && (
          <EditEvent event={event} setIsEditingEvent={setIsEditingEvent} />
        )}
      </li>
    </>
  );
};

//
const EventForm = ({ closeModal, setShowModal }) => {
  const { createEvent } = useEvents();
  //
  const [formData, setFormData] = useState({
    event_type: "",
    description: "",
    venue: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    organizer_name: "",
    capacity: "",
    event: "",
    organization: "",
    organizer_phone: "",
    organizer_email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass form data to onSubmit function provided by parent component
    createEvent(formData);
    setShowModal(false);
    console.log(formData);
  };

  return (
    <div className={styles.eventForm}>
      <form onSubmit={handleSubmit}>
        <div className={`${styles.twoColumn}`}>
          <div>
            <label htmlFor="event_type">Type:</label>
            <select
              type="text"
              id="event_type"
              name="event_type"
              value={formData.event_type || ""}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="award ceremony">Award Ceremony</option>
              <option value="anniversary">Anniversary</option>
              <option value="birthday">Birthday Party</option>
              <option value="baby shower">Baby Showers</option>
              <option value="bridal shower">Bridal Shower</option>
              <option value="bridal shower">Charity Fundraiser</option>
              <option value="conference">Conference</option>
              <option value="cookout">Cookout</option>
              <option value="concert">Concert</option>
              <option value="cultural Workshop">Cultural Workshop</option>
              <option value="music festival">Music Festival</option>
              <option value="festival">Festival</option>
              <option value="film screening">Film Screening</option>
              <option value="funeral">Funeral</option>
              <option value="graduation ceremony">Graduation Ceremony</option>
              <option value="meeting">Meeting</option>
              <option value="networking event">Network Event</option>
              <option value="picnic">Picnic</option>
              <option value="wedding">Wedding</option>
              <option value="religeous ceremony">Religeous Ceremony</option>
              <option value="seminar">Seminar</option>
              <option value="wedding anniversary">Wedding Anniversary</option>
              <option value="sports game">Sports Games</option>
              <option value="memorial service">Memorial Service</option>
              <option value="family reunion">Family Reunion</option>
              <option value="family vacation">Family Vacation</option>
            </select>
          </div>
          <div>
            <label htmlFor="capacity">Expected capacity:</label>
            <input
              type="text"
              id="capacity"
              name="capacity"
              value={formData?.capacity || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={``}>
          <div className={``}>
            <div>
              <label htmlFor="event">Title:</label>
              <input
                type="text"
                id="event"
                name="event"
                maxLength={25}
                value={formData.event || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className={``}></div>

          <div className={`${styles.twoColumn}`}>
            <div>
              <label htmlFor="start_date">Start Date:</label>

              <input
                type="text"
                id="start_date"
                name="start_date"
                value={formData?.start_date || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="start_time">Start Time:</label>
              <input
                type="text"
                id="start_time"
                name="start_time"
                value={formData?.start_time || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={`${styles.twoColumn}`}>
            <div>
              <label htmlFor="end_date">End Date:</label>
              <input
                type="text"
                id="end_date"
                name="end_date"
                value={formData?.end_date || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="end_time">End Time:</label>
              <input
                type="text"
                id="end_time"
                name="end_time"
                value={formData?.end_time || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="description">Describe Event:</label>
            <textarea
              type="text"
              id="description"
              name="description"
              maxLength={50}
              value={formData.description || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <h2>Venue</h2>
          <div className={``}>
            <div>
              <label htmlFor="venue">Venue name:</label>
              <input
                type="text"
                id="venue"
                name="venue"
                value={formData.venue || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={``}>
            <div>
              <label htmlFor="street">Street:</label>
              <input
                type="text"
                id="street"
                name="street"
                value={formData.street || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData?.city || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className={`${styles.twoColumn}`}>
            <div>
              <label htmlFor="state">State:</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData?.state || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="zip">Zip:</label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={formData?.zip || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        {/*  */}

        <div className={``}>
          <h2>Organizer</h2>
          <div className={` `}>
            <div>
              <label htmlFor="organizer_name">Name:</label>
              <input
                type="text"
                id="organizer_name"
                name="organizer_name"
                value={formData?.organizer_name || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="organization">Organization/Association:</label>
              <input
                type="text"
                id="organization"
                name="organization"
                value={formData?.organization || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className={`${styles.twoColumn}`}>
            <div>
              <label htmlFor="organizer_phone">Phone:</label>
              <input
                type="text"
                id="organizer_phone"
                name="organizer_phone"
                value={formData.organizer_phone || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="organizer_email">Email:</label>
              <input
                type="text"
                id="organizer_email"
                name="organizer_email"
                value={formData.organizer_email || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className={styles.btnContainer}>
          <Button type="memberBtnOutline" onClick={() => closeModal()}>
            Cancel
          </Button>
          <Button type="memberBtn">Save</Button>
        </div>
      </form>
    </div>
  );
};

const EditEvent = ({ event, setIsEditingEvent }) => {
  const [editEvent, setEditEvent] = useState(event);
  console.log(event);

  //
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditEvent({ ...editEvent, [name]: [value] });
  };

  console.log(editEvent);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass form data to onSubmit function provided by parent component
    setIsEditingEvent(false);
    console.log(editEvent);
  };

  return (
    <div className={styles.eventForm}>
      <h3>Edit Event</h3>
      <form onSubmit={handleSubmit}>
        <div className={`${styles.twoColumn}`}>
          <div>
            <label htmlFor="event_type">Type:</label>
            <select
              type="text"
              id="event_type"
              name="event_type"
              value={editEvent.event_type || ""}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="award ceremony">Award Ceremony</option>
              <option value="anniversary">Anniversary</option>
              <option value="birthday">Birthday Party</option>
              <option value="baby shower">Baby Showers</option>
              <option value="bridal shower">Bridal Shower</option>
              <option value="bridal shower">Charity Fundraiser</option>
              <option value="conference">Conference</option>
              <option value="cookout">Cookout</option>
              <option value="concert">Concert</option>
              <option value="cultural Workshop">Cultural Workshop</option>
              <option value="music festival">Music Festival</option>
              <option value="festival">Festival</option>
              <option value="film screening">Film Screening</option>
              <option value="funeral">Funeral</option>
              <option value="graduation ceremony">Graduation Ceremony</option>
              <option value="meeting">Meeting</option>
              <option value="networking event">Network Event</option>
              <option value="picnic">Picnic</option>
              <option value="wedding">Wedding</option>
              <option value="religeous ceremony">Religeous Ceremony</option>
              <option value="seminar">Seminar</option>
              <option value="wedding anniversary">Wedding Anniversary</option>
              <option value="sports game">Sports Games</option>
              <option value="memorial service">Memorial Service</option>
              <option value="family reunion">Family Reunion</option>
              <option value="family vacation">Family Vacation</option>
            </select>
          </div>
          <div>
            <label htmlFor="capacity">Expected capacity:</label>
            <input
              type="text"
              id="capacity"
              name="capacity"
              value={editEvent?.capacity || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={``}>
          <div className={``}>
            <div>
              <label htmlFor="event">Title:</label>
              <input
                type="text"
                id="event"
                name="event"
                maxLength={25}
                value={editEvent.event || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className={``}></div>

          <div className={`${styles.twoColumn}`}>
            <div>
              <label htmlFor="start_date">Start Date:</label>

              <input
                type="text"
                id="start_date"
                name="start_date"
                value={editEvent?.start_date || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="start_time">Start Time:</label>
              <input
                type="text"
                id="start_time"
                name="start_time"
                value={editEvent?.start_time || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={`${styles.twoColumn}`}>
            <div>
              <label htmlFor="end_date">End Date:</label>
              <input
                type="text"
                id="end_date"
                name="end_date"
                value={editEvent?.end_date || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="end_time">End Time:</label>
              <input
                type="text"
                id="end_time"
                name="end_time"
                value={editEvent?.end_time || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="description">Describe Event:</label>
            <textarea
              type="text"
              id="description"
              name="description"
              maxLength={50}
              value={editEvent.description || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <h2>Venue</h2>
          <div className={``}>
            <div>
              <label htmlFor="venue">Venue name:</label>
              <input
                type="text"
                id="venue"
                name="venue"
                value={editEvent.venue || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={``}>
            <div>
              <label htmlFor="street">Street:</label>
              <input
                type="text"
                id="street"
                name="street"
                value={editEvent.street || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={editEvent?.city || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className={`${styles.twoColumn}`}>
            <div>
              <label htmlFor="state">State:</label>
              <input
                type="text"
                id="state"
                name="state"
                value={editEvent?.state || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="zip">Zip:</label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={editEvent?.zip || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        {/*  */}

        <div className={``}>
          <h2>Organizer</h2>
          <div className={` `}>
            <div>
              <label htmlFor="organizer_name">Name:</label>
              <input
                type="text"
                id="organizer_name"
                name="organizer_name"
                value={editEvent?.organizer_name || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="organization">Organization/Association:</label>
              <input
                type="text"
                id="organization"
                name="organization"
                value={editEvent?.organization || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className={`${styles.twoColumn}`}>
            <div>
              <label htmlFor="organizer_phone">Phone:</label>
              <input
                type="text"
                id="organizer_phone"
                name="organizer_phone"
                value={editEvent.organizer_phone || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="organizer_email">Email:</label>
              <input
                type="text"
                id="organizer_email"
                name="organizer_email"
                value={editEvent.organizer_email || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className={styles.btnContainer}>
          <Button
            type="memberBtnOutline"
            onClick={() => setIsEditingEvent(false)}
          >
            Cancel
          </Button>
          <Button type="memberBtn">Save</Button>
        </div>
      </form>
    </div>
  );
};

// Modal.js
const Modal = ({ children, onClose }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.eventModalContent}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
