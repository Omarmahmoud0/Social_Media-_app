import Events from '../assets/6.png'
import Gaming from '../assets/7.png'
import Gallery from '../assets/8.png'
import Messages from '../assets/10.png'
import Tutorials from '../assets/11.png'
import Courses from '../assets/12.png'
import Fund from '../assets/13.png'
import user1 from '../assets/pexels-simon-robben-55958-614810.jpg'
import user2 from '../assets/pexels-photo-8991340.jpeg'
import user3 from '../assets/360_F_303117590_NNmo6BS2fOBEmDp8uKs2maYmt03t8fSL.jpg'
import user4 from '../assets/Personnel image 4483.jpg'
import post1 from '../assets/stock-photo-happy-friends-lying-head-to-head.jpg'
import post2 from '../assets/stock-photo-group-of-teenagers-jumping.jpg'
import post3 from '../assets/stock-photo-group-friends-having-fun-outdoors-sunny-day-downtown.jpg'
// import { img } from '../App'

export const menu1 = [
    {
        id:1,
        icon: Events,
        title:"Events",
    },
    {
        id:2,
        icon: Gaming,
        title:"Gaming",
    },
    {
        id:3,
        icon: Gallery,
        title:"Gallery",
    },
]

export const menu2 = [
    {
        id:5,
        icon: Messages,
        title:"Messages",
    },
    {
        id:6,
        icon: Tutorials,
        title:"Tutorials",
    },
    {
        id:7,
        icon: Courses,
        title:"Courses",
    },
    {
        id:7,
        icon: Fund,
        title:"Fund",
    }
]

export const Users = [
    {   id: 1,
        img: user2,
        name: 'Ali yasser',
        p:' Change their cover picture',
        time:"1 min ago"
    },
    {   id: 2,
        img: user1,
        name: 'Ahmed Mohamed',
        p:' Liked a post',
        time:"5 min ago"
    },
    {   id: 3,
        img: user3,
        name: 'Abdo',
        p:' Liked a comment',
        time:" 15 min ago"
    },
    {   id:4,
        img: user4,
        name: 'Yousef',
        p:' Comment on a post',
        time:" 1h ago"
    }
]

export const stories = [
    {
        id: 1,
        img: user1,
        name:"Ali yasser"
    },
    {
        id: 2,
        img: user2,
        name:"Ahmed Mohamed"
    },
    {
        id: 3,
        img: user3,
        name:"Abdo"
    },
    {
        id: 4,
        img: user4,
        name:"Yousef"
    },
]


export const posts = [
    {
        id:"1",
        imgProfile:user1,
        img: post1,
        name:"Ahmed Mohamed",
        userID:"1",
        title:"This was the best day"
    },
    {
        id:"2",
        imgProfile:user2,
        img: post2,
        name:"Ali yasser",
        userID:"2",
        title:"An evening with friends"
    },
    {
        id:"2",
        imgProfile:user4,
        name:"Yousef",
        userID:"3",
        title:"I'm new here, welcome"
    },
    {
        id:"3",
        imgProfile:user3,
        img: post3,
        name:"Abdo",
        userID:"4",
        title:"We are preparing for a photo session"
    },
]