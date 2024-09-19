// Import Mongoose library
const mongoose = require('mongoose');

// Define Mongoose booking Schema
// * Reference to Guardian/Babysitter *
const bookingSchema = new mongoose.Schema({

    startDateTime: { type: Date, required: true },
    endDateTime: { type: Date, required: true },
    totalCost: { type: Number, required: true, min: 0 },
    location: {
        pickup_Location: { type: String, required: true },
        dropoff_Location: { type: String, required: true}
        },
    guardian: {type: Schema.Types.ObjectId, ref: "Guardians", required: true},
    babysitter: { type: Schema.Types.ObjectId, ref: "Babysitters", required: true},
    children: [{ type: Schema.Types.ObjectId, ref: "Children", required: true }], // Array for choice of multiple children
    },
{ timestamps: true});


// Create an instance of the Booking model.
const Bookings = mongoose.model('bookings', bookingSchema);

// Save/Export the model
module.exports = Bookings;