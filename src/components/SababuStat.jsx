import styles from "./SababuStat.module.css";

function SababuStat() {
  return (
    <section className={`${"section sectionLayout"} ${styles.statSection}`}>
      <p className={`${"intro"}`}>The journey so far</p>
      <div className={`${"grid"} ${"gridFourCol"} ${styles.stats}`}>
        <div className={`${styles.statsDetails} ${styles.registered}`}>
          <span>Current Membership</span>
          <div>
            <h3 className={`${"headingPrimary"}`}>75</h3>
            <p>Registered members in less than a year.</p>
          </div>
        </div>
        <div className={`${styles.statsDetails} ${styles.households}`}>
          <span>Active Participants</span>
          <div>
            <h3 className={`${"headingPrimary"}`}>120</h3>
            <p>Members and families in the program.</p>
          </div>
        </div>
        <div className={`${styles.statsDetails} ${styles.contritions}`}>
          <span>Funds raised</span>
          <div>
            <h3 className={`${"headingPrimary"}`}>$5K</h3>
            <p>In under one year from membership.</p>
          </div>
        </div>
        <div className={`${styles.statsDetails} ${styles.volunteers}`}>
          <span>Volunteers</span>
          <div>
            <h3 className={`${"headingPrimary"}`}>10</h3>
            <p>Committed to advance the cause, mission and vision.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SababuStat;
