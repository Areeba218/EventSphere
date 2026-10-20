
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ExpoList from '../pages/ExpoList';
import ExpoDetails from '../pages/ExpoDetails';
import ExpoRegistration from '../pages/ExpoRegistration';
import Exhibitors from '../pages/Exhibitors';
import EventSchedule from "../pages/EventSchedule";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ExpoList />} />
        <Route path="/expo-details" element={<ExpoDetails />} />
        <Route path="/register" element={<ExpoRegistration />} />
        <Route path="/exhibitors" element={<Exhibitors />} />
        <Route path="/schedule" element={<EventSchedule />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
