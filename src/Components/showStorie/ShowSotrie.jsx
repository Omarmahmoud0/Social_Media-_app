import React, { useState } from 'react'
import "./showstorie.scss";
import CloseIcon from '@mui/icons-material/Close';
import { UserId } from '../../App';

const ShowStorie = ({setShowStory,UserStory}) => {

  const [animate, setanimate] = useState(false)

  return (
    <div className={`showstorie animate__animated ${animate ? "animate__zoomOut" : "animate__zoomIn"}`}>
      {/* DIV CONTAINER STORY */}
      <div className="showstorie__container">
        {/* STORY */}
          <img className='UserStory' src={UserStory.img} alt="" />
        {/* STORY */}

        {/* USER STORY */}
        <div className="User">
          {/* USER INFO */}
          <div className="UserStory__info">
            <div>
            <img src={UserStory.ProfileImg} alt="" />
            <p onClick={() => UserId(UserStory.uid)}>{UserStory.author}</p>
            </div>
            <CloseIcon fontSize='large' className='Close_btn' onClick={() => {
              setTimeout(() => {
                setShowStory(false)
              },400)
              setanimate(true)
              }} />
          </div>
          {/* USER INFO */}
        </div>
        {/* USER STORY */}
      </div>
      {/* DIV CONTAINER STORY */}
    </div>
  )
}

export default ShowStorie