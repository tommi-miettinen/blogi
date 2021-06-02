import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import placeholder from "../../images/placeholder.png";
import { withRouter } from "react-router-dom";
import "./Post-card-big.css";

const PostCardBig = ({ post, isLoggedIn, deletePost, history }) => {
  return post ? (
    <div className="post-card-big">
      <div
        className="image-container-big"
        style={{ borderBottom: "1px solid lightgrey" }}
      >
        {isLoggedIn && (
          <div className="overlay">
            <EditIcon
              onClick={() => history.push(`/posts/${post._id}/edit`)}
              className="icon"
            />
            <DeleteForeverIcon
              onClick={() => deletePost(post._id)}
              className="icon"
            />
          </div>
        )}
        <img
          src={post.imageUrl}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = placeholder;
          }}
          alt="post-pic"
          className="image-big"
        />
      </div>
      <div className="post-container">
        <h2 className="post-header">{post.title}</h2>
        <div className="post-content">
          <span style={{ margin: "auto 0px", marginLeft: 20 }}>
            {post.createdAt}
          </span>
          <button
            onClick={() => history.push(`/posts/${post._id}`)}
            className="button"
            style={{
              marginBottom: 10,
              marginRight: 10,
            }}
          >
            Lue lisää
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default withRouter(PostCardBig);
