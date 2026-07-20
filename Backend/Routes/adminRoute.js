import express from "express"
import verifyRole from "../middleware/verifyRole.js"
import verifyToken from "../middleware/verifyToken.js"
import { addDepartment, addDoctor, changeUserRole, deleteDepartment, deleteDoctor, deletePatient, getAllAppointment, getAllDepartments, getAllDoctors, getAllPatients, updateDepartment, updateDoctor, updatePatient } from "../controllers/adminLogic.js";

const adminroute=express.Router();

adminroute.post("/doctor",verifyToken,verifyRole("Admin"),addDoctor)
adminroute.get("/doctors",verifyToken,verifyRole("Admin"),getAllDoctors);
adminroute.put("/doctor/:doctorid",verifyToken,verifyRole("Admin"),updateDoctor);
adminroute.delete("/doctor/:doctorid",verifyToken,verifyRole("Admin"),deleteDoctor)


adminroute.get("/patients", verifyToken, verifyRole("Admin"), getAllPatients);
adminroute.put("/patient/:patientid", verifyToken, verifyRole("Admin"), updatePatient);
adminroute.delete("/patient/:patientid", verifyToken, verifyRole("Admin"), deletePatient);

adminroute.patch("/user/:userid/role", verifyToken, verifyRole("Admin"), changeUserRole);


adminroute.get("/appointments", verifyToken, verifyRole("Admin"), getAllAppointment);


adminroute.post("/department", verifyToken, verifyRole("Admin"), addDepartment);
adminroute.get("/departments", verifyToken, verifyRole("Admin"), getAllDepartments);
adminroute.put("/department/:departmentid", verifyToken, verifyRole("Admin"), updateDepartment);
adminroute.delete("/department/:departmentid", verifyToken, verifyRole("Admin"), deleteDepartment);

export default adminroute;