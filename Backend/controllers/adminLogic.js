import Appointment from "../Model/Appointment.js";
import Department from "../Model/Department.js";
import User from "../Model/User.js";
import bcrypt from "bcrypt"
const addDoctor = async (req, res) => {
    try {
        const { Name, Email, Password, specialization, Experience,ImageUrl } = req.body;
        const hashedPassword = await bcrypt.hash(Password, 10);

        const doctor = await User.create({
            Name,
            Email,
            Password: hashedPassword,
            Role: "Doctor",
            specialization,
            Experience,
            ImageUrl
        })
        console.log(doctor);
        return res.status(200).json({
            success: true,
            message: "doctor added succesfully...",
            doctor
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "error occurred",
            error
        });
    }
};

const getAllDoctors = async (req, res) => {
    try {
        const doctors = await User.find({ Role: "Doctor" })
        res.status(200).json({
            message: "Doctors found successfully....",
            success: true,
            doctors
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "server error..."
        });
    }
}

const updateDoctor = async (req, res) => {
    try {
        const { Name, specialization, Experience,ImageUrl } = req.body;
        const { doctorid } = req.params;
        const doctor = await User.findById(doctorid);

        if (!doctor) {
            return res.status(404).json({
                message: "doctor not found",
                success: false
            });
        }
        let updateDoctor = doctor;

        if (Name) {
            updateDoctor = await User.findByIdAndUpdate(doctorid, { Name }, { new: true });
        }
        if (specialization) {
            updateDoctor = await User.findByIdAndUpdate(doctorid, { specialization }, { new: true });
        }
        if (Experience) {
            updateDoctor = await User.findByIdAndUpdate(doctorid, { Experience }, { new: true });
        }
        if(ImageUrl){
            updateDoctor=await User.findByIdAndUpdate(doctorid,{ImageUrl},{new:true})
        }

        res.status(200).json({
            success: true,
            message: "doctor updated succesfully...",
            updateDoctor
        });
    } catch (error) {
        res.status(500).json({
            message: "failed to update doctor",
            success: false
        });
    }
};

const deleteDoctor = async (req, res) => {
    try {
        const { doctorid } = req.params;
        let deletedDoctor = await User.findByIdAndDelete(doctorid);
        if (!deletedDoctor) {
            return res.status(404).json({
                success: false,
                message: "doctor not found..."
            });
        }

        res.status(200).json({
            success: true,
            message: "doctor deleted succesfully...",
            deletedDoctor
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "failed to delete doctor",
            error: error.message
        });
    }
}


const getAllPatients = async (req, res) => {
    try {
        const patients = await User.find({ Role: "Patient" });

        res.status(200).json({
            success: true,
            message: "Patients found succesfully...",
            patients
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "server error..."
        });
    }
};

const updatePatient = async (req, res) => {
    try {
        const { Name, Age, Gender } = req.body;
        const { patientid } = req.params;

        let patient = await User.findById(patientid);
        if (!patient) {
            return res.status(404).json({
                message: "patient not found",
                success: false
            });
        }

        let updatePatient = patient;

        if (name) {
            updatePatient = await User.findByIdAndUpdate(patientid, { Name }, { new: true });
        }
        if (age) {
            updatePatient = await User.findByIdAndUpdate(patientid, { Age }, { new: true });
        }
        if (gender) {
            updatePatient = await User.findByIdAndUpdate(patientid, { Gender }, { new: true });
        }

        res.status(200).json({
            success: true,
            message: "patient updated succesfully...",
            updatePatient
        });

    } catch (error) {
        res.status(500).json({
            message: "failed to update patient",
            success: false
        });

    }
}

const deletePatient = async (req, res) => {
    try {
        const { patientid } = req.params;
        let deletedPatient = await User.findByIdAndDelete(patientid);

        if (!deletedPatient) {
            return res.status(404).json({
                success: false,
                message: "patient not found..."
            });
        }

        res.status(200).json({
            success: true,
            message: "patient deleted succesfully...",
            deletedPatient
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "failed to delete patient",
            error: error.message
        });
    }
};

const changeUserRole = async (req, res) => {
    try {
        const { Role } = req.body;
        const { userid } = req.params;

        const allowedRoles = ["Admin", "Patient", "Doctor"]
        if (!allowedRoles.includes(Role)) {
            res.status(400).json({
                success: false,
                message: "invalid role provided"
            })

        }

        const updatedUser = await User.findByIdAndUpdate(userid, { Role }, { new: true })
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "user role changed succesfully...",
            updatedUser
        });

    } catch (error) {
        res.status(200).json({
            success: true,
            message: "user role changed succesfully...",
            updatedUser
        });
    }
}

const getAllAppointment = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate("DoctorID", "Name specialization")
            .populate("PatientID", "Name Email");

        res.status(200).json({
            success: true,
            message: "appointments found succesfully...",
            appointments
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "server error..."
        });
    }
}

const addDepartment = async (req, res) => {
    try {
        const { name, description } = req.body;

        const department = await Department.create({
            name,
            description
        });

        console.log(department);
        return res.status(201).json({
            success: true,
            message: "department added succesfully...",
            department
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "error occurred",
            error
        });
    }
};

const getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find();

        res.status(200).json({
            success: true,
            message: "departments found succesfully...",
            departments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "server error..."
        });
    }
};

const updateDepartment = async (req, res) => {
    try {
        const { name, description } = req.body;
        const { departmentid } = req.params;

        let department = await Department.findById(departmentid);

        if (!department) {
            return res.status(404).json({
                message: "department not found",
                success: false
            });
        }

        let updateDepartment = department;

        if (name) {
            updateDepartment = await Department.findByIdAndUpdate(departmentid, { name }, { new: true });
        }
        if (description) {
            updateDepartment = await Department.findByIdAndUpdate(departmentid, { description }, { new: true });
        }

        res.status(200).json({
            success: true,
            message: "department updated succesfully...",
            updateDepartment
        });
    } catch (error) {
        res.status(500).json({
            message: "failed to update department",
            success: false
        });
    }
};

const deleteDepartment = async (req, res) => {
    try {
        const { departmentid } = req.params;
        let deletedDepartment = await Department.findByIdAndDelete(departmentid);

        if (!deletedDepartment) {
            return res.status(404).json({
                success: false,
                message: "department not found..."
            });
        }

        res.status(200).json({
            success: true,
            message: "department deleted succesfully...",
            deletedDepartment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "failed to delete department",
            error: error.message
        });
    }
};

export {addDoctor,getAllDoctors,updateDoctor,deleteDoctor,getAllPatients,updatePatient,deletePatient,changeUserRole,getAllAppointment,addDepartment,getAllDepartments,deleteDepartment,updateDepartment}