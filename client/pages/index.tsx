import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import CompaniesShortInfo from '../components/CompaniesShortInfo'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'

const Home: NextPage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <CompaniesShortInfo />
      <Footer />
    </div>
  )
}

export default Home
