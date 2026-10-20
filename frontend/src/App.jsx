import { BrowserRouter, Routes, Route, Link } from "react-router";

import ExhibitorDashboard from "./Pages/Exhibitor/ExhibitorDashboard.jsx";
import ExhibitorProfile from "./Pages/Exhibitor/ExhibitorProfile.jsx";
import ExpoRegistration from "./Pages/Exhibitor/ExpoRegistration.jsx";
import MyApplications from "./Pages/Exhibitor/MyApplications.jsx";
import BoothSelection from "./Pages/Exhibitor/BoothSelection.jsx";
import MyBooth from "./Pages/Exhibitor/MyBooth.jsx";
import ExhibitorMessages from "./Pages/Exhibitor/ExhibitorMessages.jsx";

import "./App.css";

function App() {

    return (
        <BrowserRouter>

            <nav className="navbar">

                <h2>EventSphere</h2>

                <div>
                    <Link to="/exhibitor/dashboard">Dashboard</Link>
                    <Link to="/exhibitor/profile">Profile</Link>
                    <Link to="/exhibitor/apply">Apply</Link>
                    <Link to="/exhibitor/applications">Applications</Link>
                    <Link to="/exhibitor/booths">Booths</Link>
                    <Link to="/exhibitor/my-booth">My Booth</Link>
                    <Link to="/exhibitor/messages">Messages</Link>
                </div>

            </nav>

            <Routes>

                <Route
                    path="/"
                    element={<ExhibitorDashboard />}
                />

                <Route
                    path="/exhibitor/dashboard"
                    element={<ExhibitorDashboard />}
                />

                <Route
                    path="/exhibitor/profile"
                    element={<ExhibitorProfile />}
                />

                <Route
                    path="/exhibitor/apply"
                    element={<ExpoRegistration />}
                />

                <Route
                    path="/exhibitor/applications"
                    element={<MyApplications />}
                />

                <Route
                    path="/exhibitor/booths"
                    element={<BoothSelection />}
                />

                <Route
                    path="/exhibitor/my-booth"
                    element={<MyBooth />}
                />

                <Route
                    path="/exhibitor/messages"
                    element={<ExhibitorMessages />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;