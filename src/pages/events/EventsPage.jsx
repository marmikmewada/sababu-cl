import { useEffect } from "react";
import { useMembers } from "../../components/contexts/MemberContext";
// import CommunityEvents from "../../components/NotNeeded/CommunityEvents";
// import SababuEvents from "../../components/NotNeeded/SababuEvents";
import AppNav from "../../components/AppNav";
import Footer from "../../components/Footer";
import Calendar from "../../components/Calendar";
import Loading from "../../components/Loading";

import styles from "./EventsPage.module.css";
import { useEvents } from "../../components/contexts/EventsContext";
// import Events from "../../components/Events";

function EventsPage() {
  const { events, getEvents } = useEvents();
  const { isLoading } = useMembers();

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  console.log(events);

  if (isLoading) return <Loading />;
  return (
    <main>
      <AppNav />
      <EventHeader />
      <div className={`${"section sectionLayout"}`}>
        <Events />
      </div>
      {/* <SababuEvents /> */}
      {/* <Calendar /> */}
      {/* <CommunityEvents /> */}
      <Footer />
    </main>
  );
}

function EventHeader() {
  return (
    <section className={`${"section sectionLayout"} ${styles.eventMain}`}>
      <p className={`${"intro"}`}>Events intro</p>
      <div className={styles.eventDesc}>
        <div className={styles.mainDesc}>
          <h2 className={`${"headingSecondary"}`}>Join Us</h2>
          <p>
            {/* This page serves as the digital gateway to an exciting and
            informative experience.  */}
            Here, you will find all the essential details about our past and
            upcoming events, from community gatherings to special initiatives.
            We have designed this page to be your one-stop destination for event
            information, making it effortless for you to explore, register, and
            participate in the activities that resonate with our mission, vision
            and objectives. Whether you are seeking opportunities to engage,
            learn, or celebrate, our event page is your key to staying connected
            with Sababu Fund's vibrant community. Join us in shaping memorable
            moments and meaningful connections at our upcoming events!
          </p>
        </div>
      </div>
    </section>
  );
}

export default EventsPage;
