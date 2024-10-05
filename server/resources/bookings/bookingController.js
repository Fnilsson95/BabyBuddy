// Importing libraries
const express = require("express");
const controller = express.Router();
// Import Booking Model
const Booking = require("./bookingModel");
const Guardian = require("../guardians/guardianModel");
const Babysitter = require("../babysitters/babysitterModel");
const Children = require("../children/childModel");

// Helper function to update booking statuses based on the current time
const updateBookingStatus = async (bookings) => {
  const currentDate = new Date();

  for (const booking of bookings) {
    // If the status is "Pending" and startDateTime has passed --> "Expired"
    if (booking.status === "Pending" && booking.startDateTime < currentDate) {
      await Booking.findByIdAndUpdate(booking._id, { status: "Expired" });
      booking.status = "Expired";
    }

    // If the status is "Confirmed" and endDateTimes has passed --> "Completed"
    else if (booking.status === "Confirmed" && booking.endDateTime < currentDate) {
      await Booking.findByIdAndUpdate(booking._id, { status: "Completed" });
      booking.status = "Completed";
    }
  }
  // Return the updated array of bookings
  return bookings;
};

// Create a new booking
controller.post("/", async (req, res) => {
  try {
    
    const { startDateTime, endDateTime, guardian, children, location, totalCost } = req.body;

    // Validate dates
    if (new Date(startDateTime) >= new Date(endDateTime)) {
      return res
        .status(400)
        .json({ error: "End-date must be after Start-date" });
    }

    // Check if the guardian exists
    const guardianExists = await Guardian.findById(guardian);
    if (!guardianExists) {
      return res
        .status(404)
        .json({ message: `Guardian with id ${guardian} was not found` });
    }

    // Check if all children exist
    const childrenExist = await Children.find({ _id: { $in: children } });
    if (childrenExist.length !== children.length) {
      return res
        .status(404)
        .json({ message: `One or more children were not found: ${children}` });
    }

    // Create the booking with status "Pending"
    const newBooking = new Booking({
      startDateTime,
      endDateTime,
      guardian,
      children,
      location,
      totalCost,
      status: "Pending" // Set to Pending initially
    });
    await newBooking.save();

    // Update the Guardian to include the booking.
    await Guardian.findByIdAndUpdate(guardian, {
      $push: { bookings: newBooking._id },
    });

    res
      .status(201)
      .json({ message: "Successfully created booking request", newBooking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all bookings
// Pagination Example for test
// /api/bookings?page=2&limit=10
controller.get("/", async (req, res) => {
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
    res.status(200).json({ total, page, limit, bookings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all bookings with status "Pending" (List for Booking Page)
controller.get("/pending", async (req, res) => {
  try {
    const pendingBookings = await Booking.find({ status: "Pending" })
      .populate("guardian")
      .populate("children")
      .populate("babysitter"); // Babysitter Will be null initially

    if (pendingBookings.length === 0) {
      return res.status(404).json({ message: "No pending bookings found" });
    }

    res.status(200).json(pendingBookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a booking by ID
controller.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id)
      .populate("guardian")
      .populate("babysitter")
      .populate("children");
    if (!booking) {
      return res
        .status(404)
        .json({ message: `Booking with id ${id} was not found` });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a booking by ID
controller.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { startDateTime, endDateTime } = req.body;

    // Validate dates
    if (new Date(startDateTime) >= new Date(endDateTime)) {
      return res
        .status(400)
        .json({ error: "End-date must be after Start-date" });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("guardian")
      .populate("babysitter")
      .populate("children");
    if (!updatedBooking) {
      return res
        .status(404)
        .json({ message: `Booking with id ${id} was not found` });
    }
    res.status(200).json({
      message: `Successfully updated booking with id ${id}`,
      updatedBooking,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a booking by ID
controller.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) {
      return res
        .status(404)
        .json({ message: `Booking with id ${id} was not found` });
    }
    res
      .status(200)
      .json({ message: `Successfully deleted booking with id ${id}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete whole booking collection
// Use with Caution!
controller.delete("/", async (req, res) => {
  try {
    const result = await Booking.deleteMany({});

    if (result.deletedCount === 0) {
      return res.status(400).json({ error: "No further bookings in list!" });
    }
    res.status(200).json({
      message: "All bookings deleted successfully!",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Partially Update a booking by ID
controller.patch("/:id", async (req, res) => {
  try {
    // Validate dates
    const { id } = req.params;
    const { startDateTime, endDateTime } = req.body;
    if (new Date(startDateTime) >= new Date(endDateTime)) {
      return res
        .status(400)
        .json({ error: "End-date must be after Start-date" });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("guardian")
      .populate("babysitter")
      .populate("children");
    if (!updatedBooking) {
      return res
        .status(404)
        .json({ message: `Booking with id ${id} was not found` });
    }
    res.status(200).json({
      message: `Successfully updated booking with id ${id}`,
      updatedBooking,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Confirm booking / Update Booking Status to Confirmed (Babysitter)
// Confirm booking / Update Booking Status to Confirmed (Babysitter)
controller.put("/:bookingId/confirm/:babysitterId", async (req, res) => {
  try {
    const { bookingId, babysitterId } = req.params; // Retrieve both bookingId and babysitterId from the params

    // Check if the babysitter exists
    const babysitter = await Babysitter.findById(babysitterId);
    if (!babysitter) {
      return res
        .status(404)
        .json({ message: `Babysitter with id ${babysitterId} was not found` });
    }

    // Update the booking status to "Confirmed"
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { babysitter: babysitterId, status: "Confirmed" }, // Update babysitter and status
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Ensure babysitter.bookings is an array
    if (!Array.isArray(babysitter.bookings)) {
      babysitter.bookings = [];
    }

    // Add the booking to the babysitter's list of bookings
    babysitter.bookings.push(updatedBooking._id);
    await babysitter.save();

    // Return the updated booking
    res.status(200).json({ message: "Booking confirmed", updatedBooking });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




// Save/Export the controller
module.exports = controller;
