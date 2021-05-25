import Logo from "../../logo/cropped-logo-1.png";
import axios from "axios";
import LoginForm from "../Login-form/Login-form";
import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./Navigation.css";

const Navigation = ({ isLoggedIn, setIsLoggedIn, history }) => {
  const [loginFormVisible, setLoginFormVisible] = useState(false);
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    checkIfUserExists();
    if (isLoggedIn) setLoginFormVisible(false);
  }, [isLoggedIn]);

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
    <nav className="navigation">
      <div className="home" onClick={() => history.push("/")}>
        <img src={Logo} alt="logo" />
        <h3 className="header">Lorem ipsum dolor sit amet</h3>
      </div>
      <ul>
        <button className="button" onClick={() => history.push("/about")}>
          Tietoa minusta
        </button>
        {isLoggedIn ? (
          <button
            onClick={() => history.push("/post")}
            className="button"
            style={{ backgroundColor: "#f7aa35", borderColor: "#f7aa35" }}
          >
            Kirjoita uusi
          </button>
        ) : (
          <button
            onClick={() => setLoginFormVisible(!loginFormVisible)}
            className="button"
            style={{ backgroundColor: "#f7aa35", borderColor: "#f7aa35" }}
          >
            Kirjaudu sisään
          </button>
        )}
        {loginFormVisible && (
          <LoginForm
            userExists={userExists}
            setIsLoggedIn={setIsLoggedIn}
            isLoggedIn={isLoggedIn}
          />
        )}
      </ul>
    </nav>
  );
};

export default withRouter(Navigation);
