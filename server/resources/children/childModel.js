const mongoose = require("mongoose");
// Import Schema from Mongoose
const Schema = mongoose.Schema;

const childrenSchema = mongoose.Schema(
  {
    name: {
      firstName: {
      type: String,
      required: [true, "First name is required"],
    },
      lastName: {
      type: String,
      required: [true, "Last name is required"],
    }
  },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
    },

    specialNeeds: {
      type: String,
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
