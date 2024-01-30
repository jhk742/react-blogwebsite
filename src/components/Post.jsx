import React from 'react'
import { auth, db } from '../config/firebase-config'
import { getDocs, query, where, collection, deleteDoc } from 'firebase/firestore';
import trashCan from '../svg/TrashCan.svg'


export default function Post({ doc }) {
    const {author, title, postText} = doc
    const postsCollectionRef = collection(db, "posts")

    const getValues = (e) => {
        const contentWrapper = e.target.closest('.content--wrapper');
        const titleElement = contentWrapper.querySelector('h3');
        const authorNameElement = contentWrapper.querySelector('.content--header p');
        const authorIdElement = contentWrapper.querySelector('.postText + p');

        return {
            title: titleElement ? titleElement.textContent : '',
            authorName: authorNameElement ? authorNameElement.textContent.replace('@', '') : '',
            authorId: authorIdElement ? authorIdElement.textContent : ''
        }
    }

    const handleDelete = async (event) => {
        const { title, authorName, authorId } = getValues(event)
        try {
            // Create a query to find the document with the specified name and ID
            const deleteQuery = query(
                postsCollectionRef, 
                where("author.name", "==", authorName),
                where("author.id", "==", authorId),
                where("title", "==", title)
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
                {auth.currentUser.uid === author.id && 
                    <img 
                        src={trashCan}
                        alt="svg image of a trashcan" 
                        className="trashcan-svg" 
                        onClick={handleDelete}
                    />
                }
            </div>
        </div>
    )
}
