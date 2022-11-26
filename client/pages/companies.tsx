import React from 'react'
import CompaniesList from '../components/CompaniesList'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function companies() {
  return (
    <div>
        <Navbar/>
        <CompaniesList/>
        <Footer/>
    </div>
  )
}
