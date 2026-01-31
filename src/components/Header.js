import React from "react";
import { useAuth } from "./authContext";

const Header = () => {
  const { logout } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <div className="top-header">
      <button className="logout-btn" onClick={handleSubmit}>
        Logout
      </button>
    </div>
  );
};

export default Header;
