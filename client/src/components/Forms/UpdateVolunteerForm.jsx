import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateVolunteerAsync } from "../../features/volunteer/volunteerSlice";

export const UpdateVolunteerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const volunteer = useSelector((state) =>
    state.volunteer.volunteers.find(({ _id }) => _id === id)
  );

  const [name, setName] = useState(volunteer ? volunteer.name : "");
  const [phoneNo, setPhoneNo] = useState(volunteer ? volunteer.phone_no : "");
  const [address, setAddress] = useState(volunteer ? volunteer.address : "");
  const [skills, setSkills] = useState(volunteer ? volunteer.skills : "");
  const [availability, setAvailability] = useState(
    volunteer ? volunteer.availability : ""
  );
  const [interest, setInterest] = useState(volunteer ? volunteer.interest : "");
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
    };

    dispatch(
      updateVolunteerAsync({
        volunteerId: volunteer._id,
        updatedVolunteerData: newVolunteer,
      })
    );

    navigate("/volunteers");
  };

  return (
    <div className="form__container">
      <h2>Edit Volunteer Details</h2>

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
          <select
            id="availability"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Available">Available</option>
            <option value="Not-Available">Not-Available</option>
          </select>
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
        <div className="form__item">
          <button className="submit__btn" onClick={handleSumbit}>
            Update Volunteer
          </button>
        </div>
      </form>
    </div>
  );
};
