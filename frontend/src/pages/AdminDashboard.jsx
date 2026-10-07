import React from "react";
import AdminNavbar from "../components/AdminNavbar";

const AdminDashboard = () => {
  return (
    <>
      <AdminNavbar />

      <div className="admin-dashboard">
        <h1>Admin Dashboard</h1>
        <p>Manage EventSphere events from here.</p>

        <div className="admin-cards">
          <div className="admin-card">
            <h2>Events</h2>
            <p>View and manage all events.</p>
            <a href="/admin/events">Manage Events</a>
          </div>

          <div className="admin-card">
            <h2>Add Event</h2>
            <p>Create a new event.</p>
            <a href="/admin/events/add">Add Event</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;