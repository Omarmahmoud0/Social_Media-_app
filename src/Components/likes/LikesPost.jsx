import React from 'react'
import "./likes.scss"
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";


const LikesPost = ({Likes}) => {
  return (
    <div className='Like' style={{overflowY:`${Likes.length < 5 ? "hidden" : "scroll"}`}}>
      {Likes.map((like) => (
        <div className='LikeUser'>
          <img src={like.Profileimg} alt="" />
          <FavoriteOutlinedIcon className="like"/>
          <span>{like.name}</span>
        </div>
      ))}
    </div>
  )
}

export default LikesPost