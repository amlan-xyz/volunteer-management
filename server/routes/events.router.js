const express = require("express");
const router = express.Router();

//controlers
const {
  createEvent,
  getAllEvents,
  deleteEvent,
  updateEvent,
  addVolunteer,
} = require("../controllers/events.controller");

router.post("", async (req, res) => {
  const eventData = req.body;
  try {
    const savedEvent = await createEvent(eventData);
    if (savedEvent) {
      res
        .status(201)
        .json({ message: "Event creation successful", data: savedEvent });
    } else {
      res.status(400).json({ message: "Event creation failed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("", async (req, res) => {
  try {
    const events = await getAllEvents();
    if (events) {
      res.status(200).json({ message: "Events found", data: events });
    } else {
      res.status(404).json({ message: "Events not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  const eventId = req.params.id;
  try {
    const deletedEvent = await deleteEvent(eventId);
    if (deletedEvent) {
      res.status(200).json({ message: "Event deleted", data: deletedEvent });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  const eventId = req.params.id;
  const updatedData = req.body;
  try {
    const updatedEvent = await updateEvent(eventId, updatedData);
    if (updatedEvent) {
      res.status(200).json({ message: "Event updated", data: updatedEvent });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/:event_id/volunteers/:volunteer_id", async (req, res) => {
  const eventId = req.params.event_id;
  const volunteerId = req.params.volunteer_id;
  const { role } = req.body;
  try {
    const updatedEvent = await addVolunteer(eventId, volunteerId, role);
    if (updatedEvent) {
      res.status(200).json({ message: "Volunteer added", data: updatedEvent });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
