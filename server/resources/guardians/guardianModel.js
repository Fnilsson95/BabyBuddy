const mongoose = require('mongoose');
// Import Schema from Mongoose
const Schema = mongoose.Schema;

const guardianSchema = new Schema(
    {
        name: {
            firstName: { 
                type: String, 
                required: [true, "First name is required"]
            },
            lastName: { 
                type: String, 
                required: [true, "Last name is required"]
            },
        },
        email: { 
            type: String, 
            required: [true, "Email is required"]
        },
        phoneNumber: { 
            type: String, 
            required: [true, "Phone-number is required"]
        },
        dateOfBirth: { 
            type: Date, 
            required: [true, "Date of birth is required"]
        },
        location: {
            city: { 
                type: String, 
                required: [true, "City is required"]
            },
            country: { 
                type: String, 
                required: [true, "Country is required"]
            },
            address: { 
                type: String, 
                required: [true, "Address is required"]
            },
        },
        children: [{ 
            // Array for choice of multiple children
            type: Schema.Types.ObjectId, 
            ref: "Children"
        }],
        bookings: [{
            // Array for all bookings
            type: Schema.Types.ObjectId,
            ref: "Bookings",
          }],
    },
    { timestamps: true}
);


const Guardian = mongoose.model('Guardian', guardianSchema);

module.exports = Guardian;