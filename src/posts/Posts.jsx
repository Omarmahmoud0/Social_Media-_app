import React, { useContext } from 'react'
import './posts.scss'
import Post from '../post/Post'
import { deleteDoc , doc , updateDoc } from "firebase/firestore";
import { db } from '../Components/firebase/firebase';
import { PostsContext } from '../PostsContext/PostsContext';
import { toast } from 'react-toastify';

export const handleDelete = async (id,posts) =>{
  try{
    
    await deleteDoc(doc(db,posts, id))
    
  } catch (error) {
    console.log(error);
  }
}

export const UpdateData = async (UpdateInput,collection,id) => {
  try{
    const washingtonRef = doc(db, collection, id);
    await updateDoc(washingtonRef, {
      title: UpdateInput,
      comment: UpdateInput,
      backgroundCover: UpdateInput,
      });
      toast.success("Updated successfully",{position:"top-center"})

  } catch (error) {
    console.log(error);
  }
}

const Posts = ({UserID}) => {

  const {data} = useContext(PostsContext)

  return (
    <div className='posts'>
        {data.map(post => (
          <>
          {UserID == post.uid && <Post post={post} key={post.id}/>}
          {UserID == undefined && <Post post={post} key={post.id}/>}
          </>
        ))}
    </div>
  )
}

export default Posts