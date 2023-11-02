import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { EventsList } from "../Lists/EventsList";

export const VolunteerSummary = () => {
  const { id } = useParams();
  const { volunteers } = useSelector((state) => state.volunteer);
  const volunteer = volunteers.find(({ _id }) => _id === id);

  return (
    <div className="container">
      <div className="heading">
        <h1>{volunteer.name}'s Summary</h1>
      </div>
      <div className="summary__body">
        <h3>Events Registerd: {volunteer.events_registered.length}</h3>
        <EventsList volunteerId={volunteer._id} />
      </div>
    </div>
  );
};
