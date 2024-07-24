import React, { useEffect, useState } from "react";
import "./profile.scss";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PlaceIcon from "@mui/icons-material/Place";
import Posts from "../../posts/Posts";
import { useLocation } from "react-router";
import About from "../About/About";
import Media from "../Media/Media";
import { Avatar, Skeleton, Typography } from "@mui/material";
import ChangCover from "../changCover/ChangCover";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { ToastContainer } from "react-toastify";
import { collection, doc, getDocs, onSnapshot, query, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import EditProfile from "../Editeprofile/EditProfile";



const Profile = () => {
  const [border, setborder] = useState("Posts");
  const [BoxChangcover, setBoxChangcover] = useState(false);
  const [BoxEditProfile, setBoxEditProfile] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 50,
      left: 0,
    });
  }, [pathname]);

  const [Users, setUsers] = useState([]);
  useEffect(() => {
    // (REALTIME Update) //
    const q = query(collection(db, "users"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
        });
        setUsers(users);
        });
    //== (REALTIME Update) ==//
    return () => {
      unsub();
    };
  }, []);

  function UserID() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("userId");
    return userId;
  }
  const token = localStorage.getItem("token");

  return (
    <div className="profile">
      <ToastContainer style={{ width: "370px" }} />
      {Users.map((user) => (
        <>
          {user.id === UserID() && (
            <div>
              {/* HEADER USER IMAGES */}
              <div className="images">
                {user ? (
                  <img className="cover" src={user.backgroundCover} />
                ) : (
                  <Skeleton variant="rounded" width="100%" height="100%" />
                )}

                {user ? (
                  <img src={user.ProfileImg} alt="" className="profileImg" />
                ) : (
                  <Skeleton variant="circular" className="Skeleton">
                    <Avatar className="avatar" />
                  </Skeleton>
                )}
                {user.uid === token && (
                  <button
                    onClick={() => setBoxChangcover(true)}
                    className="btn-CoverPhoto"
                  >
                    <CameraAltIcon /> Edit cover photo
                  </button>
                )}
              </div>
              {/* HEADER USER IMAGES */}

              {/* CONTAINER CONTIAN THE DATA OF USER */}
              <div className="profileContainer">
                <div>
                  {/* USER INFO */}
                  <div className="uInfo">
                    {/* DIV CONTIAN INFORMTION FOR USER */}
                    <div className="test">
                      <div className="center">
                        {user ? (
                          <h2>{user.name}</h2>
                        ) : (
                          <Skeleton width="100%">
                            <Typography>.</Typography>
                          </Skeleton>
                        )}
                        <div className="info">
                          <div className="item">
                            <PlaceIcon fontSize="small" />
                            <span>USA</span>
                          </div>
                        </div>
                        {user.uid == token ? (
                          <div className="EditProfile">
                            <button onClick={() => setBoxEditProfile(true)}>
                              <EditTwoToneIcon fontSize="medium" /> Edit profile
                            </button>
                          </div>
                        ) : (
                          <button>Follow</button>
                        )}
                      </div>
                    </div>
                    {/* DIV CONTIAN INFORMTION FOR USER */}

                    {/* DIV CONTIAN THE ICON */}
                    <div className="right">
                      <EmailOutlinedIcon style={{ cursor: "pointer" }} />
                      <MoreVertIcon style={{ cursor: "pointer" }} />
                    </div>
                    {/* DIV CONTIAN THE ICON */}
                  </div>
                  {/* USER INFO */}

                  {/* SECTION TO TABS TO COMPONENTS */}
                  <div className="UserProfile-Details">
                    <div
                      onClick={() => {
                        setborder("Posts");
                      }}
                    >
                      <p>Posts</p>
                      {border == "Posts" ? <hr /> : ""}
                    </div>
                    <div
                      onClick={() => {
                        setborder("About");
                      }}
                    >
                      <p>About</p>
                      {border == "About" ? <hr /> : ""}
                    </div>
                    <div
                      onClick={() => {
                        setborder("Media");
                      }}
                    >
                      <p>Media</p>
                      {border == "Media" ? <hr /> : ""}
                    </div>
                  </div>
                  {/* SECTION TABS TO COMPONENTS */}
                </div>

                <div
                  className={
                    border === "Posts" ? "show-content" : "hide-content"
                  }
                >
                  {<Posts UserID={UserID()} />}
                </div>

                <div
                  className={
                    border === "About" ? "show-content" : "hide-content"
                  }
                >
                  <About user={user} />
                </div>
                <div
                  className={
                    border === "Media" ? "show-content" : "hide-content"
                  }
                >
                  <Media user={user}/>
                </div>
              </div>
              {/* CONTAINER CONTIAN THE DATA OF USER */}

              {/* COMPONENT EDITE THE COVER PHOTO */}
              {BoxChangcover && (
                <div className="ChangBackround">
                  <ChangCover user={user} setBoxChangcover={setBoxChangcover} />
                </div>
              )}
              {/* COMPONENT EDITE THE COVER PHOTO */}

              {/* COMPONENT EDTIE THE PROFIEL */}
              {BoxEditProfile && (
                <div className="BoxEditProfile">
                  <EditProfile
                    user={user}
                    setBoxEditProfile={setBoxEditProfile}
                  />
                </div>
              )}
              {/* COMPONENT EDTIE THE PROFIEL */}
            </div>
          )}
        </>
      ))}
    </div>
  );
};

export default Profile;
