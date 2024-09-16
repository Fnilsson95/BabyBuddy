// RESTful/Overall Checklist to follow while setting up our resources.

// 1. What RESTful methods does each resource (each Entity in ER diagram is one resource) need? 
//     CREATE (POST) -- READ (GET) -- UPDATE (PUT/PATCH) -- DELETE (DELETE)
// Example: Do we need DELETE method for the whole collection of the resource, or only for a specific id of the resource?
//          Doesn't make sense to be able to delete the whole collection of Guardians for instance.
//          We should not have redundant methods that is not needed for a resource. 

// 2. Use nouns for your resources NOT verbs
// Example: camels, calenders, children
// NOT /getAllCamels or /createNewCamel

// 3. Use plural nouns 
// Example: /camels (to clearly indicate this is a collection)

// 4. GET method and Query Parameters should not alter the state.
//    Example: Should not use GET method in combination with an update/delete method which alters the state of the collection/object.
//    GET /guardians/delete/{guardianId}


// Importing libraries
const express = require('express');
const router = express.Router();
// Import Booking Model
const Booking = require('./bookingModel');

// Create a new booking
router.post('/', async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all bookings
// Pagination Example for test
// /api/bookings?page=2&limit=10
router.get('/', async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    try {
        const bookings = await Booking.find().skip(skip).limit(limit);
        const total = await Booking.countDocuments();
        res.status(200).json({total,page, limit, bookings});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Get a booking by ID
router.get('/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a booking by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



// Save/Export the router
module.exports = router;
