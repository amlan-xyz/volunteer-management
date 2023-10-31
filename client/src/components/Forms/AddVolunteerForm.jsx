import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { editEventAsync } from "../../features/event/eventSlice";
import {
  addVolunteerAsync,
  updateVolunteerAsync,
} from "../../features/volunteer/volunteerSlice";

export const VolunteerForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { status, volunteers } = useSelector((state) => state.volunteer);
  const event = state ? state : null;
  const [volunteer, setVolunteer] = useState({});

  const [form, setForm] = useState(false);
  const [modal, setModal] = useState(false);

  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [skills, setSkills] = useState("");
  const [availability, setAvailability] = useState("");
  const [interest, setInterest] = useState("");
  const [role, setRole] = useState("");
  const dispatch = useDispatch();

  const handleSumbit = (e) => {
    e.preventDefault();
    const newVolunteer = {
      name,
      phone_no: phoneNo,
      address,
      skills,
      availability,
      interest,
      event_name: event.event_name,
      event_role: role,
    };

    dispatch(addVolunteerAsync(newVolunteer));

    navigate("/volunteers");
  };

  const [eventRoles, setEventRoles] = useState([]);

  const getEventRoles = () => {
    console.log(event);
    setEventRoles(event.event_roles.split(","));
    // console.log(eventRoles);
  };

  const addVolunteer = (e) => {
    e.preventDefault();
    const newEvent = {
      event,
      role,
    };

    dispatch(
      updateVolunteerAsync({
        volunteerId: volunteer._id,
        updatedVolunteerData: {
          events_registered: [...volunteer.events_registered, newEvent],
        },
      })
    );

    dispatch(
      editEventAsync({
        eventId: event._id,
        updatedEventData: {
          volunteers_registered: [...event.volunteers_registered, volunteer],
        },
      })
    );
    navigate("/");
  };

  // useEffect(() => {
  //   if (status === "idle") {
  //     dispatch(getVolunteersAsync());
  //   }
  // }, [status, dispatch]);

  const getVolunteer = (volunteerId) => {
    setVolunteer(volunteers.find(({ _id }) => _id === volunteerId));
  };

  useEffect(() => {
    getEventRoles();
  }, []);

  return (
    <div className="form__container">
      <h2>Add Volunteer Details</h2>
      <button onClick={() => setForm(!form)}>
        {form === true ? "Close" : "Add new volunteer"}
      </button>
      {form && (
        <form action="" className="form__body">
          <div className="form__item">
            <label htmlFor="name">Volunteer Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form__item">
            <label htmlFor="phone_no">Phone Number</label>
            <input
              type="number"
              id="phone_no"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
            />
          </div>
          <div className="form__item">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="form__item">
            <label htmlFor="skills">Skills</label>
            <input
              type="text"
              id="skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>
          <div className="form__item">
            <label htmlFor="availability">Availability</label>
            <input
              type="text"
              id="availability"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
            />
          </div>
          <div className="form__item">
            <label htmlFor="interest">Interest</label>
            <input
              type="text"
              id="interest"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
            />
          </div>
          {/* <div className="form__item">
            <label htmlFor="event">Register</label>
            <select
              id="event"
              onChange={(e) => {
                setEventName(e.target.value);
                getEventRoles(e.target.value);
              }}
              value={eventName}
            >
              <option value="">Select</option>
              {events &&
                events.map((event) => (
                  <option value={event.event_name}>{event.event_name}</option>
                ))}
            </select>
          </div> */}
          <div className="form__item">
            <label htmlFor="role">Role Assigned</label>
            <select id="role" onChange={(e) => setRole(e.target.value)}>
              <option value="">Select</option>
              {eventRoles.map((item) => (
                <option value={item}>{item}</option>
              ))}
            </select>
          </div>
          <div className="form__item">
            <button className="submit__btn" onClick={handleSumbit}>
              Add Volunteer
            </button>
          </div>
        </form>
      )}
      {!form && (
        <table className="table">
          <thead>
            <tr>
              <td>Name</td>
              <td>Phone No.</td>
              <td>Skills</td>
              <td>Availability</td>
              <td>Interest</td>
              <td>Details</td>
              <td>Add Volunteer</td>
            </tr>
          </thead>
          <tbody>
            {volunteers.map((volunteer) => {
              const { _id, name, phone_no, skills, availability, interest } =
                volunteer;
              return (
                <tr key={_id} className="list__item">
                  <td>{name}</td>
                  <td>{phone_no}</td>
                  <td>{skills}</td>
                  <td>{availability}</td>
                  <td>{interest}</td>
                  <td>
                    <Link to={`/volunteers/${_id}`}>View</Link>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        getVolunteer(_id);
                        setModal(!modal);
                      }}
                    >
                      Add volunteer
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {modal && (
        <div className="modal">
          <div className="modal_wrapper"></div>
          <div className="modal_container">
            <form action="">
              <div className="form__item">
                <label htmlFor="role">Role Assigned</label>
                <select id="role" onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select</option>
                  {eventRoles.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div className="form__item">
                <button onClick={addVolunteer}>Add </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
