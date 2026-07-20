import React, { useEffect, useState } from 'react'
import { bookappointmentapi, cancelappointmentapi, finddoctorsapi, patientappointmentsapi, patientprescriptionsapi } from '../Service/Api';
import axios from 'axios';
const PatientDashboard = () => {

    const [doctors, setDoctors] = useState([])
    const [appointments, setAppointments] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [newAppointment, setNewAppointment] = useState({
        DoctorID: "",
        Date: "",
        timeslot: "",
        Reason: ""
    })

    const token = localStorage.getItem("token");
const getAvatar = (seed) => `https://i.pravatar.cc/150?u=${seed || "default"}`;
    async function getDoctorsData() {
        try {
            const response = await axios.get(finddoctorsapi, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(response.data);
            setDoctors(response.data.doctors || []);
        } catch (error) {
            console.log(error)
        }
    }

    async function getAppointmentsData() {
        try {
            const response = await axios.get(patientappointmentsapi, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(response.data);
            setAppointments(response.data.appointments || []);
        } catch (error) {
            console.log(error)
        }
    }
    async function getPrescriptionsData() {
        try {
            const response = await axios.get(patientprescriptionsapi, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(response.data);
            setPrescriptions(response.data.prescriptions || []);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getDoctorsData();
        getAppointmentsData();
        getPrescriptionsData();
    }, []);
    function changeHandler(e) {
        const { name, value } = e.target;

        setNewAppointment((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
    async function bookAppointment() {
        try {
            console.log("Booking:", newAppointment)
            const response = await axios.post(bookappointmentapi, newAppointment, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(response.data);
            getAppointmentsData();
            setNewAppointment({
                DoctorID: "",
                Date: "",
                timeslot: "",
                Reason: ""
            })
        } catch (error) {
            console.log(error)
            console.log(error.response.data)
            console.log(error.response.data.error.message)
        }
    }

    async function cancelHandler(appointmentid) {
        try {
            const response = await axios.delete(`${cancelappointmentapi}/${appointmentid}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(response.data);
            await getAppointmentsData();
        } catch (error) {
            console.log(error)
            console.log(error.response.data)
        }
    }
    function submitHandler(e) {
        e.preventDefault();
        bookAppointment()
    }
    return (
        <div className='container'>
            <h1>PATIENT DASHBOARD</h1>
            <h2>BOOK APPOINTMENT</h2>

            <form onSubmit={submitHandler}>
                <select name="DoctorID" value={newAppointment.DoctorID} onChange={changeHandler}>
                    <option value="">Select Doctor</option>
                    {doctors.map((doc, i) => (
                        <option key={i} value={doc._id}>
                            {doc.Name} - {doc.specialization}
                        </option>
                    ))}
                </select>

                <input type="date" name="Date" value={newAppointment.Date} onChange={changeHandler} />
                <input type="text" placeholder="Time slot" name="timeslot" value={newAppointment.timeslot} onChange={changeHandler} />
                <input type="text" placeholder="Reason" name="Reason" value={newAppointment.Reason} onChange={changeHandler} />

                <button type="submit">Book Appointment</button>
            </form>

            <h2>AVAILABLE DOCTORS</h2>

            <h2>AVAILABLE DOCTORS</h2>
            <div className="card-grid">
                {doctors.map((item, i) => (
                    <div key={i} onClick={() => setSelectedDoctor(item)} style={{ cursor: "pointer" }}>
                        <img src={getAvatar(item.Email)} alt={item.Name} />
                        <p>Name: {item.Name}</p>
                        <p>Specialization: {item.specialization}</p>
                        <p>Experience: {item.Experience} years</p>
                    </div>
                ))}
            </div>

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

            {/* ===== DOCTOR DETAIL MODAL ===== */}
            {selectedDoctor && (
                <div style={{
                    position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
                    background: "rgba(0,0,0,0.5)", display: "flex",
                    alignItems: "center", justifyContent: "center", zIndex: 999
                }}>
                    <div style={{ background: "#fff", padding: "30px", borderRadius: "14px", maxWidth: "400px", width: "90%" }}>
                        {selectedDoctor.ImageUrl && (
                            <img src={selectedDoctor.ImageUrl} alt={selectedDoctor.Name}
                                style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", marginBottom: "16px" }} />
                        )}
                        <h2>{selectedDoctor.Name}</h2>
                        <p>Email: {selectedDoctor.Email}</p>
                        <p>Specialization: {selectedDoctor.specialization}</p>
                        <p>Experience: {selectedDoctor.Experience} years</p>
                        <button onClick={() => setSelectedDoctor(null)}>Close</button>
                    </div>
                </div>
            )}
            <h2>MY APPOINTMENT</h2>
            <div>
                {appointments.map((item, i) => {
                    return (
                        <div key={i}>
                            <p>Doctor:{item.DoctorID?.Name}</p>
                            <p>Specialization:{item.DoctorID?.specialization}</p>
                            <p>Date:{item.Date}</p>
                            <p>Time:{item.timeslot}</p>
                            <p>Status:{item.status}</p>

                            <div>
                                <button onClick={() => cancelHandler(item._id)}>Cancel</button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <h2>MY PRESCRIPTION</h2>
            <div>
                {prescriptions.length === 0 && <p>No prescriptions yet</p>}

                {prescriptions.map((item, i) => {
                    return (
                        <div key={i}>
                            <p>Doctor: {item.DoctorID?.Name}</p>
                            <p>Specialization: {item.DoctorID?.specialization}</p>
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
                    );
                })}
            </div>
        </div>
    )
}

export default PatientDashboard