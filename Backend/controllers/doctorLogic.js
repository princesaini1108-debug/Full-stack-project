import User from "../Model/User.js";
import Prescription from "../Model/prescription.js";
import Appointment from "../Model/Appointment.js";

const getMyAppointments=async(req,res)=>{
    try {
        const appointments=await Appointment.find({DoctorID:req.user.id})
        .populate("PatientID","Name Email Age Gender");

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

const updateAppointmentStatus = async (req, res) =>{
    try {
        const  {status}=req.body;
        const {appointmentid}=req.params;
        let appointment=await Appointment.findOne({_id:appointmentid,DoctorID:req.user.id});
        if (!appointment) {
            return res.status(404).json({
                message: "appointment not found or not yours",
                success: false
            });
        }const allowedStatus = ["Pending", "Confirmed", "Completed", "Cancelled"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "invalid status provided"
            });
        }
         const updateAppointment = await Appointment.findByIdAndUpdate(
            appointmentid,
            { status },
            { new: true }
        );
        res.status(200).json({
            success: true,
            message: "status updated succesfully...",
            updateAppointment
        });
    } catch (error) {
        res.status(500).json({
            message: "failed to update status",
            success: false
        });
    }
}

const addPrescription = async (req, res) => {
    try {
         const { AppointmentId, PatientID, Medicine, Notes } = req.body;

        const prescription = await Prescription.create({
            AppointmentId,
            DoctorID: req.user.id,
            PatientID,
            Medicine,
            Notes
        });
        console.log(prescription);
        return res.status(201).json({
            success: true,
            message: "prescription added succesfully...",
            prescription
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "error occurred",
            error
        });
    }
}

const updatePrescription = async (req, res) => {
    try {
        const { Medicine, Notes } = req.body;
        const { prescriptionid } = req.params;

        let prescription = await Prescription.findOne({ _id: prescriptionid, DoctorID: req.user.id });

        if (!prescription) {
            return res.status(404).json({
                message: "prescription not found or not yours",
                success: false
            });
        }

        let updatePrescription = prescription;

        if (Medicine) {
            updatePrescription = await Prescription.findByIdAndUpdate(prescriptionid, { Medicine }, { new: true });
        }
        if (Notes) {
            updatePrescription = await Prescription.findByIdAndUpdate(prescriptionid, { Notes }, { new: true });
        }

        res.status(200).json({
            success: true,
            message: "prescription updated succesfully...",
            updatePrescription
        });
    } catch (error) {
        res.status(500).json({
            message: "failed to update prescription",
            success: false
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { Name, specialization, Experience } = req.body;
        const userid = req.user.id;

        let doctor = await User.findById(userid);

        if (!doctor) {
            return res.status(404).json({
                message: "doctor not found",
                success: false
            });
        }

        let updateDoctor = doctor;

        if (Name) {
            updateDoctor = await User.findByIdAndUpdate(userid, { Name }, { new: true });
        }
        if (specialization) {
            updateDoctor = await User.findByIdAndUpdate(userid, { specialization }, { new: true });
        }
        if (Experience) {
            updateDoctor = await User.findByIdAndUpdate(userid, { Experience }, { new: true });
        }

        res.status(200).json({
            success: true,
            message: "profile updated succesfully...",
            updateDoctor
        });
    } catch (error) {
        res.status(500).json({
            message: "failed to update profile",
            success: false
        });
    }
};

const getMyPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.find({ DoctorID: req.user.id })
            .populate("PatientID", "Name Email");

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

export {getMyAppointments,getMyPrescriptions,updateAppointmentStatus,addPrescription,updatePrescription,updateProfile}