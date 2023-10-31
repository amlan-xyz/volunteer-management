import React from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";

import EventsView from "./features/event/EventsView";

import "./App.css";
import { EventForm } from "./components/Forms/AddEventForm";
import { VolunteerForm } from "./components/Forms/AddVolunteerForm";
import { EventsList } from "./components/Lists/EventsList";
import { VolunteersList } from "./components/Lists/VolunteersList";
import { EventDetails } from "./features/event/EventDetails";
import { VolunteerDetails } from "./features/volunteer/VolunteerDetails";
import VolunteersView from "./features/volunteer/VolunteersView";

function App() {
  return (
    <div className="main">
      <Navbar />
      <div className="main__body">
        <Routes>
          <Route path="/" element={<EventsView />} />
          <Route path="/events/add" element={<EventForm />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/events/:id/volunteers" element={<VolunteersList />} />
          <Route path="/events/:id/edit" element={<EventForm />} />
          <Route path="/volunteers" element={<VolunteersView />} />
          <Route path="/volunteers/add" element={<VolunteerForm />} />
          <Route path="/volunteers/:id" element={<VolunteerDetails />} />
          <Route path="/volunteers/:id/events" element={<EventsList />} />
          <Route path="/volunteers/:id/edit" element={<VolunteerForm />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
