import User from "../Model/User.js";
import Appointment from "../Model/Appointment.js";
import Prescription from "../Model/prescription.js";

const getDoctors=async (req,res)=>{
    try {
        const {specialization}=req.query;
        const filter={Role:"Doctor"};
        if(specialization) filter.specialization=specialization;

        const doctors=await User.find(filter);
        res.status(200).json({
            success: true,
            message: "doctors found succesfully...",
            doctors
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "server error..."
        });

    }
};

const bookAppointment=async (req,res)=>{
    try {
        const {DoctorID,Date,timeslot,Reason}=req.body;
        const appointment=await Appointment.create({
            PatientID:req.user.id,
            DoctorID,
            Date,
            timeslot,
            Reason
        });
        console.log(appointment)
         return res.status(201).json({
            success: true,
            message: "appointment booked succesfully...",
            appointment
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "error occurred",
            error
        });
    }
}

const getMyAppointment=async (req,res)=>{
    try {
        const appointments=await Appointment.find({PatientID:req.user.id})
        .populate("DoctorID","Name specialization")
        res.status(200).json({
            success: true,
            message: "appointments found succesfully...",
            appointments
        });
    } catch (error) {
         res.status(500).json({
            success: false,
            message: "server error..."
        });
    }
}

const updateAppointment = async (req, res) =>{
    try {
        const {Date,timeslot,Reason}=req.body;
        const {appointmentid}=req.params;
        let appointment=await Appointment.findOne({_id:appointmentid,PatientID:req.user.id})
        if (!appointment) {
            return res.status(404).json({
                message: "appointment not found or not yours",
                success: false
            });
        }

        let updateAppointment = appointment;

        if (Date) {
            updateAppointment = await Appointment.findByIdAndUpdate(appointmentid, { Date }, { new: true });
        }
        if (timeslot) {
            updateAppointment = await Appointment.findByIdAndUpdate(appointmentid, { timeslot }, { new: true });
        }
        if (Reason) {
            updateAppointment = await Appointment.findByIdAndUpdate(appointmentid, { Reason }, { new: true });
        }
        res.status(200).json({
            success: true,
            message: "appointment updated succesfully...",
            updateAppointment
        });
    } catch (error) {
        res.status(500).json({
            message: "failed to update appointment",
            success: false
        });
    }
}

const cancelAppointment = async (req, res) =>{
    try {
        const { appointmentid } = req.params;

        const appointment = await Appointment.findOneAndUpdate(
            { _id: appointmentid, PatientID: req.user.id },
            { status: "Cancelled" },
            { new: true }
        );
        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "appointment not found or not yours"
            });
        }
         res.status(200).json({
            success: true,
            message: "appointment cancelled succesfully...",
            appointment
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "failed to cancel appointment"
        });
    }
}
const getMyPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.find({ PatientID: req.user.id })
            .populate("DoctorID", "Name specialization");

        res.status(200).json({
            success: true,
            message: "prescriptions found succesfully...",
            prescriptions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "server error..."
        });
    }
}; 

const updateProfile = async (req, res) => {
    try {
        const { Name, Age, Gender, MedicalHistory } = req.body;
        const userid = req.user.id;

        let patient = await User.findById(userid);

        if (!patient) {
            return res.status(404).json({
                message: "patient not found",
                success: false
            });
        }

        let updatePatient = patient;

        if (Name) {
            updatePatient = await User.findByIdAndUpdate(userid, { Name }, { new: true }).select("-password");
        }
        if (Age) {
            updatePatient = await User.findByIdAndUpdate(userid, { Age }, { new: true }).select("-password");
        }
        if (Gender) {
            updatePatient = await User.findByIdAndUpdate(userid, { Gender }, { new: true }).select("-password");
        }
        if (MedicalHistory) {
            updatePatient = await User.findByIdAndUpdate(userid, { MedicalHistory }, { new: true }).select("-password");
        }

        res.status(200).json({
            success: true,
            message: "profile updated succesfully...",
            updatePatient
        });
    } catch (error) {
        res.status(500).json({
            message: "failed to update profile",
            success: false
        });
    }
};

export {getDoctors,bookAppointment,getMyAppointment,cancelAppointment,updateAppointment,getMyPrescriptions,updateProfile}
