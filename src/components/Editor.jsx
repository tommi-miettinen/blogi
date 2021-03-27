import { useState } from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import ReactHtmlParser from "react-html-parser";

const CreatePost = (props) => {
  const [inputState, setInputState] = useState("");

  const handleEditorChange = (content, editor) => {
    setInputState(content);
  };

  const sendPost = async () => {
    const result = await axios.post("http://localhost:8080/posts", {
      data: inputState,
    });
    console.log(result);
  };

  return (
    <div className="editor-container" style={styles.containerStyle}>
      <Editor
        init={{
          height: 600,
          menubar: true,
          plugins: tinyMCEplugins,
          toolbar: tinyMCEoptions,
        }}
        onEditorChange={handleEditorChange}
      />
      <button onClick={() => sendPost()}>Lähetä</button>
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

const styles = {
  containerStyle: {
    padding: 30,
    width: "80%",
    margin: "auto",
    marginTop: 48,
    backgroundColor: "white",
  },
};

export default CreatePost;
