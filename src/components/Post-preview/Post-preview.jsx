import { useState, useEffect } from "react";
import { logout } from "../../utils/logout";
import PostCardBig from "../Post-card-big/Post-card-big";
import PostCardSmall from "../Post-card-small/Post-card-small";
import Pagination from "@material-ui/lab/Pagination";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import axios from "axios";

import "./Post-preview.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#802c6e",
    },
  },
});

const PostPreview = (props) => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, []);

  const pageCount = Math.ceil(posts.length / 3);
  const indexOfLastPost = currentPage * 3;
  const indexOfFirstPost = indexOfLastPost - 3;
  const currentPosts =
    posts.length > 3 ? posts.slice(indexOfFirstPost, indexOfLastPost) : posts;

  const PaginationElement = () => {
    return (
      <div style={{ margin: "auto" }}>
        <ThemeProvider theme={theme}>
          <Pagination
            size="large"
            shape={"rounded"}
            page={currentPage}
            onChange={(event, page) => setCurrentPage(page)}
            count={pageCount}
            color="primary"
          />
        </ThemeProvider>
      </div>
    );
  };

  const fetchPosts = async () => {
    try {
      const result = await axios.get("http://localhost:8080/posts");
      setPosts(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/posts/${id}`, {
        headers: { authorization: localStorage.token },
      });
      fetchPosts();
    } catch (err) {
      if (err.response.status === 403) logout(props.setIsLoggedIn);
      console.log(err);
    }
  };

  return (
    <div className="post-preview-container">
      <PostCardBig
        isLoggedIn={props.isLoggedIn}
        deletePost={deletePost}
        post={currentPosts[0]}
        {...props}
      />
      <div
        className="spacer"
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <PostCardSmall
          isLoggedIn={props.isLoggedIn}
          deletePost={deletePost}
          post={currentPosts[1]}
          btnColor={"#802c6e"}
          {...props}
        />
        <PostCardSmall
          isLoggedIn={props.isLoggedIn}
          deletePost={deletePost}
          post={currentPosts[2]}
          btnColor={"#f7aa35"}
          {...props}
        />
      </div>
      {posts.length > 3 && (
        <div
          className="pagination-container"
          style={{
            backgroundColor: "white",
            boxShadow: "0px 0px 3px white",
            borderRadius: 3,
            padding: 10,
          }}
        >
          <PaginationElement />
        </div>
      )}
    </div>
  );
};

export default PostPreview;
