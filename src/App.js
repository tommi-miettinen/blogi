import { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import PostPreview from "./components/Post-preview";
import About from "./components/About";
import Post from "./components/Post";
import Editor from "./components/Editor";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";

const App = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLogin = async () => {
    try {
      const result = await axios.get("http://localhost:8080/authenticate", {
        headers: {
          Authorization: localStorage.token,
        },
      });
      console.log(result);
      if (result.data) setIsLoggedIn(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkLogin();
  }, [localStorage.token]);

  return (
    <Router>
      <div className="App">
        <Navigation
          {...props}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
        <div
          style={{
            width: "80%",
            margin: "auto",
            marginTop: 65,
          }}
        >
          <Route
            path="/"
            exact
            render={(props) => (
              <PostPreview {...props} isLoggedIn={isLoggedIn} />
            )}
          />
          <Route
            path="/post/:id"
            exact
            render={(props) => <Post {...props} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/post"
            exact
            render={(props) => <Editor {...props} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/about"
            exact
            render={(props) => <About {...props} isLoggedIn={isLoggedIn} />}
          />
        </div>
      </div>
    </Router>
  );
};

export default App;
