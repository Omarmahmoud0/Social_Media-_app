import React, { useContext, useEffect, useState } from 'react'
import './leftbar.scss'
import Friends from '../../assets/icons8-user-account-94.png'
import Groups from '../../assets/icons8-google-groups-64.png'
import Marketplace from '../../assets/icons8-shopping-bag-94.png'
import Watch from '../../assets/icons8-video-48.png'
import Memories from '../../assets/icons8-collage-50.png'
import {menu1, menu2} from '../../Constants/index'
import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { UserContext } from '../../UserContext'


const Leftbar = () => {

  const userDetails = useContext(UserContext)

  return (
    <div className='leftbar'>
      <div className="container">
        <div className="menu">
          <div className='user'>
          {userDetails ? <>
              <img src={userDetails.ProfileImg} alt="" />
              <span>{userDetails.name}</span>
              </>
              : 
              <>
              <Skeleton variant="circular" >
                <Avatar />
              </Skeleton>
              <Skeleton width="100%">
                <Typography>.</Typography>
              </Skeleton>
              </>
              }
          </div>
          <Link to="/friends">
            <div className="item">
              <img src={Friends} alt="" />
              <span>Friends</span>
            </div>
          </Link>
          <div className="item">
            <img src={Groups} alt="" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={Marketplace} alt="" />
            <span>Marketplace</span>
          </div>
          <div className="item">
            <img src={Watch} alt="" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={Memories} alt="" />
            <span>Memories</span>
          </div>
        </div>
        <hr/>
        <div className="menu">
          <h5>Your shortcuts</h5>
          {menu1.map((menu) => (
            <div  key={menu.id}>
              <div className="item">
                <img src={menu.icon} alt="" />
                <span>{menu.title}</span>
              </div>
            </div>
          ))}
        </div>
        <hr/>
        <div className="menu">
          <h5>Others</h5>
          {menu2.map((menu) => (
            <div  key={menu.id}>
              <div className="item">
                <img src={menu.icon} alt="" />
                <span>{menu.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Leftbar