const Event = require("../models/events.model");
const Volunteer = require("../models/volunteer.model");

const createEvent = async (eventData) => {
  const {
    event_name,
    event_date,
    event_time,
    event_location,
    event_description,
    no_of_volunteers,
    event_roles,
  } = eventData;
  try {
    const event = {
      event_name,
      event_date,
      event_time,
      event_location,
      event_description,
      no_of_volunteers,
      event_roles,
    };
    const newEvent = new Event(event);
    const savedEvent = await newEvent.save();
    return savedEvent;
  } catch (error) {
    console.error("Error creating event", error);
  }
};

const getAllEvents = async () => {
  try {
    const events = await Event.find().populate("volunteers_registered");
    return events;
  } catch (error) {
    console.error("Error getting events", error);
  }
};

const deleteEvent = async (eventId) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    return deletedEvent;
  } catch (error) {
    console.error("Error deleting event", error);
  }
};

const updateEvent = async (eventId, updatedData) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(eventId, updatedData, {
      new: true,
    });
    return updatedEvent;
  } catch (error) {
    console.error("Error updating event", error);
  }
};

const addVolunteer = async (eventId, volunteerId, roleAssigned) => {
  try {
    const event = await Event.findById(eventId);
    const volunteer = await Volunteer.findById(volunteerId);
    const registerdEvent = {
      event,
      role: roleAssigned,
    };
    volunteer.events_registered.push(registerdEvent);
    event.volunteers_registered.push(volunteer);
    await event.save();
    await volunteer.save();
    return event;
  } catch (error) {
    console.error("Error adding volunteer", error);
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  deleteEvent,
  updateEvent,
  addVolunteer,
};
