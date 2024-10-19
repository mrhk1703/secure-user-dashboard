import { useNavigate, Outlet, NavLink } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useContext, useEffect, useState } from "react";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "./components/ConfirmationModal";
import Navbar from "./components/Navbar";

function App() {
  const { isAuthenticated, user, signOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    setIsModalOpen(true);
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard/users");
    }
  }, [isAuthenticated, navigate]);
  return (
    <>
      <Navbar user={user!} handleLogout={handleLogout} />
      <Outlet />
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        onConfirm={signOut}
      />
    </>
  );
}

export default App;
