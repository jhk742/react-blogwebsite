import React, { useState, useEffect } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db, auth } from '../config/firebase-config'
import { useNavigate } from 'react-router-dom'


export default function CreatePost({ isAuth }) {

    const [title, setTitle] = useState("")
    const [postText, setPostText] = useState("")

    //ref to the firebase collection, "posts"
    const postsCollectionRef = collection(db, "posts")
    let navigate = useNavigate();

    //make sure to update collection rules on firebase so that read/write is enabled (permissons)
    const createPost = async () => {
        try {
            await addDoc(postsCollectionRef, {
                title,
                postText,
                author: {
                    name: auth.currentUser.displayName,
                    id: auth.currentUser.uid
                },
                timestamp: serverTimestamp()
            })
            navigate("/")
        } catch (error) {
            console.error("Error creating post: ", error)
        }
    }


    // if not logged in, prevents people from modifying the url to access the create posts page
    // will redirect to the login page
    useEffect(() => {
        if (!isAuth) {
            navigate("/login")
        }
    }, [])

    return (
        <div className="createPostPage">
            <div className="cpContainer">
                <h1>Create A Post</h1>
                <div className="inputGroup">
                    <label>Title:</label>
                    <input 
                        placeholder="Title..." 
                        className="input--title"
                        onChange={(e) => {
                            const {value} = e.target
                            setTitle(value)
                        }}
                    /> 
                </div>
                <div className="inputGroup">
                    <label>Post:</label>
                    <textarea 
                        placeholder="Post..." 
                        className="txtArea--post"
                        onChange={(e) => {
                            const {value} = e.target
                            setPostText(value)
                        }}
                    />
                </div>
                <button onClick={createPost}>Submit Post</button>
            </div>
        </div>
    )
}