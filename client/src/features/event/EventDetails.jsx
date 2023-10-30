import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteEventAsync } from "./eventSlice";

export const EventDetails = () => {
  const { id } = useParams();
  const event = useSelector((state) =>
    state.event.events.find(({ _id }) => _id === id)
  );

  const {
    event_name,
    event_date,
    event_time,
    event_location,
    event_description,
    no_of_volunteers,
  } = event;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelete = () => {
    dispatch(deleteEventAsync(id));
    navigate("/");
  };

  return (
    <div className="details__container">
      <h2>Event Details</h2>
      <div className="details__body">
        {event ? (
          <>
            <h2>{event_name}</h2>
            <p>
              {event_date}, {event_time}
            </p>
            <h3>Location:</h3>
            <p>{event_location}</p>
            <h3>Description:</h3>
            <p>{event_description}</p>
            <h3>Volunteers:</h3>
            <p>{no_of_volunteers}</p>
            <div className="details__btn-container">
              <Link className="primary__btn" to={`/events/${event._id}/edit`}>
                Edit
              </Link>
              <button className="secondary_btn" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </>
        ) : (
          <h1>No event found</h1>
        )}
      </div>
    </div>
  );
};
