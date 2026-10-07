import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard";
import AddEvent from "./pages/AddEvent";
import ManageEvents from "./pages/ManageEvents";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />

        <Route
          path="/admin/events"
          element={<ManageEvents />}
        />

        <Route
          path="/admin/events/add"
          element={<AddEvent />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;