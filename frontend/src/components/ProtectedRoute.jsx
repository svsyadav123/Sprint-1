import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { clearSession, getCurrentUser } from "../services/auth";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("zeromindToken");
  const [status, setStatus] = useState(token ? "checking" : "unauthenticated");

  useEffect(() => {
    if (!token) return;
    getCurrentUser()
      .then((user) => { localStorage.setItem("zeromindUser", JSON.stringify(user)); setStatus("authenticated"); })
      .catch(() => { clearSession(); setStatus("unauthenticated"); });
  }, [token]);

  if (status === "checking") return <main className="flex min-h-screen items-center justify-center bg-gray-50 text-sm text-gray-600">Checking your session…</main>;
  return status === "authenticated" ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
