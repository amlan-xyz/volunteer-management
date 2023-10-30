import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addVolunteerAsync,
  updateVolunteerAsync,
} from "../../features/volunteer/volunteerSlice";

export const VolunteerForm = () => {
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
    if (volunteer) {
      dispatch(
        updateVolunteerAsync({
          volunteerId: volunteer._id,
          updatedVolunteerData: newVolunteer,
        })
      );
    } else {
      dispatch(addVolunteerAsync(newVolunteer));
    }
    navigate("/volunteers");
  };

  return (
    <div className="form__container">
      {volunteer ? (
        <h2>Edit Volunteer Details</h2>
      ) : (
        <h2>Add Volunteer Details</h2>
      )}
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
        <div className="form__item">
          <button className="submit__btn" onClick={handleSumbit}>
            {volunteer ? "Update Volunteer" : "Add Volunteer"}
          </button>
        </div>
      </form>
    </div>
  );
};
