import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";

export const LikeContext = createContext()

export const LikeProvider = ({children}) => {
    const [Likes, seLikes] = useState([]);
    const getLike = async () => {
    try {
        const q = query(
            collection(db, "posts/" + `${post.id}/` + "like/"),
            orderBy('time',"desc")
        );
        const data = onSnapshot(q, (QuerySnapshot) => {
            let productsArray = [];
            QuerySnapshot.forEach((doc) => {
            productsArray.push({ ...doc.data(), id: doc.id });
            });
            seLikes(productsArray)
            console.log(productsArray)
        });
        return () => data;
        } catch (error) {
        console.log(error)
        }
    }
    useEffect(() => {
        getLike()
    }, []);

    return (
        <LikeContext.Provider value={Likes}>{children}</LikeContext.Provider>
    )
}

