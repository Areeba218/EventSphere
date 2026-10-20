
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ExhibitorDashboard() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    // Same email used for testing applications
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

                setApplications(response.data);
            } catch (error) {
                console.error(
                    "Dashboard applications error:",
                    error.response?.data || error.message
                );
            } finally {
                setLoading(false);
            }
        };

        loadApplications();
    }, []);

    const totalApplications = applications.length;

    const approvedApplications = applications.filter(
        (application) => application.status === "Approved"
    ).length;

    return (
        <div className="exhibitor-page">
            <h1>Exhibitor Dashboard</h1>
            <p>Welcome to EventSphere Exhibitor Portal</p>

            <div className="dashboard-cards">

                <div className="dashboard-card">
                    <h3>My Applications</h3>
                    <p>
                        {loading ? "..." : totalApplications}
                    </p>
                    <Link to="/exhibitor/applications">
                        View Applications
                    </Link>
                </div>

                <div className="dashboard-card">
                    <h3>Approved Expos</h3>
                    <p>
                        {loading ? "..." : approvedApplications}
                    </p>
                    <Link to="/exhibitor/apply">
                        View Expos
                    </Link>
                </div>

                <div className="dashboard-card">
                    <h3>My Booth</h3>
                    <p>A-12</p>
                    <Link to="/exhibitor/my-booth">
                        View Booth
                    </Link>
                </div>

                <div className="dashboard-card">
                    <h3>Messages</h3>
                    <p>3</p>
                    <Link to="/exhibitor/messages">
                        View Messages
                    </Link>
                </div>

            </div>

            <div className="quick-links">
                <Link
                    to="/exhibitor/apply"
                    className="dashboard-button"
                >
                    Apply for Expo
                </Link>

                <Link
                    to="/exhibitor/profile"
                    className="dashboard-button"
                >
                    My Profile
                </Link>

                <Link
                    to="/exhibitor/booths"
                    className="dashboard-button"
                >
                    Select Booth
                </Link>
            </div>
        </div>
    );
}

export default ExhibitorDashboard;
