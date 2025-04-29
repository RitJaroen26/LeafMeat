import { createContext, useEffect, useState } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [adminToken, setAdminToken] = useState("");

    useEffect(() => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setAdminToken(storedToken);
      }
    }, [])

    const adminContextValue = {
        adminToken,
        setAdminToken,
    }

  return (
    <AdminContext.Provider value={adminContextValue}>
      {children}
    </AdminContext.Provider>
  );
};
