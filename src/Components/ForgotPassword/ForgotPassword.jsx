import React, { useState } from "react";
import "./forgotpassword.scss";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";

const ForgotPassword = () => {
  const Navigate = useNavigate();

  const [email, setEmail] = useState("");
  const handlePassword = async (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success(
          `Please Check your email , We will redirect you to the login page in a few seconds.`,
          { position: "top-center" }
        );
        setTimeout(() => {
          Navigate("/login");
        }, 5000);
      })
      .catch((error) => {
        alert(error.code);
      });
  };

  return (
    <div className="forgot">
        <ToastContainer style={{width:"400px"}}/>
      <h1>Reset your Password</h1>
      <form className="email-form" onSubmit={(e) => handlePassword(e)}>
        <input
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="Enter your email"
        />
        <button>Reset Password</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
