import React, { useEffect, useState } from 'react'
import "./friends.scss";
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { handleDelete } from '../../posts/Posts';
// import '../../style.scss'

const Friends = () => {

  const [friendsData, setfriendsData] = useState([])
  const [SuggestionsData, setSuggestionsData] = useState([])
  const [AcceptFriend, setAcceptFriend] = useState(true)


  useEffect(() => {
    // (REALTIME Update) //

    const friendsRequst = onSnapshot(collection(db, "friends"), (snapShot) => {
      let List = [];
      snapShot.docs.forEach(doc => {
        List.push({id: doc.id , ...doc.data()})
      });
      setfriendsData(List)
    }, (error) => {
        console.log(error);
    });

    // ================================== //

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
      friendsRequst();
      Suggestions();
    }
  },[])

  
  return (
    <div>
    <div className='Friends'>
      <Grid2  container padding={2} alignItems={'center'} justifyContent={'flex-start'}  >
        <Grid2 lg={12} md={12} xs={12}>
          <h2>Friends Requst</h2>
        </Grid2>
          {friendsData.map((friend) => (
            <Grid2 lg={4} md={6} xs={12}>
              <div key={friend.id} className='friend-card'>
                <img src={friend.img} alt="" />
                <h1>{friend.name}</h1>
                { AcceptFriend ? <div className="buttons">
                  <button onClick={() => setAcceptFriend(false)}>Confirm</button>
                  <button onClick={() => {
                    handleDelete(friend.id , "friends")
                  }}>Delete</button>
                </div> : <p>You two have become friends now</p>}
              </div>
            </Grid2>
          ))}
      </Grid2>
      <Grid2  container padding={2} alignItems={'center'} justifyContent={'flex-start'}  >
        <Grid2 lg={12} md={12} xs={12}>
          <h2>Suggestions</h2>
        </Grid2>
        {SuggestionsData.map((suggestion) => (
          <Grid2  lg={4} md={6} xs={12}>
            <div key={suggestion.id} className='friend-card'>
              <img src={suggestion.img} alt="" />
              <h1>{suggestion.name}</h1>
              { AcceptFriend ? <div className="buttons">
                <button onClick={() => setAcceptFriend(false)}>Add a friend</button>
                <button onClick={() => {
                  handleDelete(suggestion.id , "Suggestions")
                }}>Remov</button>
              </div> : <p>You two have become friends now</p>}
            </div>
          </Grid2>
          ))}
        </Grid2>
    </div>
    </div>

  )
}

export default Friends