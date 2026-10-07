import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/events"
      );

      const data = await response.json();

      if (response.ok) {
        setEvents(data.events);
      } else {
        setMessage("Failed to fetch events");
      }
    } catch (error) {
      setMessage("Server connection failed");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/events/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Event deleted successfully!");
        fetchEvents();
      } else {
        setMessage(data.message || "Failed to delete event");
      }
    } catch (error) {
      setMessage("Server connection failed");
    }
  };

  const handleEdit = (event) => {
    setEditingEvent({
      ...event,
      date: event.date.split("T")[0],
      theme: event.theme || "",
    });

    setMessage("");
  };

  const handleEditChange = (e) => {
    setEditingEvent({
      ...editingEvent,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/events/${editingEvent._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: editingEvent.title,
            description: editingEvent.description,
            date: editingEvent.date,
            location: editingEvent.location,
            category: editingEvent.category,
            theme: editingEvent.theme,
            image: editingEvent.image,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Event updated successfully!");
        setEditingEvent(null);
        fetchEvents();
      } else {
        setMessage(data.message || "Failed to update event");
      }
    } catch (error) {
      setMessage("Server connection failed");
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="admin-page">
        <h1>Manage Events</h1>

        {message && <p>{message}</p>}

        {editingEvent && (
          <div className="edit-event-form">
            <h2>Edit Event</h2>

            <form onSubmit={handleUpdate}>
              <div>
                <label>Event Title</label>

                <input
                  type="text"
                  name="title"
                  value={editingEvent.title}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div>
                <label>Description</label>

                <textarea
                  name="description"
                  value={editingEvent.description}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div>
                <label>Date</label>

                <input
                  type="date"
                  name="date"
                  value={editingEvent.date}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div>
                <label>Location</label>

                <input
                  type="text"
                  name="location"
                  value={editingEvent.location}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div>
                <label>Category</label>

                <input
                  type="text"
                  name="category"
                  value={editingEvent.category}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div>
                <label>Theme</label>

                <input
                  type="text"
                  name="theme"
                  value={editingEvent.theme}
                  onChange={handleEditChange}
                  placeholder="Example: Future of Technology"
                  required
                />
              </div>

              <div>
                <label>Image URL</label>

                <input
                  type="text"
                  name="image"
                  value={editingEvent.image || ""}
                  onChange={handleEditChange}
                />
              </div>

              <button type="submit">
                Update Event
              </button>

              <button
                type="button"
                onClick={() => setEditingEvent(null)}
              >
                Cancel
              </button>
            </form>
          </div>
        )}

        {events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          <div className="events-list">
            {events.map((event) => (
              <div className="event-card" key={event._id}>
                <h2>{event.title}</h2>

                <p>
                  <strong>Description:</strong>{" "}
                  {event.description}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(event.date).toLocaleDateString()}
                </p>

                <p>
                  <strong>Location:</strong>{" "}
                  {event.location}
                </p>

                <p>
                  <strong>Category:</strong>{" "}
                  {event.category}
                </p>

                <p>
                  <strong>Theme:</strong>{" "}
                  {event.theme || "Not specified"}
                </p>

                {event.image && (
                  <img
                    src={event.image}
                    alt={event.title}
                    width="200"
                  />
                )}

                <div>
                  <button
                    onClick={() => handleEdit(event)}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(event._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ManageEvents;