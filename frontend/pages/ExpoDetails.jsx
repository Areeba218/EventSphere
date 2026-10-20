import { useLocation, Link, useNavigate } from "react-router-dom";

function ExpoDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const expo = location.state?.expo;

  if (!expo) {
    return (
      <div className="expo-list-page">
        <h1>Expo Details</h1>
        <p>Please select an expo from the listing page.</p>
        <Link to="/">Back to Expos</Link>
      </div>
    );
  }

  return (
    <div className="expo-list-page">
      <div className="expo-card">
        <h1>{expo.name}</h1>

        <p><strong>Date:</strong> {expo.date}</p>
        <p><strong>Location:</strong> {expo.location}</p>

        <h2>About This Expo</h2>
        <p>{expo.description}</p>

        <h2>What You Can Expect</h2>
        <p>
          Meet exhibitors, explore new opportunities,
          and discover more about this expo.
        </p>

<button onClick={() => navigate("/register", { state: { expo: expo } })}>
  Register for Expo
</button>

        <p>
          <Link to="/">← Back to All Expos</Link>
        </p>
      </div>
    </div>
  );
}

export default ExpoDetails;