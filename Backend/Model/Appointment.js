import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
    PatientID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    DoctorID:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    Date:{
        type:Date,
        required:true
    },
    timeslot:{
        type:String,
        required:true
    },
    status:{
         type:String,
         enum:["Pending","Confirmed","Completed","Cancelled"],
         default:"Pending" 
    },
    Reason:{
        type:String
    }
},{timestamps:true});

const Appointment=mongoose.model("Appointment",AppointmentSchema)

export default Appointment;