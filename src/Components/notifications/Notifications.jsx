import React from 'react'
import "./notifications.scss"


const Notifications = ({postId}) => {



  return (
    <div className='Notifications'>
      {<div className='Notification'>
        <h1>Notifications</h1>
        {/* {notification.map((notific) => (
          <div key={notific.id}>
            {notific.postuid === localStorage.getItem("token") ?
            <div className="Card" >
                <img src={notific.Profileimg} alt="" />
              <div className="Userinfo">
                {<p>Your post has been commented on <span>{notific.name}</span></p>}
                <span>2/3/2003</span>
              </div>
            </div>
            : ''}
          </div>

        ))} */}
        <h2>omar</h2>
        <h2>omar</h2>
        <h2>omar</h2>
        <h2>omar</h2>
      </div>}
    </div>
  )
}

export default Notifications