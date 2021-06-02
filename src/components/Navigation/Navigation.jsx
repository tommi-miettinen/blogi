import Logo from "../../logo/cropped-logo-1.png";
import axios from "axios";
import LoginForm from "../Login-form/Login-form";
import { logout } from "../../utils/logout";
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
      const result = await axios.get("/api/users");
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
          Tietoa
        </button>
        {isLoggedIn ? (
          <>
            <button
              onClick={() => history.push("/post")}
              className="button"
              style={{ backgroundColor: "#f7aa35", borderColor: "#f7aa35" }}
            >
              Luo postaus
            </button>
            <button
              onClick={() => {
                logout(setIsLoggedIn);
                history.push("/");
              }}
              className="button"
              style={{ backgroundColor: "black", borderColor: "black" }}
            >
              Kirjaudu ulos
            </button>
          </>
        ) : (
          <button
            onClick={() => setLoginFormVisible(!loginFormVisible)}
            className="button"
            style={{
              backgroundColor: "#f7aa35",
              borderColor: "#f7aa35",
            }}
          >
            Kirjaudu sisään
          </button>
        )}
        {loginFormVisible && (
          <LoginForm
            history={history}
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
