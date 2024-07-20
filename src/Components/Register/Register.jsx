import React, { useEffect, useState } from 'react'
import './register.scss'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { storage } from '../firebase/firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { doc, setDoc } from 'firebase/firestore'

const Register = () => {

  const Navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [imageProfile, setImageProfile] = useState('');
  const [progress , setProgress] = useState(null)

  const [uploadImg, setUploadImg] = useState("https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_1280.png")
  

  const handlSignedup = async (e) =>{
    e.preventDefault()
    try{
      await createUserWithEmailAndPassword(auth, email.trim(), password.trim())
      const user = auth.currentUser
      const token = user.uid
      if(user){
        await setDoc(doc(db,"users",user.uid), {
          name: displayName,
          ProfileImg: uploadImg,
          backgroundCover: "https://www.creativefabrica.com/wp-content/uploads/2021/10/05/Image-Upload-Icon-Graphics-18348914-1-580x386.jpg",
          uid: user.uid,
          email: user.email,
        });
      }
      console.log(user);
      console.log("User success");
      setTimeout(() =>{
        Navigate("/login")
      },3000)
      localStorage.setItem("token",token)
    }
    catch (error)  {
      console.log((error.message));
      toast.error(error.message,{position: "bottom-right"})

    };

  }
  useEffect(() => {
    const uploadFile = () =>{

      const storageRef = ref(storage, imageProfile.name)
      const uploadTask = uploadBytesResumable(storageRef, imageProfile);
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
            setUploadImg(downloadURL)
          });
        }
      );
    }
    imageProfile && uploadFile()
  },[imageProfile])
  

  return (
    <div className='Register'>
      <ToastContainer style={{width:"370px"}}/>
      <div className='card'>
        <div className='left'>
          <h1>Tarhib Social.</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Laboriosam porro libero sit officiis voluptatem fugit 
            ullam ea exercitationem error vero?
          </p>
          <span>Do you have an account?</span>
          <Link to="/Login">
            <button>Login</button>
          </Link>
        </div>
        <div className='right'>
          <h1>Register</h1>
          <div className='ProfileImage'>
            <img src={uploadImg}/>
            <label htmlFor="UploadImg">Upload Image</label>
            <input style={{display:"none"}} onChange={(e) => {setImageProfile(e.target.files[0])}} type="file" id='UploadImg'/>
          </div>
          <form onSubmit={handlSignedup}>
            <input onChange={(e) => {setDisplayName(e.target.value)}} type="text" placeholder='Name' />
            <input onChange={(e) => {setEmail(e.target.value)}} type="email" placeholder='E-mail'/>
            <input onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder='Password'/>
            {progress > 1 && progress < 100 ? <p>Wait for the image to upload</p> : progress === 100 ? <span>Done</span> : ''}
            <button disabled={progress !== null && progress < 100}>Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register