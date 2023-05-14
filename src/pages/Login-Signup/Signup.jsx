import "./login-signup.css";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Signup = ({ handleToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  return (
    <div className="signup">
      <h2>Create your account</h2>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setErrorMessage("");
          try {
            const response = await axios.post(
              "https://site--marvel-backend--4w9wbptccl4w.code.run/user/signup",
              {
                email: email,
                username: username,
                password: password,
              }
            );
            if (response.data.token) {
              handleToken(response.data.token);
              navigate("/");
            }
          } catch (error) {
            if (error.response.status === 409) {
              setErrorMessage("This email is already used.");
            } else if (error.response.data.message === "Missing parameters") {
              setErrorMessage("Please fill all the fields");
            }
          }
        }}
      >
        <input
          type="text"
          placeholder="Username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          value={username}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          // value={password}
        />
        <button type="submit">Signup</button>
      </form>
      {errorMessage && (
        <p style={{ color: "red", fontSize: 14, marginTop: 15 }}>
          {errorMessage}
        </p>
      )}
      <Link to="/login">Already have an account ?</Link>
    </div>
  );
};

export default Signup;
