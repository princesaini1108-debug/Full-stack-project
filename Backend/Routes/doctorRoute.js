import express from "express"

import verifyRole from "../middleware/verifyRole.js"
import verifyToken from "../middleware/verifyToken.js"
import { addPrescription, getMyAppointments, getMyPrescriptions, updateAppointmentStatus, updatePrescription, updateProfile } from "../controllers/doctorLogic.js";

const doctorroute=express.Router()

doctorroute.get("/appointments", verifyToken, verifyRole("Doctor"), getMyAppointments);
doctorroute.patch("/appointment/:appointmentid/status", verifyToken, verifyRole("Doctor"), updateAppointmentStatus);

doctorroute.post("/prescription", verifyToken, verifyRole("Doctor"), addPrescription);
doctorroute.get("/prescriptions", verifyToken, verifyRole("Doctor"), getMyPrescriptions);
doctorroute.put("/prescription/:prescriptionid", verifyToken, verifyRole("Doctor"), updatePrescription);

doctorroute.put("/profile", verifyToken, verifyRole("Doctor"), updateProfile);

export default doctorroute;