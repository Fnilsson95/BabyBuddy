// Import Mongoose library
const mongoose = require('mongoose');
// Import Schema from Mongoose
const Schema = mongoose.Schema;

// Define Mongoose booking Schema
const bookingSchema = new mongoose.Schema(
    {
        startDateTime: { 
            type: Date, 
            required: [true, "Start-date is required"]
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
            pickup_Location: { 
                type: String, 
                required: [true, "Pick-up location is required"]
            },
            dropoff_Location: { 
                type: String, 
                required: [true, "Drop-off location is required"]
            }
        },
        guardian: { 
            type: Schema.Types.ObjectId, 
            ref: "Guardian", 
            required: [true, "A Guardian is required"]
        },
        babysitter: { 
            type: Schema.Types.ObjectId, 
            ref: "Babysitter", 
            required: [true, "A babysitter is required"]
        },
        children: [{ 
            // Array for choice of multiple children
            type: Schema.Types.ObjectId, 
            ref: "Children", 
            required: [true, "Atleast one child is required"]
        }], 
    },
    { timestamps: true}
);


// Create an instance of the Booking model.
const Bookings = mongoose.model('Booking', bookingSchema);

// Save/Export the model
module.exports = Bookings;