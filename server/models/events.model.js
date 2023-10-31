const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    event_name: {
      type: String,
      required: true,
    },
    event_date: {
      type: String,
      required: true,
    },
    event_time: {
      type: String,
      required: true,
    },
    event_location: {
      type: String,
      required: true,
    },
    event_description: {
      type: String,
      required: true,
    },
    event_roles: {
      type: String,
      required: true,
    },
    no_of_volunteers: {
      type: Number,
      required: true,
    },
    volunteers_registered: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Volunteer",
      },
    ],
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
