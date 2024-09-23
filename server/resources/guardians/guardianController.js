const Guardian = require("./guardianModel");
const express = require("express");
const controller = express.Router();
const Child = require("../children/childModel");

// Create new guardian
controller.post("/", async (req, res) => {
  try {
    const guardian = new Guardian(req.body);
    const newGuardian = await guardian.save();
    res
      .status(201)
      .json({ message: "Successfully created guardian!", newGuardian });
  } catch (error) {
    res.status(400).json({ error: error.message });
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
    res.status(400).json({ error: error.message });
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

    if (!updateGuadian) {
      return res
        .status(404)
        .json({ message: `Guardian with id ${id} was not found` });
    } else {
      res.status(200).json(updateGuadian);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
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

// Export routes
module.exports = controller;
