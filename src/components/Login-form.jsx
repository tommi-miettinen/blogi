import { useState } from "react";
import axios from "axios";

const LoginForm = ({ userExists, isLoggedIn, setIsLoggedIn }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const login = async () => {
    try {
      const result = await axios.post("http://localhost:8080/login", {
        password,
        email,
      });
      if (result.data) {
        localStorage.token = result.data;
        setIsLoggedIn(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sendCredentials = async () => {
    try {
      const result = await axios.post("http://localhost:8080/users", {
        password,
        email,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        border: "1px solid lightgrey",
        position: "absolute",
        marginLeft: "auto",
        marginRight: 20,
        marginTop: 50,
        width: "16%",
        borderRadius: 3,
        boxShadow: "0px 0px 5px white",
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",

          width: "80%",
          margin: "auto",
          padding: 20,
        }}
      >
        <label style={{ fontWeight: 0 }}>Sähköposti</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            height: 40,
            width: "98%",
            marginBottom: 10,
            borderRadius: 3,
            border: "1px solid lightgrey",
          }}
        ></input>
        <label>Salasana</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            height: 40,
            width: "98%",
            marginBottom: 10,
            borderRadius: 3,
            border: "1px solid lightgrey",
          }}
          type="password"
        ></input>
        <div>
          <button
            onClick={userExists ? () => login() : () => sendCredentials()}
            className="btn"
            style={{
              textAlign: "center",
              width: "100%",
              backgroundColor: "#802c6e",
              border: "1px solid #802c6e",
              padding: "12px",
              borderRadius: 3,
              color: "#f5f5f5",
              fontWeight: 100,
              fontFamily: "Roboto",
              marginLeft: "auto",
              marginRight: 10,
            }}
          >
            {userExists ? "Kirjaudu" : "Luo käyttäjä"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
