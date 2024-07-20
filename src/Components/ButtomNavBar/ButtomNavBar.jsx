import React from 'react'
import "./buttomnavbar.scss"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import TelegramIcon from "@mui/icons-material/Telegram";
import { Badge, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';


const ButtomNavBar = ({ShowNotifica,setDarkMode,darkMode,arry}) => {
  return (
    <div className='ButtomNav'>
        <div className="Nav-container">
            {darkMode ? (
            <IconButton>
                <WbSunnyOutlinedIcon
                className="Icons_NavB"
                onClick={() => {
                    setDarkMode(!darkMode);
                }}
                />
            </IconButton>
            ) : (
            <IconButton>
                <DarkModeOutlinedIcon
                className="Icons_NavB"
                onClick={() => {
                    setDarkMode(!darkMode);
                }}
                />
            </IconButton>
            )}
            <IconButton>
                <GridViewOutlinedIcon className='Icons_NavB'/>
            </IconButton>
            <Link to="/">
                <IconButton>
                <HomeOutlinedIcon className="Icons_NavB active" />
                </IconButton>
            </Link>
            <IconButton>
                <TelegramIcon className="Icons_NavB" />
            </IconButton>

            <IconButton>
                <Badge badgeContent={arry.length} color="primary">
                    <NotificationsOutlinedIcon
                    onClick={ShowNotifica}
                    className="Icons_NavB"
                    />
                </Badge>
            </IconButton>
        </div>
        
    </div>
  )
}

export default ButtomNavBar