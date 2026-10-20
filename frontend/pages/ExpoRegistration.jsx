
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ExpoRegistration() {
  const navigate = useNavigate();
  const location = useLocation();
  const expo = location.state?.expo;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    passType: "Day Pass",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    const payload = {
      ...form,
      expoName: expo?.name || "",
      expoId: expo?._id || expo?.id || "unknown",
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/registrations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to register for the expo."
        );
      }

      console.log("Registration response:", data);

      setMessage(
        data.message || "Registration successful! Data saved."
      );

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Registration error:", error);
      setMessage(`Registration failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "0 auto" }}>
      <h1>Register for Expo</h1>

      {expo && (
        <p>
          <strong>Expo:</strong> {expo.name}
        </p>
      )}

      {message && <p>{message}</p>}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <select
          name="passType"
          value={form.passType}
          onChange={handleChange}
        >
          <option>Day Pass</option>
          <option>VIP</option>
          <option>Student</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Registration"}
        </button>
      </form>
    </div>
  );
}

export default ExpoRegistration;
