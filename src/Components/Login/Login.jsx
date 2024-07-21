import React, { useState } from 'react'
import './login.scss'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/firebase';
import 'react-toastify/dist/ReactToastify.css';
import SginwithGoogle from '../SginwithGoogle/SginwithGoogle';
import { ToastContainer, toast } from 'react-toastify';




const Login = () => {

  const Navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handlLogin = async (e) => {
    e.preventDefault()
    try{
      await signInWithEmailAndPassword(auth, email.trim(), password.trim())
      const user = auth.currentUser
      const token = user.uid
      console.log(user);
      // عايزين تجرب نلغيه 
      setTimeout(() => {
        Navigate("/") 
      },1000)
      localStorage.setItem("token",token)
    }
    catch (error) {
      console.log((error));
      toast.error(error.message,{position:"bottom-right"})
    };
  }


  return (
    <div className='login'>
      <ToastContainer style={{width:"370px"}}/>
      <div className='card'>
        <div className='left'>
          <h1>Hello world.</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Laboriosam porro libero sit officiis voluptatem fugit 
            ullam ea exercitationem error vero?
          </p>
          <span>Don't you have an account?</span>
          <Link to="/Register">
            <button>Register</button>
          </Link>
        </div>
        <div className='right'>
          <h1>Login</h1>
          <form onSubmit={handlLogin}>
            <input onChange={(e) => {setEmail(e.target.value)}} type="text" placeholder='Username' />
            <input onChange={(e) => { setPassword(e.target.value)}} type="password" placeholder='Password'/>
            <button>Login</button>
            <Link to="/ForgotPassword">
              <p>Forgot Password?</p>
            </Link>
          </form>
          <SginwithGoogle/>
        </div>
      </div>
    </div>
  )
}

export default Login