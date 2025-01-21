import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { useAuthStore } from "./stores/authStore";

function App() {
  const { isTokenExpired, logout, token } = useAuthStore();

  useEffect(() => {
    if (token != null && isTokenExpired()) logout();
  }, [isTokenExpired, logout, token]);

  return <AppRoutes />;
}

export default App;
