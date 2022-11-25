import React from 'react'
import Footer from '../components/Footer'
import Login from '../components/Login'
import Navbar from '../components/Navbar'

export default function login() {
    return (
        <div>
            <Navbar />
            <Login/>
            <Footer/>
        </div>
    )
}
