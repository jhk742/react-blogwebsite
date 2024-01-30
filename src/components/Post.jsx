import React from 'react'
import { auth, db } from '../config/firebase-config'
import { getDocs, query, where, collection, deleteDoc, doc } from 'firebase/firestore';
import trashCan from '../svg/TrashCan.svg'


export default function Post({ doc, isAuth }) {
    const { author, title, postText } = doc
    const postsCollectionRef = collection(db, "posts")



    const handleDelete = async () => {
        try {
            // Create a query to find the document with the specified name and ID
            const deleteQuery = query(
                postsCollectionRef, 
                where("author.name", "==", author.name),
                where("author.id", "==", author.id),
                where("title", "==", title),
            )

            //get the documents that match the query
            const data = await getDocs(deleteQuery);

            //loop through the docs and delete each one
            data.forEach(async (doc) => {
                await deleteDoc(doc.ref)
            })

            alert("Post successfully deleted!")
        } catch (error) {
            console.error("Error deleting post: ", error)
        }
    }

    return (
        <div className="container--post">
            <div className="content--wrapper">
                <div className="content--header">
                    <h3>{title}</h3>
                    <p>@{author.name}</p>
                </div>
                <p className="postText">{postText}</p>
                <p style={{display:"none"}}>{author.id}</p>
                {/*IF ID MATCHES, CREATE A DELETE BUTTON that allows user
                to delete his post*/}
                {isAuth ? (auth.currentUser.uid === author.id && 
                    <img 
                        src={trashCan}
                        alt="svg image of a trashcan" 
                        className="trashcan-svg" 
                        onClick={handleDelete}
                    />) : ""
                }
            </div>
        </div>
    )
}
