const mongoose = require("mongoose");

const babySitters = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
    },

    phoneNumber: {
      type: String,
      required: [true, "Phonenumber is required"],
    },
    experience: {
      type: String,
    },
    hourlyRate: {
      type: Number,
      required: [true, "Hourly rate is required"],
    },
  },
  { timestamps: true }
);

const Babysitter = mongoose.model("Babysitters", babySitters);

module.exports = Babysitter;
