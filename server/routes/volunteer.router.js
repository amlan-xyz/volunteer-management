const express = require("express");
const {
  createVolunteer,
  getAllVolunteers,
  updateVolunteer,
  deleteVolunteer,
} = require("../controllers/volunteers.contorller");
const router = express.Router();

router.post("", async (req, res) => {
  const volunteerData = req.body;
  try {
    const savedVolunteer = await createVolunteer(volunteerData);
    if (savedVolunteer) {
      res
        .status(201)
        .json({ message: "Successfuly added volunteer", data: savedVolunteer });
    } else {
      res.status(400).json({ message: "Failed to add volunteer" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("", async (req, res) => {
  try {
    const volunteers = await getAllVolunteers();
    if (volunteers) {
      res.status(200).json({ message: "Volunteers found", data: volunteers });
    } else {
      res.status(404).json({ message: "Volunteers not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  const volunteerId = req.params.id;
  const updatedData = req.body;
  try {
    const updatedVolunteer = await updateVolunteer(volunteerId, updatedData);
    if (updatedVolunteer) {
      res
        .status(200)
        .json({ message: "Volunteer updated", data: updatedVolunteer });
    } else {
      res.status(404).json({ message: "Volunteer not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  const volunteerId = req.params.id;
  try {
    const deletedVolunteer = await deleteVolunteer(volunteerId);
    if (deletedVolunteer) {
      res
        .status(200)
        .json({ message: "Volunteer deleted", data: deletedVolunteer });
    } else {
      res.status(404).json({ message: "Volunteer not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
