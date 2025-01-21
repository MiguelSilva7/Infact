import React, { useState } from "react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import { useAuthStore } from "../stores/authStore";
import Header from "../components/Header";

const Auth = () => {
  const [activeSection, setActiveSection] = useState(0);
  const { isAuthenticated } = useAuthStore();
  const Sections = [<Login />, <Register />];

  return (
    <div className="bg-myviolet flex min-h-screen flex-col items-center justify-center gap-6">
      <div className="grid-a w-full md:w-1/2">
        <Header />
      </div>
      {isAuthenticated ? (
        "you are logged in"
      ) : (
        <div className="bg-mywhite neobrutalism grid h-[400px] w-full grid-cols-[2fr_3fr] overflow-hidden rounded-3xl border-4 border-black md:h-[600px] md:w-1/2">
          <div className="bg-mywhite [&>div]:bg-logs w-full bg-no-repeat text-[20px] font-semibold md:w-auto md:text-[30px] [&>div]:flex [&>div]:h-1/2 [&>div]:cursor-pointer [&>div]:items-center [&>div]:justify-center [&>div]:bg-[length:200%_100%] [&>div]:duration-300 [&>div]:ease-in">
            <div
              onClick={() => setActiveSection(0)}
              className={`border-b-4 border-r-4 border-black ${activeSection === 0 ? "bg-right" : "hover:bg-[length:100%_100%]"}`}
            >
              <div>Log In</div>
            </div>
            <div
              onClick={() => setActiveSection(1)}
              className={`border-r-4 border-black ${activeSection === 1 ? "bg-right" : "hover:bg-[length:100%_100%]"}`}
            >
              <div>Register</div>
            </div>
          </div>
          <div className="bg-mywhite flex flex-col [&>div]:transition-all [&>div]:duration-500">
            {Sections.map((section, index) => (
              <div
                className={`${activeSection === index ? "h-full" : "h-0 [&>*>*]:opacity-0 [&>*>*]:transition-all [&>*>*]:duration-300"} overflow-hidden`}
                key={index}
              >
                {section}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
