import { useState, useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import axios from "axios";

const Post = () => {
  const [postData, setPostData] = useState<string>("");

  const fetchPost = async () => {
    const result = await axios.get("http://localhost:8080/posts");
    setPostData(result.data.post);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  console.log(postData);

  return (
    <div
      style={{
        width: "80%",
        margin: "auto",
        marginTop: 72,
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
