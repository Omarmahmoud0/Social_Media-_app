import React, { createContext, useEffect, useState } from 'react'
import { collection , onSnapshot , orderBy , query } from "firebase/firestore";
import { db } from '../Components/firebase/firebase';

export const PostsContext = createContext()

export const PostsProvider = ({children}) => {

    const [data ,setData] = useState([])
  useEffect(() => {
    // (REALTIME Update) //
    const q = query(collection(db, "posts"),orderBy("timeStamp","desc"))
    const unsub = onSnapshot(q, (snapShot) => {
      let List = [];
      snapShot.docs.forEach(doc => {
        List.push({id: doc.id , ...doc.data()})
      });
    setData(List)
    }, (error) => {
        console.log(error);
    });
    //== (REALTIME Update) ==//
    return () => {
      unsub();
    }
},[])

  return (
    <PostsContext.Provider value={{data}}>{children}</PostsContext.Provider>
  )
}
