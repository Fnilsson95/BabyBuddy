const express = require("express");
const controller = express.Router();
const Children = require("./childModel");
const Guardian = require("../guardians/guardianModel");

//Create child
controller.post("/", async (req, res) => {
  try {
    const { guardian } = req.body;

    const guardianExists = await Guardian.findById(guardian);
    if (!guardianExists) {
      return res
        .status(404)
        .json({ message: `Guardian with the specified id was not found` });
    }
    const child = new Children(req.body);
    const newChild = await child.save();

    // Update the guardian to include this child in the array
    await Guardian.findByIdAndUpdate(guardian, {
      $push: { children: newChild._id },
    });
    res.status(201).json({
      message: `Successfully created child!`,
      newChild,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get all children with pagination and Sorting option
// Example: api/children?page=1&limit=10&sort=lastName&order=asc

controller.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      sort = "firstName",
      order = "asc",
    } = req.query;

    // Pagination values
    const pages = parseInt(page, 10);
    const limits = parseInt(limit, 10);
    const skip = (pages - 1) * limits;

    // Handle invalid page or limit values
    if (isNaN(pages) || pages < 1) {
      return res
        .status(400)
        .json({
          message: "Invalid page parameter. Must be a positive number.",
        });
    }
    if (isNaN(limits) || limits < 1) {
      return res
        .status(400)
        .json({
          message: "Invalid limit parameter. Must be a positive number.",
        });
    }

    // Validate sorting order and set option
    const validOrders = ["asc", "desc"];
    const sortOrder = validOrders.includes(order)
      ? order === "asc"
        ? 1
        : -1
      : 1;
    const sortOption = { [sort]: sortOrder };

    const children = await Children.find({})
      .sort(sortOption)
      .skip(skip)
      .limit(limits)
      .populate("guardian");

    // Get total number of children documents
    const totalChildren = await Children.countDocuments();

    res.status(200).json({
      total: totalChildren,
      page: pages,
      limit: limits,
      children,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//Get specific child
controller.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const child = await Children.findById(id).populate("guardian");
    if (!child) {
      return res
        .status(404)
        .json({ message: `Child with id ${id} was not found` });
    }
    res.status(200).json(child);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//Update child
controller.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const child = await Children.findByIdAndUpdate(id, req.body);
    if (!child) {
      return res
        .status(404)
        .json({ message: `Child with id ${id} were not found` });
    }

    const updatedChild = await Children.findById(id);
    return res.status(200).json({
      message: `Successfully updated child with id ${id}`,
      updatedChild,
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

//Delete child
controller.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedChild = await Children.findByIdAndDelete(id);

    if (!deletedChild) {
      return res
        .status(404)
        .json({ message: `Child with id ${id} was not found` });
    }
    return res.status(200).json({
      message: `Successfully deleted child with id ${id}`,
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// Delete all children
// Use with Caution!!
controller.delete("/", async (req, res) => {
  try {
    // get all children
    const deleteAll = await Children.deleteMany({});

    if (deleteAll.deletedCount === 0) {
      return res.status(404).json({ message: "No children found to delete" });
    }

    // Remove the reference to each child from their guardian's children array
    await Guardian.updateMany(
      { children: { $in: deleteAll._id } },
      { $pull: { children: { $in: deleteAll._id } } }
    );

    res.status(200).json({
      message: "All children successfully deleted",
      deletedCount: deleteAll.deletedCount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = controller;
