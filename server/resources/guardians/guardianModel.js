const mongoose = require('mongoose');
// Import Schema from Mongoose
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const guardianSchema = new Schema(
    {
        name: {
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
        },
        email: { 
            type: String, 
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email address"],
        },
        phoneNumber: { 
            type: String, 
            required: [true, "Phone-number is required"],
            match: [/^\+?[0-9]\d{1,14}$/, "Please provide a valid phone number"],
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
        location: {
            city: { 
                type: String, 
                required: [true, "City is required"],
                trim: true,
            },
            country: { 
                type: String, 
                required: [true, "Country is required"],
                trim: true,
            },
            address: { 
                type: String, 
                required: [true, "Address is required"],
                trim: true,
            },
        },
        children: [{ 
            // Array for choice of multiple children
            type: Schema.Types.ObjectId, 
            ref: "Children"
        }],
        bookings: [{
            // Array for all bookings
            type: Schema.Types.ObjectId,
            ref: "Bookings",
          }],
    },
    { timestamps: true}
);

// Apply the uniqueValidator to the Guardian Schema
guardianSchema.plugin(uniqueValidator, { message: "Email already exists" });

const Guardian = mongoose.model('Guardian', guardianSchema);

module.exports = Guardian;