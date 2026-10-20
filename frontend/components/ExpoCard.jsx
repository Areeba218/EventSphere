
import { useNavigate } from "react-router-dom";

function ExpoCard({ expo }) {
  const navigate = useNavigate();

  return (
    <div className="expo-card">
      <h2>{expo.name}</h2>

      <p>Date: {expo.date}</p>
      <p>Location: {expo.location}</p>
      <p>{expo.description}</p>

      <button
        onClick={() =>
          navigate("/expo-details", {
            state: { expo: expo }
          })
        }
      >
        View Details
      </button>
    </div>
  );
}

export default ExpoCard;
