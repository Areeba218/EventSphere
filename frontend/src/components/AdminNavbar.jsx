import React from "react";

const AdminNavbar = () => {
  return (
    <nav className="admin-navbar">
      <div className="admin-logo">EventSphere Admin</div>

      <div className="admin-nav-links">
        <a href="/admin">Dashboard</a>
        <a href="/admin/events">Manage Events</a>
        <a href="/admin/events/add">Add Event</a>
      </div>
    </nav>
  );
};

export default AdminNavbar;