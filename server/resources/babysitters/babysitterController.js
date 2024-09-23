const express = require("express");
const controller = express.Router();
const Babysitter = require("./babysitterModel");

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
    res.status(400).json({ error: e.message });
  }
});

//Get all babysitters
controller.get("/", async (req, res) => {
  try {
    const babysitters = await Babysitter.find({});
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

//Update babysitter
controller.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const babysitter = await Babysitter.findByIdAndUpdate(id, req.body);
    if (!babysitter) {
      return res
        .status(404)
        .json({ message: `Babysitter with id ${id} was not found` });
    }

    const updatedBabysitter = await Babysitter.findById(id);
    res.status(200).json({
      message: `Successfully updated babysitter with id ${id}`,
      updatedBabysitter,
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
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
    res.status(400).json({ error: error.message });
  }
});

//Delete babysitter
controller.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBabysitter = await Babysitter.findByIdAndDelete(id);

    if (!deletedBabysitter) {
      return res
        .status(404)
        .json({ message: `Babysitter with id ${id} was not found` });
    }
    res
      .status(200)
      .json({ message: `Successfully deleted babysitter with id ${id}` });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = controller;
