import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

const REGISTER_URL = "/users";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post(
        REGISTER_URL,
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );

      setSuccess(true);
      setUsername('');
      setPassword('');
    } catch (err) {
      setErrMsg(JSON.stringify(err));
      errRef.current.focus();
    }
  }

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <Link to="/login">Sign in</Link>
        </section>
      ) : (
        <section>
            <p ref={errRef}>{errMsg}</p>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                <button disabled={!username || !password ? true : false}>Sign Up</button>
            </form>
            <p>
                Already registered?<br />
                <span className="line">
                    <Link to="/">Sign In</Link>
                </span>
            </p>
        </section>
      )}
    </>
  )
}

export default Register;
