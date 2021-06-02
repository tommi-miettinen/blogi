import { useState, useEffect } from "react";
import placeholder from "../../images/placeholder.png";
import ReactHtmlParser from "react-html-parser";
import axios from "axios";

import "./Post.css";

const Post = ({ match }) => {
  const [postData, setPostData] = useState({});

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const result = await axios.get(
        `/api/posts/${match.url.split("/").pop()}`
      );
      console.log(result);
      setPostData(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="post"
      style={{
        boxSizing: "border-box",
        backgroundColor: "white",
        padding: 24,
        borderRadius: 3,
        boxShadow: "0px 0px 5px white",
      }}
    >
      <img
        className="post-image"
        src={postData.imageUrl}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = placeholder;
        }}
        alt="post-pic"
      />
      <h1>{postData.title}</h1>

      {ReactHtmlParser(postData.content)}
      <span style={{ marginLeft: "auto", marginBottom: -6, marginTop: "auto" }}>
        {postData.createdAt}
      </span>
    </div>
  );
};

export default Post;
