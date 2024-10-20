const mongoose = require("mongoose");
// Import Schema from Mongoose
const Schema = mongoose.Schema;

const childrenSchema = mongoose.Schema(
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
    specialNeeds: {
      type: String,
      trim: true,
    },
    guardian: {
      type: Schema.Types.ObjectId,
      ref: "Guardian",
      required: [true, "Guardian is required"],
    },
  },
  { timestamps: true }
);

const Children = mongoose.model("Children", childrenSchema);

module.exports = Children;
