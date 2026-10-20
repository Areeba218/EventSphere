
import { useState } from "react";
import axios from "axios";

function ExpoRegistration() {
    const [expo, setExpo] = useState("Technology Expo 2026");
    const [company, setCompany] = useState("");
    const [email, setEmail] = useState("");
    const [products, setProducts] = useState("");
    const [description, setDescription] = useState("");
    const [staff, setStaff] = useState("1");
    const [booth, setBooth] = useState("Standard");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const submitApplication = async (e) => {
        e.preventDefault();

        setMessage("");
        setMessageType("");
        setLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:5000/api/applications",
                {
                    exhibitorEmail: email.trim().toLowerCase(),
                    companyName: company.trim(),
                    expoName: expo,
                    products: products.trim(),
                    description: description.trim(),
                    staffCount: Number(staff),
                    boothPreference: booth
                }
            );

            console.log("Application response:", response.data);

            setMessage(
                response.data?.message ||
                "Application submitted successfully!"
            );
            setMessageType("success");

            setCompany("");
            setEmail("glowbeauty@example.com");
            setProducts("");
            setDescription("");
            setStaff("1");
            setBooth("Standard");

        } catch (error) {
            console.error(
                "Application submission error:",
                error.response?.data || error.message
            );

            setMessage(
                error.response?.data?.message ||
                error.message ||
                "Application submit nahi ho saki."
            );
            setMessageType("error");

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-page">
            <h1>Expo Registration</h1>
            <p>Apply to participate in an upcoming expo.</p>

            {message && (
                <p
                    role="status"
                    style={{
                        color: messageType === "success" ? "green" : "red",
                        margin: "12px 0",
                        padding: "10px",
                        borderRadius: "5px"
                    }}
                >
                    {message}
                </p>
            )}

            <form onSubmit={submitApplication}>
                <label>Select Expo</label>
                <select
                    value={expo}
                    onChange={(e) => setExpo(e.target.value)}
                    required
                >
                    <option>Technology Expo 2026</option>
                    <option>Business Expo 2026</option>
                    <option>IT Expo 2027</option>
                </select>

                <label>Company Name</label>
                <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                />

                <label>Company Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail("tech@example.com")}
                    required
                />

                <label>Products / Services</label>
                <input
                    type="text"
                    value={products}
                    onChange={(e) => setProducts(e.target.value)}
                    required
                />

                <label>Company Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <label>Number of Staff</label>
                <input
                    type="number"
                    min="1"
                    step="1"
                    value={staff}
                    onChange={(e) => setStaff(e.target.value)}
                    required
                />

                <label>Booth Preference</label>
                <select
                    value={booth}
                    onChange={(e) => setBooth(e.target.value)}
                >
                    <option>Standard</option>
                    <option>Premium</option>
                    <option>Large</option>
                </select>

                <button type="submit" disabled={loading}>
                    {loading ? "Submitting..." : "Submit Application"}
                </button>
            </form>
        </div>
    );
}

export default ExpoRegistration;
