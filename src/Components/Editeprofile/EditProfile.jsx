import React, { useEffect, useState } from "react";
import "./editProfile.scss";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import SchoolIcon from "@mui/icons-material/School";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIphoneTwoToneIcon from "@mui/icons-material/PhoneIphoneTwoTone";
import CakeIcon from "@mui/icons-material/Cake";
import Relationship from "../../assets/icons8-two-hearts-96.png";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase/firebase";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import CloseIcon from "@mui/icons-material/Close";
import { IMaskInput } from 'react-imask';


const EditProfile = ({ user, setBoxEditProfile }) => {
  const [EditAbout, setEditAbout] = useState(false);
  const [Editmedia, setEditMedia] = useState(false);
  const [EditUserInfo, setEditUserInfo] = useState(false);
  const [Name, setName] = useState("");
  const [profileimg, setprofileimg] = useState("");
  const [Uploadprofileimg, setUploadprofileimg] = useState("");
  const [Workplace, setWorkplace] = useState("");
  const [Birthday, setBirthday] = useState("");
  const [Contectinfo, setContectinfo] = useState("");
  const [Education, setEducation] = useState("");
  const [Hometown, setHometown] = useState("");
  const [RelationshipDisc, setRelationshipDisc] = useState("");
  const [InputCheck, setInputCheck] = useState("");

  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  function refreshPage() {
    toast.success("Updated successfully", { position: "top-center" });
    setBoxEditProfile(false);
    setTimeout(() => {
      window.location.reload(false);
    }, 2000);
    console.log("page to reload");
  }

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, profileimg.name);
      const uploadTask = uploadBytesResumable(storageRef, profileimg);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          // setProgress(progress)
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setUploadprofileimg(downloadURL);
          });
        }
      );
    };
    profileimg && uploadFile();
  }, [profileimg]);

  const AboutupDate = () => {
    UpdateBirthday();
    UpdateContectinfo();
    UpdateEducation();
    UpdateHometown();
    UpdateRelationship();
    UpdateWork();
    setEditAbout(false);
  };

  const UpdateProfileImg = async () => {
    if (Uploadprofileimg.trim() == "") return;
    try {
      const washingtonRef = doc(db, "users", user.uid);
      await updateDoc(washingtonRef, {
        ProfileImg: Uploadprofileimg,
      });
      setUploadprofileimg("");
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateWork = async () => {
    if (Workplace.trim() == "") return;
    try {
      const washingtonRef = doc(db, "users", user.uid);
      await updateDoc(washingtonRef, {
        Workplace: Workplace,
      });
      setWorkplace("");
    } catch (error) {
      console.log(error);
    }
  };
  const UpdateContectinfo = async () => {
    if (Contectinfo.trim() == "") return;
    try {
      const washingtonRef = doc(db, "users", user.uid);
      await updateDoc(washingtonRef, {
        Contectinfo: Contectinfo,
      });
      setContectinfo("");
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateEducation = async () => {
    if (Education.trim() == "") return;
    try {
      const washingtonRef = doc(db, "users", user.uid);
      await updateDoc(washingtonRef, {
        Education: Education,
      });
      setEducation("");
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateHometown = async () => {
    if (Hometown.trim() == "") return;
    try {
      const washingtonRef = doc(db, "users", user.uid);
      await updateDoc(washingtonRef, {
        Hometown: Hometown,
      });
      setHometown("");
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateRelationship = async () => {
    if (RelationshipDisc.trim() == "") return;
    try {
      const washingtonRef = doc(db, "users", user.uid);
      await updateDoc(washingtonRef, {
        Relationship: RelationshipDisc,
      });
      setRelationshipDisc("");
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateBirthday = async () => {
    if (Birthday.trim() == "") return;
    try {
      const washingtonRef = doc(db, "users", user.uid);
      await updateDoc(washingtonRef, {
        Birthday: Birthday,
      });
      setBirthday("");
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateName = async () => {
    if (Name.trim() == "") return;
    try {
      const washingtonRef = doc(db, "users", user.uid);
      await updateDoc(washingtonRef, {
        name: Name,
      });
      setName("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditUserInfo = () => {
    setEditUserInfo(!EditUserInfo);
  };

  // ==// FUNCTION GET ALL ABOUT INFO // == //
  const handleAbout = () => {
    setEditAbout(!EditAbout);
    setBirthday("");
    setHometown("");
    setRelationshipDisc("");
    setContectinfo("");
    setEducation("");
    setWorkplace("");
  };
  // ==// FUNCTION GET ALL ABOUT INFO // == //

  const handleUserinfo = () => {
    UpdateName();
    UpdateProfileImg();
    setName("");
    setUploadprofileimg("");
    setEditUserInfo(false);
  };

  const handleMedia = () => {
    setEditMedia(!Editmedia);
    setFacebook("");
    setTwitter("");
    setInstagram("");
    setWhatsapp("");
  };

  const UpdateMediaFacebook = async () => {
    if (facebook.trim() == "") return;
    try {
      const washingtonRef = doc(db, "users", user.uid);
      await updateDoc(washingtonRef, {
        facebook: facebook,
      });
      setFacebook("");
    } catch (error) {
      console.log(error);
    }
  };
  const UpdateMediaTwitter = async () => {
    if (twitter.trim() == "") return;
    try {
      const washingtonRef = doc(db, "users", user.uid);
      await updateDoc(washingtonRef, {
        twitter: twitter,
      });
      setTwitter("");
    } catch (error) {
      console.log(error);
    }
  };
  const UpdateMediaInstagram = async () => {
    if (instagram.trim() == "") return;
    try {
      const washingtonRef = doc(db, "users", user.uid);
      await updateDoc(washingtonRef, {
        instagram: instagram,
      });
      setInstagram("");
    } catch (error) {
      console.log(error);
    }
  };
  const UpdateMediaWhatsapp = async () => {
    if (whatsapp.trim() == "") return;
    try {
      const washingtonRef = doc(db, "users", user.uid);
      await updateDoc(washingtonRef, {
        whatsapp: whatsapp,
      });
      setWhatsapp("");
    } catch (error) {
      console.log(error);
    }
  };

  const MediaFunctions = () => {
    UpdateMediaFacebook();
    UpdateMediaTwitter();
    UpdateMediaInstagram();
    UpdateMediaWhatsapp();
    setEditMedia(false);
  };

  return (
    
    <div className="Edit">
      <h1>Edit Profile</h1>
      <CloseIcon className="close" onClick={() => setBoxEditProfile(false)} />
      <div className="Edit_container">
        <div className="info">
          <img className="cover" src={user.backgroundCover} alt="" />
          <div className="profilePicture">
            <div className="flex">
              <p>Profile picture & name</p>
              <input
                type="file"
                name="profilePicture"
                id="profilePicture"
                style={{ display: "none" }}
                onChange={(e) => {
                  setprofileimg(e.target.files[0]);
                  setInputCheck(e.target.files[0]);
                }}
              />
              <div className="buttons">
                {Name.trim() || Uploadprofileimg.trim() ? (
                  <button onClick={() => handleUserinfo()}>Save</button>
                ) : (
                  <>
                    <label
                      style={{ display: `${EditUserInfo ? "block" : "none"}` }}
                      className="btn-Edit"
                      htmlFor="profilePicture"
                    >
                      Upload photo
                    </label>
                    <button className="btn-Close" onClick={handleEditUserInfo}>
                      {EditUserInfo ? "Cancel" : "Edit"}
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="Picture_Name">
              <img
                src={Uploadprofileimg ? Uploadprofileimg : user.ProfileImg}
                alt=""
              />
              {EditUserInfo ? (
                <input
                  type="text"
                  placeholder="New name"
                  onChange={(e) => {
                    setName(e.target.value);
                    setInputCheck(e.target.value);
                  }}
                />
              ) : (
                <span>{user.name}</span>
              )}
            </div>
          </div>
        </div>
        <div className="about">
          <div className="header">
            <div className="flex">
              <p>About me</p>
              <div className="buttons">
                {Workplace.trim() ||
                RelationshipDisc.trim() ||
                Education.trim() ||
                Hometown.trim() ||
                Contectinfo.trim() ||
                Birthday.trim() ? (
                  <button onClick={() => AboutupDate()}>Save</button>
                ) : (
                  <button className="btn-Close" onClick={handleAbout}>
                    {EditAbout ? "Cancel" : "Edit"}
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="Content">
            <div className="frist">
              <div>
                <BusinessCenterIcon className="Icon-about" fontSize="large" />
                {EditAbout ? (
                  <>
                    <input
                      type="text"
                      placeholder="Add work experience"
                      onChange={(e) => {
                        setWorkplace(e.target.value);
                        setInputCheck(e.target.value);
                      }}
                    />
                  </>
                ) : (
                  <>
                    {user.Workplace ? (
                      <p>{user.Workplace}</p>
                    ) : (
                      <p className="not_Added">Work experience not added</p>
                    )}
                  </>
                )}
              </div>
              <div>
                <SchoolIcon className="Icon-about" fontSize="large" />
                {EditAbout ? (
                  <>
                    <input
                      type="text"
                      placeholder="Add college"
                      onChange={(e) => {
                        setEducation(e.target.value);
                        setInputCheck(e.target.value);
                      }}
                    />
                  </>
                ) : (
                  <>
                    {user.Education ? (
                      <p>{user.Education}</p>
                    ) : (
                      <p className="not_Added">Educatoin not added</p>
                    )}
                  </>
                )}
              </div>
              <div>
                <LocationOnIcon className="Icon-about" fontSize="large" />
                {EditAbout ? (
                  <>
                    <input
                      type="text"
                      placeholder="Add hometown"
                      onChange={(e) => {
                        setHometown(e.target.value);
                        setInputCheck(e.target.value);
                      }}
                    />
                  </>
                ) : (
                  <>
                    {user.Hometown ? (
                      <p>{user.Hometown}</p>
                    ) : (
                      <p className="not_Added">Hometown not added</p>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="frist">
              <div>
                <img src={Relationship} alt="" className="Icon-img" />
                {EditAbout ? (
                  <>
                    <input
                      type="text"
                      placeholder="Add Relationship"
                      onChange={(e) => {
                        setRelationshipDisc(e.target.value);
                        setInputCheck(e.target.value);
                      }}
                    />
                  </>
                ) : (
                  <>
                    {user.Relationship ? (
                      <p>{user.Relationship}</p>
                    ) : (
                      <p className="not_Added">Relationship not added</p>
                    )}
                  </>
                )}
              </div>
              <div>
                <PhoneIphoneTwoToneIcon
                  className="Icon-about"
                  fontSize="large"
                />
                {EditAbout ? (
                  <>
                    <input
                      type="text"
                      placeholder="Add Contect info"
                      onChange={(e) => {
                        setContectinfo(e.target.value);
                        setInputCheck(e.target.value);
                      }}
                    />
                  </>
                ) : (
                  <>
                    {user.Contectinfo ? (
                      <p>{user.Contectinfo}</p>
                    ) : (
                      <p className="not_Added">Contect info not added</p>
                    )}
                  </>
                )}
              </div>
              <div>
                <CakeIcon className="Icon-about" fontSize="large" />
                {EditAbout ? (
                  <>
                    <input
                      type="date"
                      placeholder="Add your birthday"
                      onChange={(e) => {
                        setBirthday(e.target.value);
                        setInputCheck(e.target.value);
                      }}
                    />
                  </>
                ) : (
                  <>
                    {user.Birthday ? (
                      <p>{user.Birthday}</p>
                    ) : (
                      <p className="not_Added">Birthday not added</p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="Media">
          <div className="Header">
            <p>Media</p>
            {facebook.trim() ||
              twitter.trim() ||
              instagram.trim() ||
              whatsapp.trim() ? (
                <button onClick={() => MediaFunctions()}>Save</button>
              ) : (
                <button className="btn-Close" onClick={handleMedia}>
                  {Editmedia ? "Cancel" : "Edit"}
                </button>
            )}
          </div>
          <div className="media-container">
            {/* FACEBOOK */}
            <div>
              <div className="media_header">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  shape-rendering="geometricPrecision"
                  text-rendering="geometricPrecision"
                  image-rendering="optimizeQuality"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  viewBox="0 0 509 509"
                >
                  <g fill-rule="nonzero">
                    <path
                      fill="#0866FF"
                      d="M509 254.5C509 113.94 395.06 0 254.5 0S0 113.94 0 254.5C0 373.86 82.17 474 193.02 501.51V332.27h-52.48V254.5h52.48v-33.51c0-86.63 39.2-126.78 124.24-126.78 16.13 0 43.95 3.17 55.33 6.33v70.5c-6.01-.63-16.44-.95-29.4-.95-41.73 0-57.86 15.81-57.86 56.91v27.5h83.13l-14.28 77.77h-68.85v174.87C411.35 491.92 509 384.62 509 254.5z"
                    />
                    <path
                      fill="#fff"
                      d="M354.18 332.27l14.28-77.77h-83.13V227c0-41.1 16.13-56.91 57.86-56.91 12.96 0 23.39.32 29.4.95v-70.5c-11.38-3.16-39.2-6.33-55.33-6.33-85.04 0-124.24 40.16-124.24 126.78v33.51h-52.48v77.77h52.48v169.24c19.69 4.88 40.28 7.49 61.48 7.49 10.44 0 20.72-.64 30.83-1.86V332.27h68.85z"
                    />
                  </g>
                </svg>
                <span>facebook</span>
              </div>
              <input type="text" disabled={!Editmedia} onChange={(e) => {
                setFacebook(e.target.value)
                setInputCheck(e.target.value)
              }}
              value={Editmedia ? facebook : user.facebook}
              placeholder="https://www.facebook.com"
              />
            </div>
            {/* FACEBOOK */}

            {/* INSTAGRAM */}
            <div>
              <div className="media_header">
                <svg color="#1da1f2"
                  fill="currentColor"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    color="inherit"
                    d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"
                  ></path>
                </svg>
                <span>twitter</span>
              </div>
              <input type="text" disabled={!Editmedia}  onChange={(e) => {
                setTwitter(e.target.value)
                setInputCheck(e.target.value)
                }}
                value={Editmedia ? twitter : user.twitter}
                placeholder="https://www.twitter.com"
                />
            </div>
            {/* INSTAGRAM */}

            {/* TWITTER */}
            <div>
              <div className="media_header">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  class="bi bi-instagram"
                  viewBox="0 0 16 16"
                  color="#E1306C"
                >
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path>
                </svg>
                <span>instagram</span>
              </div>
              <input type="text" disabled={!Editmedia}  onChange={(e) => {
                setInstagram(e.target.value)
                setInputCheck(e.target.value)
              }}
              value={Editmedia ? instagram : user.instagram}
              placeholder="https://www.instagram.com"
              />
            </div>
            {/* TWITTER */}
            
            {/* WHATSAPP */}
            <div>
              <div className="media_header">
                <svg
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 308 308"
                  xml:space="preserve"
                  fill="currentColor"
                  class="bi bi-instagram"
                  color="#25d366"
                >
                  <g id="XMLID_468_">
                    <path
                      id="XMLID_469_"
                      d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156
                  c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687
                  c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887
                  c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153
                  c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348
                  c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802
                  c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922
                  c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0
                  c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458
                  C233.168,179.508,230.845,178.393,227.904,176.981z"
                    />
                    <path
                      id="XMLID_470_"
                      d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716
                  c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396
                  c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z
                  M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188
                  l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677
                  c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867
                  C276.546,215.678,222.799,268.994,156.734,268.994z"
                    />
                  </g>
                </svg>
                <span>whatsapp</span>
              </div>
              {/* <input type="text" className="" /> */}
                <IMaskInput
                mask="(+00) 000-00-0000"
                definitions={{
                '#': /[1-9]/,
                }}
                inputRef={ref}
                overwrite
                onChange={(e) => {
                  setWhatsapp(e.target.value)
                  setInputCheck(e.target.value)
                }}
                disabled={!Editmedia}  
                placeholder="(+20) 101-13-1415"
                value={Editmedia ? whatsapp : user.whatsapp}
                />
            </div>
            {/* WHATSAPP */}

          </div>
        </div>
        <div className="btn_saveChanges">
          <button disabled={InputCheck == ""} onClick={refreshPage}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
