import "./login-signup.css";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  //pour la redirection vers home si creation du compte OK
  const navigate = useNavigate();

  return (
    <div className="signup">
      <h2>Login</h2>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          if (!email || !password) {
            setErrorMessage("Please fill in all fields.");
            return;
          }
          try {
            const response = await axios.post(
              "https://site--marvel-backend--4w9wbptccl4w.code.run/user/login",
              { email: email, password: password }
            );
            if (response.data.token) {
              handleToken(response.data.token);
              navigate("/");
            }
          } catch (error) {
            console.log(error.message);
            console.log(error.response.data);
            if (error.response.status === 401) {
              console.log(error.response.data.message);
              setErrorMessage("Wrong email or password.");
            } else {
              console.log(error.response.data.message);
              setErrorMessage("Wrong email or password.");
            }
          }
        }}
      >
        <input
          type="email"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Connect</button>
      </form>
      {errorMessage && (
        <p style={{ color: "red", fontSize: 14, marginTop: 15 }}>
          {errorMessage}
        </p>
      )}
      <Link to="/signup">Don't have an account ?</Link>
    </div>
  );
};

export default Login;
