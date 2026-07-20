import React, { useEffect, useState } from "react";
import axios from "axios";
import { addprescriptionapi, doctorappointmentapi, doctorprescriptionsapi, updateappointmentstatusapi } from "../Service/Api";
// import {
//   doctorappointmentsapi,
//   updateappointmentstatusapi,
//   addprescriptionapi,
//   doctorprescriptionsapi,
// } from "../Service/Api";

const DoctorDashboard = () => {
  const token = localStorage.getItem("token");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [newPrescription, setNewPrescription] = useState({
    AppointmentId: "",
    PatientID: "",
    Medicine: [{ name: "", dosage: "", duration: "" }],
    Notes: "",
  });

  async function getAppointmentsData() {
    try {
      const response = await axios.get(doctorappointmentapi, authHeader);
      console.log(response.data);
      setAppointments(response.data.appointments || []);
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);
    }
  }

  async function getPrescriptionsData() {
    try {
      const response = await axios.get(doctorprescriptionsapi, authHeader);
      console.log(response.data);
      setPrescriptions(response.data.prescriptions || []);
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);
    }
  }

  useEffect(() => {
    getAppointmentsData();
    getPrescriptionsData();
  }, []);

  async function statusHandler(appointmentid, status) {
    try {
      const response = await axios.patch(
        `${updateappointmentstatusapi}/${appointmentid}/status`,
        { status },
        authHeader
      );
      console.log(response.data);
      await getAppointmentsData();
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);
    }
  }

  function openPrescriptionForm(appointment) {
    setNewPrescription({
      AppointmentId: appointment._id,
      PatientID: appointment.PatientID?._id,
      Medicine: [{ name: "", dosage: "", duration: "" }],
      Notes: "",
    });
    setShowForm(true);
  }

  function medicineChangeHandler(index, e) {
    const { name, value } = e.target;
    const updatedMedicine = [...newPrescription.Medicine];
    updatedMedicine[index][name] = value;

    setNewPrescription((prev) => ({
      ...prev,
      Medicine: updatedMedicine,
    }));
  }

  function addMedicineField() {
    setNewPrescription((prev) => ({
      ...prev,
      Medicine: [...prev.Medicine, { name: "", dosage: "", duration: "" }],
    }));
  }

  function notesChangeHandler(e) {
    setNewPrescription((prev) => ({
      ...prev,
      Notes: e.target.value,
    }));
  }

  async function createPrescription() {
    try {
        console.log("Sending:",newPrescription)
      const response = await axios.post(addprescriptionapi, newPrescription, authHeader);
      console.log(response.data);

      getPrescriptionsData();

      setShowForm(false);
      setNewPrescription({
        AppointmentId: "",
        PatientID: "",
        Medicine: [{ name: "", dosage: "", duration: "" }],
        Notes: "",
      });
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);
    }
  }

  function submitHandler(e) {
    e.preventDefault();
    createPrescription();
  }

  return (
    <div className="container">
      <h1>DOCTOR DASHBOARD</h1>

      <h2>MY APPOINTMENTS</h2>
      <div>
        {appointments.map((item, i) => (
          <div key={i}>
            <p>Patient: {item.PatientID?.Name}</p>
            <p>Email: {item.PatientID?.Email}</p>
            <p>Age: {item.PatientID?.Age}</p>
            <p>Gender: {item.PatientID?.Gender}</p>
            <p>Date: {item.Date}</p>
            <p>Time: {item.timeslot}</p>
            <p>Reason: {item.Reason}</p>
            <p>Status: {item.status}</p>

            <div>
              <button onClick={() => statusHandler(item._id, "Confirmed")}>Confirm</button>
              <button onClick={() => statusHandler(item._id, "Completed")}>Complete</button>
              <button onClick={() => statusHandler(item._id, "Cancelled")}>Cancel</button>
              <button onClick={() => openPrescriptionForm(item)}>Add Prescription</button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div>
          <h2>ADD PRESCRIPTION</h2>

          <form onSubmit={submitHandler}>
            {newPrescription.Medicine.map((med, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder="Medicine Name"
                  name="name"
                  value={med.name}
                  onChange={(e) => medicineChangeHandler(index, e)}
                />
                <input
                  type="text"
                  placeholder="Dosage"
                  name="dosage"
                  value={med.dosage}
                  onChange={(e) => medicineChangeHandler(index, e)}
                />
                <input
                  type="text"
                  placeholder="Duration"
                  name="duration"
                  value={med.duration}
                  onChange={(e) => medicineChangeHandler(index, e)}
                />
              </div>
            ))}

            <button type="button" onClick={addMedicineField}>
              + Add Another Medicine
            </button>

            <textarea
              placeholder="Notes"
              value={newPrescription.Notes}
              onChange={notesChangeHandler}
            />

            <button type="submit">Save Prescription</button>
            <button type="button" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}

      <h2>MY PRESCRIPTIONS</h2>
      <div>
        {prescriptions.map((item, i) => (
          <div key={i}>
            <p>Patient: {item.PatientID?.Name}</p>
            <p>Notes: {item.Notes}</p>
            <p>Medicines:</p>
            <ul>
              {item.Medicine?.map((med, j) => (
                <li key={j}>
                  {med.name} - {med.dosage} - {med.duration}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorDashboard;