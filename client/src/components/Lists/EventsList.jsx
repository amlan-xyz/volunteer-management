import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const EventsList = ({ volunteerId }) => {
  const volunteer = useSelector((state) =>
    state.volunteer.volunteers.find(({ _id }) => _id === volunteerId)
  );

  return (
    <table className="table">
      <thead>
        <tr>
          <td>Event Name</td>
          <td>Role Assigned</td>
          <td>Event Date</td>
          <td>Event Time</td>
          <td>Event Location</td>
          <td>Details</td>
        </tr>
      </thead>
      <tbody>
        {volunteer.events_registered.map((item) => {
          const { _id, event_name, event_date, event_time, event_location } =
            item.event;
          return (
            <tr key={_id} className="list__item">
              <td>{event_name}</td>
              <td>{item.role}</td>
              <td>{event_date}</td>
              <td>{event_time}</td>
              <td>{event_location}</td>
              <td>
                <Link to={`/events/${_id}`}>View</Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
