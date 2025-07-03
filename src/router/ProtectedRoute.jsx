import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { AuthContext } from "../context/authContext";

export const ProtectedRoute = ({ children }) => {
  // Eliminamos allowedRoles
  const { profile, isCheckingOnboarding } = useContext(AuthContext);
  const location = useLocation();

  if (isCheckingOnboarding) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // 1. Usuario NO logueado → Acceso TOTAL (rutas públicas)
  if (!profile) {
    return children || <Outlet />;
  }

  // 2. Onboarding INCOMPLETO → Solo permite /onboarding
  if (!profile.hasCompletedOnboarding) {
    return location.pathname === "/onboarding" ? (
      children || <Outlet />
    ) : (
      <Navigate to="/onboarding" replace />
    );
  }

  // 3. Onboarding COMPLETO → Bloquear /onboarding
  if (location.pathname === "/onboarding") {
    return <Navigate to="/" replace />; // Redirige a home (o a perfil si prefieres)
  }

  // 4. Acceso permitido (onboarding completo)
  return children || <Outlet />;
};
