import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./auth";
import Loading from "../components/Loading";

export function AuthGuard({ children, redirectTo = "/login" }) {
  const { session, loading } = useAuth();

  if (loading) return <Loading />;
  if (!session) return <Navigate to={redirectTo} replace />;
  return children ? children : <Outlet />;
}

export function AdminGuard({ children }) {
  const { session, profile, loading } = useAuth();

  if (loading) return <Loading />;
  if (!session) return <Navigate to="/login" replace />;
  if (profile?.role !== "admin") return <Navigate to="/403" replace />;
  return children ? children : <Outlet />;
}

export function GuestGuard({ children, redirectTo = "/" }) {
  const { session, loading } = useAuth();
  if (loading) return <Loading />;
  if (session) return <Navigate to={redirectTo} replace />;
  return children ? children : <Outlet />;
}
