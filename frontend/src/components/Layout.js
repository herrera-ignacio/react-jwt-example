import { Link, Outlet } from "react-router-dom";
import "./Layout.css";
import useAuth from "../hooks/useAuth";

const Layout = () => {
  const { auth } = useAuth();

  return (
    <>
      <h1> JWT Auth Demo</h1>
      <nav>
        <Link className="nav-link" to="/login">Login</Link>
        {auth?.username && <Link className="nav-link" to="/users">List users</Link>}
      </nav>
      <Outlet />
    </>
  )
}

export default Layout;
