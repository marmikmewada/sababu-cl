import React from "react";
import styles from "./AdminPage.module.css";
import { Outlet, Route, Routes } from "react-router-dom";
import UsersManagement from "./UsersManagement";
import MembersManagement from "./MembersManagement";
import { Link } from "react-router-dom";
import CommentsManagement from "./CommentsManagement";
import EventsManagement from "./EventsManagement";

function AdminPage() {
  return <AdminRoutes />;
}
export default AdminPage;

function AdminRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="users-management" element={<UsersManagement />} />
        <Route path="members-management" element={<MembersManagement />} />
        <Route path="comments-management" element={<CommentsManagement />} />
        <Route path="events-management" element={<EventsManagement />} />
        {/* <Route path="members-management" element={<UsersManagement />} /> */}
      </Routes>
      <Outlet />
    </>
  );
}

function Dashboard() {
  return (
    <div className="admin-dashboard">
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Admin Dashboard</h1>
        </header>

        <nav className={styles.navbar}>
          <ul>
            <li>
              <Link to="#">Dashboard</Link>
            </li>
            <li>
              <Link to="users-management">Users</Link>
            </li>
            <li>
              <Link to="members-management">Members</Link>
            </li>
            <li>
              <Link to="comments-management">Comments</Link>
            </li>
            <li>
              <Link to="events-management">Events</Link>
            </li>
            <li>
              <Link to="volunteers-management">Volunters</Link>
            </li>
            <li>
              <Link to="donors-management">Donors</Link>
            </li>
            <li>
              <Link to="donations-management">Donations</Link>
            </li>
            <li>
              <Link to="contributions-management">Contributions</Link>
            </li>
            <li>
              <Link to="blogs-management">Blogs</Link>
            </li>

            <li>
              <Link to="settings">Settings</Link>
            </li>
            <li>
              <Link to="permissions">Permissions</Link>
            </li>
            {/* <li>
              <Link to="#notifications-and-alerts">Notifications and Alerts</=>
            </li> */}
            {/* <li>
              <Link to="#backup-and-recovery">Backup and Recovery</=>
            </li> */}
            {/* <li>
              <a href="#system-maintenance">System Maintenance</a>
            </li> */}
          </ul>
        </nav>

        {/* <section className="section">
          <UsersManagement />
        </section>

        <section className="section">
          <MembersManagement />
        </section> */}

        {/* <section className="section">
          <h2>Events Management</h2>
          CRUD functionality for events
        </section>

        <section className="section">
          <h2>Volunteers Management</h2>
          CRUD functionality for volunteers
        </section>

        <section className="section">
          <h2>Donors Management</h2>
          CRUD functionality for donors
        </section>

        <section className="section">
          <h2>Donations Management</h2>
          CRUD functionality for donations
        </section>

        <section className="section">
          <h2>Contributions Management</h2>
          CRUD functionality for contributions
        </section>

        <section className="section">
          <h2>Blogs Management</h2>
          CRUD functionality for blogs
        </section>

        <section className="section">
          <h2>Comments Management</h2>
          CRUD functionality for comments
        </section> */}

        {/* <section className="section">
          <h2>Likes Management</h2>
          CRUD functionality for likes
        </section> */}

        {/* <section className="section">
          <h2>Households Management</h2>
          CRUD functionality for households
        </section> */}
      </div>
    </div>
  );
}
