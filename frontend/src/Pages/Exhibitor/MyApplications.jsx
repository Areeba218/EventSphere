import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function MyApplications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    // Temporary testing email
    const email = "glowbeauty@example.com";

    useEffect(() => {
        const loadApplications = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/applications/my",
                    {
                        params: { email }
                    }
                );

                console.log("My Applications:", response.data);
                setApplications(response.data);
            } catch (error) {
                console.error(
                    "Loading applications error:",
                    error.response?.data || error.message
                );

                setMessage(
                    error.response?.data?.message ||
                    "Applications load nahi ho sakin."
                );
            } finally {
                setLoading(false);
            }
        };

        loadApplications();
    }, []);

    if (loading) {
        return (
            <div className="list-page">
                <h1>My Applications</h1>
                <p>Loading applications...</p>
            </div>
        );
    }

    return (
        <div className="list-page">
            <h1>My Applications</h1>

            {message && <p role="alert">{message}</p>}

            {!message && applications.length === 0 && (
                <p>No applications found.</p>
            )}

            <div className="application-list">
                {applications.map((application) => (
                    <div
                        className="application-card"
                        key={application._id}
                    >
                        <h2>{application.expoName}</h2>

                        <p>
                            <strong>Company:</strong>{" "}
                            {application.companyName}
                        </p>

                        <p>
                            <strong>Products:</strong>{" "}
                            {application.products}
                        </p>

                        <p>
                            <strong>Booth Preference:</strong>{" "}
                            {application.boothPreference}
                        </p>

                        <p>
                            <strong>Submitted:</strong>{" "}
                            {new Date(
                                application.createdAt
                            ).toLocaleDateString()}
                        </p>

                        <p>
                            <strong>Status:</strong>{" "}
                            <span
                                className={application.status.toLowerCase()}
                            >
                                {application.status}
                            </span>
                        </p>

                        {application.adminRemarks && (
                            <p>
                                <strong>Admin Remarks:</strong>{" "}
                                {application.adminRemarks}
                            </p>
                        )}

                        {application.status === "Approved" && (
                            <Link to="/exhibitor/booths">
                                Select Booth
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyApplications;
