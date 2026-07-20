import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import AdminDashboard from "./Pages/AdminDashboard";
import DoctorDashboard from "./Pages/DoctorDashboard";
import PatientDashboard from "./Pages/PatientDashboard";
import Profile from "./Pages/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/Admindashboard"
          element={
            <ProtectedRoute allowedRole="Admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Doctordashboard"
          element={
            <ProtectedRoute allowedRole="Doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Patientsignupdashboard"
          element={
            <ProtectedRoute allowedRole="Patient">
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;