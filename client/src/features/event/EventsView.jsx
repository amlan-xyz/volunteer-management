import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { getEventsAsync } from "./eventSlice";

const EventsView = () => {
  const dispatch = useDispatch();
  const { status, events, error } = useSelector((state) => state.event);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getEventsAsync());
    }
  }, [status, dispatch]);

  return (
    <div className="container">
      <div className="heading">
        <h1>List of Events</h1>
        <Link className="primary__btn" to="/events/add">
          Add Event
        </Link>
      </div>

      {status === "loading" ? (
        <Loader />
      ) : (
        <table className="table">
          <thead>
            <tr>
              <td>Event Name</td>
              <td>Event Date</td>
              <td>Event Time</td>
              <td>Event Location</td>
              <td>Event Description</td>
              <td>No. of Volunteers</td>
              <td>Details</td>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => {
              const {
                _id,
                event_name,
                event_date,
                event_time,
                event_location,
                event_description,
                no_of_volunteers,
              } = event;
              return (
                <tr key={_id} className="list__item">
                  <td>{event_name}</td>
                  <td>{event_date}</td>
                  <td>{event_time}</td>
                  <td>{event_location}</td>
                  <td>{event_description}</td>
                  <td>{no_of_volunteers}</td>
                  <td>
                    <Link to={`/events/${_id}`}>View</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {status === "error" && <p>{error}</p>}
    </div>
  );
};

export default EventsView;
