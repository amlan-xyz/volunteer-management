require("dotenv").config();
require("./db");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());

//cors
app.use(cors());

//routes
const eventsRouter = require("./routes/events.router");

app.get("/", (req, res) => {
  res.send("Volunteer Management System");
});

app.use("/events", eventsRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Server started at port: " + PORT);
});
