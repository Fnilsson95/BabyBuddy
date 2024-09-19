const mongoose = require("mongoose");

const childrenSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },

    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
    },

    specialNeeds: {
      type: String,
      required: [false],
    },
  },
  { timestamps: true }
);

const Children = mongoose.model("Children", childrenSchema);

module.exports = Children;
