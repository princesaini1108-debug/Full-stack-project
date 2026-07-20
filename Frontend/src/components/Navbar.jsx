import React from "react";

const Navbar = () => {
  const role = localStorage.getItem("Role");
  const token = localStorage.getItem("token");

  function logoutHandler() {
    localStorage.removeItem("token");
    localStorage.removeItem("Role");
    window.location.href = "/login";
  }

  return (
    <nav className="navbar">
      <h2>Hospital Management System</h2>

      <div>
        {!token && (
          <>
            <a href="/login">Login</a>
            <a href="/signup">Signup</a>
          </>
        )}

        {token && role === "Admin" && (
          <a href="/Admindashboard">Admin Dashboard</a>
        )}

        {token && role === "Doctor" && (
          <a href="/Doctordashboard">Doctor Dashboard</a>
        )}

        {token && role === "Patient" && (
          <a href="/Patientdashboard">Patient Dashboard</a>
        )}

        {token && (
          <button onClick={logoutHandler}>Logout</button>
        )}
        {token && <a href="/profile">My Profile</a>}
        {/* {token && <button onClick={logoutHandler}>Logout</button>} */}
      </div>
    </nav>
  );
};

export default Navbar;