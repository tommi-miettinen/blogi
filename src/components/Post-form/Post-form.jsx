import { useState, useEffect } from "react";
import { logout } from "../../utils/logout";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";

import "./Post-form.css";

const PostForm = ({ history, match, setIsLoggedIn }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const editing = history.location.pathname.includes("edit");

  useEffect(() => {
    if (editing) {
      fetchPost();
    }
  }, []);

  const fetchPost = async () => {
    try {
      const result = await axios.get(`/api/posts/${match.url.split("/")[2]}`);
      setTitle(result.data.title);
      setImageUrl(result.data.imageUrl);
      setContent(result.data.content);
    } catch (err) {
      console.log(err);
    }
  };
  const handleEditorChange = (input) => {
    setContent(input);
  };

  const sendPost = async () => {
    try {
      const data = { title, content, imageUrl };
      await axios.post("/api/posts", data, {
        headers: { authorization: localStorage.token },
      });
      history.push("/");
    } catch (err) {
      if (err.response.status === 403) logout(setIsLoggedIn);
      history.push("/");
    }
  };

  const editPost = async () => {
    try {
      const data = { title, content, imageUrl };
      await axios.patch(`/api/posts/${match.url.split("/")[2]}`, data, {
        headers: { authorization: localStorage.token },
      });
      history.push("/");
    } catch (err) {
      if (err.response.status === 403) logout(setIsLoggedIn);
      console.log(err);
      history.push("/");
    }
  };

  return (
    <div className="editor-container">
      <label>Otsikko</label>
      <input
        className="post-form-input"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        type="text"
      />
      <label>Kuva linkki</label>
      <input
        onChange={(e) => setImageUrl(e.target.value)}
        value={imageUrl}
        type="text"
        className="post-form-input"
      />
      <Editor
        value={content}
        init={{
          height: 450,
          menubar: true,
          plugins: tinyMCEplugins,
          toolbar: tinyMCEoptions,
        }}
        onEditorChange={handleEditorChange}
      />
      <button
        onClick={editing ? editPost : sendPost}
        className="button"
        style={{
          marginTop: 10,
          marginBottom: -15,
        }}
      >
        Lähetä
      </button>
    </div>
  );
};

const tinyMCEplugins = [
  "advlist autolink lists link image charmap print preview anchor",
  "searchreplace visualblocks code fullscreen",
  "insertdatetime media table paste code help wordcount",
];

const tinyMCEoptions =
  "undo redo | formatselect | bold italic backcolor | \
alignleft aligncenter alignright alignjustify | \
bullist numlist outdent indent | removeformat | help";

export default PostForm;
