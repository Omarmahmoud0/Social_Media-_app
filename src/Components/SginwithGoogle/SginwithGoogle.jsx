import React from 'react'
import './SginwithGoogle.scss'
import GoogleICon from "../../assets/icons8-google-96.png"
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth, db } from '../firebase/firebase'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { doc, setDoc } from 'firebase/firestore'

const SginwithGoogle = () => {
  const Navgita = useNavigate()
  function GoogleSgin() {
    const Provider = new GoogleAuthProvider()
    signInWithPopup(auth,Provider)
    .then(async (res) => {
      const user = res.user
      const token = user.uid
      if(res.user){
        await setDoc(doc(db,"users",user.uid), {
          name: user.displayName,
          ProfileImg: user.photoURL,
          uid: user.uid,
          email: user.email,
        });
        setTimeout(() => {
          Navgita('/')
        },500)
        toast.success("User logged in Succeessfully",{position:"top-center",autoClose:3000})
      }
      localStorage.setItem("token",token)

      console.log(res);
    })
  }
  return (
    <div className='sginGoogle'>
            <p>Or contiune with...</p>
        <div className="googel" onClick={GoogleSgin}>
            <img src={GoogleICon} alt="" />
            <span>Sign in with Google</span>
        </div>
    </div>
  )
}

export default SginwithGoogle