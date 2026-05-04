import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  //   const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;

  //   if (!user) return <Navigate to={"/"} />;

  return children;
}

export default ProtectedRoute;
