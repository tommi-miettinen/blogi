import Logo from "../logo/cropped-logo-1.png";
import axios from "axios";
import LoginForm from "./Login-form";
import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

const Navigation = (props) => {
  const [loginFormVisible, setLoginFormVisible] = useState(false);
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    checkIfUserExists();
  }, []);

  const checkIfUserExists = async () => {
    try {
      const result = await axios.get("http://localhost:8080/users");
      if (result.data) {
        setUserExists(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav
      style={{
        display: "flex",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        boxShadow: "0px 0px 5px white",
      }}
    >
      <div
        className="home"
        onClick={() => props.history.push("/")}
        style={{
          padding: 10,
          height: 30,
          marginLeft: 15,
          display: "flex",
          alignItems: "center",
        }}
      >
        <img style={{ maxWidth: "100%" }} width={50} src={Logo} alt={"asd"} />
        <h3
          style={{
            marginLeft: 20,
            fontWeight: 100,
            fontFamily: "Roboto",
          }}
        >
          {props.isLoggedIn
            ? "Ajatuksia elinikäisen oppimisen ja kasvatuksen kentältä."
            : "ebin"}
        </h3>
      </div>
      <ul
        style={{
          listStyleType: "none",
          display: "flex",
          justifyContent: "flex-end",
          marginLeft: "auto",
        }}
      >
        <button
          className="btn"
          onClick={() => props.history.push("/about")}
          style={{
            textAlign: "center",
            width: 150,
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
          Tietoa minusta
        </button>
        {!props.isLoggedIn ? (
          <button
            onClick={() => setLoginFormVisible(!loginFormVisible)}
            className="btn"
            style={{
              textAlign: "center",
              width: 150,
              backgroundColor: "#f7aa35",
              border: "1px solid #f7aa35",
              padding: "12px",
              borderRadius: 3,
              color: "#f5f5f5",
              fontWeight: 100,
              fontFamily: "Roboto",
              marginLeft: "auto",
              marginRight: 20,
            }}
          >
            Kirjaudu sisään
          </button>
        ) : (
          <button
            onClick={() => props.history.push("/post")}
            className="btn"
            style={{
              textAlign: "center",
              width: 150,
              backgroundColor: "#f7aa35",
              border: "1px solid #f7aa35",
              padding: "12px",
              borderRadius: 3,
              color: "#f5f5f5",
              fontWeight: 100,
              fontFamily: "Roboto",
              marginLeft: "auto",
              marginRight: 20,
            }}
          >
            Kirjoita uusi
          </button>
        )}
        {loginFormVisible && (
          <LoginForm
            userExists={userExists}
            setIsLoggedIn={props.setIsLoggedIn}
            isLoggedIn={props.isLoggedIn}
          />
        )}
      </ul>
    </nav>
  );
};

export default withRouter(Navigation);
