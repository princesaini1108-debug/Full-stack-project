import React, { useEffect, useState } from 'react';
import axios from "axios";
import {
  adddoctorapi, deletedepartmentapi, deletedoctorapi, deletepatientapi,
  getdepartmentsapi, getdoctorsapi, getpatientsapi, updatedoctorapi,
  adddepartmentapi
} from '../Service/Api';

const AdminDashboard = () => {

  const token = localStorage.getItem("token");
  const getAvatar = (seed) => `https://i.pravatar.cc/150?u=${seed || "default"}`;

  const [activeTab, setActiveTab] = useState("doctors");

  // ================= DOCTORS =================
  const [doctors, setDoctors] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [doctorid, setDoctorId] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [newDoctor, setNewDoctor] = useState({
    Name: "",
    Email: "",
    Password: "",
    specialization: "",
    Experience: "",
    ImageUrl: ""
  });

  async function getDoctorData() {
    try {
      const response = await axios.get(getdoctorsapi, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctors(response.data.doctors || []);
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);
    }
  }

  function doctorChangeHandler(e) {
    const { name, value } = e.target;
    setNewDoctor((prev) => ({ ...prev, [name]: value }));
  }

  async function createDoctor() {
    try {
      const response = await axios.post(adddoctorapi, newDoctor, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      getDoctorData();
      setNewDoctor({ Name: "", Email: "", Password: "", specialization: "", Experience: "", ImageUrl: "" });
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);
    }
  }

  async function updateDoctorHandler() {
    try {
      const response = await axios.put(`${updatedoctorapi}/${doctorid}`, newDoctor, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response.data);
      getDoctorData();
      setIsEdit(false);
      setNewDoctor({ Name: "", Email: "", Password: "", specialization: "", Experience: "", ImageUrl: "" });
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);
    }
  }

  function editDoctorHandler(doctor) {
    setDoctorId(doctor._id);
    setIsEdit(true);
    setNewDoctor({
      Name: doctor.Name,
      Email: doctor.Email,
      Password: "",
      specialization: doctor.specialization,
      Experience: doctor.Experience,
      ImageUrl: doctor.ImageUrl || ""
    });
  }

  async function deleteDoctorHandler(id) {
    try {
      const response = await axios.delete(`${deletedoctorapi}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response.data);
      await getDoctorData();
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);
    }
  }

  function doctorSubmitHandler(e) {
    e.preventDefault();
    if (isEdit) {
      updateDoctorHandler();
    } else {
      createDoctor();
    }
  }

  // ================= PATIENTS =================
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  async function getPatientData() {
    try {
      const response = await axios.get(getpatientsapi, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPatients(response.data.patients || []);
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);
    }
  }

  async function deletePatientHandler(id) {
    try {
      const response = await axios.delete(`${deletepatientapi}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response.data);
      await getPatientData();
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);
    }
  }

  // ================= DEPARTMENTS =================
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState({ name: "", description: "" });

  async function getDepartmentData() {
    try {
      const response = await axios.get(getdepartmentsapi, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDepartments(response.data.departments || []);
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);
    }
  }

  function departmentChangeHandler(e) {
    const { name, value } = e.target;
    setNewDepartment((prev) => ({ ...prev, [name]: value }));
  }

  async function createDepartment() {
    try {
      const response = await axios.post(adddepartmentapi, newDepartment, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response.data);
      getDepartmentData();
      setNewDepartment({ name: "", description: "" });
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);
    }
  }

  async function deleteDepartmentHandler(id) {
    try {
      const response = await axios.delete(`${deletedepartmentapi}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response.data);
      await getDepartmentData();
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);
    }
  }

  function departmentSubmitHandler(e) {
    e.preventDefault();
    createDepartment();
  }

  // ================= INITIAL LOAD =================
  useEffect(() => {
    getDoctorData();
    getPatientData();
    getDepartmentData();
  }, []);

  return (
    <div className='container'>
      <h1>ADMIN DASHBOARD</h1>

      <div className="tab-bar">
        <button className={activeTab === "doctors" ? "tab active" : "tab"} onClick={() => setActiveTab("doctors")}>
          👨‍⚕️ Doctors
        </button>
        <button className={activeTab === "patients" ? "tab active" : "tab"} onClick={() => setActiveTab("patients")}>
          🧑‍🤝‍🧑 Patients
        </button>
        <button className={activeTab === "departments" ? "tab active" : "tab"} onClick={() => setActiveTab("departments")}>
          🏥 Departments
        </button>
      </div>

      {/* ===================== DOCTORS TAB ===================== */}
      {activeTab === "doctors" && (
        <div className="tab-section">
          <h2>MANAGE DOCTORS</h2>
          <form onSubmit={doctorSubmitHandler}>
            <input type="text" placeholder='Doctor Name' name="Name" value={newDoctor.Name} onChange={doctorChangeHandler} />
            <input type="email" placeholder='Email' name="Email" value={newDoctor.Email} onChange={doctorChangeHandler} />
            <input type="password" placeholder='Password' name="Password" value={newDoctor.Password} onChange={doctorChangeHandler} />
            <input type="text" placeholder='Specialization' name="specialization" value={newDoctor.specialization} onChange={doctorChangeHandler} />
            <input type="number" placeholder='Experience' name="Experience" value={newDoctor.Experience} onChange={doctorChangeHandler} />
            <input type="text" placeholder='Image URL' name='ImageUrl' value={newDoctor.ImageUrl} onChange={doctorChangeHandler} />
            <button type="submit">
              {isEdit ? "Update Doctor" : "Add Doctor"}
            </button>
          </form>

          <h2>DOCTOR LIST</h2>
          <div className="card-grid">
            {doctors.map((item, i) => (
              <div key={i}>
                <div onClick={() => setSelectedDoctor(item)} style={{ cursor: "pointer" }}>
                  <img src={getAvatar(item.Email)} alt={item.Name} />
                  <p>Name: {item.Name}</p>
                  <p>Email: {item.Email}</p>
                  <p>Specialization: {item.specialization}</p>
                  <p>Experience: {item.Experience}</p>
                </div>
                <div>
                  <button onClick={() => deleteDoctorHandler(item._id)}>Delete</button>
                  <button onClick={() => editDoctorHandler(item)}>Edit</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================== PATIENTS TAB ===================== */}
      {activeTab === "patients" && (
        <div className="tab-section">
          <h2>ALL PATIENTS</h2>
          <div className="card-grid">
            {patients.map((item, i) => (
              <div key={i}>
                <div onClick={() => setSelectedPatient(item)} style={{ cursor: "pointer" }}>
                  <img src={getAvatar(item.Email)} alt={item.Name} />
                  <p>Name: {item.Name}</p>
                  <p>Email: {item.Email}</p>
                  <p>Age: {item.Age}</p>
                  <p>Gender: {item.Gender}</p>
                </div>
                <div>
                  <button onClick={() => deletePatientHandler(item._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================== DEPARTMENTS TAB ===================== */}
      {activeTab === "departments" && (
        <div className="tab-section">
          <h2>MANAGE DEPARTMENTS</h2>
          <form onSubmit={departmentSubmitHandler}>
            <input type="text" placeholder="Department Name" name="name" value={newDepartment.name} onChange={departmentChangeHandler} />
            <input type="text" placeholder="Description" name="description" value={newDepartment.description} onChange={departmentChangeHandler} />
            <button type="submit">Add Department</button>
          </form>

          <div className="card-grid">
            {departments.map((item, i) => (
              <div key={i}>
                <p>Name: {item.name}</p>
                <p>Description: {item.description}</p>
                <div>
                  <button onClick={() => deleteDepartmentHandler(item._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================== MODALS ===================== */}
      {selectedDoctor && (
        <div className="modal-overlay">
          <div className="modal-box">
            <img src={getAvatar(selectedDoctor.Email)} alt={selectedDoctor.Name} />
            <h2>{selectedDoctor.Name}</h2>
            <p>Email: {selectedDoctor.Email}</p>
            <p>Specialization: {selectedDoctor.specialization}</p>
            <p>Experience: {selectedDoctor.Experience} years</p>
            <button onClick={() => setSelectedDoctor(null)}>Close</button>
          </div>
        </div>
      )}

      {selectedPatient && (
        <div className="modal-overlay">
          <div className="modal-box">
            <img src={getAvatar(selectedPatient.Email)} alt={selectedPatient.Name} />
            <h2>{selectedPatient.Name}</h2>
            <p>Email: {selectedPatient.Email}</p>
            <p>Age: {selectedPatient.Age}</p>
            <p>Gender: {selectedPatient.Gender}</p>
            <button onClick={() => setSelectedPatient(null)}>Close</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;