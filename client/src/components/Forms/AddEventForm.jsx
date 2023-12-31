import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createEventAsync } from "../../features/event/eventSlice";

export const EventForm = () => {
  const navigate = useNavigate();

  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [noOfVolunteers, setNoOfVolunteers] = useState("");
  const [eventRoles, setEventRoles] = useState("");

  const dispatch = useDispatch();

  const handleSumbit = (e) => {
    e.preventDefault();
    const newEvent = {
      event_name: eventName,
      event_date: eventDate,
      event_time: eventTime,
      event_location: eventLocation,
      event_description: eventDescription,
      no_of_volunteers: noOfVolunteers,
      event_roles: eventRoles,
    };

    dispatch(createEventAsync(newEvent));

    navigate("/");
  };

  return (
    <div className="form__container">
      <h2>Add Event Details</h2>
      <form action="" className="form__body">
        <div className="form__item">
          <label htmlFor="name">Event Name</label>
          <input
            id="name"
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>
        <div className="form__item">
          <label htmlFor="date">Event Date</label>
          <input
            type="date"
            id="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
        </div>
        <div className="form__item">
          <label htmlFor="time">Event Time</label>
          <input
            type="time"
            id="time"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
          />
        </div>
        <div className="form__item">
          <label htmlFor="location">Event Location</label>
          <input
            type="text"
            id="location"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
          />
        </div>
        <div className="form__item">
          <label htmlFor="description">Event Description</label>
          <textarea
            id="description"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            cols="30"
            rows="10"
          />
        </div>
        <div className="form__item">
          <label htmlFor="roles">Event Roles</label>
          <input
            type="text"
            placeholder="Leader, Management, Crowd controle etc"
            onChange={(e) => setEventRoles(e.target.value)}
            value={eventRoles}
          />
        </div>
        <div className="form__item">
          <label htmlFor="volunteers">No. of Volunteers</label>
          <input
            type="number"
            id="volunteers"
            value={noOfVolunteers}
            onChange={(e) => setNoOfVolunteers(e.target.value)}
          />
        </div>
        <div className="form__item">
          <button className="submit__btn" onClick={handleSumbit}>
            Add Event
          </button>
        </div>
      </form>
    </div>
  );
};
