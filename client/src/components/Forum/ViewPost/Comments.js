import React from "react";
import Comment from "./Comment";

const Comments = props => {
  return (
    <div>
      <ul>
        {props.comments.map((comment, index) => {
          return <Comment key={index} comment={comment} postID={props.postID} />;
        })}
      </ul>
    </div>
  );
};

export default Comments;
