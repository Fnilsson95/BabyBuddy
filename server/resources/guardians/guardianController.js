const Guardian = require("./guardianModel");
const express = require("express");
const controller = express.Router();
const Child = require("../children/childModel");
const Children = require("../children/childModel");
const Bookings = require("../bookings/bookingModel");
const updateBookingStatus = require("../bookings/bookingHelpers");

// Create new guardian
controller.post("/", async (req, res) => {
  try {
    const guardian = new Guardian(req.body);
    const newGuardian = await guardian.save();
    res
      .status(201)
      .json({ message: "Successfully created guardian!", newGuardian });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Create new child for a specific guardian
controller.post("/:guardianId/children", async (req, res) => {
  try {
    const { guardianId } = req.params;
    const guardian = await Guardian.findById(guardianId);

    if (!guardian) {
      return res.status(404).json({
        message: `Guardian with id ${guardianId} was not found`,
      });
    }

    //Create new child
    const child = new Children(req.body);
    const newChild = await child.save();

    // Add the child to the guardian's children array
    guardian.children.push(newChild._id);
    await guardian.save();

    const updatedGuardian = await Guardian.findById(guardianId).populate(
      "children"
    );

    res
      .status(201)
      .json({ message: "Successfully created child!", newChild, updatedGuardian });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Get all guardians
controller.get("/", async (req, res) => {
  try {
    const guardians = await Guardian.find().populate("children");
    res.status(200).json(guardians);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get guardian by id
controller.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const guardian = await Guardian.findById(id).populate("children");

    if (!guardian) {
      res.status(404).json({
        message: `Guardian with id ${id} was not found`,
      });
    } else {
      res.status(200).json(guardian);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update guardian
controller.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const guardian = await Guardian.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).populate("children");

    // Check if the email is being updated, and if it exists in another guardian
    if (req.body.email && req.body.email !== guardian.email) {
      const emailExists = await Guardian.findOne({ email: req.body.email });
      if (emailExists) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }

    if (!guardian) {
      res.status(404).json({ message: `Guardian with id ${id} was not found` });
    } else {
      const updateGuardian = await Guardian.findById(id).populate("children");
      res.status(200).json({
        message: `Successfully updated guardian with id ${id}`,
        updateGuardian,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update partial information
controller.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateGuadian = await Guardian.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).populate("children");


    // Check if the email is being updated, and if it exists in another guardian
    if (req.body.email && req.body.email !== guardian.email) {
      const emailExists = await Guardian.findOne({ email: req.body.email });
      if (emailExists) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }

    if (!updateGuadian) {
      return res
        .status(404)
        .json({ message: `Guardian with id ${id} was not found` });
    } else {
      res.status(200).json(updateGuadian);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete guardian by id
controller.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const guardian = await Guardian.findByIdAndDelete(id);
    if (guardian) {
      res.status(200).json({
        message: `deleted guardian: ${guardian}`,
      });
    } else {
      res.status(404).json({ error: `Guardian with id ${id} was not found` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete all guardians
// Use with Caution!!
controller.delete("/", async (req, res) => {
  try {
    const deleteAll = await Guardian.deleteMany({});
    if (deleteAll.deletedCount === 0) {
      return res.status(400).json({ message: "No guardians to delete!" });
    }
    res.status(200).json({
      message: "All guardians was successfully deleted!",
      deletedCount: deleteAll.deletedCount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all children of a specific guardian - /guardians/:guardianId/children
controller.get("/:guardianId/children", async (req, res) => {
  try {
    const { guardianId } = req.params;
    const guardian = await Guardian.findById(guardianId).populate("children");

    if (!guardian) {
      return res
        .status(404)
        .json({ message: `Guardian with id ${guardianId} were not found` });
    }
    res.status(200).json(guardian.children);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific child of a specific guardian - /guardians/:guardianId/children/:childId
controller.get("/:guardianId/children/:childId", async (req, res) => {
  try {
    const { guardianId, childId } = req.params;

    const child = await Child.findOne({ _id: childId, guardian: guardianId });

    if (!child) {
      return res
        .status(404)
        .json({ message: `Child with ${childId} not found for this guardian` });
    }
    res.status(200).json(child);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a specific child of a specific guardian - /guardians/:guardianId/children/:childId
controller.delete("/:guardianId/children/:childId", async (req, res) => {
  try {
    const { guardianId, childId } = req.params;

    const child = await Child.findOneAndDelete({
      _id: childId,
      guardian: guardianId,
    });

    if (!child) {
      return res
        .status(404)
        .json({ message: `Child with ${childId} not found for this guardian` });
    }

    await Guardian.findByIdAndUpdate(guardianId, {
      $pull: { children: child._id },
    });

    res
      .status(200)
      .json({ message: `Child with ${childId} removed successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all bookings for a specific guardian
// With pagination and Sorting option
// Example: /api/guardians/:guardianId/bookings?page=2&limit=10&sort=startDateTime&order=desc

controller.get("/:guardianId/bookings", async (req, res) => {
  try {
    const { guardianId } = req.params;
    const { page = 1, limit = 20, sort = "startDateTime", order = "asc" } = req.query;

    // Pagination and Sorting parameters and validation
    const pages = parseInt(page, 10);
    const limits = parseInt(limit, 10);
    const skip = (pages - 1) * limits;

    // Handle invalid page or limit values
    if (isNaN(pages) || pages < 1) {
      return res.status(400).json({ message: "Invalid page parameter. Must be a positive number." });
    }
    if (isNaN(limits) || limits < 1) {
      return res.status(400).json({ message: "Invalid limit parameter. Must be a positive number." });
    }
    
    const validOrders = ["asc", "desc"];
    const sortOrder = validOrders.includes(order) ? (order === "asc" ? 1 : -1) : 1;
    const sortOption = { [sort]: sortOrder};
    

    // Find all bookings associated with the guardian
    const guardianBookings = await Bookings.find({ guardian: guardianId })
      .sort(sortOption)
      .skip(skip)
      .limit(limits)
      .populate("guardian")
      .populate("children")
      .populate("babysitter"); // Babysitter may be null if booking is still pending


    // Update booking statuses before returning (if any)
    const updatedBookings = await updateBookingStatus(guardianBookings);  
    
    if (updatedBookings.length === 0) {
      return res.status(400).json({ message: "No bookings found for this guardian" });
    }

    res.status(200).json({
      page: pages,
      limit: limits,
      totalBookings: updatedBookings.length,
      bookings: updatedBookings,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get a specific booking for a guardian
controller.get("/:guardianId/bookings/:bookingId", async (req, res) => {
  try {
    const { guardianId, bookingId } = req.params;

    // Find the booking and ensure it belongs to the guardian
    const booking = await Bookings.findOne({ _id: bookingId, guardian: guardianId })
      .populate("guardian")
      .populate("children")
      .populate("babysitter"); // Babysitter may be null if booking is still pending

    if (!booking) {
      return res.status(404).json({ message: `Booking with id ${bookingId} not found for this guardian` });
    }

    // Update the status before returning
    // Return as an array with index 0 to unpack the array and extract single booking object

    const updatedBooking = await updateBookingStatus([booking]);

    res.status(200).json(updatedBooking[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a specific booking for a guardian
controller.delete("/:guardianId/bookings/:bookingId", async (req, res) => {
  try {
    const { guardianId, bookingId } = req.params;

    // Find the booking and ensure it belongs to the guardian
    const booking = await Bookings.findOne({ _id: bookingId, guardian: guardianId });
    if (!booking) {
      return res.status(404).json({ message: `Booking with id ${bookingId} not found for this guardian` });
    }

    // If a babysitter is assigned to the booking
    // remove the booking from the babysitter's bookings list
    if (booking.babysitter) {
      await Babysitter.findByIdAndUpdate(booking.babysitter, { $pull: { bookings: bookingId } });
    }

    // Delete the booking
    await Bookings.findByIdAndDelete(bookingId);

    // Remove the booking reference from the guardian's bookings array
    await Guardian.findByIdAndUpdate(guardianId, { $pull: { bookings: bookingId } });

    res.status(200).json({ message: `Successfully deleted booking with id ${bookingId}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Delete ALL bookings for a specific guardian
controller.delete("/:guardianId/bookings", async (req, res) => {
  try {
    const { guardianId } = req.params;

    // Find all bookings for the guardian
    const guardianBookings = await Bookings.find({ guardian: guardianId });
    if (guardianBookings.length === 0) {
      return res.status(400).json({ message: "No bookings found for this guardian" });
    }

    // For each booking
    // If a babysitter is assigned (booking confirmed)
    // Remove the booking from the babysitters bookings list
    for (const booking of guardianBookings) {
      if (booking.babysitter) {
        await Babysitter.findByIdAndUpdate(booking.babysitter,
          { $pull: { bookings: booking._id } });
      }
    }

    // Delete all the bookings for the guardian
    await Bookings.deleteMany({ guardian: guardianId });

    // Clear the bookings array for guardian
    await Guardian.findByIdAndUpdate(guardianId, { $set: { bookings: [] } });

    res.status(200).json({ message: "All bookings for this guardian have been successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Export routes
module.exports = controller;
