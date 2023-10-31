const Volunteer = require("../models/volunteer.model");
const Event = require("../models/events.model");

const createVolunteer = async (volunteerData) => {
  const {
    name,
    phone_no,
    address,
    skills,
    availability,
    interest,
    event_name,
    event_role,
  } = volunteerData;
  try {
    const volunteer = {
      name,
      phone_no,
      address,
      skills,
      availability,
      interest,
    };
    const newVolunteer = new Volunteer(volunteer);
    const event = await Event.findOne({ event_name });
    const registerdEvent = {
      event,
      role: event_role,
    };
    newVolunteer.events_registered.push(registerdEvent);
    const savedVolunteer = await newVolunteer.save();
    event.volunteers_registered.push(savedVolunteer);
    await event.save();
    return savedVolunteer;
  } catch (error) {
    console.error("Error adding volunteer", error);
  }
};

const getAllVolunteers = async () => {
  try {
    const volunteers = await Volunteer.find().populate(
      "events_registered.event"
    );
    return volunteers;
  } catch (error) {
    console.error("Error getting volunteers", error);
  }
};

const updateVolunteer = async (volunteerId, updatedData) => {
  console.log(volunteerId, updatedData);
  try {
    const updatedVolunteer = await Volunteer.findByIdAndUpdate(
      volunteerId,
      updatedData,
      { new: true }
    );
    await updatedVolunteer.save();
    return updatedVolunteer;
  } catch (error) {
    console.error("Error updating volunteer", error);
  }
};

const deleteVolunteer = async (volunteerId) => {
  try {
    const deletedVolunteer = await Volunteer.findByIdAndDelete(volunteerId);
    return deletedVolunteer;
  } catch (error) {
    console.error("Error deleting volunteer", error);
  }
};

module.exports = {
  createVolunteer,
  getAllVolunteers,
  updateVolunteer,
  deleteVolunteer,
};
