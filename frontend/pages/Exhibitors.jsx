
import { useEffect, useState } from "react";
import "./Exhibitors.css";

function Exhibitors() {
  const [exhibitors, setExhibitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("YOUR_EXHIBITORS_API_URL")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load exhibitors");
        }
        return response.json();
      })
      .then((data) => {
        const list = Array.isArray(data) ? data : [data];
        setExhibitors(list);
      })
      .catch((err) => {
        console.error("Exhibitors error:", err);
        setError("Unable to load exhibitors. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="exhibitors-page">
        <p className="exhibitors-message">Loading exhibitors...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="exhibitors-page">
        <p className="exhibitors-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="exhibitors-page">
      <header className="exhibitors-header">
        <h1>Our Exhibitors</h1>
        <p>
          Meet the companies and professionals participating
          in our events.
        </p>
      </header>

      {exhibitors.length === 0 ? (
        <p className="exhibitors-message">
          No exhibitors found yet.
        </p>
      ) : (
        <div className="exhibitors-grid">
          {exhibitors.map((exhibitor, index) => (
            <article
              className="exhibitor-card"
              key={exhibitor._id || exhibitor.email || index}
            >
              <div className="exhibitor-avatar">
                {(exhibitor.name || "E").charAt(0).toUpperCase()}
              </div>

              <h2>{exhibitor.name}</h2>

              <p className="exhibitor-company">
                {exhibitor.company}
              </p>

              <p className="exhibitor-info">
                <strong>Email:</strong> {exhibitor.email}
              </p>

              <p className="exhibitor-info">
                <strong>Phone:</strong> {exhibitor.phone}
              </p>

              <p className="exhibitor-description">
                {exhibitor.description}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default Exhibitors;
