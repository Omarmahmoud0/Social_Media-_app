import React, { useContext, useState } from "react";
import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import TelegramIcon from "@mui/icons-material/Telegram";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Notifications from "../notifications/Notifications";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { toast } from "react-toastify";
import { Badge, IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { UserContext } from "../../UserContext";
import 'animate.css';
import { UserId } from "../../App";
import ButtomNavBar from "../ButtomNavBar/ButtomNavBar";



const Navbar = ({ setDarkMode, darkMode, setshowNav, setSgin }) => {

  const userDetails = useContext(UserContext)

  const [Icontoggle, setIcontoggle] = useState(false);
  const [showNotification, setshowNotification] = useState(false);
  const handlToggle = () => {
    setIcontoggle(!Icontoggle);
  };
  const ShowNotifica = () => {
    setshowNotification(!showNotification);
  };
  const Navigate = useNavigate();

  // function LogOut Users //
  const logOut = () => {
    signOut(auth)
      .then(() => {
        setTimeout(() => {
          Navigate("/login");
          setshowNav(false);
          setSgin(false);
          localStorage.removeItem("token");
        }, 3000);
        toast.loading("Logout is in progress", {
          position: "top-center",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // function LogOut Users //

  const ProfileClose = () => {
    setIcontoggle(false);
  };




  const [arry, setarry] = useState([1, 2, 3, 4, 5]);

  return (
    <div className="navbar">

      {/* SECTION LEFT */}
      <div className="left">
        <Link style={{ textDecoration: "none" }} to="/">
          <span>tarhib</span>
        </Link>
        <div className="NavIconLeft">
          <Link to="/">
            <IconButton>
              <HomeOutlinedIcon className="Icons" />
            </IconButton>
          </Link>
          {darkMode ? (
            <IconButton>
              <WbSunnyOutlinedIcon
                className="Icons"
                onClick={() => {
                  setDarkMode(!darkMode);
                }}
              />
            </IconButton>
          ) : (
            <IconButton>
              <DarkModeOutlinedIcon
                className="Icons"
                onClick={() => {
                  setDarkMode(!darkMode);
                }}
              />
            </IconButton>
          )}
          <IconButton>
            <GridViewOutlinedIcon className="Icons" />
          </IconButton>

        </div>
        {/* DIV SEARCH INPUT */}
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Seach" />
        </div>
      </div>
      {/* SECTION LEFT */}

      {/* SECTION RIGHT */}
      <div className="right">
        <div className="NavIconRight">
          <IconButton>
            <TelegramIcon className="Icons" />
          </IconButton>

          <IconButton>
            <Badge badgeContent={arry.length} color="primary">
              <NotificationsOutlinedIcon
                onClick={ShowNotifica}
                className="Icons"
              />
            </Badge>
          </IconButton>
        </div>

        <div className="user" onClick={handlToggle}>
          {userDetails ? (
            <>
              <img src={userDetails.ProfileImg} alt="" />
              <span>{userDetails.name}</span>
            </>
          ) : (
            <>
              <Skeleton variant="circular">
                <Avatar />
              </Skeleton>
              <Skeleton width="100%">
                <Typography>.</Typography>
              </Skeleton>
            </>
          )}
          {Icontoggle && showNotification !== true ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </div>
      </div>
      {/* SECTION RIGHT */}

      {/* SECTION PROFILE INFO */}
      {Icontoggle && showNotification !== true && (
        <div onClick={ProfileClose} className="show animate__animated animate__slideInRight animate__faster">
          <div className="profileInfo">
            <div className="email">
              {userDetails ? (
                <>
                  <img src={userDetails.ProfileImg} alt="" />
                  <span>{userDetails.email}</span>
                </>
              ) : (
                <>
                  <Skeleton variant="circular">
                    <Avatar />
                  </Skeleton>
                  <Skeleton width="100%">
                    <Typography>.</Typography>
                  </Skeleton>
                </>
              )}
            </div>
            <hr />
            <div className="Control">
              <div className="yourProfile">
                <AccountCircleIcon />
                <button onClick={() => UserId(localStorage.getItem("token"))}>See your profile</button>
              </div>
              <div className="logout">
                <LogoutIcon />
                <button onClick={logOut}>Log Out</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* SECTION PROFILE INFO */}

      <div className="buttomNav">
        <ButtomNavBar setDarkMode={setDarkMode} darkMode={darkMode} ShowNotifica={ShowNotifica} arry={arry}/>
      </div>

      {showNotification && (
        <div className="setNot">
          <Notifications />
        </div>
      )}
    </div>
  );
};

export default Navbar;
