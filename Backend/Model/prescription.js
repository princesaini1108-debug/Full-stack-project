import mongoose from "mongoose";

const PrescriptionSchema=new mongoose.Schema({
    AppointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    required: true
  },
  DoctorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  PatientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  Notes:{
    type:String
  },
  Medicine:[
    {
      name: { type: String, required: true },
      dosage: { type: String },
      duration: { type: String }
    }
  ],

},{timestamps:true});

const Prescription=mongoose.model("Prescription",PrescriptionSchema)

export default Prescription;