import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { getVolunteersAsync } from "./volunteerSlice";

const VolunteersView = () => {
  const dispatch = useDispatch();
  const { status, volunteers, error } = useSelector((state) => state.volunteer);

  useEffect(() => {
    dispatch(getVolunteersAsync());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="heading">
        <h1>List of Volunteers</h1>
        {/* <Link className="primary__btn" to="/volunteers/add">
          Add Volunteer
        </Link> */}
      </div>

      {status === "loading" ? (
        <Loader />
      ) : (
        <table className="table">
          <thead>
            <tr>
              <td>Name</td>
              <td>Phone No.</td>
              <td>Address</td>
              <td>Skills</td>
              <td>Availability</td>
              <td>Interest</td>
              <td>Summary</td>
              <td>Details</td>
            </tr>
          </thead>
          <tbody>
            {volunteers.map((volunteer) => {
              const {
                _id,
                name,
                phone_no,
                address,
                skills,
                availability,
                interest,
              } = volunteer;
              return (
                <tr key={_id} className="list__item">
                  <td>{name}</td>
                  <td>{phone_no}</td>
                  <td>{address}</td>
                  <td>{skills}</td>
                  <td>{availability}</td>
                  <td>{interest}</td>
                  <td>
                    <Link to={`/volunteers/${_id}/summary`}>View</Link>
                  </td>
                  <td>
                    <Link to={`/volunteers/${_id}`}>View</Link>
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

export default VolunteersView;
