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
      res.status(404).json({ message: `Guardian with id were not found` });
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
    return res.status(500).json({ error: e.message });
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
    res.status(500).json({ error: e.message });
  }
});

//Delete child
controller.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedChild = await Children.findByIdAndDelete(id);

    if (!deletedChild) {
      res.status(404).json({ message: `Child with id ${id} was not found` });
    }
    res.status(200).json({
      message: `Successfully deleted child with id ${id}`,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = controller;
