import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteVolunteerAsync } from "./volunteerSlice";

export const VolunteerDetails = () => {
  const { id } = useParams();
  const volunteer = useSelector((state) =>
    state.volunteer.volunteers.find(({ _id }) => _id === id)
  );

  const { name, phone_no, address, skills, availability, interest } = volunteer;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelete = () => {
    dispatch(deleteVolunteerAsync(id));
    navigate("/");
  };

  return (
    <div className="details__container">
      <h2>Volunteer Details</h2>
      <div className="details__body">
        {volunteer ? (
          <>
            <h2>{name}</h2>
            <p>{phone_no}</p>
            <h3>Address:</h3>
            <p>{address}</p>
            <h3>Skills:</h3>
            <p>{skills}</p>
            <h3>Availability:</h3>
            <p>{availability}</p>
            <h3>Interest:</h3>
            <p>{interest}</p>
            <div className="details__btn-container">
              <Link
                className="primary__btn"
                to={`/volunteers/${volunteer._id}/edit`}
              >
                Edit
              </Link>
              <button className="secondary_btn" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </>
        ) : (
          <h1>No volunteer found</h1>
        )}
      </div>
    </div>
  );
};
