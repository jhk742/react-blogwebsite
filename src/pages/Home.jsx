import React, { useState, useEffect } from 'react'
import { getDocs, collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db, auth } from '../config/firebase-config'
import Post from '../components/Post'


export default function Home({isAuth}) {
    
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    const postsCollectionRef = collection(db, "posts")
    const orderedQuery = query(postsCollectionRef, orderBy('timestamp', 'desc'));

    useEffect(() => {
        const retrievedPosts = []
        const retrieveDocs = async () => {
            try {
                const data = await getDocs(orderedQuery)
                data.forEach((doc) => {
                    retrievedPosts.push({ ...doc.data(), id: doc.id })
                })
                setPosts(retrievedPosts)
                setLoading(false)
            } catch (error) {
                console.error("Error retrieving documents: ", error)
            }
        }
        console.log("RUNRUNRUN")
        // Set up real-time listener
        const unsubscribe = onSnapshot(orderedQuery, (snapshot) => {
            const updatedPosts = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setPosts(updatedPosts);
        });

        retrieveDocs()

        // Cleanup the listener when the component unmounts
        return () => unsubscribe();
    }, [])

    const postsToRender = posts.map((doc, index) => {
        return (
            <li key={index}>
                <Post 
                    doc={doc}
                    isAuth={isAuth}
                />
            </li>
        )
    })

    return (
        <div>
            <ul>
                {loading ? <p className="loading">Loading...</p> : postsToRender}
            </ul>
        </div>
    )
}