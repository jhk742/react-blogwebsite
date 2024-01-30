import React from 'react'
import { auth, provider } from '../config/firebase-config'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import googleIcon from '../img/goog-icon.png'

export default function Login({setIsAuth}) {

    //to navigate to the home page once we log in
    let navigate = useNavigate();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((res) => {
                localStorage.setItem("isAuth", true)
                setIsAuth(true)
                navigate("/")
            })
    }

    return (
        <div className="loginPage">
            <div className="login--container">
                <p>Sign in with Google to Continue</p>
                <button className="btn--login" onClick={signInWithGoogle}><img src={googleIcon}></img>Sign in with Google</button>
            </div>
        </div>
    )
}