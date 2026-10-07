import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/events"
      );

      const data = await response.json();

      if (response.ok) {
        setEvents(data.events);
      } else {
        setMessage("Failed to load dashboard data");
      }
    } catch (error) {
      setMessage("Server connection failed");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const totalEvents = events.length;

  const upcomingEvents = events.filter(
    (event) => new Date(event.date) >= new Date()
  ).length;

  const pastEvents = events.filter(
    (event) => new Date(event.date) < new Date()
  ).length;

  return (
    <>
      <AdminNavbar />

      <div className="admin-dashboard">
        <h1>Admin Dashboard</h1>

        <p>Manage EventSphere events from here.</p>

        {message && <p>{message}</p>}

        <div className="admin-cards">

          <div className="admin-card">
            <h2>Total Events</h2>
            <p>{totalEvents}</p>

            <a href="/admin/events">
              Manage Events
            </a>
          </div>

          <div className="admin-card">
            <h2>Upcoming Events</h2>
            <p>{upcomingEvents}</p>

            <a href="/admin/events">
              View Events
            </a>
          </div>

          <div className="admin-card">
            <h2>Past Events</h2>
            <p>{pastEvents}</p>

            <a href="/admin/events">
              View Events
            </a>
          </div>

          <div className="admin-card">
            <h2>Add Event</h2>

            <p>Create a new expo event.</p>

            <a href="/admin/events/add">
              Add Event
            </a>
          </div>

        </div>
      </div>
    </>
  );
};

export default AdminDashboard;