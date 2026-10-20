
import { useEffect, useState } from "react";
import "./EventSchedule.css";

const API_URL = "http://127.0.0.1:5000/api/schedules";

function EventSchedule() {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const [form, setForm] = useState({
        title: "",
        description: "",
        date: "",
        startTime: "",
        endTime: "",
        location: "",
        category: "Technology",
        speaker: "",
    });

    const fetchSchedules = async () => {
        try {
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error("Could not load schedules.");
            }

            const data = await response.json();
            setSchedules(data);
            setError("");
        } catch (err) {
            setError("Could not load schedules. Check your backend.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSchedules();
    }, []);

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError("");
        setMessage("");

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to save schedule."
                );
            }

            setMessage("Schedule event added successfully!");

            setForm({
                title: "",
                description: "",
                date: "",
                startTime: "",
                endTime: "",
                location: "",
                category: "Technology",
                speaker: "",
            });

            await fetchSchedules();
        } catch (err) {
            setError(err.message || "Could not save the event.");
        } finally {
            setSaving(false);
        }
    };

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("en-PK", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });

    return (
        <div className="schedule-page">
            <header className="schedule-header">
                <p className="schedule-eyebrow">EVENTSPHERE</p>
                <h1>Event Schedule</h1>
                <p className="schedule-subtitle">
                    Explore sessions, discover speakers, and plan your event day.
                </p>
            </header>

            <main className="schedule-container">
                <section className="schedule-form-section">
                    <h2>Add a Schedule Event</h2>
                    <p>Enter the details below to add a new session.</p>

                    <form onSubmit={handleSubmit} className="schedule-form">
                        <label>
                            Event Title *
                            <input
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                required
                                placeholder="Technology Innovation"
                            />
                        </label>

                        <label>
                            Description
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Describe the session"
                            />
                        </label>

                        <label>
                            Date *
                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        <div className="schedule-time-fields">
                            <label>
                                Start Time *
                                <input
                                    type="time"
                                    name="startTime"
                                    value={form.startTime}
                                    onChange={handleChange}
                                    required
                                />
                            </label>

                            <label>
                                End Time *
                                <input
                                    type="time"
                                    name="endTime"
                                    value={form.endTime}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                        </div>

                        <label>
                            Location *
                            <input
                                name="location"
                                value={form.location}
                                onChange={handleChange}
                                required
                                placeholder="Conference Room A"
                            />
                        </label>

                        <label>
                            Category
                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                            >
                                <option>Technology</option>
                                <option>Business</option>
                                <option>Education</option>
                                <option>Art</option>
                                <option>Food</option>
                                <option>Fashion</option>
                                <option>General</option>
                            </select>
                        </label>

                        <label>
                            Speaker
                            <input
                                name="speaker"
                                value={form.speaker}
                                onChange={handleChange}
                                placeholder="Speaker name"
                            />
                        </label>

                        <button type="submit" disabled={saving}>
                            {saving ? "Saving..." : "Save Schedule Event"}
                        </button>
                    </form>

                    {message && (
                        <p className="schedule-success">{message}</p>
                    )}

                    {error && (
                        <p className="schedule-error">{error}</p>
                    )}
                </section>

                <section className="schedule-list-section">
                    <div className="schedule-section-heading">
                        <div>
                            <h2>Upcoming Sessions</h2>
                            <p>Find the details you need for each session.</p>
                        </div>

                        <span className="schedule-count">
                            {schedules.length}{" "}
                            {schedules.length === 1 ? "Session" : "Sessions"}
                        </span>
                    </div>

                    {loading && <p>Loading schedules...</p>}

                    {!loading && !error && schedules.length === 0 && (
                        <div className="schedule-empty">
                            No sessions available yet. Add your first event above.
                        </div>
                    )}

                    {!loading && schedules.length > 0 && (
                        <div className="schedule-grid">
                            {schedules.map((session) => (
                                <article
                                    className="schedule-card"
                                    key={session._id}
                                >
                                    <div className="schedule-card-top">
                                        <span className="schedule-category">
                                            {session.category || "General"}
                                        </span>
                                        <span className="schedule-date">
                                            {formatDate(session.date)}
                                        </span>
                                    </div>

                                    <h3>{session.title}</h3>
                                    <p className="schedule-description">
                                        {session.description ||
                                            "Join this event session."}
                                    </p>

                                    <div className="schedule-details">
                                        <p>
                                            <span>Time</span>
                                            {session.startTime} – {session.endTime}
                                        </p>
                                        <p>
                                            <span>Location</span>
                                            {session.location}
                                        </p>
                                        <p>
                                            <span>Speaker</span>
                                            {session.speaker || "To be announced"}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

export default EventSchedule;
