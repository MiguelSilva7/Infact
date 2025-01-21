import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Main from "../pages/Main";
import AdminDatasManager from "../pages/AdminDatasManager";
import AdminMain from "../pages/AdminMain";
import Auth from "../pages/Auth";
import User from "../pages/User";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuthStore } from "../stores/authStore";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/main" element={<Main />} />
        <Route
          path="/user"
          element={
            <ProtectedRoute
              element={<User />}
              allowedRoles={["user", "admin"]}
            />
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute element={<AdminMain />} allowedRoles={["admin"]} />
          }
        />
        <Route
          path="/admin-datas-manager"
          element={
            <ProtectedRoute
              element={<AdminDatasManager />}
              allowedRoles={["admin"]}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
