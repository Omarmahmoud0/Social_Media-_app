import React, { useContext, useEffect, useState } from "react";
import "./comments.scss";
import { db, storage } from "../firebase/firebase";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";
import { UserContext } from "../../UserContext";
import Comment from "../comment/Comment";
import FilterHdrIcon from '@mui/icons-material/FilterHdr';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Comments = ({ postId, allComment, postuid }) => {
  const [comment, setcomment] = useState("");
  const userDetails = useContext(UserContext);
  const [image, setImage] = useState('');
  const [commentImg ,setcommentImg] = useState('')
  const [progress , setProgress] = useState(null)


  useEffect(() => {
    const uploadFile = () =>{
      const storageRef = ref(storage, image.name)
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setProgress(progress)
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        console.log(error);
      }, 
      () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setcommentImg(downloadURL)
          });
        }
      );
    }
    image && uploadFile()
  },[image])
  

// function Add Comment on the Post //
  const addComment = async () => {
    const commentRef = collection(db, "posts/" + `${postId}/` + "comment");
    if (comment.trim() == "" && !commentImg ) {
      return toast.error("Comment field is empty", {
        position: "bottom-right",
      });
    }

    try {
      await addDoc(commentRef, {
        name: userDetails.name,
        Profileimg: userDetails.ProfileImg,
        uid: userDetails.uid,
        comment:comment,
        time: Timestamp.now(),
        postuid,
        type: "Comment",
        img: commentImg,
      });
      toast.success("Comment Add Successfully", { position: "top-center" });
      setcomment("");
      setcommentImg("")
    } catch (error) {
      console.log(error);
    }
  };
// function Add Comment on the Post //

  return (
    <div className="comments">
      <div className="write">
        {userDetails ? (
          <img src={userDetails.ProfileImg} alt="" className="profileImg"/>
        ) : (
          <Skeleton variant="circular">
            <Avatar />
          </Skeleton>
        )}
        <input
          type="text"
          placeholder="Write a Comment"
          onChange={(e) => setcomment(e.target.value)}
          value={comment}
        />
        <input style={{display:"none"}} id="photoComment" type="file" onChange={(e) => setImage(e.target.files[0])} />
        <label className="ICON" htmlFor="photoComment">
          <FilterHdrIcon/>
        </label>
        <button disabled={progress !== null && progress < 100} onClick={addComment}>Send</button>
      </div>
      <div
        className="over"
        style={{ height: `${allComment.length > 1 ? "250px" : "150px"}` }}
      >
        {allComment.length == 0 ? <p className="noComment">No Comments</p> : ""}
        {allComment.map((comment) => (
          <Comment comment={comment} key={comment.id} postId={postId}/>
        ))}
      </div>

    </div>
  );
};

export default Comments;
