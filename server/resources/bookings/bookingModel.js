// Import Mongoose library
const mongoose = require('mongoose');
// Import Schema from Mongoose
const Schema = mongoose.Schema;

// Define Mongoose booking Schema
const bookingSchema = new mongoose.Schema(
    {
        startDateTime: {
            type: Date,
            required: [true, "Start-date is required"],
            validate: {
                validator: function (value) {
                    return value > new Date();
                },
                message: "Start date must be in the future",
            },
        },
        endDateTime: {
            type: Date,
            required: [true, "End-date is required"],
        },
        totalCost: {
            type: Number,
            required: [true, "Total Cost is required"],
            min: [0, "Total Cost must be at least 0"]
        },
        location: {
            pickupLocation: {
                type: String,
                required: [true, "Pick-up location is required"],
                trim: true,
            },
            dropoffLocation: {
                type: String,
                required: [true, "Drop-off location is required"],
                trim: true,
            },
        },
        guardian: {
            type: Schema.Types.ObjectId,
            ref: "Guardian",
            required: [true, "A Guardian is required"]
        },
        babysitter: {
            type: Schema.Types.ObjectId,
            ref: "Babysitter",
        },
        children: [{
            // Array for choice of multiple children
            type: Schema.Types.ObjectId,
            ref: "Children",
            required: [true, "Atleast one child is required"]
        }],
        status: {
            type: String,
            required: true,
            enum: ["Pending", "Confirmed", "Completed", "Expired"],
            default: "Pending" // Default status when Guardian creates a booking
        },
        description: {
            type: String,
            trim: true,
            validate: {
                validator: function (value) {
                    // Split the string into words and check the word count
                    return value.split(/\s+/).filter(Boolean).length <= 20;
                },
                message: "Description must be 20 words or less",
            },
        },
        additionalInformation: {
            type: String,
            trim: true
        },
    },
    { timestamps: true }
);


// Create an instance of the Booking model.
const Bookings = mongoose.model('Booking', bookingSchema);

// Save/Export the model
module.exports = Bookings;