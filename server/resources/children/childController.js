const express = require("express");
const controller = express.Router();
const Children = require("./childModel");
const Guardian = require("../guardians/guardianModel");

//Get all children
controller.get("/", async (req, res) => {
  try {
    const children = await Children.find({}).populate("guardian");
    res.status(200).json(children);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//Get specific child
controller.get('/:id', async (req, res) => {
  try {
    const child = await Children.findById(req.params.id).populate('guardian');
    if (!child) {
      return res.status(404).json({ message: `Child with id ${req.params.id} was not found` });
    }
    res.status(200).json(child);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

//Create child
controller.post("/", async (req, res) => {
  try {

    const { guardian } = req.body;

    const child = await Children.create(req.body);
    // Update the guardian to include this child in the array
    await Guardian.findByIdAndUpdate(guardian, { $push: { children: child._id } });
    res.status(201).json({
      message: `Successfully created child!`,
      child,
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

//Update child

controller.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const child = await Children.findByIdAndUpdate(id, req.body);
    if (!child) {
      res.status(404).json({ message: `Child with id ${id} were not found` });
    }

    const updatedChild = await Children.findById(id);
    res.status(200).json({
      message: `Successfully updated child with id ${id}`,
      updatedChild,
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

//Delete child
controller.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedChild = await Children.findByIdAndDelete(id);

    if (!deletedChild) {
      res.status(404).json({ message: `Child with id ${id} were not found` });
    }
    res.status(200).json({
      message: `Successfully deleted child with id ${id}`,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = controller;
