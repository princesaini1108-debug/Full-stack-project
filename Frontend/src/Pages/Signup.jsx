import React, { useState } from "react";
import axios from "axios";
import { signupapi } from "../Service/Api";

const Signup = () => {
  const [user, setUser] = useState({
    Name: "",
    Email: "",
    Password: "",
    Role: "Patient",
    Age: "",
    Gender: "",
  });

  function changeHandler(e) {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function signupUser() {
    try {
      const response = await axios.post(signupapi, user);

      console.log(response.data);

      alert("Signup successful, please login now");

      setUser({
        Name: "",
        Email: "",
        Password: "",
        Role: "Patient",
        Age: "",
        Gender: "",
      });

      window.location.href = "/login";
    } catch (error) {
        console.log(error.response.data);
      console.log(error);
      alert("Signup failed");
    }
  }

  function submitHandler(e) {
    e.preventDefault();
    signupUser();
  }

  return (
    <div className="container">
      <h1>HOSPITAL MANAGEMENT SYSTEM - SIGNUP</h1>

      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Full Name"
          name="Name"
          value={user.Name}
          onChange={changeHandler}
        />

        <input
          type="email"
          placeholder="Email"
          name="Email"
          value={user.Email}
          onChange={changeHandler}
        />

        <input
          type="password"
          placeholder="Password"
          name="Password"
          value={user.Password}
          onChange={changeHandler}
        />

        <select name="Role" value={user.Role} onChange={changeHandler}>
          <option value="Patient">Patient</option>
          <option value="Doctor">Doctor</option>
          <option value="Admin">Admin</option>
        </select>

        <input
          type="number"
          placeholder="Age"
          name="Age"
          value={user.Age}
          onChange={changeHandler}
        />

        <select name="Gender" value={user.Gender} onChange={changeHandler}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;