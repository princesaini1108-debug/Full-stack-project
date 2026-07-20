import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    Password: {
        type: String,
        required: true
    },
    Role: {
        type: String,
        require: true,
        enum: ["Patient", "Admin", "Doctor"],
        default: "Patient"
    },

    specialization: {
        type: String
    },
    ImageUrl: {
        type: String
    },
    Experience: {
        type: String
    },
    Age: {
        type: String
    },
    Gender: {
        type: String
    },
    department: {
        type: String
    },
    designation: {
        type: String
    },
    MedicalHistory: [{
        type: String

    }]
}, { timestamps: true });


const User = mongoose.model("User", userschema)

export default User;

