const mongoose = require("mongoose");

const babysitterSchema = mongoose.Schema(
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
      required: [true, "Hourly rate is required"], min: [50, "Minimum 50kr/h is required as minimum wage"],
    },
  },
  { timestamps: true }
);

const Babysitter = mongoose.model("Babysitter", babysitterSchema);

module.exports = Babysitter;
