const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const babysitterSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email address"],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
      validate: {
        validator: function (value) {
          return value <= new Date();
        },
        message: "Date of birth can't be in the future",
      },
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone-number is required"],
      match: [/^\+?[0-9]\d{1,14}$/, "Please provide a valid phone number"],
    },
    experience: {
      type: String,
      trim: true,
    },
    hourlyRate: {
      type: Number,
      required: [true, "Hourly rate is required"], 
      min: [50, "Minimum 50kr/h is required as minimum wage"],
    },
    bookings: [{
      // Array for all bookings confirmed by babysitter
      type: Schema.Types.ObjectId,
      ref: "Bookings",
    }],
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      maxlength: [20, "Password must be less than or equal to 20 characters long"],
    },
  },
  { timestamps: true }
);

const Babysitter = mongoose.model("Babysitter", babysitterSchema);

module.exports = Babysitter;
