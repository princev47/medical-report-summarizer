import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadReport from "./pages/UploadReport";
import ReportDetails from "./pages/ReportDetails";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container" style={{ paddingTop: 20 }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/upload" element={<PrivateRoute><UploadReport /></PrivateRoute>} />
          <Route path="/report/:id" element={<PrivateRoute><ReportDetails /></PrivateRoute>} />
        </Routes>
      </div>
    </>
  );
}
