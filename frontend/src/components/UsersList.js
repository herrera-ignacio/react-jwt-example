import { useState, useEffect, useRef } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

const USERS_URL = "/users";
const INTERVAL_MS = 3000;

const UsersList = () => {
  const [users, setUsers] = useState();
  const [error, setError] = useState("");
  const successCountRef = useRef(0);
  const forbiddenCountRef = useRef(0);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  useEffect(() => {

    const getUsers = async () => {
      try {
        const resp = await axiosPrivate.get(USERS_URL);
        setUsers(resp.data?.users);
        setError("");
        successCountRef.current++;
      } catch (err) {
        setError(err.message);
        forbiddenCountRef.current++;
      }
    }

    const interval = setInterval(() => {
      getUsers();
    }, INTERVAL_MS)

    return () => {
      clearInterval(interval);
    }
  });

  return (
    <article>
      <h2>Users List - Polls every {INTERVAL_MS / 1000} seconds</h2>
      <p>Successful requests: {successCountRef.current}</p>
      <p>Forbidden requests: {forbiddenCountRef.current}</p>
      <p style={{ wordBreak: "break-all" }}>Current access token: {auth.accessToken}</p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {users?.length
        ? (
          <ul>
            {users.map((user, i) => <li key={i}>{user?.username}</li>)}
          </ul>
        ) : (
          <p>No users to display</p>
        )}
    </article>
  )
}

export default UsersList;
