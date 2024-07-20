import React from 'react'
import "./about.scss";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SchoolIcon from '@mui/icons-material/School';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIphoneTwoToneIcon from '@mui/icons-material/PhoneIphoneTwoTone';
import CakeIcon from '@mui/icons-material/Cake';
import Relationship from "../../assets/icons8-two-hearts-96.png";


const About = ({user}) => {
  return (
    <div className='About'>
      <div className="Header">
        <h1>About me</h1>
      </div>
    <div className="Content">
      <div className="frist">
        <div>
          <BusinessCenterIcon className='Icon-about'fontSize='large'/>
          <p>{user.Workplace}</p>
        </div>
        <div>
          <SchoolIcon className='Icon-about'fontSize='large'/>
          <p>{user.Education}</p>
        </div>
        <div>
          <LocationOnIcon className='Icon-about'fontSize='large'/>
          <p>{user.Hometown}</p>
        </div>
      </div>
      <div className="frist">
        <div>
          <img src={Relationship} alt="" className='Icon-img'/>
          <p>{user.Relationship}</p>
        </div>
        <div>
          <PhoneIphoneTwoToneIcon className='Icon-about'fontSize='large'/>
          <p>{user.Contectinfo}</p>
        </div>
        <div>
          <CakeIcon className='Icon-about'fontSize='large'/>
          <p>{user.Birthday}</p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default About