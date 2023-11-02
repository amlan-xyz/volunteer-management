import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { VolunteersList } from "../Lists/VolunteersList";

export const EventSummary = () => {
  const { id } = useParams();
  const { events } = useSelector((state) => state.event);
  const event = events.find(({ _id }) => _id === id);

  return (
    <div className="container">
      <div className="heading">
        <h1>{event.event_name} Summary</h1>
      </div>
      <div className="summary__body">
        <h3>Volunteers Required : {event.no_of_volunteers}</h3>
        <h3>Volunteers Registerd : {event.volunteers_registered.length}</h3>
        <VolunteersList eventId={event._id} />
      </div>
    </div>
  );
};
