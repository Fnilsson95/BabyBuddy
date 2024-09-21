// Importing libraries
const express = require('express');
const controller = express.Router();
// Import Booking Model
const Booking = require('./bookingModel');

// Create a new booking
controller.post('/', async (req, res) => {
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
controller.get('/', async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    try {
        const bookings = await Booking.find()
        .skip(skip)
        .limit(limit)
        .populate("guardian")
        .populate("babysitter")
        .populate("children");
        const total = await Booking.countDocuments();
        res.status(200).json({total, page, limit, bookings});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Get a booking by ID
controller.get('/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
        .populate("guardian")
        .populate("babysitter")
        .populate("children");
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a booking by ID
controller.put('/:id', async (req, res) => {
    try {

        const { startDateTime, endDateTime } = req.body;

        // Validate dates
        if (new Date(startDateTime) >= new Date(endDateTime)) {
            return res.status(400).json({ error: "End-date must be after Start-date" });
        }

        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true })
            .populate("guardian")
            .populate("babysitter")
            .populate("children");
        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a booking by ID
controller.delete('/:id', async (req, res) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
        if (!deletedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Delete whole booking collection
// Use with Caution! (Maybe not needed? Maybe change endpoint name for safety?)
controller.delete ('/', async (req, res) => {
    try {
        const result = await Booking.deleteMany({});
        res.status(200).json({ message: "All bookings deleted successfully!", deletedCount: result.deletedCount });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Partially Update a booking by ID 
controller.patch('/:id', async (req, res) => {
    try {

        const { startDateTime, endDateTime } = req.body;

        // Validate dates
        if (new Date(startDateTime) >= new Date(endDateTime)) {
            return res.status(400).json({ error: "End-date must be after Start-date" });
        }

        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true})
            .populate("guardian")
            .populate("babysitter")
            .populate("children");
        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found"});
        }
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(400).json({ error: error.message});
    }
});


// Save/Export the controller
module.exports = controller;
