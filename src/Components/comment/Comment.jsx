import React, { useState } from "react";
import "./comment.scss";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Control from "../control/Control";


const Comment = ({ comment, postId }) => {
  const [moreHorizIcon, setMoreHorizIcont] = useState(false);
  const token = localStorage.getItem("token");
  const [Edit, setEdit] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div className="Comment-Comp">
      <div
        className="comment"
        onMouseOut={() => setMoreHorizIcont(true)}
        onMouseLeave={() => setMoreHorizIcont(false)}
      >
        <div className="comment-userImg">
        <img src={comment.Profileimg} alt="" />

        </div>
        <div className="Userinfo">
          <div className="Control">
            <h1>{comment.name}</h1>
          </div>
          <p>{comment.comment}</p>
          <div className="CommentImg">
            {comment.img && <img  src={comment.img} alt="" />}

          </div>
          <span className="date">{comment.time?.toDate().toDateString()}</span>
        </div>
        <div className="control">
          {comment.uid == token && moreHorizIcon && (
            <MoreHorizIcon
            className="moreHorizIcon"
            fontSize="large"
              onClick={() => setEdit(!Edit)}
            />
          )}
          {Edit && <Control comment={comment} postId={postId} setEdit={setEdit} Edit={Edit}/>}
        </div>
      </div>
    </div>
  );
};

export default Comment;
