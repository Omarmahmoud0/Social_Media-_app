import React, { useEffect, useState } from 'react'
import './rightbar.scss'
import user1 from '../../assets/pexels-simon-robben-55958-614810.jpg'
import user2 from '../../assets/pexels-photo-8991340.jpeg'
import { Users } from '../../Constants'
import { Link } from 'react-router-dom'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { handleDelete } from '../../posts/Posts'
const Rightbar = () => {

  const [SuggestionsData, setSuggestionsData] = useState([])

  useEffect(() => {
    const Suggestions = onSnapshot(collection(db, "Suggestions"), (snapShot) => {
      let List = [];
      snapShot.docs.forEach(doc => {
        List.push({id: doc.id , ...doc.data()})
      });
      setSuggestionsData(List)
    }, (error) => {
        console.log(error);
    });
    //== (REALTIME Update) ==//
    return () => {
      Suggestions();
    }
  },[])


  return (
    <div className='rightbar'>
      <div className="container">
        <div className="item">
          <div className="Suggestions">
            <span>Suggestions For You</span>
            <Link to="/friends">See all</Link>
          </div>
          
          {SuggestionsData.splice(0,2).map((Suggestion) => (
            <div className="users">
              <div className="userInfo">
                <img name="omar" src={Suggestion.img} alt="" />
                <span>{Suggestion.name}</span>
              </div>
              <div className="buttons">
                <button className='Request'>Add a friend</button>
                <button onClick={() => handleDelete(Suggestion.id , "Suggestions")}>Remov</button>
              </div>
            </div>
          ))}
        </div>
        <div className='item'>
              <span>Latest Activities</span>
              {Users.map((user) =>(
                <div key={user.id} className="user">
                    <div className="userInfo">
                      <img src={user.img} alt="" />
                      <p>
                      <span>{user.name}</span>{user.p}
                      </p>
                    </div>
                    <span>{user.time}</span>
                </div>
              ))}
          </div>
          <div className="item">
            <span>Online Friends</span>
            {Users.map((user) => (
              <div key={user.id} className="user">
                <div className="userInfo">
                  <img src={user.img} alt="" />
                  <span>{user.name}</span>
                  <div className="online"/>
                </div>
              </div>
            ))}
          </div>
      </div>
    </div>
  )
}

export default Rightbar