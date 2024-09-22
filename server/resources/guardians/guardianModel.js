const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guardianSchema = new Schema({
    name: { type : String },
    age: { type : Number },
    children: { type : Number },
    address: { type : String }
},
{ timestamps: true});

const Guardian = mongoose.model('guardians', guardianSchema);
module.exports = Guardian;