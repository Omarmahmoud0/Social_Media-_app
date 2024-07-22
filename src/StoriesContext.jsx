import React, { createContext, useEffect, useState } from 'react'
import { collection , onSnapshot , orderBy , query } from "firebase/firestore";
import { db } from './Components/firebase/firebase';


export const StoriesContext = createContext()

export const StoriesProvider = ({children}) => {

    const [Storydata ,setStoryData] = useState([])
    useEffect(() => {
        const q = query(collection(db, "stories"),orderBy("timeStamp","desc"))
        const unsub = onSnapshot(q, (snapShot) => {
          let List = [];
          snapShot.docs.forEach((doc)  => {
            List.push({id: doc.id , ...doc.data()})
          })
          setStoryData(List)
        },(error) => {
          console.log(error);
        });
        
        return () => {
          unsub()
        }
    },[])
    

  return (
    <StoriesContext.Provider value={Storydata}>{children}</StoriesContext.Provider>
  )
}
