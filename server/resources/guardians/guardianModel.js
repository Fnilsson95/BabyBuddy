const mongoose = require('mongoose');
// Import Schema from Mongoose
const Schema = mongoose.Schema;

const guardianSchema = new Schema(
    {
        firstName: { 
            type: String, 
            required: [true, "First name is required"],
            trim: true,
        },
        lastName: { 
            type: String, 
            required: [true, "Last name is required"],
            trim: true,
            },
        email: { 
            type: String, 
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email address"],
        },
        phoneNumber: { 
            type: String, 
            required: [true, "Phone-number is required"],
            match: [/^\+?[0-9]\d{1,14}$/, "Please provide a valid phone number"],
        },
        dateOfBirth: { 
            type: Date, 
            required: [true, "Date of birth is required"],
            validate: {
                validator: function (value) {
                    return value <= new Date();
                },
                message: "Date of birth can't be in the future",
            },
        },
        location: {
            city: { 
                type: String, 
                required: [true, "City is required"],
                trim: true,
            },
            country: { 
                type: String, 
                required: [true, "Country is required"],
                trim: true,
            },
            address: { 
                type: String, 
                required: [true, "Address is required"],
                trim: true,
            },
        },
        children: [{ 
            // Array for choice of multiple children
            type: Schema.Types.ObjectId, 
            ref: "Children"
        }],
        bookings: [{
            // Array for all bookings created by specific Guardian
            type: Schema.Types.ObjectId,
            ref: "Bookings",
          }],
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters long"],
            maxlength: [20, "Password must be less than or equal to 20 characters long"],
        },
    },
    { timestamps: true}
);

const Guardian = mongoose.model('Guardian', guardianSchema);

module.exports = Guardian;