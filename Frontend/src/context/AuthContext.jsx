import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("Role"));

  function loginContext(newToken, newRole) {
    localStorage.setItem("token", newToken);
    localStorage.setItem("Role", newRole);

    setToken(newToken);
    setRole(newRole);
  }

  function logoutContext() {
    localStorage.removeItem("token");
    localStorage.removeItem("Role");

    setToken(null);
    setRole(null);
  }

  return (
    <AuthContext.Provider value={{ token, role, loginContext, logoutContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;