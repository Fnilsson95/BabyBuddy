const Guardian = require('./guardianModel');
const express = require('express');
const controller = express.Router();

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

// Update guardian

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


// Export routes
module.exports = controller;
