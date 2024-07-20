import React, { useState } from 'react'
import { handleDelete, UpdateData } from "../../posts/Posts";
import "./control.scss"
import CloseIcon from '@mui/icons-material/Close';
import 'animate.css';


const Control = ({ comment , postId , setEdit , Edit}) => {


  const [showUpdateBox, setUpdateBox] = useState(false);
  const [UpdateInput, setUpdateInput] = useState("");



  return (
    <div className='control'>
        <div className="EditPost animate__animated animate__pulse animate__infinite">
        <button
        onClick={() => {
        handleDelete(comment.id, "posts/" + `${postId}/` + "comment/");
        }}
        >
        Delete comment
        </button>
        <button
        onClick={() => {
        setUpdateBox(true);
        }}
        >
        Edit the comment
        </button>
        </div>
        
        {showUpdateBox && (
        <div className="UpdatePost">
          <CloseIcon className="close" onClick={() => setUpdateBox(false)}/>
          <div className="container2">
            <div className="auther_Info">
              <div className="auther">
                <img src={comment.Profileimg} alt="" />
                <p>{comment.name}</p>
              </div>
              <button disabled={UpdateInput.trim() === ''} onClick={
                    () => {
                      UpdateData(UpdateInput,"posts/" + `${postId}/` + "comment/", comment.id)
                      setUpdateBox(false);
                      setEdit(false)
                  }
                }
                >Save</button>
            </div>

            <div className="Postdetails">
              <input
                type="text"
                onChange={(e) => {
                  setUpdateInput(e.target.value);
                }}
              />
              <img src={comment.img} alt="" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Control