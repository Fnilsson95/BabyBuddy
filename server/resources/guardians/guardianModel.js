const mongoose = require('mongoose');
// Import Schema from Mongoose
const Schema = mongoose.Schema;

const guardianSchema = new Schema({
    name: { type : String },
    age: { type : Number },
    address: { type : String },
    children: [{ type: Schema.Types.ObjectId, ref: "Children" }], // Array for choice of multiple children
},
{ timestamps: true});


const Guardian = mongoose.model('guardians', guardianSchema);

module.exports = Guardian;