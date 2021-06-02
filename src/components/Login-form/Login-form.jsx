import { useState } from "react";
import axios from "axios";
import "./Login-form.css";

const LoginForm = ({ userExists, setIsLoggedIn, history }) => {
  const [loginError, setLoginError] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const login = async () => {
    try {
      const result = await axios.post("/api/login", {
        password,
        email,
      });
      if (result.data) {
        localStorage.token = result.data;
        setIsLoggedIn(true);
        history.push("/");
      }
    } catch (err) {
      setLoginError(true);
      console.log(err);
    }
  };

  const createUser = async () => {
    try {
      await axios.post("/api/users", {
        password,
        email,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      userExists ? login() : createUser();
    }
  };

  return (
    <div className="login-form-container" onKeyPress={(e) => handleKeyPress(e)}>
      <div className="login-form">
        <label>Sähköposti</label>
        <input
          style={{ borderColor: loginError && "red" }}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        ></input>
        <label>Salasana</label>
        <input
          style={{ borderColor: loginError && "red" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          type="password"
        ></input>
        <div>
          <button
            onClick={userExists ? login : createUser}
            className="login-button"
          >
            {userExists ? "Kirjaudu" : "Luo käyttäjä"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
