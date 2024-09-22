const Guardian = require('./guardianModel');
const express = require('express');
const controller = express.Router();
const Child = require('../children/childModel');

// Create new guardian
controller.post('/', async (req, res) => {
    try {
        const guardian = new Guardian(req.body);
        await guardian.save();
        res.status(201).json(guardian);
    } catch (error) {
        res.status(400).json({ error: error.message});
    }
});

// Get all guardians
controller.get('/', async (req, res) => {
    try {
        const guardians = await Guardian.find().populate("children");
        res.status(200).json(guardians);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
});

// Get guardian by ID
controller.get('/:id', async (req, res) => {
    try {
        const guardian = await Guardian.findById(req.params.id).populate("children");
        if (!guardian) {
            return res.status(404).json({ message: "Guardian not found"});
        }
        res.status(200).json(guardian);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Delete guardian by id
controller.delete('/:id', async (req, res) => {
    try {
      const guardian = await Guardian.findByIdAndDelete(req.params.id);
      if (!guardian) {
        return res.status(404).json({ error: `Could not find guardian with id: ${req.params.id}` });
      }
      res.status(200).json({ message: 'Guardian deleted successfully', guardian });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get all children of a specific guardian - /guardians/:guardianId/children
  controller.get("/:guardianId/children", async (req, res) => {
    try {
        const guardianId = req.params.guardianId;

        const guardian = await Guardian.findById(guardianId).populate("children");

        if (!guardian) {
            return res.status(404).json({ message: "Guardian not found" });
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
            return res.status(404).json({ message: 'Child not found for this guardian' });
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

        const child = await Child.findOneAndDelete({ _id: childId, guardian: guardianId });

        if (!child) {
            return res.status(404).json({ message: 'Child not found for this guardian' });
        }

        await Guardian.findByIdAndUpdate(guardianId, { $pull: { children: child._id } });

        res.status(200).json({ message: 'Child removed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Export routes
module.exports = controller;
