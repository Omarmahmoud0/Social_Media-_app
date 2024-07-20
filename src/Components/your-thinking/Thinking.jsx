import React, { useContext, useEffect, useState } from "react";
import "./thinking.scss";
import PhotoSizeSelectActualOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import { Timestamp, addDoc, collection, serverTimestamp } from "firebase/firestore"; 
import { db , storage } from '../firebase/firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";
import { UserContext } from "../../UserContext";



const Thinking = () => {

  const userDetails = useContext(UserContext)

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState('');
  const [imgPost ,setImgPost] = useState('')
  const [progress , setProgress] = useState(null)
  const [emoji , setEmoji] = useState(false)

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
            setImgPost(downloadURL)
          });
        }
      );
    }
    image && uploadFile()
  },[image])
  

  const AddPost = async(e) => {

    e.preventDefault()
    try{
      if(!caption.trim() && !imgPost) {
        toast.error("You can't publish an empty post",{position:"bottom-right"})
        return;
      }
      await addDoc(collection(db,"posts"), {
        author: userDetails.name,
        ProfileImg: userDetails.ProfileImg,
        title: caption,
        img: imgPost,
        uid: userDetails.uid,
        time: Timestamp.now(),
        timeStamp: serverTimestamp()
      });
      setCaption("")
      setImgPost("")
      setEmoji(false)
      toast.success("Your post has been shared successfully",{position:"top-center"})
    } catch (error) {
      console.log(error);
    }
  }

  const addEmoji = (e) => {
    const sym = e.unified.split("_")
    const codeArray = []
    sym.forEach(el => codeArray.push("0x" + el))
    let emoji = String.fromCodePoint(...codeArray)
    setCaption(caption + emoji)
  }

  return (
    <div className="Thinking">
      <ToastContainer />
      <div className="container">
        <form onSubmit={AddPost}>
        <div className="first">
          {userDetails ? <img src={userDetails.ProfileImg} alt="" /> : <Skeleton variant="circular"><Avatar /></Skeleton>}
          <input
            type="text"
            placeholder="What in your thinking"
            onChange={(e) => {
              setCaption(e.target.value);
            }}
            value={caption}
          />
        </div>

        <hr />

        <div className="second">
          <div className="files">
            <label htmlFor="photo">
              <PhotoSizeSelectActualOutlinedIcon className="iconPhoto Icon-Think" /> Photo
            </label>
            <input
              style={{ display:"none" }}
              type="file"
              id="photo"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
          </div>
          <div className="files">
            <label htmlFor="video">
              <PlayCircleOutlinedIcon className="iconVideo Icon-Think" /> Video
            </label>
            <input
              style={{ display:"none"}}
              type="file"
              id="video"
              onChange={(e) => {
                setVideo(e.target.files[0]);
              }}
            />
          </div>
          <div className="files">
            <label onClick={() => setEmoji(!emoji)}>
              <SentimentSatisfiedOutlinedIcon className="iconFeel Icon-Think" /> Feeling
            </label>
          </div>
          <div>
            <button disabled={progress !== null && progress < 100}>Share</button>
          </div>
        </div>
        </form>
      </div>
      { emoji && <div className="emoji">
        <Picker data={data} emojiButtonSize={36} Size="40"theme={`${JSON.parse(localStorage.getItem("darkMode")) ? "dark" : "light"}`} onEmojiSelect={addEmoji}/>
      </div>}
    </div>
  );
};

export default Thinking;
