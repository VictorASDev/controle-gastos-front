// components/PrivateRoute.tsx
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const isAuthenticated = !!sessionStorage.getItem("token");

  return isAuthenticated ? children : <Navigate to="/login" />;
}
