const Event = require("../models/events.model");

const createEvent = async (eventData) => {
  const {
    event_name,
    event_date,
    event_time,
    event_location,
    event_description,
    no_of_volunteers,
  } = eventData;
  try {
    const event = {
      event_name,
      event_date,
      event_time,
      event_location,
      event_description,
      no_of_volunteers,
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
    console.log(events);
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

module.exports = { createEvent, getAllEvents, deleteEvent, updateEvent };
