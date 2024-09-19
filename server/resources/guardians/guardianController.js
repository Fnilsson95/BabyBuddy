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

// Get guardian
controller.get('/', async (req, res) => {
    try {
        const guardians = await Guardian.find();
        res.status(201).json(guardians);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
});


// Update guardian

// Delete guardian by id
controller.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const guardian = await Guardian.findByIdAndDelete(id);
        if (guardian) {
            res.status(200).json(guardian);
        } else {
            res.status(404).json({ error: `Could not find guardian with id: ${id}`});
        }
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
});



// Export routes
module.exports = controller;
