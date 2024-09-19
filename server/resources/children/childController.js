// RESTful/Overall Checklist to follow while setting up our resources.

// 1. What RESTful methods does each resource (each Entity in ER diagram is one resource) need?
//     CREATE (POST) -- READ (GET) -- UPDATE (PUT/PATCH) -- DELETE (DELETE)
// Example: Do we need DELETE method for the whole collection of the resource, or only for a specific id of the resource?
//          Doesn't make sense to be able to delete the whole collection of Guardians for instance.
//          We should not have redundant methods that is not needed for a resource.

// 2. Use nouns for your resources NOT verbs
// Example: camels, calenders, children
// NOT /getAllCamels or /createNewCamel

// 3. Use plural nouns
// Example: /camels (to clearly indicate this is a collection)

// 4. GET method and Query Parameters should not alter the state.
//    Example: Should not use GET method in combination with an update/delete method which alters the state of the collection/object.
//    GET /guardians/delete/{guardianId}

const express = require("express");
const controller = express.Router();
const Children = require("./childModel");

//Get all children
controller.get("/", async (req, res) => {
  try {
    const childrens = await Children.find({});
    res.status(200).json(childrens);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//Get specific child
controller.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const child = await Children.findById(id);
    console.error(child);

    if (!child) {
      res.status(404).json({ message: `Child with id ${id} were not found` });
    }
    res.status(200).json(child);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//Create child
controller.post("/", async (req, res) => {
  try {
    const child = await Children.create(req.body);
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
