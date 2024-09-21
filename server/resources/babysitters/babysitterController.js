const express = require("express");
const controller = express.Router();
const Babysitter = require("./babysitterModel");

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
        .json({ message: `Babysitter with id ${id} were not found` });
    }
    res.status(200).json(babysitter);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//Create babysitter
controller.post("/", async (req, res) => {
  try {
    const babysitter = await Babysitter.create(req.body);
    res.status(201).json({
      message: `Successfully created babysitter!`,
      babysitter,
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
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
        .json({ message: `Babysitter with id ${id} were not found` });
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

//Delete babysitter
controller.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBabysitter = await Babysitter.findByIdAndDelete(id);

    if (!deletedBabysitter) {
      return res
        .status(404)
        .json({ message: `Babysitter with id ${id} were not found` });
    }
    res
      .status(200)
      .json({ message: `Successfully deleted babysitter with id ${id}` });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = controller;
