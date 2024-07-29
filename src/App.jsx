import React, { useEffect, useRef, useState } from "react";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./Components/navbar/Navbar";
import Leftbar from "./Components/leftbar/Leftbar";
import Rightbar from "./Components/rightbar/Rightbar";
import Profile from "./Components/Profile/Profile";
import Home from "./Components/Home/Home";
import "./style.scss";
import Friends from "./Components/friends/Friends";
import { io } from "socket.io-client";
import { PostsProvider } from "./PostsContext/PostsContext";
import { UserProvider } from "./UserContext";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { StoriesProvider } from "./StoriesContext";

// Add event listener when modal is open
export let OutsideClick = (handler) => {
  const modalRef = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!modalRef.current.contains(e.target)) {
        handler();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  });
  return modalRef;
};
// Add event listener when modal is open

export function UserId(userID) {
  window.location = `/profile/?userId=${userID}`;
}

const App = () => {
  const location = useLocation();
  // ======== // Show and Hide Navbar // ======== //
  const [sideLeftBar, setSideLeftBar] = useState(false);

  const [showNav, setshowNav] = useState(
    JSON.parse(localStorage.getItem("showNav")) || false
  );
  useEffect(() => {
    localStorage.setItem("showNav", showNav);
  }, [showNav]);
  // ======== // Show and Hide Navbar // ======== //

  // const [socket, setSocket] = useState(false);

  // useEffect(() => {
  //   setSocket(io("http://localhost:3000", { transports: ["websocket"] }));
  // }, []);

  // const user = "Omar Mahmoud"

  // useEffect(() => {
  //   const notifi = () => socket.emit("addNewUser", user)
  //   return () => {
  //     notifi()
  //   }
  // },[socket,user])

  // ======// function Dark and Light Mode // ======== //
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);
  // ======// function Dark and Light Mode // ======== //

  const Layout = () => {
    return (
      <div>
        <div style={{ display: "flex" }}>
          <Leftbar sideLeftBar={sideLeftBar} setSideLeftBar={setSideLeftBar} />
          {/* <div> */}
          <Outlet />
          {/* </div> */}
          <Rightbar />
        </div>
      </div>
    );
  };

  // ======// Path protection // ======== //
  const [Sgin, setSgin] = useState(
    JSON.parse(localStorage.getItem("Sgin")) || false
  );
  useEffect(() => {
    localStorage.setItem("Sgin", Sgin);
  }, [Sgin]);

  const ProtectedRoute = ({ children }) => {
    if (!Sgin) {
      return <Navigate to="/login" state={{ path: location.pathname }} />;
    }
    return children;
  };
  // ====== // Path protection // ======== //

  const PageLogin = ({ children }) => {
    if (Sgin) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <div className={`theme-${darkMode ? "dark" : "light"} app`}>
      <DarkModeContextProvider>
        <UserProvider>
          <PostsProvider>
            <StoriesProvider>
              {showNav && (
                <Navbar
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  setshowNav={setshowNav}
                  setSgin={setSgin}
                  setSideLeftBar={setSideLeftBar}
                  sideLeftBar={sideLeftBar}
                />
              )}
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Layout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="/" element={<Home />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>

                <Route
                  path="/friends"
                  element={
                    <ProtectedRoute>
                      <Friends />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <PageLogin>
                      <Login setshowNav={setshowNav} setSgin={setSgin} />
                    </PageLogin>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <PageLogin>
                      <Register />
                    </PageLogin>
                  }
                />
                <Route
                  path="/ForgotPassword"
                  element={
                    <PageLogin>
                      <ForgotPassword />
                    </PageLogin>
                  }
                />
              </Routes>
            </StoriesProvider>
          </PostsProvider>
        </UserProvider>
      </DarkModeContextProvider>
    </div>
  );
};

export default App;
