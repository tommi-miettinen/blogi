import { useState, useEffect } from "react";
import { logout } from "./utils/logout";
import Navigation from "./components/Navigation/Navigation";
import PostPreview from "./components/Post-preview/Post-preview";
import About from "./components/About/About";
import Post from "./components/Post/Post";
import PostForm from "./components/Post-form/Post-form";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import axios from "axios";
import "./App.css";

const App = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLogin = async () => {
    try {
      const result = await axios.get("http://localhost:8080/authenticate", {
        headers: {
          authorization: localStorage.token,
        },
      });
      console.log(result.data);
      if (result.data) setIsLoggedIn(true);
    } catch (err) {
      if (err.response && err.response.status === 403) logout(setIsLoggedIn);
      console.log(err);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <Router>
      <div className="App">
        <Navigation
          {...props}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
        <div className="container">
          <Route
            path="/"
            exact
            render={(props) => (
              <PostPreview
                {...props}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            )}
          />
          {isLoggedIn && (
            <>
              <Route
                path="/posts/:id/edit"
                exact
                render={(props) => (
                  <PostForm
                    {...props}
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                  />
                )}
              />
              <Route
                path="/post"
                exact
                render={(props) => (
                  <PostForm
                    {...props}
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                  />
                )}
              />
            </>
          )}
          <Route
            path="/posts/:id"
            exact
            render={(props) => <Post {...props} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/about"
            exact
            render={(props) => <About {...props} isLoggedIn={isLoggedIn} />}
          />
          <Redirect from="*" to="/" />
        </div>
      </div>
    </Router>
  );
};

export default App;
