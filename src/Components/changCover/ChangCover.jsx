import React, { useEffect, useState } from "react";
import "./changcover.scss";
import { db, storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";

const ChangCover = ({ user, setBoxChangcover }) => {
  const [coverPhoto, setcoverPhoto] = useState("");
  const [UploadCover, setUploadCover] = useState("");
  const [progress, setProgress] = useState(0);

  function refreshPage() {
    setTimeout(()=>{
        window.location.reload(false);
    }, 2000);
    console.log('page to reload')
}

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, coverPhoto.name);
      const uploadTask = uploadBytesResumable(storageRef, coverPhoto);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgress(progress)
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
            setUploadCover(downloadURL);
          });
        }
      );
    };
    coverPhoto && uploadFile();
  }, [coverPhoto]);

  const UpdateCover = async () => {
    try{
      const washingtonRef = doc(db, 'users', user.uid);
      await updateDoc(washingtonRef, {
        backgroundCover: UploadCover,
        });
        toast.success("Updated successfully",{position:"top-center"})
  
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="changCover">
      <CloseIcon
        className="btn-close"
        fontSize="large"
        onClick={() => setBoxChangcover(false)}
      />
      <div className="uploadImg">
        {progress <= 99 && progress >= 1 ? "" : <label className="btn-Upload" htmlFor="Cover-photo">
          Upload photo
        </label>}
       {progress >= 1 && progress <= 99 && <>
          <button disabled="" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
          <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
          </svg>
          Loading({Math.floor(progress)})
          </button>
        </>}
        <input
          id="Cover-photo"
          type="file"
          style={{ width: "0px" }}
          onChange={(e) => setcoverPhoto(e.target.files[0])}
        />
      </div>
      {UploadCover && (
        <div className="changCover__content">
          <img src={UploadCover} alt="" />
          <button
            onClick={
              () => {
                UpdateCover()
                refreshPage()
                setBoxChangcover(false)
              }
            }
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default ChangCover;
