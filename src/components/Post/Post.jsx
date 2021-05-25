import { useState, useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import axios from "axios";

import "./Post.css";

const Post = ({ match }) => {
  const [postData, setPostData] = useState("");

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8080/posts/${match.url.split("/").pop()}`
      );
      console.log(result);
      setPostData(result.data.content);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="post"
      style={{
        boxSizing: "border-box",
        margin: "auto",
        marginTop: 48,
        backgroundColor: "white",
        padding: 50,
        borderRadius: 3,
        boxShadow: "0px 0px 5px white",
      }}
    >
      {ReactHtmlParser(postData)}
    </div>
  );
};

export default Post;
