import React from "react";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import Person2Icon from "@mui/icons-material/Person2";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <div className="neobrutalism bg-myyellow flex h-[80px] w-auto items-center justify-between px-2 md:px-6">
      <div className="flex items-center justify-center gap-3">
        <div
          onClick={() => navigate("/main")}
          className="cursor-pointer transition-all duration-300 hover:scale-105"
        >
          <img src={Logo} className="max-w-32 md:max-w-48" />
        </div>
      </div>
      <div className="flex gap-6">
        <button
          onClick={() => {
            !isAuthenticated ? navigate("/auth") : logout();
          }}
          className="bg-mywhite w-30 hover:bg-myviolet small-neobrutalism small-neobrutalism-hover flex cursor-pointer items-center justify-center gap-2 rounded-md px-3 py-2 text-base font-bold transition-all duration-300 md:text-xl"
        >
          {isAuthenticated ? <LogoutIcon /> : <LoginIcon />}
          <p className="hidden md:inline">
            {isAuthenticated ? "Se déconnecter" : "Se connecter"}
          </p>
        </button>
        {isAuthenticated ? (
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => {
                navigate("/user");
              }}
              className="bg-mywhite w-30 small-neobrutalism small-neobrutalism-hover hover:bg-myviolet flex cursor-pointer items-center justify-center gap-2 rounded-md px-3 py-2 text-base font-bold transition-all duration-300 md:text-xl"
            >
              <Person2Icon />
              <p className="hidden md:inline">Profile</p>
            </button>
            <div
              onClick={() => {
                navigate("/admin");
              }}
              className="bg-mywhite w-30 small-neobrutalism small-neobrutalism-hover hover:bg-myviolet flex cursor-pointer items-center justify-center gap-2 rounded-md px-3 py-2 text-base font-bold transition-all duration-300 md:text-xl"
            >
              <AdminPanelSettingsIcon />
              <p className="hidden md:inline">Admin</p>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Header;
