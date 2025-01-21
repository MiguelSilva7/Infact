import React, { useState } from "react";
import { loginService } from "../../services/authService";
import { useAuthStore } from "../../stores/authStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token } = await loginService(email, password);
      setError(null);
      login(token);
      navigate("/main");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="box-content flex h-full w-full items-center justify-center border-b-4 border-black">
      <form className="space-y-8" onSubmit={handleLogin}>
        <h2 className="text-center text-2xl font-bold md:text-4xl">Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
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
        <div className="mt-4 flex items-center justify-center">
          <button
            className="small-neobrutalism small-neobrutalism-hover bg-myyellow hover:bg-myviolet rounded-md px-3 py-2 transition-all duration-300"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
