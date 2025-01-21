import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { token, isAuthenticated } = useAuthStore();

  const isAuthorized = () => {
    if (!isAuthenticated || !token) return false;

    const tokenPayload = JSON.parse(atob(token.split(".")[1]));

    return allowedRoles.includes(tokenPayload.role);
  };

  return isAuthorized() ? element : <Navigate to="/main" />;
};

export default ProtectedRoute;
