import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const VolunteersList = ({ eventId }) => {
  const event = useSelector((state) =>
    state.event.events.find(({ _id }) => _id === eventId)
  );

  return (
    <table className="table">
      <thead>
        <tr>
          <td>Name</td>
          <td>Phone No.</td>
          <td>Address</td>
          <td>Skills</td>
          <td>Availability</td>
          <td>Interest</td>
          <td>Details</td>
        </tr>
      </thead>
      <tbody>
        {event.volunteers_registered.map((volunteer) => {
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
                <Link to={`/volunteers/${_id}`}>View</Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
