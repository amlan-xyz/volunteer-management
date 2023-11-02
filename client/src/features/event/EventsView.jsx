import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { getEventsAsync } from "./eventSlice";

const EventsView = () => {
  const dispatch = useDispatch();
  const { status, events, error } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(getEventsAsync());
  }, [dispatch]);

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
              <td>Event Description</td>
              <td>Event Roles</td>
              <td>Volunteers</td>
              <td>Add Volunteers</td>
              <td>Summary</td>
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
                event_roles,
                no_of_volunteers,
              } = event;
              return (
                <tr key={_id} className="list__item">
                  <td>{event_name}</td>
                  <td>{event_date}</td>
                  <td>
                    {event_description} <br />
                    <b>
                      Venue : {event_location} at {event_time}
                    </b>
                  </td>
                  <td>{event_roles}</td>
                  <td>{no_of_volunteers}</td>
                  <td>
                    <Link to={`/volunteers/add`} state={event}>
                      Add
                    </Link>
                  </td>
                  <td>
                    <Link to={`/events/${_id}/summary`}>View</Link>
                  </td>
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
