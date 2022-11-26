import React from 'react'
import CompaniesShortInfo from '../components/CompaniesShortInfo'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'

export default function App() {
    return (
        <body id='root'>
            <div>
                <Navbar />
                <Hero />
                <CompaniesShortInfo />
                <Footer />
            </div>
        </body>
    )
}
