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

//create new guardian
function createGuardian (req, res, next) {
    const guardian = new Guardian(req.body);
    guardian.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(guardian);
    });
};

function getGuardian() {
    return {};
};

exports.createGuardian = createGuardian;
exports.getGuardian = getGuardian;
