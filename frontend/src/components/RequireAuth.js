import { useLocation, Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"

// TODO: Could be extended to check for roles.
const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return (
    auth?.username
      ? <Outlet />
      : <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default RequireAuth;
