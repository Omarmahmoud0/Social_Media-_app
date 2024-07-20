import React from 'react'
import "./showstorie.scss";


const ShowStorie = ({setShowStory}) => {
  return (
    <div className='showstorie' onClick={() => setShowStory(false)}>
      <div className='closediv' />
      {/* DIV CONTAINER STORY */}
      <div className="showstorie__container">
        {/* STORY */}
        <img src="" alt="" />
        {/* STORY */}

        {/* USER STORY */}
        <div className="UserStory">
          {/* USER INFO */}
          <div className="UserStory__info">
            <img src="" alt="" />
            <p style={{color:"white",fontSize:"30px"}}>sssssss</p>
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