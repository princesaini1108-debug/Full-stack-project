import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import verifyRole from "../middleware/verifyRole.js";
import { bookAppointment, cancelAppointment, getDoctors, getMyAppointment, getMyPrescriptions, updateAppointment, updateProfile } from "../controllers/patientLogic.js";

const patientroute = express.Router();

patientroute.get("/doctors", verifyToken, verifyRole("Patient"), getDoctors);

patientroute.post("/book", verifyToken, verifyRole("Patient"), bookAppointment);
patientroute.get("/appointments", verifyToken, verifyRole("Patient"), getMyAppointment);
patientroute.put("/appointment/:appointmentid", verifyToken, verifyRole("Patient"), updateAppointment);
patientroute.delete("/cancel/:appointmentid", verifyToken, verifyRole("Patient"), cancelAppointment);

patientroute.get("/prescriptions", verifyToken, verifyRole("Patient"), getMyPrescriptions);

patientroute.put("/profile", verifyToken, verifyRole("Patient"), updateProfile);

export default patientroute;