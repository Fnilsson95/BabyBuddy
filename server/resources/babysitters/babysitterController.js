const express = require("express");
const controller = express.Router();
const Babysitter = require("./babysitterModel");
const Children = require("../children/childModel");
const Bookings = require("../bookings/bookingModel");
const updateBookingStatus = require("../bookings/bookingHelpers");

//Create babysitter
controller.post("/", async (req, res) => {
  try {
    const babysitter = new Babysitter(req.body);
    const newBabysitter = await babysitter.save();
    res.status(201).json({
      message: `Successfully created babysitter!`,
      newBabysitter,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//Get all babysitters
// Pagination and sorting example
// /api/babysitters?page=1&limit=15&sort=hourlyRate&order=asc
controller.get("/", async (req, res) => {
  try {
    // Destructure query parameters with defaults
    const { page = 1, limit = 20, sort = "hourlyRate", order = "desc" } = req.query;

    // Validate and parse pagination parameters
    const pages = parseInt(page, 10);
    const limits = parseInt(limit, 10);

    // Handle invalid page or limit values
    if (isNaN(pages) || pages < 1) {
      return res.status(400).json({ message: "Invalid page parameter. Must be a positive number." });
    }
    if (isNaN(limits) || limits < 1) {
      return res.status(400).json({ message: "Invalid limit parameter. Must be a positive number." });
    }

    // Calculate skip value for pagination
    const skip = (pages - 1) * limits;

    // Validate and set sort order
    const validOrders = ["asc", "desc"];
    if (!validOrders.includes(order)) {
      return res.status(400).json({ message: "Invalid order parameter. Use 'asc' or 'desc'." });
    }
    const sortOrder = order === "asc" ? 1 : -1;
    const sortOption = { [sort]: sortOrder };

    // Fetch the babysitters with pagination and sorting
    const babysitters = await Babysitter.find({})
      .sort(sortOption)
      .skip(skip)
      .limit(limits);

    // Send the response
    res.status(200).json(babysitters);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


//Get specific babysitter
controller.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const babysitter = await Babysitter.findById(id);

    if (!babysitter) {
      return res
        .status(404)
        .json({ message: `Babysitter with id ${id} was not found` });
    }
    res.status(200).json(babysitter);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Update babysitter
controller.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the existing babysitter
    const babysitter = await Babysitter.findById(id);
    if (!babysitter) {
      return res.status(404).json({ message: `Babysitter with id ${id} was not found` });
    }

    // Check if the email is being updated, and if it exists in another babysitter
    if (req.body.email && req.body.email !== babysitter.email) {
      const emailExists = await Babysitter.findOne({ email: req.body.email });
      if (emailExists) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }

    // Update the babysitter and return the updated babysitter
    const updatedBabysitter = await Babysitter.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true } // Ensure the new document is returned and validators are run
    );

    res.status(200).json({
      message: `Successfully updated babysitter with id ${id}`,
      updatedBabysitter,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


// Partially update a babysitter

controller.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedBabysitter = await Babysitter.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedBabysitter) {
      return res
        .status(404)
        .json({ message: `Babysitter with id ${id} was not found` });
    }

    

    res.status(200).json(updatedBabysitter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete babysitter
controller.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the babysitter to delete
    const babysitter = await Babysitter.findById(id);

    // If babysitter does not exist, return 404
    if (!babysitter) {
      return res.status(404).json({ message: `Babysitter with id ${id} was not found` });
    }

    // Find all bookings where this babysitter is assigned
    const affectedBookings = await Bookings.find({ babysitter: id });

    // Update the bookings to remove the babysitter and set status to "Pending"
    for (const booking of affectedBookings) {
      await Bookings.findByIdAndUpdate(booking._id, {
        babysitter: null,
        status: "Pending"
      });
    }

    // Delete the babysitter after updating the bookings
    await Babysitter.findByIdAndDelete(id);

    res.status(200).json({
      message: `Successfully deleted babysitter with id ${id}`
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});



// Get all bookings for a babysitter (All their confirmed and completed bookings)
// Pagination and Sorting option
controller.get("/:babysitterId/bookings", async (req, res) => {
  try {
    const { babysitterId } = req.params;
    const { status = ["Confirmed", "Completed"], page = 1, limit = 20, sort = "startDateTime", order = "asc" } = req.query;


    const babysitterExists = await Babysitter.findById(babysitterId);
    if (!babysitterExists) {
      return res.status(404).json({ message: `Babysitter with id ${babysitterId} was not found` });
    }

    // Pagination and Sorting logic
    const pages = parseInt(page, 10);
    const limits = parseInt(limit,10);
    const skip = (pages - 1) * limits;
    const validOrders = ["asc", "desc"];
    const sortOrder = validOrders.includes(order) ? (order === "asc" ? 1 : -1) : 1;
    const sortOption = { [sort]: sortOrder };

    const bookings = await Bookings.find({
      babysitter: babysitterId,
      status: { $in: Array.isArray(status) ? status : [status] }, // Handle single or multiple statuses
    })
      .sort(sortOption)
      .skip(skip)
      .limit(limits)
      .populate("guardian")
      .populate("children");

    // Update booking statuses before returning (if any)  
    const updatedBookings = await updateBookingStatus(bookings);

    if (updatedBookings.length === 0) {
      return res.status(404).json({ message: "No bookings found for this babysitter with specified status(es)" });
    }

    res.status(200).json({
      page: pages,
      limit, limits,
      totalBookings: updatedBookings.length,
      bookings: updatedBookings,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific booking for a babysitter
controller.get("/:babysitterId/bookings/:bookingId", async (req, res) => {
  try {
    const { babysitterId, bookingId } = req.params;

    const babysitterExists = await Babysitter.findById(babysitterId);
    if (!babysitterExists) {
      return res.status(404).json({ message: `Babysitter with id ${babysitterId} was not found` });
    }

    const booking = await Bookings.findOne({
      _id: bookingId,
      babysitter: babysitterId,
      status: "Confirmed"
    })
      .populate("guardian")
      .populate("children");

    if (!booking) {
      return res.status(404).json({ message: `Booking with id ${bookingId} was not found for this babysitter` });
    }

    // Update booking statuses before returning (if any)
    // Return as an array with index 0 to unpack the array and extract single booking object
    const updatedBooking = await updateBookingStatus([booking]);

    res.status(200).json(updatedBooking[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a specific booking for a babysitter
// Also sets "Confirmed" status back to "Pending" for Guardians
controller.delete("/:babysitterId/bookings/:bookingId", async (req, res) => {
  try {
    const { babysitterId, bookingId } = req.params;

    const babysitterExists = await Babysitter.findById(babysitterId);
    if (!babysitterExists) {
      return res.status(404).json({ message: `Babysitter with id ${babysitterId} was not found` });
    }

    const booking = await Bookings.findOneAndUpdate(
      { _id: bookingId, babysitter: babysitterId },
      { babysitter: null, status: "Pending" }, // Set babysitter to null and status to "Pending"
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: `Booking with id ${bookingId} was not found for this babysitter` });
    }

    // Remove the booking from the babysitter's booking list
    await Babysitter.findByIdAndUpdate(babysitterId, {
      $pull: { bookings: bookingId }
    });

    res.status(200).json({ message: `Successfully removed booking'` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove all bookings for a babysitter
// Also sets "Confirmed" status back to "Pending" for Guardians
controller.delete("/:babysitterId/bookings", async (req, res) => {
  try {
    const { babysitterId } = req.params;

    const babysitterExists = await Babysitter.findById(babysitterId);
    if (!babysitterExists) {
      return res.status(404).json({ message: `Babysitter with id ${babysitterId} was not found` });
    }

    const bookings = await Bookings.find({ babysitter: babysitterId, status: "Confirmed" });

    if (bookings.length === 0) {
      return res.status(404).json({ message: "No confirmed bookings found for this babysitter" });
    }

    // Set babysitter to null and status to "Pending" for all bookings
    await Bookings.updateMany(
      { babysitter: babysitterId, status: "Confirmed" },
      { babysitter: null, status: "Pending" }
    );

    // Remove all bookings from the babysitter's booking list
    await Babysitter.findByIdAndUpdate(babysitterId, { bookings: [] });

    res.status(200).json({ message: "Successfully removed all bookings'" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Delete ALL babysitters
// Use with caution
controller.delete("/", async (req, res) => {
  try {
    // get all babysitters
    const deleteAll = await Babysitter.deleteMany({});

    if (deleteAll.deletedCount === 0) {
      return res.status(404).json({ message: "No babysitters found to delete" });
    }

    // Set all bookings associated with the deleted babysitters to pending
    await Bookings.updateMany(
      { babysitter: { $in: deleteAll._id } },
      { babysitter: null, status: "Pending" }
    );

    res.status(200).json({
      message: "All babysitters successfully deleted",
      deletedCount: deleteAll.deletedCount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = controller;
