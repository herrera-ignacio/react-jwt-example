import { Routes, Route } from "react-router-dom"
import Login from "./components/Login";
import Layout from "./components/Layout";
import Register from "./components/Register";
import UsersList from "./components/UsersList";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route element={<RequireAuth />}>
          <Route path="/users" element={<UsersList />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
