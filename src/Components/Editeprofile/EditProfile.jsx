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


const EditProfile = ({ user, setBoxEditProfile }) => {
  const [EditAbout, setEditAbout] = useState(false);
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
  const [InputCheck, setInputCheck] = useState('')

  function refreshPage() {
    toast.success("Updated successfully", { position: "top-center" });
    setBoxEditProfile(false)
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
    UpdateName()
    UpdateProfileImg()
    setName("")
    setUploadprofileimg("")
    setEditUserInfo(false);
  }

  return (
    <div className="Edit">
      <h1>Edit Profile</h1>
      <CloseIcon className="close" onClick={() => setBoxEditProfile(false)}/>
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
                style={{ display:"none" }}
                onChange={(e) => {
                  setprofileimg(e.target.files[0])
                  setInputCheck(e.target.files[0])
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
                    setName(e.target.value)
                    setInputCheck(e.target.value)
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
                        setWorkplace(e.target.value)
                        setInputCheck(e.target.value)
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
                        setEducation(e.target.value)
                        setInputCheck(e.target.value)
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
                        setHometown(e.target.value)
                        setInputCheck(e.target.value)
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
                        setRelationshipDisc(e.target.value)
                        setInputCheck(e.target.value)
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
                        setContectinfo(e.target.value)
                        setInputCheck(e.target.value)
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
                        setBirthday(e.target.value)
                        setInputCheck(e.target.value)
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
        <div className="btn_saveChanges">
          <button disabled={InputCheck == '' } onClick={refreshPage}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
