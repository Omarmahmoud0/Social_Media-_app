import React, { createContext, useEffect, useState } from 'react'
import { doc , getDoc } from "firebase/firestore";
import { db,auth } from './Components/firebase/firebase';

export const UserContext = createContext()

export const UserProvider = ({children}) => {


    const [userDetails, setuserDetails] = useState(null);
    const fetchUser = async () => {
    auth.onAuthStateChanged(async (user) => {
    //   console.log(user);
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
    setuserDetails(docSnap.data());
    // console.log(docSnap.data());
    } else {
    console.log("User is not Logged in");
    }
    });
    };
    useEffect(() => {
    fetchUser();
    }, []);

  return (
    <UserContext.Provider value={userDetails}>{children}</UserContext.Provider>
  )
}
