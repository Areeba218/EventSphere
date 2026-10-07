import React, { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";

const AddEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "",
    theme: "",
    image: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/events",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Event added successfully!");

        setFormData({
          title: "",
          description: "",
          date: "",
          location: "",
          category: "",
          theme: "",
          image: "",
        });
      } else {
        setMessage(data.message || "Failed to add event");
      }
    } catch (error) {
      setMessage("Server connection failed");
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="admin-page">
        <h1>Add New Event</h1>

        {message && <p>{message}</p>}

        <form onSubmit={handleSubmit}>
          <div>
            <label>Event Title</label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter event title"
              required
            />
          </div>

          <div>
            <label>Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter event description"
              required
            />
          </div>

          <div>
            <label>Date</label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Location</label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter event location"
              required
            />
          </div>

          <div>
            <label>Category</label>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Example: Technology"
              required
            />
          </div>

          <div>
            <label>Theme</label>

            <input
              type="text"
              name="theme"
              value={formData.theme}
              onChange={handleChange}
              placeholder="Example: Future of Technology"
              required
            />
          </div>

          <div>
            <label>Image URL</label>

            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter image URL"
            />
          </div>

          <button type="submit">Add Event</button>
        </form>
      </div>
    </>
  );
};

export default AddEvent;