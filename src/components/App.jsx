import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import CreatePost from '../pages/CreatePost'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase-config'

import './style.css'


export default function App() {

  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    // Check localStorage for the authentication state on component mount
    const storedIsAuth = localStorage.getItem('isAuth')
    if (storedIsAuth) {
      setIsAuth(storedIsAuth === 'true')
    }
  }, []);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname = "/login"
    })
  }

  return (
    <Router>
      <nav className="navbar">
        <Link className="nav--link" to="/">Home</Link>
        {/* Login & Create Post links should not be visible if isAuth === true */}
        {!isAuth ? 
          <Link className="nav--link" to="/login">Login</Link> 
          : ( 
            <>
              <Link className="nav--link" to="/createpost">Create Post</Link>
              <button 
                onClick={signUserOut}
                className="btn--logout"
              >Log Out</button>
            </>
         )}
      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  )
}