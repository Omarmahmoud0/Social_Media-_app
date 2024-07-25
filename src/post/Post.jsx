import React, { useContext, useEffect, useState } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Comments from "../Components/comments/Comments";
import "./post.scss";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { UpdateData, handleDelete } from "../posts/Posts";
import CloseIcon from "@mui/icons-material/Close";
import {
  Timestamp,
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../Components/firebase/firebase";
import Notifications from "../Components/notifications/Notifications";
import LikesPost from "../Components/likes/LikesPost";
import { UserContext } from "../UserContext";
import { OutsideClick, UserId } from "../App";



const Post = ({ post }) => {
  const userDetails = useContext(UserContext);

  const [showUpdateBox, setUpdateBox] = useState(false);

  const [commen, setCommen] = useState(false);

  const [icontoggel, setIcontoggel] = useState(
    JSON.parse(localStorage.getItem("icontoggel")) || false
  );

  const [showEdit, setShowEdit] = useState(false);

  const [UpdateInput, setUpdateInput] = useState("");

  const [Likes, seLikes] = useState([]);

  const [ID, setID] = useState("");

  const [divLikes, setdivLikes] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    localStorage.setItem("icontoggel", icontoggel);
  }, [icontoggel]);

  const divEdit = () => {
    setShowEdit(!showEdit);
  };

  function handleClick() {
    setIcontoggel(!icontoggel);
  }

  // ======   Get Comments  ===== //
  const [allComment, setAllComment] = useState([]);
  const getcomment = async () => {
    try {
      const q = query(
        collection(db, "posts/" + `${post.id}/` + "comment/"),
        orderBy("time", "desc")
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setAllComment(productsArray);
        console.log(productsArray);
      });
      return () => data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getcomment();
  }, []);
  // ======   Get Comments  ===== //

  // ======   Get and Add Likes  ===== //
  const addLike = async () => {
    handleClick();
    const likeRef = collection(db, "posts/" + `${post.id}/` + "like");
    try {
      await addDoc(likeRef, {
        name: userDetails.name,
        Profileimg: userDetails.ProfileImg,
        uid: userDetails.uid,
        time: Timestamp.now(),
        postuid: post.uid,
        type: "AddLike",
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getLike = async () => {
    try {
      const q = query(
        collection(db, "posts/" + `${post.id}/` + "like/"),
        orderBy("time", "desc")
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        seLikes(productsArray);
        console.log(productsArray);
      });
      return () => data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLike();
  }, []);
  // ======   Get and Add Likes  ===== //

  // ======   Delete Like on the Post  ===== //
  function DeleteLikePost() {
    handleClick();
    let LikePost = "";
    Likes.map((like) => {
      LikePost = like.id;
      if (like.uid === localStorage.getItem("token")) {
        handleDelete(LikePost, "posts/" + `${post.id}/` + "like/");
      }
    });
  }
  // ======   Delete Like on the Post  ===== //

  const domNode = OutsideClick(() =>{
    setdivLikes(false)
    setShowEdit(false)
  })

  return (
    <div className="post" ref={domNode}>
      <div className="container">
        {/* ====== // DataUser // ======= */}
        <div className="user">
          <div className="userInfo" onClick={() => UserId(post.uid)}>
            <img src={post.ProfileImg} alt="" />
            <div className="details">
                <span  className="name">{post.author}</span>
              <span className="date">
                {post.timeStamp?.toDate().toDateString()}
              </span>
            </div>
          </div>
          {post.uid === token && (
            <MoreHorizIcon
              className="moreHorizIcon"
              fontSize="large"
              onClick={divEdit}
            />
          )}
          {showEdit ? (
            <div className="EditPost">
              <button
                onClick={() => {
                  if (post.uid === token) {
                    handleDelete(post.id, "posts");
                  }
                }}
              >
                Delete post
              </button>
              <button
                onClick={() => {
                  setID(post.id);
                  setUpdateBox(true);
                  setShowEdit(false);
                }}
              >
                Edit the post
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        {/* ====== // DataUser // ======= */}

        {/* ====== // Post Content // ======= */}
        <div className="content">
          <p>{post.title}</p>
          {post.img ? <img src={post.img} alt="" /> : ""}
        </div>
        {/* ====== // Post Content // ======= */}

        {/* ====== // Interaction on the Post // ======= */}
        <div className="reacts">
          <div className="icons" onClick={() => setdivLikes(true)}>
            {Likes.length >= 1 && (
              <div className="center">
                <FavoriteOutlinedIcon className="like" />
                {Likes.length}
              </div>
            )}
          </div>
          {allComment.length >= 1 && (
            <div className="comment">{allComment.length} Comments</div>
          )}
        </div>
        {/* ====== // Interaction on the Post // ======= */}

        {/* ====== // Post Reacts // ======= */}
        <div className="info">
          {icontoggel ? (
            <div onClick={addLike} className="item">
              <FavoriteBorderOutlinedIcon className="Icon-Post" />
              <h4>Likes</h4>
            </div>
          ) : (
            <div onClick={() => DeleteLikePost()} className="item">
              <FavoriteOutlinedIcon className="Icon-Post" style={{ color: "red" }} />
              <h4>Likes</h4>
            </div>
          )}
          <div onClick={() => setCommen(!commen)} className="item">
            {<TextsmsOutlinedIcon className="Icon-Post" />}
            Comments
          </div>
          <div className="item">
            {<ShareOutlinedIcon className="Icon-Post" />}
            Share
          </div>
        </div>
        {/* ====== // Post Reacts // ======= */}

        {/* ====== // Comments // ======= */}
        {commen && (
          <Comments
            allComment={allComment}
            postuid={post.uid}
            postId={post.id}
          />
        )}
        {/* ====== // Comments // ======= */}
      </div>

      {/* ====== // Control on the Post // ======= */}
      {showUpdateBox && (
        <div className="UpdatePost">
          <CloseIcon className="close" onClick={() => setUpdateBox(false)} />
          <div className="container2 animate__animated animate__slideInUp">
            <div className="auther_Info">
              <div className="auther">
                <img src={post.ProfileImg} alt="" />
                <p>{post.author}</p>
              </div>
              <button
                onClick={() => {
                  UpdateData(UpdateInput, "posts", ID);
                  setUpdateBox(false);
                }}
              >
                Save
              </button>
            </div>

            <div className="Postdetails">
              <input
                type="text"
                onChange={(e) => {
                  setUpdateInput(e.target.value);
                }}
              />
              <img src={post.img} alt="" />
            </div>
          </div>
        </div>
      )}
      {/* ====== // Control on the Post // ======= */}
      <div style={{ display: "none" }}>
        <Notifications postId={post.id} />
      </div>

      {divLikes && (
        <div className="cover" >
          <div className="Likes animate__animated animate__slideInUp">
            <div className="Likes_Container">
              <FavoriteOutlinedIcon className="like"/>
              <h1>Likes</h1>
            </div>
            <LikesPost Likes={Likes} />
          </div>
        </div>
      )}
    </div>
  );
};
export default Post;
