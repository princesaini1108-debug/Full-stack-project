import React, { useEffect, useState } from "react";
import axios from "axios";
import { myprofileapi } from "../Service/Api";

const Profile = () => {
  const token = localStorage.getItem("token");
  const [profile, setProfile] = useState(null);

const getAvatar = (seed) => `https://i.pravatar.cc/150?u=${seed || "default"}`;
  async function getProfile() {
    try {
      const response = await axios.get(myprofileapi, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(response.data.user);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  function logoutHandler() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  }

  if (!profile) {
    return <div className="container"><p>Loading profile...</p></div>;
  }

  return (
    <div className="container">
      <h1>MY PROFILE</h1>

      <div className="modal-box" style={{ margin: "0 auto", maxWidth: "380px" }}>
        <img src={getAvatar(profile.Email)} alt={profile.Name} />
        <h2>{profile.Name}</h2>
        <p>Email: {profile.Email}</p>
        <p>Role: {profile.Role}</p>

        {profile.Role === "Doctor" && (
          <>
            <p>Specialization: {profile.specialization}</p>
            <p>Experience: {profile.Experience} years</p>
          </>
        )}

        {profile.Role === "Patient" && (
          <>
            <p>Age: {profile.Age}</p>
            <p>Gender: {profile.Gender}</p>
          </>
        )}

        <button onClick={logoutHandler}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;