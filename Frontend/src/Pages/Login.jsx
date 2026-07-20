import React, { useState } from "react";
import axios from "axios";
import { loginapi } from "../Service/Api";

const Login = () => {
  const [user, setUser] = useState({
    Email: "",
    Password: "",
  });

  function changeHandler(e) {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function loginUser() {
    try {
      const response = await axios.post(loginapi, {
        Email: user.Email,
        Password: user.Password,
      });

      console.log(response.data);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("Role", response.data.user.Role);

      alert("Login successful");

      setUser({
        Email: "",
        Password: "",
      });

      // role ke hisaab se redirect
      if (response.data.user.Role === "Admin") {
        window.location.href = "/Admindashboard";
      } else if (response.data.user.Role === "Doctor") {
        window.location.href = "/Doctordashboard";
      } else if (response.data.user.Role === "Patient") {
        window.location.href = "/Patientsignupdashboard";
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data)
      alert("Login failed");
    }
  }

  function submitHandler(e) {
    e.preventDefault();
    loginUser();
  }

  return (
    <div className="container">
      <h1>HOSPITAL MANAGEMENT SYSTEM - LOGIN</h1>

      <form onSubmit={submitHandler}>
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

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;