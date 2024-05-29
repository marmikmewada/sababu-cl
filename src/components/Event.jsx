import React, { useCallback, useEffect, useState } from "react";
import styles from "./Event.module.css";
import supabase from "../../supabase";
import Button from "./Button";

function Event({ event }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [inputs, setInputs] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    city: "",
    state: "",
  });

  //Create sign up
  const createSignup = useCallback(
    async (formData) => {
      try {
        const event_id = event.id;
        const signupData = { ...formData, event_id };

        console.log(signupData, event_id);

        // Check if the event exists
        if (!event) {
          throw new Error("Invalid event ID");
        }

        //Insert the signup with the provided formData
        const { data, error } = await supabase
          .from("signups")
          .insert([signupData]);

        if (!data && error) {
          throw error;
        }
      } catch (error) {
        console.log("Error creating signup: ", error.message);
      }
    },
    [event]
  );

  //
  const handleEventSigup = () => {
    setIsSignUp(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //
    console.log(inputs);
    createSignup(inputs);
    setInputs({});
    setIsSignUp(false);
  };

  return (
    <>
      <li className={styles.eventList} key={event.id}>
        <div className={styles.eventDate}>
          <div className={styles.month}>
            {splitDate(event.start_date).month}
          </div>
          <div className={styles.day}>{splitDate(event.start_date).day}</div>
          <div className={styles.year}>{splitDate(event.start_date).year}</div>
        </div>
        <div className={styles.eventDetails}>
          <div>
            <div className={styles.tag}>{titleCase(event.event_type)}</div>
            <div className={styles.eventTitle}>{event.event}</div>
          </div>
          <div className={styles.timeAndVenue}>
            <div className={styles.dateAndTime}>
              <span>{splitDate(event.start_date).weekday} </span>
              <span>{splitDate(event.start_date).month} </span>
              <span>{splitDate(event.start_date).day}, </span>
              <span>{splitDate(event.start_date).year} </span>
              <span>{event.time} </span>
            </div>
            <div className={styles.venue}>
              <span>{titleCase(event.venue)}</span>
              <span className={styles.address}>{titleCase(event.street)},</span>
              <span>
                {titleCase(event.city)}, {event.state}. {titleCase(event.zip)}.
              </span>
            </div>
            <div className={styles.organizer}>
              <span>Host: {event.organizer_name}</span>{" "}
              <button onClick={handleEventSigup}>Sign up</button>
            </div>
          </div>
        </div>
      </li>
      {isSignUp && (
        <div className={`${styles.editProfileModal} ${styles.signupModal}`}>
          <div className={styles.modalContent}>
            <h3>Sign up</h3>
            <form>
              {/* Add form fields for editing profile information */}
              <div className={styles.twoEqualColumns}>
                <div>
                  <label htmlFor="first_name">First Name:</label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={inputs.first_name || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="last_name">Last Name:</label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={inputs.last_name || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={inputs.email || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="phone">Phone:</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={inputs.phone || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.twoUnequalColumns}>
                <div>
                  <label htmlFor="city">City:</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={inputs.city || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="state">State:</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={inputs.state || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <Button type="memberBtn" onClick={handleSubmit}>
                Save
              </Button>
              <Button type="memberBtn" onClick={() => setIsSignUp(false)}>
                Cancel
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Event;

function titleCase(str) {
  return str.toLowerCase().replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });
}

function splitDate(dateString) {
  const dateObject = new Date(dateString + "T12:00:00Z"); // Set time to noon (12:00 PM) in UTC
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "short",
  };
  const formattedDate = dateObject.toLocaleDateString("en-US", options);
  const [weekday, month, day, year] = formattedDate.split(" ");
  return { year: parseInt(year), month, day: parseInt(day), weekday };
}
