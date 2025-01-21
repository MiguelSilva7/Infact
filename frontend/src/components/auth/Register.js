import React, { useState } from "react";
import { register } from "../../services/authService";
import DialogBox from "../DialogBox";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await register(username, email, password, role);
      console.log("response : ", response);
      setMessage("User registered successfully!");
    } catch (error) {
      setMessage(error.message);
    }
    setShowDialog(true);
  };

  return (
    <div className="bg-accent flex h-full w-full items-center justify-center">
      <form className="space-y-3" onSubmit={handleRegister}>
        <h2 className="text-center text-2xl font-bold md:text-4xl">Register</h2>
        {showDialog && (
          <DialogBox callback={() => setShowDialog(false)} message={message} />
        )}
        <div>
          <input
            className="small-neobrutalism border border-black px-3 py-2"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            className="small-neobrutalism border border-black px-3 py-2"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            className="small-neobrutalism border border-black px-3 py-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <div className="mt-4 flex items-center justify-center">
          <button
            className="small-neobrutalism small-neobrutalism-hover bg-myyellow hover:bg-myviolet rounded-md px-3 py-2 transition-all duration-300"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
