import Navbar from '@/Components/Navbar';
import Hero from '@/Components/Hero'
import Menu from '@/Components/Menu'
import Offer from '@/Components/Offer'
 import Chef from '@/Components/Chef'
import Recipy from '@/Components/Recipy'
 import Reservation from '@/Components/Reservation'
import Contact from '@/Components/Contact'
 import Footer from '@/Components/Footer'

import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar />
      <Hero/>
      <Menu/>
      <Offer/>
     <Chef/>
     <Recipy/>
      <Reservation/>
      <Contact/>  
      <Footer/>   
    </div>
  )
}

export default page
