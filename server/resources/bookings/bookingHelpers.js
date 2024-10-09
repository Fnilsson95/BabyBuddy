// Importing libraries
const express = require("express");
// Import Booking Model
const Booking = require("./bookingModel");


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


module.exports = updateBookingStatus;