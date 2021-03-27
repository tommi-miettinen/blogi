import ComputerImage from "../images/ComputerImage.jpg";
import AI_image from "../images/AI_image.jpg";
import Pagination from "@material-ui/lab/Pagination";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#802c6e",
    },
  },
});

const Ebin = () => {
  return (
    <ThemeProvider theme={theme}>
      <Pagination size="large" shape={"rounded"} count={1} color="primary" />
    </ThemeProvider>
  );
};

const PostPreview = (props) => {
  return (
    <div className="post-preview-container">
      <div style={{ color: "black" }} className="post-preview">
        <img
          src={ComputerImage}
          style={{
            objectFit: "cover",
            maxHeight: "100%",
            minWidth: "50%",
          }}
          alt={"asd"}
        />
        <h2
          style={{
            marginRight: 30,
            marginLeft: 30,
            fontWeight: 100,
            fontFamily: "Roboto",
            textAlign: "left",
          }}
        >
          Massive Open Online Courses (MOOCS)
        </h2>
        <button
          onClick={() => props.history.push("/post/1")}
          className="btn"
          style={{
            textAlign: "center",
            width: 150,
            backgroundColor: "#802c6e",
            border: "1px solid #802c6e",
            padding: "12px",
            borderRadius: 3,
            color: "#f5f5f5",
            fontFamily: "Roboto",
            fontWeight: 400,
            marginLeft: "auto",
            marginTop: "auto",
            marginBottom: 10,
            marginRight: 10,
          }}
        >
          Lue lisää
        </button>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <div style={{ color: "black" }} className="post-preview-small">
          <img
            src={AI_image}
            style={{
              objectFit: "cover",
              maxHeight: "50%",
              minHeight: "50%",
              maxWidth: "100%",
            }}
            alt={"asd"}
          />
          <h2
            style={{
              marginRight: 30,
              marginLeft: 30,
              textAlign: "left",
              fontWeight: 100,
              fontFamily: "Roboto",
            }}
          >
            The role of artificial intelligence in human resource management and
            recruiting
          </h2>
          <button
            onClick={() => props.history.push("/post/1")}
            className="btn"
            style={{
              textAlign: "center",
              width: 150,
              backgroundColor: "#802c6e",
              border: "1px solid #802c6e",
              padding: "12px",
              borderRadius: 3,
              color: "#f5f5f5",
              fontFamily: "Roboto",
              fontWeight: 400,
              marginLeft: "auto",
              marginTop: "auto",
              marginBottom: 10,
              marginRight: 10,
            }}
          >
            Lue lisää
          </button>
        </div>
        <div
          style={{ color: "black", marginLeft: 24 }}
          className="post-preview-small"
        >
          <img
            src={ComputerImage}
            style={{
              objectFit: "cover",
              maxHeight: "50%",
              minHeight: "50%",
              minWidth: "100%",
              maxWidth: "100%",
            }}
            alt={"asd"}
          />
          <h2
            style={{
              marginRight: "auto",
              marginLeft: 30,
              textAlign: "left",
              fontFamily: "Roboto",
              fontWeight: 100,
            }}
          >
            Massive Open Online Courses (MOOCS)
          </h2>
          <button
            onClick={() => props.history.push("/post/1")}
            className="btn"
            style={{
              textAlign: "center",
              width: 150,
              backgroundColor: "#f7aa35",
              border: "1px solid #f7aa35",
              padding: "12px",
              borderRadius: 3,
              color: "#f5f5f5",
              fontFamily: "Roboto",
              fontWeight: 400,
              marginLeft: "auto",
              marginTop: "auto",
              marginBottom: 10,
              marginRight: 10,
            }}
          >
            Lue lisää
          </button>
        </div>
      </div>
      <div
        style={{
          margin: "auto",
          marginTop: 45,
          display: "flex",
          backgroundColor: "white",
          boxShadow: "0px 0px 3px white",
          borderRadius: 3,
          padding: 10,
        }}
      >
        <Ebin />
      </div>
    </div>
  );
};

export default PostPreview;
