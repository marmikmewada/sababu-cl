import React, { useState } from "react";
import styles from "./MySababu.module.css";
import { NavLink } from "react-router-dom";
import TabNavItem from "../components/TabNavItem";
import TabContent from "../components/TabContent";

function MySababu({ newData }) {
  return (
    <section className={` ${styles.profilePage}`}>
      <ProfileMenu />
      <ProfileContent newData={newData} />
    </section>
  );
}

export default MySababu;

//
function ProfileContent({ newData }) {
  return (
    <div className={styles.main}>
      <div>
        <ProfileBanner />
      </div>
      <div className={styles.profileContent}>
        <ProfileDemographics />
        <ProfileActivity newData={newData} />
      </div>
    </div>
  );
}

function ProfileMenu({ id }) {
  const [activeTab, setActiveTab] = useState("tab1");

  //
  return (
    <div className={styles.profileMenuContent}>
      <ul className={styles.profileMenu}>
        <li className={styles.progileLogo}>
          <NavLink>
            <img src="/logo-nobackground-200.png" alt="Sababu fund logo" />
          </NavLink>
        </li>
        <TabNavItem
          className={styles.profileMenuItem}
          title={
            <NavLink>
              <div>
                <i className="fa-solid fa-square-poll-vertical"></i>
                <div>Overview</div>
              </div>
            </NavLink>
          }
          id="tab1"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabNavItem
          className={styles.profileMenuItem}
          title={
            <NavLink>
              {" "}
              <div>
                <i className="fa-solid fa-users"></i>
                <div>Household</div>
              </div>
            </NavLink>
          }
          id="tab1"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabNavItem
          className={styles.profileMenuItem}
          title={
            <NavLink>
              <div>
                <i className="fa-solid fa-calendar-days"></i>
                <div>Calendar</div>
              </div>
            </NavLink>
          }
          id="tab1"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabNavItem
          className={styles.profileMenuItem}
          title={
            <NavLink>
              {" "}
              <div>
                <i className="fa-solid fa-users-rectangle"></i>
                <div>Members</div>
              </div>
            </NavLink>
          }
          id="tab1"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabNavItem
          className={`${styles.profileMenuItem}`}
          title={
            <NavLink>
              <div>
                <i className="fa-solid fa-gear"></i>
                <div>Setup</div>
              </div>
            </NavLink>
          }
          id="tab1"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </ul>
    </div>
  );
}

function ProfileBanner() {
  return (
    <div className={styles.profileBanner}>
      <h3>Member Profile</h3>
      <div className={styles.logoutBtn}>
        <NavLink to="/">
          <i className="fa-solid fa-right-from-bracket"></i>
          <span>Logout</span>
        </NavLink>
      </div>
    </div>
  );
}

function ProfileDemographics() {
  return (
    <div className={styles.profile}>
      <div>
        <div className={styles.profileImg}>
          <img
            className={styles.memberImg}
            src="/images/sb-member-img-1.jpg"
            alt="Profile avatar of member"
          />
        </div>
        <div className={styles.nameTag}>
          <h3 className={styles.name}>Kadijah Tarawally</h3>
          <p className={styles.memberType}>Single Family</p>
        </div>
      </div>
      <div className={styles.memberDetails}>
        <div className={styles.contact}>
          <div className={styles.emailTag}>
            <label>Email</label>
            <div className={styles.email}>example@gmail.com</div>
          </div>
          <div className={styles.genderTag}>
            <label>Gender</label>
            <div className={styles.gender}>Female</div>
          </div>
          <div className={styles.cityStateTag}>
            <label>City and State</label>
            <div className={styles.cityState}>Herndon VA.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileActivity({ newData }) {
  return (
    <div className={styles.profileActivityContainer}>
      <div className={styles.highlights}>
        <div className={styles.contributions}>
          <div className={styles.total}>
            <span className={styles.allPayments}>3</span>
            <div className={styles.totalDesc}>
              <span>Payments</span>
              <span className={styles.amount}>$ 232</span>
            </div>
          </div>
          <div className={styles.progressIcons}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <div>
              <i className="fa-solid fa-chart-column"></i>
            </div>
          </div>
        </div>

        <div className={styles.contributions}>
          <div className={styles.total}>
            <span className={styles.allRenewal}>2</span>
            <div className={styles.totalDesc}>
              <span>Renewals</span>
              <span className={styles.amount}>$ 40</span>
            </div>
          </div>
          <div className={styles.progressIcons}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <div>
              <i className="fa-solid fa-chart-column"></i>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.profilePrograms}>
        <h3 className={`{'headingTertiary}`}>Programs and other contents</h3>
        <PaymentTabs />
      </div>
      <div className={styles.profilePrograms}>
        <h3 className={`${"headingTertiary"}`}>Events and Programs</h3>
        <EventTabs />
      </div>
    </div>
  );
}

function PaymentTabs() {
  const [activeTab, setActiveTab] = useState("tab1");
  return (
    <div className={styles.Tabs}>
      <ul className={styles.tabNav}>
        <TabNavItem
          title={
            <>
              <i className="fa-solid fa-calendar-days"></i>
              <span>Contributions</span>
            </>
          }
          id="tab1"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <TabNavItem
          title={
            <>
              <i className="fa-solid fa-asterisk"></i>
              <span>Renewals</span>
            </>
          }
          id="tab2"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <TabNavItem
          title={
            <>
              <i className="fa-solid fa-id-card"></i>
              <span>Membership</span>
            </>
          }
          id="tab3"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </ul>
      <div className={styles.outlet}>
        <TabContent id="tab1" activeTab={activeTab}>
          Contribution
        </TabContent>
        <TabContent id="tab2" activeTab={activeTab}>
          Renewals
        </TabContent>
        <TabContent id="tab3" activeTab={activeTab}>
          Membership
        </TabContent>
      </div>
    </div>
  );
}

function EventTabs() {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div className={styles.Tabs}>
      <ul className={styles.tabNav}>
        <TabNavItem
          title={
            <>
              <i className="fa-solid fa-calendar-days"></i>
              <span>Calendar</span>
            </>
          }
          id="tab1"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <TabNavItem
          title={
            <>
              <i className="fa-solid fa-asterisk"></i>
              <span>All Events</span>
            </>
          }
          id="tab2"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <TabNavItem
          title={
            <>
              <i className="fa-solid fa-image"></i>
              <span>Gallery</span>
            </>
          }
          id="tab3"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </ul>
      <div className={styles.outlet}>
        <TabContent id="tab1" activeTab={activeTab}>
          Calendar
        </TabContent>
        <TabContent id="tab2" activeTab={activeTab}>
          All Events
        </TabContent>
        <TabContent id="tab3" activeTab={activeTab}>
          Gallery
        </TabContent>
      </div>
    </div>
  );
}
