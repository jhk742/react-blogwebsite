import React, { useState, useEffect } from 'react'
import { getDocs, collection, query, orderBy } from 'firebase/firestore'
import { db, auth } from '../config/firebase-config'
import Post from '../components/Post'


export default function Home() {
    
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
                    retrievedPosts.push({...doc.data()})
                })
                setPosts(retrievedPosts)
                setLoading(false)
            } catch (error) {
                console.error("Error retrieving documents: ", error)
            }
        }
        retrieveDocs()
    }, [])

    const postsToRender = posts.map((doc, index) => {
        return (
            <li key={index}>
                <Post 
                    doc={doc}
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